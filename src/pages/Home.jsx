

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import BounceCards from "../components/BounceCards";
import DrawOutlineButton from "../components/HoverButton";
import Tilt from 'react-parallax-tilt'
import toast from "react-hot-toast";

const CATEGORIES = ["All", "Dark", "Royal Collection", "High Protein", "Nut Fusion"];



export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  const { items, status } = useSelector((state) => state.products);
  // console.log(items)
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if(user && user.role === 'admin'){
      toast.error('admin cannot be in home')
      navigate('/dashboard')
    }
  },[user,navigate])

  // console.log("items:", items)
  const safeItems = Array.isArray(items) ? items : [];
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filtered = useMemo(() => {
    return [...safeItems] //bc sort mutates the og
      .filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => category === "All" || p.category === category)
      .sort((a, b) => {
        if (sort === "low") return a.price - b.price;
        if (sort === "high") return b.price - a.price;
        return 0;
      });
  }, [safeItems, search, category, sort]);
  // console.log(safeItems)
  const bestSellers = useMemo(() =>
    safeItems.filter((p) => p.rating >= 4.8).slice(0, 3),
    [safeItems]);

  return (
    <div className="min-h-screen bg-[#FDF6EC]">

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1A0B05] via-[#2A120B] to-[#4A2006] text-white ">
        <div className="max-w-7xl mx-auto px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-lg z-10">
            <p className="text-amber-400 uppercase tracking-widest text-sm font-medium mb-3 pt-12 cousine-bold">
              Premium Kerala Chocolate
            </p>
            <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tight font-serif mt-6 bungee-shade-regular">
              Chocolate is <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500  bungee-shade-regular">
                Happiness
              </span>
            </h1>
            <p className="text-amber-100 text-lg mt-6 mb-8 leading-relaxed carrois-gothic-sc-regular-italic">
              Handcrafted with the finest cocoa from the heart of Kerala.
              Every bar tells a story of tradition and indulgence.
            </p>
            <DrawOutlineButton
              onClick={() =>
                document
                  .getElementById("products")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="bg-amber-500 hover:bg-amber-400 text-white shadow-xl"
            >
              Shop Now
            </DrawOutlineButton>
          </div>

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
        <div className="relative -mt-1 overflow-hidden leading-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="block w-full h-[80px]"
          >
            <path
              d="M0,64L80,69.3C160,75,320,85,480,85.3C640,85,800,75,960,69.3C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              fill="#f5f5f4"
            />
          </svg>
        </div>
      </section>


    <section
  className="
    relative overflow-hidden
    bg-gradient-to-br
    from-[#2b0d00]
    via-[#8B3A00]
    to-[#120701]
    text-white
    pt-12 pb-16 px-10"
>
  {/* TOP WAVE */}
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
    <svg
      className="relative block w-full h-[120px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill="#FDF6EC"
        fillOpacity="1"
        d="M0,96L80,90.7C160,85,320,75,480,80C640,85,800,107,960,112C1120,117,1280,107,1360,101.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      />
    </svg>
  </div>

  {/* Ambient Glow */}
  <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400/10 blur-3xl rounded-full" />
  <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-orange-500/10 blur-3xl rounded-full" />

  <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16 relative z-10">

    {/* TEXT */}
    <div className="flex-1 max-w-2xl">

      <span
        className="
          inline-block mb-5
          text-amber-300
          uppercase tracking-[0.3em]
          text-xs md:text-sm
          font-semibold
        "
      >
        Crafted In Kerala
      </span>

      <h2
        className="
          text-5xl md:text-7xl
          leading-tight
          cousine-bold
        "
      >
        Chocolate Is Like
        <span className="block text-amber-300">
          A Hug From Inside
        </span>
      </h2>

      <p
        className="
          mt-6
          text-lg md:text-xl
          leading-relaxed
          text-amber-50/90
          max-w-xl
          carrois-gothic-sc-regular-italic
        "
      >
        Our chocolates are crafted using single-origin cocoa
        sourced directly from Kerala farms. Rich in antioxidants,
        bold in flavor, and pure in every bite — MalaBars is
        chocolate the way it was meant to be.
      </p>

      <div className="mt-8">
        <DrawOutlineButton
          onClick={() =>
            document
              .getElementById("products")
              .scrollIntoView({ behavior: "smooth" })
          }
          className="
            bg-amber-400
            text-black
            px-7 py-3
            font-semibold
            shadow-2xl
            hover:bg-white
            hover:text-black
          "
        >
          Explore More
        </DrawOutlineButton>
      </div>
    </div>

    {/* IMAGE */}
    <div className="flex-1 flex justify-center relative">

      {/* Glow */}
      <div
        className="
          absolute
          w-80 h-80
          bg-amber-400/20
          blur-3xl
          rounded-full
        "
      />

      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        perspective={1000}
        scale={1.05}
        transitionSpeed={500}
        glareEnable={true}
        glareMaxOpacity={0.25}
        glareColor="#ffffff"
        glarePosition="all"
        className="relative z-10"
      >
        <div
          className="
            relative overflow-hidden
            rounded-[2rem]
            border border-white/10
            bg-white/5
            backdrop-blur-md
            shadow-[0_20px_80px_rgba(0,0,0,0.55)]
          "
        >
          <img
            src="/malabardark.jpeg"
            alt="Malabar Dark Chocolate"
            className="
              w-72 md:w-80
              aspect-[2/3]
              object-cover
            "
          />

          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-black/40
              via-transparent
              to-transparent
            "
          />
        </div>
      </Tilt>
    </div>
  </div>
</section>


      {/* ── BEST SELLERS ── */}
      {bestSellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-8 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold font-serif text-[#3B1F0A] noto-serif">
              Best Selling Products
            </h2>
            <DrawOutlineButton
              onClick={() =>
                document
                  .getElementById("products")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="
  text-amber-800
  px-4 py-2
  text-sm
  font-medium
  rounded-full
  border border-amber-800/70
  bg-transparent
  transition-all duration-300

  hover:bg-amber-800
  hover:text-white
  hover:border-amber-800
  hover:shadow-lg
"
            >
              View All →
            </DrawOutlineButton>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
      {/* TOP WAVE */}
      <div className="overflow-hidden leading-none bg-[#FDF6EC]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block w-full h-[70px]"
        >
          <path
            d="M0,64L80,69.3C160,75,320,85,480,85.3C640,85,800,75,960,69.3C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="#3c1f0a"
          />
        </svg>
      </div>

      

      {/* ── SECOND BANNER ── */}

       <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="w-full h-[110px]"
    >
      <path
        fill="#FDF6EC"
        d="M0,96L80,101.3C160,107,320,117,480,112C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      />
    </svg>
  </div>
 <section
  className="relative overflow-hidden bg-gradient-to-br from-[#2a1206] via-[#4b1d08] to-[#1a0702] text-white py-24 px-8">
 

  {/* Background Glow */}
  <div className="absolute left-0 top-20 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full" />
  <div className="absolute right-0 bottom-0 w-[28rem] h-[28rem] bg-orange-600/10 blur-3xl rounded-full" />

  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">

    {/* IMAGE SIDE */}
    <div className="relative flex justify-center flex-1">

      {/* Glow Behind Image */}
      <div
        className="
          absolute
          w-80 h-80
          bg-amber-400/20
          blur-3xl
          rounded-full
        "
      />

      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        perspective={1000}
        scale={1.05}
        transitionSpeed={500}
        glareEnable={true}
        glareMaxOpacity={0.25}
        glareColor="#ffffff"
        glarePosition="all"
        className="relative z-10"
      >
        <div
          className="
            relative overflow-hidden
            rounded-[2rem]
            border border-white/10
            bg-white/5
            backdrop-blur-md
            shadow-[0_20px_80px_rgba(0,0,0,0.55)]
          "
        >
          <img
            src="/royalty.jpeg"
            alt="Premium Chocolate"
            className="
              w-72 md:w-80
              aspect-[2/3]
              object-cover
            "
          />

          {/* Overlay */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-black/40
              via-transparent
              to-transparent
            "
          />
        </div>
      </Tilt>
    </div>

    {/* TEXT SIDE */}
    <div className="flex-1 max-w-2xl">

      <span
        className="
          inline-block mb-4
          text-amber-300
          uppercase
          tracking-[0.3em]
          text-xs md:text-sm
          font-semibold
        "
      >
        Royal Collection
      </span>

      <h2
        className="
          text-4xl md:text-6xl
          leading-tight
          cousine-bold
        "
      >
        Anything Is Good
        <span className="block text-amber-300">
          Made Of Chocolate
        </span>
      </h2>

      <p
        className="
          mt-6
          text-lg md:text-xl
          leading-relaxed
          text-amber-100/90
          max-w-xl
          carrois-gothic-sc-regular-italic
        "
      >
        From our Royal Collection to High Protein bars —
        every MalaBar is crafted with passion, precision,
        and the finest ingredients Kerala has to offer.
      </p>

      <div className="mt-8 flex gap-4 flex-wrap">

        <DrawOutlineButton
          onClick={() =>
            document
              .getElementById("products")
              .scrollIntoView({ behavior: "smooth" })
          }
          className="
            bg-amber-400
            text-black
            px-7 py-3
            font-semibold
            shadow-2xl

            hover:bg-white
            hover:text-black
          "
        >
          Buy Now
        </DrawOutlineButton>

        <DrawOutlineButton
          onClick={() => navigate("/orders")}
          className="
            border border-white/20
            bg-white/5
            backdrop-blur-md
            text-white
            px-7 py-3

            hover:bg-white
            hover:text-black
            hover:border-white
          "
        >
          View Orders
        </DrawOutlineButton>

      </div>
    </div>
  </div>

  {/* BOTTOM WAVE */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="w-full h-[90px]"
    >
      <path
        fill="#FDF6EC"
        d="M0,224L80,213.3C160,203,320,181,480,170.7C640,160,800,160,960,170.7C1120,181,1280,203,1360,213.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      />
    </svg>
  </div>
</section>

      {/* ── ALL PRODUCTS ── */}
      <section id="products" className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-bold font-serif text-[#3B1F0A] mb-8 noto-serif">
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
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`overflow-hidden px-5 py-2.5 rounded-2xl text-sm font-semibold tracking-wide transition-all duration-300 ease-in-out shadow-sm cursor-pointer backdrop-blur-md active:scale-95
        ${category === c
                    ? `bg-amber-800 text-white shadow-lg scale-105 border border-amber-800
            `
                    :
                    `bg-white/90 text-amber-800 border border-amber-200 hover:bg-amber-50 hover:border-amber-400 hover:shadow-lg hover:-translate-y-0.5  hover:scale-108

            `}`}>
                <span className="relative z-10">{c}</span>

                {category !== c && (
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-amber-100/0 via-amber-100/40 to-amber-100/0 translate-x-[-120%] hover:translate-x-[120%] transition-transform duration-700"
                  />)}
              </button>
            ))}
          </div>
          <div className="relative inline-block">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-white border border-amber-200 text-gray-700 font-semibold px-5 py-3 pr-12 rounded-2xl shadow-sm hover:border-amber-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400/40 transition-all duration-300 cursor-pointer "
            >
              <option
                value=""
                className="bg-white text-gray-500 font-medium"
              >
                Sort by Price
              </option>

              <option
                value="low"
                className="bg-white text-amber-700 font-semibold"
              >
                Price: Low → High
              </option>

              <option
                value="high"
                className="bg-white text-amber-700 font-semibold"
              >
                Price: High → Low
              </option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-amber-500">
              ▼
            </div>
          </div>
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

        {status === "failed" && (
          <p className="text-center text-red-500 mt-10">
            Failed to load products. Is JSON Server running?
          </p>
        )}
      </section>


      <div className="bg-[#3B1F0A] -mt-1 overflow-hidden leading-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full block"
        >
          <path d="M0,60 C360,0 1080,60 1440,20 L1440,0 L0,0 Z" fill="#FDF6EC" />
        </svg>
      </div>
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
              <li className="hover:text-white cursor-pointer" >Login</li>
              <li className="hover:text-white cursor-pointer" >Register</li>
              <li className="hover:text-white cursor-pointer" onClick={() => navigate("/orders")}>My Orders</li>
              <li className="hover:text-white cursor-pointer" onClick={() => navigate("/wishlist")}>Wishlist</li>
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