// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux'


// export default function DashBoard() {

//     const totalProducts  = useSelector((state) => state.products.items.length)
//     const totalUsers  = useSelector((state) => state.auth.user.length)
//     const totalOrders  = useSelector((state) => state.orders.orders.length)
//     const totalRevenue = useSelector((state) => 
//     state.orders.orders.reduce(
//         (sum,or) => sum + or.total,0));

//     const handleAdd = (e) => {

//     }
//     const deleteBtn = () => {
//         dispatch(deleteProduct(products.id))
//     }
//     return (
//         <div>

//       <div>
//         <h2>Total Products</h2>
//         <p>{totalProducts}</p>
//       </div>
// <br />
//       <div>
//         <h2>Total Orders</h2>
//         <p>{totalOrders}</p>
//       </div>
// <br />
//       <div>
//         <h2>Total Users</h2>
//         <p>{totalUsers}</p>
//       </div>
// <br />
//       <div>
//         <h2>Total Revenue</h2>
//         <p>₹ {totalRevenue}</p>
//       </div>

//     </div>
//     )
// }

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/slices/productSlice'
import { fetchAllUsers } from '../../redux/slices/userSlice'
import { fetchAllOrders } from '../../redux/slices/orderSlice'


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts'

export default function DashBoard() {

  const products = useSelector((state) => state.products.items)
  const users = useSelector((state) => state.users.users)
  const orders = useSelector((state) => state.orders.orders)

  const totalProducts = products.length
  const totalUsers = users.length
  const totalOrders = orders.length

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  )

  const dispatch = useDispatch()

useEffect(() => {
  dispatch(fetchProducts())
  dispatch(fetchAllUsers())
  dispatch(fetchAllOrders())
}, [dispatch])

  // BAR GRAPH
  const summaryData = [
    { name: 'Products', value: totalProducts },
    { name: 'Users', value: totalUsers },
    { name: 'Orders', value: totalOrders },
  ]

  // PIE CHART
  const pieData = [
    { name: 'Revenue', value: totalRevenue },
    { name: 'Orders', value: totalOrders * 100 },
  ]

  // LINE GRAPH
  const revenueData = orders.map((order, index) => ({
    name: `Order ${index + 1}`,
    revenue: order.total,
  }))

  const COLORS = ['#f97316', '#fb923c']

  return (
    <div className="min-h-screen bg-[#2b0b08] text-white p-6">

      <h1 className="text-3xl font-bold text-orange-400 mb-8">
        Dashboard
      </h1>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-[#3b140f] p-6 rounded-2xl">
          <h2 className="text-gray-300">Products</h2>
          <p className="text-3xl font-bold text-orange-400">
            {totalProducts}
          </p>
        </div>

        <div className="bg-[#3b140f] p-6 rounded-2xl">
          <h2 className="text-gray-300">Users</h2>
          <p className="text-3xl font-bold text-orange-400">
            {totalUsers}
          </p>
        </div>

        <div className="bg-[#3b140f] p-6 rounded-2xl">
          <h2 className="text-gray-300">Orders</h2>
          <p className="text-3xl font-bold text-orange-400">
            {totalOrders}
          </p>
        </div>

        <div className="bg-[#3b140f] p-6 rounded-2xl">
          <h2 className="text-gray-300">Revenue</h2>
          <p className="text-3xl font-bold text-orange-400">
            ₹ {totalRevenue}
          </p>
        </div>

      </div>

     {/* CHARTS */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

  {/* BAR CHART */}
  <div className="bg-[#3b140f] rounded-2xl p-5 h-[380px]">

    <h2 className="text-xl font-bold text-orange-300 mb-6">
      Store Summary
    </h2>

    <ResponsiveContainer width="100%" height="85%">
      <BarChart data={summaryData}>

        <XAxis dataKey="name" stroke="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip />

        <Bar
          dataKey="value"
          fill="#f97316"
          radius={[8, 8, 0, 0]}
        />

      </BarChart>
    </ResponsiveContainer>

  </div>

  {/* PIE CHART */}
  <div className="bg-[#3b140f] rounded-2xl p-5 h-[380px]">

    <h2 className="text-xl font-bold text-orange-300 mb-6">
      Revenue Overview
    </h2>

    <ResponsiveContainer width="100%" height="85%">
      <PieChart>

        <Pie
          data={pieData}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {pieData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />

      </PieChart>
    </ResponsiveContainer>

  </div>

</div>

{/* LINE CHART */}
<div className="bg-[#3b140f] rounded-2xl p-5 h-[400px] mt-8">

  <h2 className="text-xl font-bold text-orange-300 mb-6">
    Revenue Trend
  </h2>

  <ResponsiveContainer width="100%" height="85%">

    <LineChart data={revenueData}>

      <XAxis dataKey="name" stroke="#fff" />
      <YAxis stroke="#fff" />
      <Tooltip />

      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#f97316"
        strokeWidth={4}
      />

    </LineChart>

  </ResponsiveContainer>

</div>
    </div>
  )
}