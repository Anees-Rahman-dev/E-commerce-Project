import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrders, updateOrderStatus } from '../../redux/slices/orderSlice'

export default function ManageOrders() {

  const orders = useSelector((state) => state.orders.orders)

  const dispatch = useDispatch()

  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    dispatch(fetchAllOrders())
  }, [dispatch])
  
  return (
    <div className="min-h-screen bg-[#2b0b08] text-white p-8">

      <h1 className="text-3xl font-bold text-orange-400 mb-8">
        Manage Orders
      </h1>

      <div className="overflow-x-auto bg-[#3b140f] rounded-2xl p-6 shadow-lg">

        <table className="w-full border-collapse">

          <thead>
            <tr className="border-b border-gray-700 text-orange-300">

              <th className="p-4 text-left font-medium">Order Id</th>

              <th className="p-4 text-left font-medium">User name</th>

              <th className="p-4 text-left font-medium">Total</th>

              <th className="p-4 text-left font-medium">Date</th>

              <th className="p-4 text-left font-medium">Status</th>

            </tr>
          </thead>

          <tbody>

            {orders.map((or) => (

              <tr
                key={or.id}
                className="border-b border-gray-700 hover:bg-[#522019] transition"
              >

                <td className="p-4 text-sm font-bold">
                  {or.id}
                </td>

                <td className="p-4 text-sm font-bold">
                  {or.name.toUpperCase()}
                </td>

                <td className="p-4 font-semibold text-orange-400 font-bold">
                  ₹ {or.total}
                </td>

                <td className="p-4 text-sm text-gray-300 font-bold">
                  {or.date}
                </td>

                <td className="p-4 font-bold">

                  <select
                    value={or.status}
                    onChange={(e) =>
                      dispatch(
                        updateOrderStatus({
                          id: or.id,
                          status: e.target.value
                        })
                      )}
                    className="bg-[#2b0b08] border border-orange-500 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-orange-400">

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}
