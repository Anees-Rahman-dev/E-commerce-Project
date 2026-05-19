import { useState } from "react";
import { useNavigate, Link, replace, Navigate } from "react-router-dom";
import { RegisterUser } from "../services/userService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
export default function Register() {

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth)

  if (isAuthenticated) {
    return <Navigate to='/'  />
  }
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (form.password !== confirm) {
      toast.error('password must match')
      setLoading(false)
      return
    } else {
      try {
        await RegisterUser({ ...form, role: "user" });
        navigate("/login");
      } catch {
        setError("Registration failed. Try again.");
      } finally {
        setLoading(false);
      }
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-amber-900 mb-2">Create Account 🍫</h1>
        <p className="text-sm text-gray-500 mb-6">Join us for the finest chocolates</p>

        {error && (
          <p className="bg-red-50 text-red-500 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            name="confirm password"
            type="password"
            placeholder="Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            autoComplete="new-password"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-800 text-white py-2 rounded-lg hover:bg-amber-900 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-700 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}