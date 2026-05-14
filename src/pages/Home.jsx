// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../redux/slices/ProductSlice";
// import ProductCard from "../components/ProductCard";

// const CATEGORIES = [
//   "All",
//   "Royal Collection", //"Velvet Crown","Malabar Dynasty", "Zamorin Gold","Cocoa Maharaja","Royalty"
//   "High Protein", //"FitFuel Chocolate" ,"PowerBite Elite" ,"Protein Forge 30g","Malabar Muscle Bar","Whey Nadu Crunch",
//   "Dark Collection", //"Malabar Dark", "Malabar Noir","Monsoon Dark","Coffee Coast Dark",  "Dark Velvet ",
//   "Nut Fusion", //"Hazel Royale","Coconut Silk Crunch", "Malabar Nut Royale", "Kerala Pistachio Melt","Golden Coconut Fusion"
// ];

// export default function Home() {
//   const dispatch = useDispatch();
//   const { items = [], status } = useSelector((state) => state.products);

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [sort, setSort] = useState("");

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const filtered = items
//     .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
//     .filter((p) => category === "All" || p.category === category)
//     .sort((a, b) => {
//       if (sort === "low") return a.price - b.price;
//       if (sort === "high") return b.price - a.price;
//       return 0;
//     });

//   return (
//     <div className="p-6">
//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search chocolates..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border px-4 py-2 rounded-lg w-64"
//         />
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border px-4 py-2 rounded-lg"
//         >
//           {CATEGORIES.map((c) => (
//             <option key={c}>{c}</option>
//           ))}
//         </select>
//         <select
//           value={sort}
//           onChange={(e) => setSort(e.target.value)}
//           className="border px-4 py-2 rounded-lg"
//         >
//           <option value="">Sort by Price</option>
//           <option value="low">Price: Low → High</option>
//           <option value="high">Price: High → Low</option>
//         </select>
//       </div>

//       {/* Loading State */}
//       {status === "loading" && (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {Array(8).fill(0).map((_, i) => (
//             <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
//           ))}
//         </div>
//       )}

//       {/* Empty State */}
//       {status === "succeeded" && filtered.length === 0 && (
//         <div className="text-center py-20 text-gray-500">
//           <p className="text-5xl mb-4">🍫</p>
//           <p className="text-xl font-medium">No chocolates found</p>
//           <p className="text-sm mt-1">Try a different search or category</p>
//         </div>
//       )}

//       {/* Product Grid */}
//       {status === "succeeded" && filtered.length > 0 && (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filtered.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       )}

//       {/* Error State */}
//       {status === "failed" && (
//         <p className="text-center text-red-500 mt-10">
//           Failed to load products. Is JSON Server running?
//         </p>
//       )}
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import BounceCards from "../components/BounceCards";


