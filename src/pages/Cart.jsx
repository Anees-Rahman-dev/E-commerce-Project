import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice'
function Cart() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.cart)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className='text-center py-24 text-gray-500 pt-30'>
        <p className="text-5xl mb-4"><span class="material-symbols-outlined">
          shopping_cart
        </span></p>
        <p className="text-xl font-medium">Your Cart Is Empty</p>
        <button onClick={() => navigate(`/`)} className="font-bold text-2xl text-amber-800">
          Shop Now!
        </button>
      </div>
    );

  }

  return (
    <div className="max-w-3xl mx-auto p-6 pt-30">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-amber-800 font-medium">₹{item.price}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() =>
                  item.quantity === 1
                    ? dispatch(removeFromCart(item.id)) + alert(`${item.name} removed from the cart`)
                    : dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                }
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
              >
                −
              </button>
              <span className="px-4 py-1">{item.quantity}</span>
              <button
                onClick={() =>
                  dispatch(item.quantity < item.stock ? updateQuantity({ id: item.id, quantity: item.quantity + 1 }) : alert(`cannot buy more than ${item.stock}`))}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>

            <p className="w-20 text-right font-semibold">
              ₹{item.price * item.quantity}
            </p>

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-400 hover:text-red-600 text-xl"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Total & Checkout */}
      <div className="mt-8 bg-amber-50 p-6 rounded-xl">
        <div className="flex justify-between text-lg font-semibold text-gray-800">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="mt-4 w-full bg-amber-800 text-white py-3 rounded-lg hover:bg-amber-900 font-medium transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
export default Cart