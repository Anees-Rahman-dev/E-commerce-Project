
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logOut } from '../redux/slices/authSlices';
// import { clearCart } from '../redux/slices/cartSlice';

// export default function Navbar() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, user } = useSelector(s => s.auth);
//   const cartCount = useSelector(s =>
//     s.cart.items.reduce((sum, i) => sum + i.quantity, 0)
//   );

//   return (
//     <nav className="bg-[#3B1F0A] text-white px-4 md:px-8 py-4 shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         <Link to="/" className="text-xl md:text-2xl font-bold font-serif tracking-wide">
//            MalaBars
//         </Link>

//         <div className="flex items-center gap-3 md:gap-6 text-sm font-medium">
//           <Link to="/" className="hidden md:block hover:text-amber-200 transition">Home</Link>

//           {isAuthenticated && (
//             <>
//               <Link to="/wishlist" className="hidden md:block hover:text-amber-200 transition">Wishlist</Link>
//               <Link to="/orders" className="hidden md:block hover:text-amber-200 transition">Orders</Link>
//             </>
//           )}

//           <Link to="/cart" className="relative hover:text-amber-200 transition">
//             🛒
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
//                 {cartCount}
//               </span>
//             )}
//           </Link>

//           {isAuthenticated ? (
//             <div className="flex items-center gap-2 md:gap-3">
//               <span className="text-amber-200 text-sm hidden md:block">
//                 Hi, {user?.name?.split(' ')[0].toUpperCase()}
//               </span>
//               <button onClick={() => { dispatch(logOut()); dispatch(clearCart()); navigate('/login'); }}
//                 className="bg-amber-700 hover:bg-amber-600 px-3 md:px-4 py-1.5 rounded-lg transition text-sm">
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="flex gap-2">
//               <Link to="/login" className="bg-amber-700 hover:bg-amber-600 px-3 md:px-4 py-1.5 rounded-lg transition">
//                 Login
//               </Link>
//               <Link to="/register" className="bg-white text-amber-900 hover:bg-amber-100 px-3 md:px-4 py-1.5 rounded-lg transition">
//                 Register
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }



import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logOut } from "../redux/slices/authSlices";
import { clearCart } from "../redux/slices/cartSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(clearCart())
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2A120B]/80 backdrop-blur-xl border-b border-white/10 text-white py-5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-0.8">
        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-full px-5 md:px-8 py-4 shadow-lg">
          
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="text-3xl md:text-5xl font-[family-name:var(--font-luxury)] tracking-[0.12em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-orange-500"
          >
            MalaBars
          </Link>

          {/* Mobile button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
            className="md:hidden text-3xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* Desktop menu */}
         <div className="hidden md:flex items-center gap-8">

  <Link
    to="/"
    className="relative hover:text-amber-300 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-amber-300 after:transition-all after:duration-300 hover:after:w-full autour-one-regular"
  >
    Home
  </Link>

  {isAuthenticated && (
    <>
      <Link
        to="/wishlist"
        className="relative hover:text-amber-300 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-amber-300 after:transition-all after:duration-300 hover:after:w-full smooch-sans-headers "
      >
        Wishlist
      </Link>

      <Link
        to="/orders"
        className="relative hover:text-amber-300 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-amber-300 after:transition-all after:duration-300 hover:after:w-full wire-one-regular"
      >
        Orders
      </Link>
    </>
  )}

  {/* Cart */}
  <Link
    to="/cart"
    className="relative text-2xl hover:scale-110 transition"
  >
    🛒

    {cartCount > 0 && (
      <span className="absolute -top-2 -right-3 bg-orange-500 text-xs px-2 py-0.5 rounded-full">
        {cartCount}
      </span>
    )}
  </Link>

  {isAuthenticated ? (
    <div className="flex items-center gap-4">
      <span className="text-sm opacity-80">
        Hi, {user?.name.toUpperCase() || "User"}
      </span>

      <button
        onClick={handleLogout}
        className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full transition"
      >
        Logout
      </button>
    </div>
  ) : (
    <Link
      to="/login"
      className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-full transition"
    >
      Login
    </Link>
  )}
</div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-4 bg-[#2A120B] border border-white/10 rounded-3xl p-6 flex flex-col gap-5 shadow-2xl">
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>

            {isAuthenticated && (
              <>
                <Link to="/wishlist" onClick={closeMenu}>
                  Wishlist
                </Link>

                <Link to="/orders" onClick={closeMenu}>
                  Orders
                </Link>
              </>
            )}

            <Link
              to="/cart"
              onClick={closeMenu}
              className="flex items-center gap-2"
            >
              🛒 Cart ({cartCount})
            </Link>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-orange-500 py-3 rounded-full"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="bg-orange-500 py-3 rounded-full text-center"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}