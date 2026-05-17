// import React from 'react'
// import { addToCart } from '../redux/slices/cartSlice'
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";


// export default function WishList() {

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [wishlist, setWishlist] = useState(() => {
//     return JSON.parse(localStorage.getItem("wishlist") || "[]")
//   })

//   const handleRemove = (id) => {
//     const updated = wishlist.filter((item) => item.id !== id)
//     setWishlist(updated)
//     localStorage.setItem("wishlist", JSON.stringify(updated))
//   }

//   const handleMoveToCart = (item) => {
//     dispatch(addToCart({ ...item, quantity: 1 }))
//     handleRemove(item.id)
//   }

//   if (wishlist.length === 0) {
//     return (
//       <div className="text-center py-24 text-gray-500">
//         <p className="text-5xl mb-4">🤍</p>
//         <p className="text-xl font-medium">Your wishlist is empty</p>
//         <button
//           onClick={() => navigate("/")}
//           className="mt-4 bg-amber-800 text-white px-6 py-2 rounded-lg hover:bg-amber-900"
//         >
//           Explore Chocolates
//         </button>
//       </div>
//     )
//   }

  
//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist</h1>
//       <div className="space-y-4">
//         {wishlist.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-20 h-20 object-cover rounded-lg"
//             />
//             <div className="flex-1">
//               <h3 className="font-semibold text-gray-800">{item.name}</h3>
//               <p className="text-amber-800 font-medium">₹{item.price}</p>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => handleMoveToCart(item)}
//                 className="bg-amber-800 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-amber-900"
//               >
//                 Move to Cart
//               </button>
//               <button
//                 onClick={() => handleRemove(item.id)}
//                 className="text-red-400 hover:text-red-600 text-xl"
//               >
//                 ✕
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react'
import { addToCart } from '../redux/slices/cartSlice'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function WishList() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);
  const userId = user?.id;
  const storageKey = userId ? `wishlist_${userId}` : 'wishlist';

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch {
      return [];
    }
  });

  const save = (items) => {
    setWishlist(items);
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {}
  };

  const handleRemove = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);

    save(updated);
  };

  const handleMoveToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    handleRemove(item.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-24 text-gray-500 pt-30">
        <p className="text-5xl mb-4">🤍</p>

        <p className="text-xl font-medium">
          Your wishlist is empty
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-amber-800 text-white px-6 py-2 rounded-lg hover:bg-amber-900"
        >
          Explore Chocolates
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 pt-39">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        My Wishlist
      </h1>

      <div className="space-y-4">

        {wishlist.map((item) => (

          <div
            key={item.id}
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >

            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">
                {item.name}
              </h3>

              <p className="text-amber-800 font-medium">
                ₹{item.price}
              </p>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => handleMoveToCart(item)}
                className="bg-amber-800 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-amber-900"
              >
                Move to Cart
              </button>

              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-400 hover:text-red-600 text-xl"
              >
                ✕
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}