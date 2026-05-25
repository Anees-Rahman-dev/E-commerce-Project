import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blockUser, fetchAllUsers, unBlockUser } from '../../redux/slices/userSlice'
import api from '../../services/api'

export default function ManageUsers() {

  const users = useSelector((state) => state.users.users)
  const usersOnly = users.filter((us) => us.role === "user")
  const dispatch = useDispatch()
  // const [isblock, setIsBlock] = useState(false)
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

        <p className="text-gray-300 mt-2">
          Block or unblock users
        </p>
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
                    className={`
                       px-4 py-2 rounded-lg font-medium text-white
                       transition-all duration-300 ease-in-out
                       transform hover:scale-105 active:scale-95
                       ${user.isBlocked
                       ? 'bg-green-500 hover:bg-green-600'
                       : 'bg-red-500 hover:bg-red-600'}`}
                  >
                    {user.isBlocked ? 'UnBlock' : 'Block'}
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
