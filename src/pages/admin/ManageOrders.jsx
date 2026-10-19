
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllOrders,
  updateOrderStatus,
} from '../../redux/slices/orderSlice';

const formatDate = (value) => {
  if (!value) return 'N/A';

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? 'N/A'
    : date.toLocaleDateString('en-IN');
};

export default function ManageOrders() {
  const dispatch = useDispatch();

  const {
    orders,
    status,
    error,
    updatingOrderId,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

  return (
    <div className="min-h-screen bg-[#2b0b08] text-white p-8">
      <h1 className="text-3xl font-bold text-orange-400 mb-8">
        Manage Orders
      </h1>

      <div className="overflow-x-auto bg-[#3b140f] rounded-2xl p-6 shadow-lg">
        {status === 'loading' && (
          <p className="py-6 text-orange-300">Loading orders...</p>
        )}

        {status === 'failed' && (
          <p className="py-6 text-red-400">
            {error || 'Unable to load orders.'}
          </p>
        )}

        {status === 'succeeded' && orders.length === 0 && (
          <p className="py-6 text-gray-300">No orders found.</p>
        )}

        {orders.length > 0 && (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-700 text-orange-300">
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const orderId = order.orderId;
                const orderStatus = order.status || 'Pending';

                return (
                  <tr
                    key={orderId}
                    className="border-b border-gray-700 hover:bg-[#522019] transition"
                  >
                    <td className="p-4 font-bold">
                      #{orderId}
                    </td>

                    <td className="p-4">
                      {order.address?.fullName || 'Unknown'}
                    </td>

                    <td className="p-4 font-semibold text-orange-400">
                      ₹ {Number(order.totalAmount || 0).toLocaleString('en-IN')}
                    </td>

                    <td className="p-4 text-sm text-gray-300">
                      {formatDate(order.orderDate)}
                    </td>

                    <td className="p-4">
                      <select
                        value={orderStatus}
                        disabled={updatingOrderId === orderId}
                        onChange={(event) =>
                          handleStatusChange(orderId, event.target.value)
                        }
                        className="bg-[#2b0b08] border border-orange-500 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
                      >
                        {['Pending', 'Shipped', 'Delivered', 'Cancelled'].map(
                          (option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
