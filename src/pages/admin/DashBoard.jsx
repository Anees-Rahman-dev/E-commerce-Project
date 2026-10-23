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
  // console.log(totalProducts)
  const totalUsers = users.length
  const totalOrders = orders.length

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.totalAmount  || 0),0)
// console.log(totalRevenue);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchAllUsers())
    dispatch(fetchAllOrders())
    
  }, [dispatch])

  
  // MONTHS
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  // MONTHLY REVENUE
  const monthlyRevenue = months.map((month) => ({
    name: month,
    revenue: 0,
  }));

  orders.forEach((order) => {
    if (!order.orderDate) return;

    const date = new Date(order.orderDate);

    if (Number.isNaN(date.getTime())) return;

    const monthIndex = date.getMonth();

    monthlyRevenue[monthIndex].revenue += Number(
      order.totalAmount ?? 0
    );
  });

  // BAR CHART DATA
  const summaryData = [
    { name: 'Products', value: totalProducts },
    { name: 'Users', value: totalUsers },
    { name: 'Orders', value: totalOrders },
  ];

  // PIE CHART: REVENUE BY MONTH
  const pieData = monthlyRevenue.filter(
    (month) => month.revenue > 0
  );

  // LINE CHART: MONTHLY REVENUE
  const revenueData = monthlyRevenue;

  const COLORS = ['#f97316', '#fb923c'];


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
                radius={[4, 50, 0, 0]}
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
  dataKey="revenue"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={100}
  label={({ name }) => name}
>
  {pieData.map((entry, index) => (
    <Cell
      key={entry.name}
      fill={COLORS[index % COLORS.length]}
    />
  ))}
</Pie>

<Tooltip
  formatter={(value) => [
    `₹${Number(value).toLocaleString('en-IN')}`,
    'Revenue',
  ]}
/>


              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* LINE CHART */}
      <div className="bg-[#3b140f] rounded-2xl p-5 h-[400px] mt-8">

        <h2 className="text-xl font-bold text-orange-300 mb-6">
         Revenue Growth
        </h2>

        <ResponsiveContainer width="100%" height="85%">

         
<LineChart data={revenueData}>
  <XAxis dataKey="name" stroke="#fff" />

  <YAxis
    stroke="#fff"
    tickFormatter={(value) =>
      `₹${Number(value).toLocaleString('en-IN')}`
    }
  />

  <Tooltip
    formatter={(value) => [
      `₹${Number(value).toLocaleString('en-IN')}`,
      'Revenue',
    ]}
  />

  <Line
    type="monotone"
    dataKey="revenue"
    name="Monthly Revenue"
    stroke="#f97316"
    strokeWidth={4}
    dot={{ r: 4 }}
    activeDot={{ r: 7 }}
  />
</LineChart>


        </ResponsiveContainer>

      </div>
    </div>
  )
}