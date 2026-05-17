
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const ProductCard = memo(function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(s => s.auth.isAuthenticated);
const cartItems = useSelector((state)=> state.cart.items)
  const [Quantity,setQuantity] = useState(1)

  const handleAddToCart = (e) => {
    e.stopPropagation();
  if (!isAuthenticated) return navigate('/login');

const existingItem = cartItems.find((find) => find.id === product.id)


if(existingItem && existingItem.quantity >= product.stock){
  alert('cannot buy more than '+ product.stock)
  return
}

dispatch(addToCart(product))
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) return navigate('/login');
    const uid = JSON.parse(localStorage.getItem('user'))?.id;
    const key = uid ? `wishlist_${uid}` : 'wishlist';
    const current = JSON.parse(localStorage.getItem(key) || '[]');
    if (!current.find(i => i.id === product.id)) {
      localStorage.setItem(key, JSON.stringify([...current, product]));
    }
    alert(`${product.name} added to WishList go to wishList`) +  navigate(`/wishlist`)
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={product.image.startsWith('http') ? product.image : `http://localhost:5173${product.image}`}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"                  //  lazy load images
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-sm bg-red-500 px-3 py-1 rounded-full font-semibold">
              Out of Stock
            </span>
          </div>
        )}
        <button onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center shadow transition">
          🤍
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
          <button onClick={handleAddToCart} disabled={product.stock === 0}
            className="bg-[#3B1F0A] text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-amber-800 transition disabled:opacity-40 text-xl font-bold">
          ✢
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;