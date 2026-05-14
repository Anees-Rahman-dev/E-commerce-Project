import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { addToCart } from '../redux/slices/cartSlice';
import { getProductById } from '../services/ProductService';

function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then((res) => setProduct(res))
      .finally(() => setLoading(false))
    console.log(product)
    console.log(id)
  }, [id])

  
  // const handleAddToCart = () => {
  //   if (!isAuthenticated) return navigate(`/login`);
  //   dispatch(addToCart({ ...product, quantity }))
  //   setAdded(true)
   
  // }

  const handleAddToCart = () => {
    if (!isAuthenticated) return navigate(`/login`);
    dispatch(addToCart({ ...product, quantity }))
    setAdded(true)
    useEffect(() => {
  let timer;

  if (added) {
    timer = setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  return () => clearTimeout(timer);
}, [added]);
  }
//    useEffect(() => {
//   let timer;

//   if (added) {
//     timer = setTimeout(() => {
//       setAdded(false);
//     }, 2000);
//   }

//   return () => clearTimeout(timer);
// }, [added]);


  const handleWishlist = () => {
    const current = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const exists = current.find((i) => i.id === product.id);
    if (!exists) {
      localStorage.setItem("wishlist", JSON.stringify([...current, product]));
      alert("Added to wishlist!");
    } else {
      alert("Already in wishlist!");
    }
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
 <div className="rounded-2xl overflow-hidden shadow bg-grey flex items-center justify-center h-80 w-full md:w-96">
  <img
    src={product.image}
    alt={product.name}
    // Use object-contain so nothing is cut off
    // Use p-4 to give the product some "breathing room"
    className="w-full h-full object-contain p-4" 
  />
</div>

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
              <span className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium">
                Out of Stock
              </span>
            </div>
          ) : (
            <div className="mt-6 flex items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg"
                >
                  −
                </button>
                <span className="px-5 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-amber-800 text-white px-8 py-2 rounded-lg hover:bg-amber-900 transition"
              >
                {added ? "✓ Added!" : "Add to Cart"}
              </button>


              {/* <button
                onClick={handleAddToCart}
                className="bg-amber-800 text-white px-8 py-2 rounded-lg hover:bg-amber-900 transition"
              >
                {added ? "✓ Added!" : "Add to Cart"}
              </button> */}

              <button
                onClick={handleWishlist}
                className="border border-amber-800 text-amber-800 px-6 py-2 rounded-lg hover:bg-amber-50 transition"
              >
                🤍 Wishlist
              </button>

            </div>
          )}

          <p className="text-xs text-gray-400 mt-4">
            {product.stock > 0 && `${product.stock} units available`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails