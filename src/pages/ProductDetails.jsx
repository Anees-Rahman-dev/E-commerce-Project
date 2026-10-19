import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCart  } from '../redux/slices/cartSlice';
import { getProductById } from '../services/ProductService';
import Tilt from 'react-parallax-tilt'
import toast from 'react-hot-toast';
import { removeWish, setCartDb } from '../services/CartService';

function ProductDetails() {

  const { id } = useParams();
  // console.log(id)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);


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

    setLoading(true);
    setProduct(null);
    setQuantity(1);

    getProductById(id)
      .then((res) => {
        if(!cancelled) setProduct(res);
      })
      .catch((error) => {
        console.error("Failed to load product",error);
        if(!cancelled)setProduct(null);
      })
      .finally(() => {
        if(!cancelled) setLoading(false);
      });

      return () =>{
        cancelled = true;
      };
  },[id])


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
    if (!isAuthenticated) return navigate(`/login`);

    const uid = JSON.parse(localStorage.getItem("user"))?.id;
    const key = uid ? `wishlist_${uid}` : 'wishlist';
    const current = JSON.parse(localStorage.getItem(key) || '[]');
    const exists = current.find((i) => i.id === product.id);
    
    if (!exists) {
      localStorage.setItem(key, JSON.stringify([...current, product]));
      toast.success("Added to wishlist!");
    } else {
      const updated = current.filter((i) => i.id !== product.id);
      localStorage.setItem(key, JSON.stringify(updated));
      try {
        await removeWish(exists.id);
      } catch (error) {
        console.warn('Failed to delete wishlist item from backend:', error);
      }
      toast.success('Removed from wishlist');
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
      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
      className="h-full min-w-0 flex-1 bg-gray-100 text-lg hover:bg-gray-200 disabled:opacity-50"
    >
      -
    </button>

    <span className="flex h-full min-w-0 flex-1 items-center justify-center font-medium">
      {quantity}
    </span>

    <button
      type="button"
      disabled={quantity >= product.stock}
      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
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
  {product.stock > 0 && `${product.stock} units available`}
</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails