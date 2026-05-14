// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logOut } from "../redux/slices/authSlices";

// export default function Navbar() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   const cartItems = useSelector((state) => state.cart.items);

//   const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   const handleLogout = () => {
//     dispatch(logOut());
//     navigate("/login");
//   };

//   return (
//     <nav className="
// fixed top-0 left-0 right-0 z-50
// bg-[#2A120B]/70
// backdrop-blur-xl
// border-b border-white/10
// text-white
// px-8 py-4
// ">
//     <div className="
// max-w-7xl mx-auto
// flex items-center justify-between
// bg-white/5
// border border-white/10
// rounded-full
// px-8 py-4
// shadow-[0_8px_30px_rgba(0,0,0,0.15)]
// backdrop-blur-2xl
// ">
//         {/* Brand Logo */}
//        <Link
//   to="/"
//   className="
//   text-4xl
//   md:text-5xl
//   font-[family-name:var(--font-luxury)]
//   tracking-[0.18em]
//   font-bold
//   text-transparent
//   bg-clip-text
//   bg-gradient-to-r
//   from-amber-100
//   via-amber-300
//   to-orange-500
//   hover:scale-105
//   transition-all
//   duration-300
//   drop-shadow-[0_2px_10px_rgba(251,191,36,0.25)]
//   "
// >
//   MalaBars
// </Link>

//         {/* Nav Links */}
// <div className="
// flex items-center gap-8
// text-sm
// font-[family-name:var(--font-poppins)]
// font-medium
// ">
//           <Link to="/" 
// className="relative hover:text-amber-300 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-amber-300 after:transition-all after:duration-300 hover:after:w-full">
//             Home
//           </Link>

//           {isAuthenticated && (
//             <>
//               <Link to="/wishlist" className="
// relative
// hover:text-amber-300
// transition-all
// duration-300
// after:absolute
// after:left-0
// after:-bottom-1
// after:w-0
// after:h-[1px]
// after:bg-amber-300
// after:transition-all
// after:duration-300
// hover:after:w-full
// ">
//                 Wishlist
//               </Link>
//               <Link to="/orders" className="
// relative
// hover:text-amber-300
// transition-all
// duration-300
// after:absolute
// after:left-0
// after:-bottom-1
// after:w-0
// after:h-[1px]
// after:bg-amber-300
// after:transition-all
// after:duration-300
// hover:after:w-full
// ">
//                 Orders
//               </Link>
//             </>
//           )}

//           {/* Cart */}
//          <Link
//   to="/cart"
//   className="
//   relative
//   text-2xl
//   hover:scale-110
//   transition-all
//   duration-300
//   "
// >
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </Link>

//           {/* Auth */}
//           {isAuthenticated ? (
//             <div className="flex items-center gap-3">
//               <span className="text-amber-200 text-sm">
//                 Hi, {user?.name?.split(" ")[0]}
//               </span>
//               <button
//                 onClick={handleLogout}
//                 className="bg-amber-700 hover:bg-amber-600 px-4 py-1.5 rounded-lg transition text-sm"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="flex gap-2">
//               <Link
//                 to="/login"
//                 className="bg-amber-700 hover:bg-amber-600 px-4 py-1.5 rounded-lg transition"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="bg-white text-amber-900 hover:bg-amber-100 px-4 py-1.5 rounded-lg transition"
//               >
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
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2A120B]/80 backdrop-blur-xl border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
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
    className="relative hover:text-amber-300 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-amber-300 after:transition-all after:duration-300 hover:after:w-full"
  >
    Home
  </Link>

  {isAuthenticated && (
    <>
      <Link
        to="/wishlist"
        className="relative hover:text-amber-300 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-amber-300 after:transition-all after:duration-300 hover:after:w-full"
      >
        Wishlist
      </Link>

      <Link
        to="/orders"
        className="relative hover:text-amber-300 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-amber-300 after:transition-all after:duration-300 hover:after:w-full"
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
        Hi, {user?.name || "User"}
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