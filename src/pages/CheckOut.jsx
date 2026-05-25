import React, { useState } from 'react'
import { PlaceNewOrder } from '../services/OrderService';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CheckOut() {

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.cart);
  // console.log(items)
  const { user } = useSelector((state) => state.auth);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: ''
  })
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !address.street ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    try {
      const createdOrder = await PlaceNewOrder({
        userId: user.id,
        items: items.map((i) => ({
          productId: i.id,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
        total,
        address: `${address.street}, ${address.city}, ${address.state}, ${address.pincode}`,
        status: "placed",
        date: new Date().toISOString(),
      });
      dispatch(clearCart());
      navigate("/order-success", { state: { order: createdOrder } });
    } catch (err) {
      toast.error("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (items.length === 0) {
    navigate("/order-success", { state: { order: createdOrder } })
    return null
  }

  return (
    <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-10 pt-30">
      {/* Address Form */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Address</h2>
        <div className="space-y-4">
          {["street", "city", "state", "pincode"].map((field) => (
            <input
              key={field}
              name={field}
              value={address[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
        <div className="bg-amber-50 rounded-xl p-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name} × {item.quantity}</span>
              <span className="font-medium">₹{item.price * item.quantity}</span>
            </div>
          ))}
          <hr className="border-amber-200" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full bg-amber-800 text-white py-3 rounded-lg hover:bg-amber-900 font-medium transition disabled:opacity-60"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