const CATEGORIES = ["All", "Dark", "Royal Collection", "High Protein", "Nut Fusion"];

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  // const CurrentRef = useRef()
  
  const { items = [], status } = useSelector((state) => state.products);
  const itemsClone = [...items]
  const filtered = itemsClone
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => category === "All" || p.category === category)
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  const bestSellers = items.filter((p) => p.rating >= 4.8).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      <path />
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1A0B05] via-[#2A120B] to-[#4A2006] text-white">


        <div className="max-w-7xl mx-auto px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-lg z-10">
            <p className="text-amber-400 uppercase tracking-widest text-sm font-medium mb-3">
              Premium Kerala Chocolate
            </p>
            <h1 className="text-6xl md:text-8xl mt-10 font-black leading-[0.95] tracking-tight font-serif">
              Chocolate is <br />
              <span className="text-transparent mb-10 bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500 text-6xl font-bold">
                Happiness
              </span>
            </h1 >
            <br />

            <p className="text-amber-100 text-lg mb-8 leading-relaxed">
              Handcrafted with the finest cocoa from the heart of Kerala.
              Every bar tells a story of tradition and indulgence.
            </p>
            <button
              onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}
              className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg"
            >
              Shop Now
            </button>
          </div>


          {/* Hero Image */}
          {/* Floating badge */}
          <BounceCards
            images={[
              "/malabardark.jpeg",
              "/royalty.jpeg",
              "/monsoondark.jpeg",
              "/cocoamaharaja.jpeg",
              "/zamoringold.jpeg",
            ]}
            containerWidth={420}
            containerHeight={380}
            animationDelay={0.3}
            animationDuration={0.6}
            easingValues={[0.175, 0.885, 0.32, 1.275]}
            transformStyles={[
              { rotate: "-15deg", top: "10%", left: "0%" },
              { rotate: "5deg", top: "0%", left: "30%" },
              { rotate: "-5deg", top: "20%", left: "55%" },
              { rotate: "10deg", top: "45%", left: "10%" },
              { rotate: "-8deg", top: "40%", left: "40%" },
            ]}
          />

        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 C360,60 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FDF6EC" />
          </svg>
        </div>
      </section>

      {/* Wave between hero and banner */}
      <div className="bg-amber-800 -mt-1">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C360,0 1080,60 1440,20 L1440,0 L0,0 Z" fill="#FDF6EC" />
        </svg>
      </div>



      {/* ── TAGLINE BANNER ── */}
      <section className="bg-amber-800 text-white py-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold font-serif mb-3">
              Chocolate is Like a Hug From the Inside
            </h2>
            <p className="text-amber-200 leading-relaxed">
              Our chocolates are crafted using single-origin cocoa sourced directly
              from Kerala farms. Rich in antioxidants, bold in flavor, and pure in
              every bite — MalaBars is chocolate the way it was meant to be.
            </p>
            <button
              onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}
              className="mt-5 border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-amber-800 transition font-medium"
            >
              Explore More
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="/malabardark.jpeg"
              alt="Malabar Dark Chocolate"
              className="w-64 h-auto aspect-[2/3] object-fill rounded-2xl shadow-xl 
             hover:scale-105 hover:-rotate-1 transition-all duration-500 
             drop-shadow-[0_20px_50px_rgba(59,31,10,0.3)]"
            />
          </div>
        </div>
      </section>


      {/* ── BEST SELLERS ── */}
      {bestSellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-8 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold font-serif text-[#3B1F0A]">
              Best Selling Products
            </h2>
            <button
              onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}
              className="text-amber-800 hover:underline font-medium text-sm"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ── SECOND BANNER ── */}
      <section className="bg-[#3B1F0A] text-white py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <img
            src="/royalty.jpeg"
            alt="Premium"
            className="w-64 h-auto aspect-[2/3] object-fill rounded-2xl shadow-xl 
             hover:scale-105 hover:-rotate-1 transition-all duration-500 
             drop-shadow-[0_20px_50px_rgba(59,31,10,0.3)]"
          />
          <div >
            <h2 className="text-3xl font-bold font-serif mb-3">
              Anything is Good Made of Chocolate
            </h2>
            <p className="text-amber-200 mb-5 leading-relaxed">
              From our Royal Collection to High Protein bars — every MalaBar is
              crafted with passion, precision, and the finest ingredients Kerala
              has to offer.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}
                className="bg-amber-500 hover:bg-amber-400 text-white px-6 py-2 rounded-full font-medium transition"
              >
                Buy Now
              </button>
              <button
                onClick={() => navigate("/orders")}
                className="border border-amber-400 text-amber-400 hover:bg-amber-900 px-6 py-2 rounded-full font-medium transition"
              >
                View Orders
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL PRODUCTS ── */}
      <section id="products" className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-bold font-serif text-[#3B1F0A] mb-8">
          Our Collection
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <input
            type="text"
            placeholder="Search chocolates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-amber-200 px-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
          />
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${category === c
                  ? "bg-amber-800 text-white"
                  : "bg-white border border-amber-300 text-amber-800 hover:bg-amber-50"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-amber-200 px-4 py-2 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="">Sort by Price</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>

        {/* Loading Skeletons */}
        {status === "loading" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="h-72 bg-amber-100 animate-pulse rounded-2xl" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {status === "succeeded" && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-5xl mb-4">🍫</p>
            <p className="text-xl font-medium">No chocolates found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        )}

        {/* Product Grid */}
        {status === "succeeded" && filtered.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* {status === "failed" && <p>Failed to Load</p>} */}
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#3B1F0A] text-amber-200 py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-xl font-serif mb-3">MalaBars</h3>
            <p className="text-sm leading-relaxed">
              Craft the passion of chocolate. Share with your friends and family.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Dark Chocolate</li>
              <li className="hover:text-white cursor-pointer">Royal Collection</li>
              <li className="hover:text-white cursor-pointer">High Protein</li>
              <li className="hover:text-white cursor-pointer">Nut Fusion</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Account</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer" onClick={()=>navigate(`login`)} >Login</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>navigate(`register`)}>Register</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>navigate(`orders`)}> My Orders</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>navigate(`wishlist`)}>Wishlist</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Kerala, India</h4>
            <ul className="space-y-2 text-sm">
              <li>🍫 Premium Cocoa</li>
              <li>🌿 Natural Ingredients</li>
              <li>📦 Pan India Delivery</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-amber-800 text-center text-sm">
          © 2026 MalaBars. All rights reserved.
        </div>
      </footer>

    </div>
  );
}