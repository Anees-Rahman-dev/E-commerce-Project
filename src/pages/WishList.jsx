
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice';
import { getWishDb, removeWish, setCartDb } from '../services/CartService';
import toast from 'react-hot-toast';


export default function WishList() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);


  const loadWishList = async () => {

    try{
      const items = await getWishDb();
      setWishlist(items);
    }catch(error){
      console.error('Failed to load Wishlist',error);
      toast.error("Unable to load Wishlist");
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
  loadWishList();
  },[])

  const handleRemove = async (wishListItemId) =>{
    try{
      await removeWish(wishListItemId);

      setWishlist((prev) => 
      prev.filter(
        (i) => i.wishlistItemId !== wishListItemId ))
         //eg 101 !== 102 true keep it.
         // 102 !== 102 false remove it. 
         //103 !== 102 → true, so keep it.
        
         toast.success(`Removed from wishlist `);
    }catch (error) {
      console.error(`Failed to remove wishlist item ${error}`);
      toast.error(`Unable to remove`);
    }
  }


  const handleMoveToCart = (item) => {

    // console.log(item)
    // dispatch(addToCart({ ...item, quantity: 1 }));
    setCartDb(item.productId, 1)

    handleRemove(item.wishlistItemId);
    toast.custom((t) => (
      <div className="bg-zinc-900 text-white px-4 py-3 rounded-xl flex items-center gap-3">
        <span>🛒 Added to cart</span>

        <button
          onClick={() => toast.dismiss(t)}
          className="text-sm bg-white text-black px-2 py-1 rounded"
        >
          Close
        </button>
      </div>
    ));

  };

  if (loading) {
  return <p className="p-6 text-center">Loading wishlist...</p>;
}
  
  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center py-24 text-gray-500 pt-30">
        <p className="text-5xl mb-4">🤍</p>

        <p className="text-xl font-medium">
          Your wishlist is empty
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-amber-800 text-white px-6 py-2 rounded-lg hover:bg-amber-900 w-fit"
        >
          Explore Chocolates
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6 pt-39">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        My Wishlist
      </h1>

      
<div className="space-y-4">
  {wishlist.map((item) => (
    <div
      key={item.wishlistItemId}
      className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
    >
      <img
        src={item.image}
        alt={item.productName}
        className="w-20 h-20 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">
          {item.productName}
        </h3>

        <p className="text-amber-800 font-medium">
          ₹{item.price}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleMoveToCart(item)}
          className="bg-amber-800 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-amber-900"
        >
          Move to Cart
        </button>

        <button
          onClick={() => handleRemove(item.wishlistItemId)}
          className="text-red-400 hover:text-red-600 text-xl"
          aria-label={`Remove ${item.productName} from wishlist`}
        >
          ✕
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}