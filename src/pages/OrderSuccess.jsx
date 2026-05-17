import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate('/orders');
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 pt-30">
      <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-gray-900">Order Placed Successfully!</h1>
        <p className="mt-2 text-gray-600">Thank you for your purchase. Your order has been placed.</p>

        <div className="mt-8 bg-amber-50 rounded-2xl p-6 text-left">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="font-semibold">#{order.id}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500">Order Date</p>
            <p className="font-semibold">{new Date(order.date).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500">Delivery Address</p>
            <p className="font-semibold">{order.address}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500">Total Paid</p>
            <p className="font-semibold">₹{order.total}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3 text-left">
          <h2 className="text-xl font-semibold text-gray-800">Ordered Items</h2>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.productId} className="flex justify-between rounded-xl bg-white p-4 border border-amber-100">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-full bg-amber-800 text-white font-medium hover:bg-amber-900"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/orders')}
            className="px-6 py-3 rounded-full border border-amber-800 text-amber-800 font-medium hover:bg-amber-50"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
}
