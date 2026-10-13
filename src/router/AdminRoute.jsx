import React, { useEffect } from 'react'
import api from '../services/api'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

export default function AdminRoute({ children }) {

    const users = useSelector((state) => state.auth?.user)
   
    if (!users || users.role?.toLowerCase() !== 'admin') {
            toast.error('you are not an admin')
        }

    if(!users || users.role?.toLowerCase() !== 'admin'){

        return <Navigate to='/login' replace/>
    }
    return children
}
