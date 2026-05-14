// // import React from 'react'
// // import { useNavigate } from 'react-router-dom'

// // export default function ProductCard({ product }) {
// //   const navigate = useNavigate()
// //  return (
// //     <div
// //       onClick={() => navigate(`/product/${product.id}`)}
// //       className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden"
// //     >
// //       <img
// //         src={product.image}
// //         alt={product.name}
// //         className="w-full h-48 object-cover"
// //       />
// //       <div className="p-4">
// //         <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
// //           {product.category}
// //         </span>
// //         <h3 className="font-semibold mt-2 text-gray-800">{product.name}</h3>
// //         <p className="text-sm text-gray-500 mt-1 line-clamp-2">
// //           {product.description}
// //         </p>
// //         <div className="flex justify-between items-center mt-3">
// //           <span className="font-bold text-amber-800">₹{product.price}</span>
// //           {product.stock === 0 ? (
// //             <span className="text-xs text-red-500 font-medium">Out of Stock</span>
// //           ) : (
// //             <span className="text-xs text-green-600">⭐ {product.rating}</span>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../redux/slices/cartSlice";

// export default function ProductCard({ product }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     if (!isAuthenticated) return navigate("/login");
//     dispatch(addToCart({ ...product, quantity: 1 }));
//     console.log(product)
//   };

//   return (

    
//     <div
//       onClick={() => navigate(`/product/${product.id}`)}
//       className="group relative cursor-pointer bg-white/70 backdrop-blur-xl border border-white/20 rounded-[30px] overflow-hidden hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500"
//     >

//       {/* Image */}
//       <div className="relative h-72 overflow-hidden bg-[#F8E7D2] rounded-[30px]">

//   <img
//     src={
//       product.image.startsWith("http")
//         ? product.image
//         : `http://localhost:5173${product.image}`
//     }
//     alt={product.name}
//     className="w-full h-full object-contain group-hover:scale-110 transition duration-700 p-6"
//   />

//   {product.stock === 0 && (
//     <div className="absolute inset-0 bg-black/50 rounded-[30px] flex items-center justify-center">
//       <span className="text-white font-semibold text-sm bg-red-500 px-3 py-1 rounded-full">
//         Out of Stock
//       </span>
//     </div>
//   )}

//   {/* Wishlist button */}
//   <button
//     onClick={(e) => {
//       e.stopPropagation();

//       const current = JSON.parse(
//         localStorage.getItem("wishlist") || "[]"
//       );

//       if (!current.find((i) => i.id === product.id)) {
//         localStorage.setItem(
//           "wishlist",
//           JSON.stringify([...current, product])
//         );

//         console.log(current);
//       }
//     }}
//     className="absolute top-3 right-3 bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center shadow transition"
//   >
//     🤍
//   </button>

// </div>

//       {/* Info */}
//       <div className="p-4">
//         <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
//           {product.category}
//         </span>
//         <h3 className="font-bold mt-2 text-gray-800 text-base">{product.name}</h3>
//         <p className="text-sm text-gray-400 mt-1 line-clamp-2">{product.description}</p>

//         <div className="flex justify-between items-center mt-4">
//           <div>
//             <span className="font-bold text-[#3B1F0A] text-lg">₹{product.price}</span>
//             <div className="flex items-center gap-1 mt-0.5">
//               <span className="text-yellow-400 text-xs">⭐</span>
//               <span className="text-xs text-gray-500">{product.rating}</span>
//             </div>
//           </div>
//           <button
//             onClick={handleAddToCart}
//             disabled={product.stock === 0}
//             className="bg-[#3B1F0A] text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-amber-800 transition disabled:opacity-40 text-lg"
//           >
//             +
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../redux/slices/cartSlice";
// import { addToWishlist } from "../redux/slices/wishlistSlice";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleNavigate = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (product.stock === 0) return;

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    dispatch(addToCart({...product,quantity: 1,}));
  };

  const handleWishlist = (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    dispatch(addToWishlist(product));
  };

  return (
    <article
      className="group relative bg-white/70 backdrop-blur-md border border-white/20 rounded-[30px] overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
    >
      {/* Clickable image/content area */}
      <button
        onClick={handleNavigate}
        className="w-full text-left"
      >
        <div className="relative h-72 overflow-hidden bg-[#F8E7D2] rounded-[30px]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/fallback.jpg";
            }}
            className="w-full h-full object-contain group-hover:scale-105 transition duration-700 p-6"
          />

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 rounded-[30px] flex items-center justify-center">
              <span className="text-white font-semibold text-sm bg-red-500 px-3 py-1 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h3 className="text-lg font-semibold line-clamp-1">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-orange-600">
              ₹{product.price}
            </span>

            <span className="text-sm text-gray-500">
              {product.stock > 0
                ? `${product.stock} left`
                : "Unavailable"}
            </span>
          </div>
        </div>
      </button>

      {/* Actions */}
      <div className="px-5 pb-5 flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 rounded-2xl transition"
        >
          Add to Cart
        </button>

        <button
          onClick={handleWishlist}
          className="px-4 rounded-2xl border border-gray-300 hover:bg-gray-100 transition"
        >
          ♥
        </button>
      </div>
    </article>
  );
}