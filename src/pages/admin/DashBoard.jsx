import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'


export default function DashBoard() {

    const totalProducts  = useSelector((state) => state.products.items.length)
    const totalUsers  = useSelector((state) => state.auth.user.length)
    const totalOrders  = useSelector((state) => state.orders.orders.length)
    const totalRevenue = useSelector((state) => 
    state.orders.orders.reduce(
        (sum,or) => sum + or.total,0));

    const handleAdd = (e) => {

    }
    const deleteBtn = () => {
        dispatch(deleteProduct(products.id))
    }
    return (
        <div>

      <div>
        <h2>Total Products</h2>
        <p>{totalProducts}</p>
      </div>
<br />
      <div>
        <h2>Total Orders</h2>
        <p>{totalOrders}</p>
      </div>
<br />
      <div>
        <h2>Total Users</h2>
        <p>{totalUsers}</p>
      </div>
<br />
      <div>
        <h2>Total Revenue</h2>
        <p>₹ {totalRevenue}</p>
      </div>

    </div>
    )
}
