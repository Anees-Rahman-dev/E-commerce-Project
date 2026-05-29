
import { memo, useState } from 'react';
import { Await, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { setCartDb, setWishDb, removeWish } from '../services/CartService';
import { Server } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const ProductCard = memo(function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(s => s.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user)
  // console.log(user)
  const cartItems = useSelector((state) => state.cart.items)
  const [Quantity, setQuantity] = useState(1)
  const [bg, setBg] = useState(`bg-white/80`)

  if (!product) return null;

  const imageSrc = product.image
    ? product.image.startsWith('http')
      ? product.image
      : `http://localhost:5173${product.image}`
    : 'https://via.placeholder.com/400';

    
 const handleAddToCart = async (e) => {

  e.stopPropagation();

  if (!isAuthenticated) {
    return navigate('/login');
  }


  if (product.stock <= 0) {
    toast.error('Out OfStock')
    return
  }

  const existingItem = cartItems.find(
    (find) => find.id === product.id
  )

  if (
    existingItem &&
    existingItem.quantity >= product.stock
  ) {
    toast.error(
      'Cannot buy more than ' + product.stock
    )
    return
  }

  await setCartDb(product)

  dispatch(addToCart(product))
}
  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) return navigate('/login')

    const uid = JSON.parse(localStorage.getItem('user'))?.id;
    //  console.log('uid',uid)
    const key = uid ? `wishlist_${uid}` : 'wishlist'; //each user gets separate wishlist_id
    //  console.log('key',key)
    const current = JSON.parse(localStorage.getItem(key) || '[]');
    // console.log('current',current)
   const existingItem = current.find(i => i.id === product.id);
   
   if (!existingItem) {
    // Add to wishlist
    localStorage.setItem(key, JSON.stringify([...current, product]));
    await setWishDb(product);
    setBg("bg-red-500 text-white");

    toast.custom((t) => (
      <div className="bg-zinc-900 text-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-4">
        <span className="text-sm font-medium">
          ❤️ Added to wishlist
        </span>

        <button
          onClick={() => {
            navigate("/wishlist");
            toast.dismiss(t);
          }}
          className="bg-white text-black text-xs px-3 py-1 rounded-lg hover:opacity-90 transition"
        >
          View
        </button>
      </div>
    ))
  } else {

    const updatedWishlist = current.filter(i => i.id !== product.id); //removing from wishlist
    localStorage.setItem(key, JSON.stringify(updatedWishlist));
    try {
      await removeWish(existingItem.id);
    } catch (error) {
      console.warn('Failed to delete wishlist item from backend:', error);
    }
    setBg("bg-white/80");
    toast.success(" Removed from wishlist");
  }
    // console.log(product)

  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={imageSrc}
          alt={product?.name || 'Product image'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-sm bg-red-500 px-3 py-1 rounded-full font-semibold">
              Out of Stock
            </span>
          </div>
        )}
        <button
  onClick={handleWishlist}
  className={`absolute top-3 right-3 ${bg} hover:bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-300`}
>
  <span className="text-xl">
    ♡
  </span>
</button>
      </div>

      <div className="p-4">
        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
          {product.category}
        </span>
        <h3 className="font-bold mt-2 text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="font-bold text-[#3B1F0A] text-lg">₹{product.price}</p>
            <p className="text-xs text-gray-400">⭐ {product.rating}</p>
          </div>
          {/* <button onClick={handleAddToCart} disabled={product.stock === 0}
            className="bg-[#3B1F0A] text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-amber-800 transition disabled:opacity-40 text-xl font-bold">
            ✢
          </button> */}
        </div>
      </div>
    </div>
  );
});

export default ProductCard;