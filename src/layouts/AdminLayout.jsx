
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

import { logOut } from '../redux/slices/authSlices'

export default function AdminLayout() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [open, setOpen] = useState(true)

    const HandleLogin = () => {

        dispatch(logOut())

        navigate('/login')
    }

    return (

        <div className="min-h-screen flex bg-gray-100">

            {/* Sidebar */}
            <aside
                className={`
                    ${open ? 'w-64' : 'w-20'}
                    bg-gray-900 text-white p-5 transition-all duration-300`}
            >

                {/* Top */}
                <div className="flex items-center justify-between mb-8">

                    {open && (
                        <h1 className="text-2xl font-bold">
                            Admin Panel
                        </h1>
                    )}

                    <button
                        onClick={() => setOpen(!open)}
                        className="p-2 hover:bg-gray-800 rounded"
                    >
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>

                </div>

                {/* Nav */}
                <nav className="flex flex-col gap-4">

                    <Link
                        to="/dashboard"
                        className="hover:bg-gray-800 p-2 rounded"
                    >
                        {open ? 'Dashboard' : '📊'}
                    </Link>

                    <Link
                        to="/manageProducts"
                        className="hover:bg-gray-800 p-2 rounded"
                    >
                        {open ? 'Manage Products' : '📦'}
                    </Link>

                    <Link
                        to="/manageUsers"
                        className="hover:bg-gray-800 p-2 rounded"
                    >
                        {open ? 'Manage Users' : '👤'}
                    </Link>

                    <Link
                        to="/manageOrders"
                        className="hover:bg-gray-800 p-2 rounded"
                    >
                        {open ? 'Manage Orders' : '🛒'}
                    </Link>

                </nav>

                {/* Logout */}
                <button
                    onClick={HandleLogin}
                    className="mt-10 w-full py-2 rounded-full font-semibold text-white transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 bg-gradient-to-r from-amber-500 to-yellow-400 hover:shadow-amber-500/50"
                >
                    {open ? 'LogOut' : '🚪'}
                </button>

            </aside>

            {/* Main */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>

        </div>
    )
}