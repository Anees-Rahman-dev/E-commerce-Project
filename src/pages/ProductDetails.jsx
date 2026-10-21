import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCart  } from '../redux/slices/cartSlice';
import Tilt from 'react-parallax-tilt'
import toast from 'react-hot-toast';
import { getWishDb, removeWish, setCartDb, setWishDb } from '../services/CartService';
import { getProductById, getAllProducts } from '../services/ProductService';
function ProductDetails() {

  const { id } = useParams();
  // console.log(id)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);


  const [relatedProducts, setRelatedProducts] = useState([]);
const [relatedLoading, setRelatedLoading] = useState(true);
const [quantities, setQuantities] = useState({});
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  // useEffect(() => {
  //   console.log(product)
  //   getProductById(id)
  //     .then((res) => setProduct(res))
  //     .finally(() => setLoading(false))
  //   // console.log(id)
  // }, [id])

  useEffect(() => {

    let cancelled = false;

    const loadProducts = async () =>{
      setLoading(true);
      setRelatedLoading(true);
      setProduct(null);
      setRelatedProducts([]);

      try {
        const currentProduct = await getProductById(id);

        if(cancelled)return;

        setProduct(currentProduct);

        const allProducts = await getAllProducts();

        const currentId = currentProduct.productId ?? currentProduct.id;

        const related = (Array.isArray(allProducts) ? allProducts : [])
          .filter((item) => {
            const itemId = item.productId ?? item.id;

            return (String(itemId) !== String(currentId) &&
            item.category?.toLowerCase() ===
            currentProduct.category?.toLowerCase());
          })
          .slice(0,4);

          setRelatedProducts(related);
      }catch(error){
        console.log("Failed to load product details:", error);

        if(!cancelled){
          setProduct(null);
          setRelatedProducts([]);        }
      }finally{
        if(!cancelled){
          setLoading(false);
          setRelatedLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  },[id])

  useEffect(() => {
  setQuantity(quantities[id] ?? 1);
}, [id, quantities]);



const handleAddToCart = async () => {
  if (!isAuthenticated) {
    navigate("/login");
    return;
  }

  if (product.stock <= 0) {
    toast.error("Out Of Stock");
    return;
  }

  try {
    await setCartDb(product.productId, quantity);
    await dispatch(fetchCart()).unwrap();

    setAdded(true);
    toast.success("Added to cart");
  } catch (error) {
    console.error("Add to cart failed:", error);

    toast.error(
      typeof error === "string"
        ? error
        : error.response?.data || "Unable to add product to cart."
    );
  }
};

  useEffect(() => {
    let timer;

    if (added) {
      timer = setTimeout(() => {
        setAdded(false);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [added]);


  
 

const handleWishlist = async () => {
  if (!isAuthenticated) {
    navigate('/login');
    return;
  }

  const productId = product.productId ?? product.id;

  try {
    const before = await getWishDb();

    const existingItem = before.find(
      (item) => Number(item.productId) === Number(productId)
    );

    if (existingItem) {

      await removeWish(existingItem.wishlistItemId);
      toast.success('Removed from wishlist');

    } else {

      const addedItem = await setWishDb(productId);
      console.log('Added wishlist item:', addedItem);
      toast.success('Added to wishlist!');

    }
  } catch (error) {

    console.error(
      'Wishlist error:',
      error.response?.status,
      error.response?.data || error.message

    );

    toast.error('Unable to update wishlist');
  }
};


  const handleBuyNow = () => {

    if(!isAuthenticated){
      navigate('/login');
      return;
    }

    if(product.stock <= 0){
      toast.error("Out of stock");
      return;
    }

    navigate("/checkout",{
      state : {
        buyNow : {
          product,
          quantity,
        },
      },
    });
  };

  if (loading) {
    return <p>Loading...</p>
  }
  if (!product) {
    return <p>Product Not Found</p>

  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-amber-700 hover:underline"
      >
        ← Back
      </button>

      <div className=" mt-20 flex flex-col md:flex-row gap-10">
   <Tilt
  tiltMaxAngleX={12}
  tiltMaxAngleY={12}
  perspective={900}
  scale={1.03}
  transitionSpeed={400}
  glareEnable={true}
  glareMaxOpacity={0.15}
  glareColor="#ffffff"
  glarePosition="all"
  className="rounded-2xl w-full md:w-96"
>
  <div className="rounded-2xl overflow-hidden shadow flex items-center justify-center h-80 w-full">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-full object-cover "
    />
  </div>
</Tilt>

        <div className="flex-1">
          <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mt-3">
            {product.name}
          </h1>
          <p className="text-gray-500 mt-3 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mt-4">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm font-medium">{product.rating} / 5</span>
          </div>

          <p className="text-3xl font-bold text-amber-800 mt-4">
            ₹{product.price}
          </p>

    
{product.stock === 0 ? (
  <div className="mt-6">
    <span className="rounded-lg bg-red-100 px-4 py-2 font-medium text-red-600">
      Out of Stock
    </span>
  </div>
) : (

<div className="mt-6 grid grid-cols-4 items-stretch gap-3">
  {/* Quantity Selector */}
  <div className="flex h-12 min-w-0 items-center overflow-hidden rounded-lg border border-gray-800">
   <button
  type="button"
  disabled={quantity <= 1}
  onClick={() => {
    const next = Math.max(1, quantity - 1);
    setQuantity(next);
    setQuantities((previous) => ({ ...previous, [id]: next }));
  }}
  className="h-full min-w-0 flex-1 bg-gray-100 text-lg hover:bg-gray-200 disabled:opacity-50"
>
  -
</button>
{quantity}

<button
  type="button"
  disabled={quantity >= product.stock}
  onClick={() => {
    const next = Math.min(product.stock, quantity + 1);
    setQuantity(next);
    setQuantities((previous) => ({ ...previous, [id]: next }));
  }}
  className="h-full min-w-0 flex-1 bg-gray-100 text-lg hover:bg-gray-200 disabled:opacity-50"
>
  +
</button>
  </div>

  {/* Add to Cart */}
  <button
    type="button"
    onClick={handleAddToCart}
    className="h-12 min-w-0 rounded-lg bg-amber-800 px-2 text-sm font-medium text-white transition hover:bg-amber-900 sm:text-base"
  >
    {added ? "✓ Added!" : "Add to Cart"}
  </button>

  {/* Buy Now */}
  <button
    type="button"
    onClick={handleBuyNow}
    className="h-12 min-w-0 rounded-lg bg-orange-800 px-2 text-sm font-medium text-white transition hover:bg-orange-700 sm:text-base"
  >
    Buy Now
  </button>

  {/* Wishlist */}
  <button
    type="button"
    onClick={handleWishlist}
    className="h-12 min-w-0 whitespace-nowrap rounded-lg border border-amber-800 px-1 text-sm font-medium text-amber-800 transition hover:bg-amber-50 sm:text-base"
  >
    ♡ Wishlist
  </button>
</div>


)}

<p className="mt-4 text-xs text-gray-400">
  {product.stock > 0
    ? `${ product.stock - quantity} units in stock`
    : "Out of stock"}
</p>
        </div>
      </div>
      {/* Related Products */}
<section className="mt-16">
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-800">
      You May Also Like
    </h2>
    <p className="mt-2 text-sm text-gray-500">
      Explore more chocolates from our {product.category} collection.
    </p>
  </div>

  {relatedLoading ? (
    <p className="py-6 text-gray-500">Loading related products...</p>
  ) : relatedProducts.length === 0 ? (
    <p className="py-6 text-gray-500">
      No other products available in this category yet.
    </p>
  ) : (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {relatedProducts.map((item) => (
        <button
          type="button"
          key={item.productId ?? item.id}
          onClick={() =>
            navigate(`/product/${item.productId ?? item.id}`)
          }
          className="group overflow-hidden rounded-2xl border border-amber-100 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="h-48 overflow-hidden bg-amber-50">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <div className="p-4">
            <span className="text-xs font-medium text-amber-700">
              {item.category}
            </span>

            <h3 className="mt-2 line-clamp-2 font-semibold text-gray-800">
              {item.name}
            </h3>

            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="font-bold text-amber-800">
                ₹{item.price}
              </span>

              <span className="text-sm text-yellow-500">
                ⭐ {item.rating ?? "New"}
              </span>
            </div>

            <span className="mt-4 block text-sm font-medium text-amber-800 group-hover:underline">
              View Product →
            </span>
          </div>
        </button>
      ))}
    </div>
  )}
</section>
    </div>
  );
}

export default ProductDetails