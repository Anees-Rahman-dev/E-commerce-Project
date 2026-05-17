// import React, { useEffect, useReducer, useState } from 'react'
// import { fetchOrders } from '../redux/slices/orderSlice'
// import { useDispatch, useSelector } from 'react-redux'

// const STATUS_ORDERS = {
//   placed: "bg-blue-100 text-blue-700",
//   shipped: "bg-yellow-100 text-yellow-700",
//   delivered: "bg-green-100 text-green-700",
//   cancelled: "bg-red-100 text-red-700",
// }
// function Orders() {

//   const dispatch = useDispatch()
//   const { user } = useSelector((state) => state.auth)
//   const { orders, status } = useSelector((state) => state.orders)

//   console.log(user)
//   useEffect(() => {
//     dispatch(fetchOrders(user.id))
//   }, [dispatch, user.id])
// console.log(orders)
//   if (status === 'Loading...')
//     return <p className="text-center mt-20 text-gray-400">Loading orders...</p>;

//   if (orders.length === 0) {
//     return (
//       <div className="text-center py-24 text-gray-500">
//         <p className="text-5xl mb-4">📦</p>
//         <p className="text-xl font-medium">No orders yet</p>
//         <p className="text-sm mt-1">Your placed orders will appear here</p>
//       </div>
//     )
//   }


//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>
//       <div className="space-y-6">
//         {orders.map((order) => (
//           <div key={order.id} className="bg-white rounded-xl shadow-sm p-5">
//             <div className="flex justify-between items-center mb-3">
//               <span className="text-sm text-gray-400">
//                 Order #{order.id} •{" "}
//                 {new Date(order.date).toLocaleDateString("en-IN", {
//                   day: "numeric", month: "short", year: "numeric",
//                 })}
//               </span>
//               <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"}`}>
//                 {order.status}
//               </span>
//             </div>

//             <div className="space-y-1 text-sm text-gray-600">
//               {order.items.map((item, i) => (
//                 <div key={i} className="flex justify-between">
//                   <span>{item.name} × {item.quantity}</span>
//                   <span>₹{item.price * item.quantity}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-3 pt-3 border-t flex justify-between font-semibold">
//               <span>Total</span>
//               <span className="text-amber-800">₹{order.total}</span>
//             </div>

//             {order.address && (
//               <p className="mt-2 text-xs text-gray-400">📍 {order.address}</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Orders

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../redux/slices/orderSlice';

const STATUS_COLORS = {
  placed: 'bg-blue-100 text-blue-700',
  shipped: 'bg-yellow-100 text-yellow-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(s => s.auth);
  const { orders, status } = useSelector(s => s.orders);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    dispatch(fetchOrders(user.id));
  }, [user]);                           // guard before accessing user.id

  if (status === 'loading')
    return <p className="text-center mt-20 text-gray-400">Loading orders...</p>;

  if (!orders.length)
    return (
      <div className="text-center py-24 text-gray-500 pt-30">
        <p className="text-5xl mb-4">📦</p>
        <p className="text-xl font-medium">No orders yet</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 pt-30">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-400">
                Order #{order.id} • {new Date(order.date).toLocaleDateString('en-IN')}
              </span>
              <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-amber-800">₹{order.total}</span>
            </div>
            {order.address && (
              <p className="mt-2 text-xs text-gray-400">📍 {order.address}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}