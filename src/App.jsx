import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import UserLayout from './layouts/UserLayout'
import ProductDetails from './pages/ProductDetails'
import Register from './pages/Register'
import ProtectedRoute from './router/ProtectedRoute'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import WishList from './pages/WishList'
import CheckOut from './pages/CheckOut'
import OrderSuccess from './pages/OrderSuccess'
import AdminRoute from './router/AdminRoute'
import DashBoard from './pages/admin/DashBoard'
import ManageOrders from './pages/admin/ManageOrders'
import ManageProducts from './pages/admin/ManageProducts'
import ManageUsers from './pages/admin/ManageUsers'
import AdminLayout from './layouts/AdminLayout'

function App() {
  return (

    <Routes>
      <Route element={<UserLayout />} >
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path='/wishlist' element={<ProtectedRoute><WishList /></ProtectedRoute>} />
        <Route path='/checkout' element={<ProtectedRoute><CheckOut /></ProtectedRoute>} />
        <Route path='/order-success' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path='/dashboard' element={<AdminRoute><DashBoard /></AdminRoute>} />
        <Route path='/ManageOrders' element={<AdminRoute><ManageOrders /></AdminRoute>} />
        <Route path='/manageProducts' element={<AdminRoute><ManageProducts /></AdminRoute>} />
        <Route path='/manageUsers' element={<AdminRoute><ManageUsers /></AdminRoute>} />
      </Route>
    </Routes>

  )
}
export default App