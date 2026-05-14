// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { useNavigate, Link } from 'react-router-dom'
// import { LoginUser } from '../services/userService'
// import { loginSuccess } from '../redux/slices/authSlices'
// import { Eye, EyeOff } from 'lucide-react'

// export default function Login() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   };
//   const [form, setForm] = useState({
//     email: '',
//     password: ''
//   })
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const users = await LoginUser(form.email.trim(), form.password.trim());
//       if (!users || users.length === 0) {
//         setError("Invalid email or password.");
//         return;
//       }
//       dispatch(loginSuccess(users[0]));
//       navigate('/');
//     } catch (err) {
//       setError("Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleShow = (e) => {
//     e.preventDefault()
//     setShowPassword(!showPassword)
//   }
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-amber-50">
//       <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
//         <h1 className="text-2xl font-bold text-amber-900 mb-2">Welcome Back 🍫</h1>
//         <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>

//         {error && (
//           <p className="bg-red-50 text-red-500 text-sm px-4 py-2 rounded-lg mb-4">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input name="email" type="email" placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
//           />

//           <div className="relative">
//             <input
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="w-full border px-4 py-2 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
//             />

//             <button
//               type="button"
//               onClick={handleShow}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           <button type="submit" disabled={loading}
//             className="w-full bg-amber-800 text-white py-2 rounded-lg hover:bg-amber-900 transition disabled:opacity-60"
//           >
//             {loading ? "Signing in..." : "Login"}
//           </button>
//         </form>

//         <p className="text-sm text-center text-gray-500 mt-4">
//           Don't have an account?{" "}
//           <Link to="/register" className="text-amber-700 hover:underline font-medium">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { LoginUser } from '../services/userService';
import { loginSuccess } from '../redux/slices/authSlices';
import { Eye, EyeOff, User } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if(!form.email.trim() || !form.password.trim()){
    
     alert('fill all the fields')
    }
    try {
      const users = await LoginUser(form.email.trim(), form.password.trim());
       console.log(users)
      if (!users || users.length === 0) {
        setError("Invalid email or password.");
        return;
      }
      dispatch(loginSuccess(users[0]));
      navigate('/');
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-amber-900 mb-2">Welcome Back 🍫</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>

        {error && (
          <p className="bg-red-50 text-red-500 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="off"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full border px-4 py-2 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-800 text-white py-2 rounded-lg hover:bg-amber-900 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-amber-700 hover:underline font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}