import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blockUser, fetchAllUsers, unBlockUser } from '../../redux/slices/userSlice'
import api from '../../services/api'

export default function ManageUsers() {

  const users = useSelector((state) => state.users.users)
  const usersOnly = users.filter((us) => us.role === "user")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])
  // console.log(users)

  const handleBtn = (user) => {
    // console.log(userStatus)
    if (user.isBlocked) {
      dispatch(unBlockUser(user.id))
    } else {
      dispatch(blockUser(user.id))
    }
  }
  return (
    <div className="min-h-screen bg-[#2b0b08] text-white p-8">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-orange-400">
          Manage Users
        </h1>

      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-[#3b140f] rounded-2xl shadow-lg p-4">

        <table className="w-full text-left">

          {/* Table Head */}
          <thead>

            <tr className="border-b border-gray-600 text-orange-300">

              <th className="p-4">Name</th>

              <th className="p-4">Email</th>

              <th className="p-4">Role</th>

              <th className="p-4">Status</th>

            </tr>

          </thead>

          {/* Table Body */}
          <tbody>

            {usersOnly.map((user) => (

              <tr
                key={user.id}
                className="border-b border-gray-700 hover:bg-[#522019] transition"
              >

                <td className="p-4 font-medium">
                  {user.name.toUpperCase()}
                </td>

                <td className="p-4 text-gray-300 font-bold">
                  {user.email}
                </td>

                <td className="p-4 font-bold" >
                  {user.role}
                </td>

                <td className="p-4">

<button
  onClick={() => handleBtn(user)}
  className={`relative px-2.5 py-2 rounded-full font-semibold
    transition-all duration-300 overflow-hidden
    shadow-lg hover:scale-105 active:scale-95

    ${user.isBlocked
      ? 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:shadow-amber-500/50'
      : 'bg-gradient-to-r from-rose-500 to-amber-600'}`}
>

  <span className="relative z-10 text-white">
    {user.isBlocked ? 'Unblock ' : 'Block User'}
  </span>

</button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}
