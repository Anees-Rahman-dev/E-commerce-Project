import React, { useEffect } from 'react'
import api from '../services/api'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

export default function AdminRoute({ children }) {

    const users = useSelector((state) => state.auth.user)
    useEffect(() => {
        if (!users || users.role !== 'admin') {
            toast.error('you are not an admin')
        }
    }, [users]);

    if(!users || users.role !== 'admin'){

        return <Navigate to='/login'  />
    }
    return children
}
