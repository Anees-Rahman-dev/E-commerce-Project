import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Mail, User, ShieldCheck, MapPin, Pencil } from 'lucide-react'

export default function UserDetails() {

  const user = useSelector((state) => state.auth.user)

  const [editing, setEditing] = useState(false)

  const [address, setAddress] = useState(
    user?.address || {
      street: '',
      city: '',
      state: '',
      pincode: '',
    }
  )

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    console.log(address)

    // dispatch update address here

    setEditing(false)
  }
//w-24
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-6 mt-12">

      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* TOP COVER */}
        <div className="h-16 bg-gradient-to-r from-amber-500 to-orange-600 relative">

          {/* PROFILE IMAGE */}
          <div className="absolute left-1/2 -bottom-14 transform -translate-x-1/2">

            <div className="w-20 h-20 rounded-full bg-white shadow-xl border-4 border-white flex items-center justify-center text-5xl font-bold text-amber-600 uppercase">
              {user?.name?.charAt(0)}
            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div className="pt-20 pb-10 px-6">

          {/* USER INFO */}
          <div className="text-center mb-6">

            <h1 className="text-3xl font-bold text-gray-800">
              {user?.name.toUpperCase()}
            </h1>

            <p className="text-gray-500 mt-1">
              Customer Account
            </p>

          </div>

          {/* DETAILS */}
          <div className="grid md:grid-cols-2 gap-5">

            <div className="flex items-center gap-4 bg-amber-50 p-4 rounded-2xl">
              <div className="bg-amber-500 p-3 rounded-full text-white">
                <User size={20} />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Full Name
                </p>

                <h2 className="font-semibold text-gray-800">
                  {user?.name}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-amber-50 p-4 rounded-2xl">
              <div className="bg-orange-500 p-3 rounded-full text-white">
                <Mail size={20} />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email Address
                </p>

                <h2 className="font-semibold text-gray-800">
                  {user?.email}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-amber-50 p-4 rounded-2xl md:col-span-2">
              <div className="bg-yellow-500 p-3 rounded-full text-white">
                <ShieldCheck size={20} />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Account Role
                </p>

                <h2 className="font-semibold text-gray-800 capitalize">
                  {user?.role}
                </h2>
              </div>
            </div>

          </div>

          {/* ADDRESS SECTION */}
          <div className="mt-10 bg-orange-50 rounded-3xl p-6 border border-orange-100">

            <div className="flex items-center justify-between mb-6">

              <div className="flex items-center gap-3">
                <div className="bg-orange-500 p-3 rounded-full text-white">
                  <MapPin size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Delivery Address
                  </h2>

                  <p className="text-sm text-gray-500">
                    Manage your current address
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditing(!editing)}
                className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full transition"
              >
                <Pencil size={18} />
              </button>

            </div>

            {!editing ? (

              <div className="space-y-2 text-gray-700">

                <p>
                  <span className="font-semibold">Street:</span>{' '}
                  {address.street || 'Not added'}
                </p>

                <p>
                  <span className="font-semibold">City:</span>{' '}
                  {address.city || 'Not added'}
                </p>

                <p>
                  <span className="font-semibold">State:</span>{' '}
                  {address.state || 'Not added'}
                </p>

                <p>
                  <span className="font-semibold">Pincode:</span>{' '}
                  {address.pincode || 'Not added'}
                </p>

              </div>

            ) : (

              <div className="space-y-4">

                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={address.street}
                  onChange={handleChange}
                  className="w-full border border-orange-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-400"
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={handleChange}
                  className="w-full border border-orange-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-400"
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={address.state}
                  onChange={handleChange}
                  className="w-full border border-orange-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-400"
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={address.pincode}
                  onChange={handleChange}
                  className="w-full border border-orange-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-400"
                />

                <button
                  onClick={handleSave}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-2xl font-semibold transition"
                >
                  Save Address
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  )
}