

// //get cart for specific user
// export const getCartByUser = async (userId) => {
//     const res =  await axios.get(`${BASE}/cart?userId=${userId}`)
//     return res.data
// }


// export const addCartItem = async  (item) => {
//     const res = await axios.post(`${BASE}/cart`, item)
//     return res.data
// }


// export const updateCartItem = async (id, data) => {
//     const res = await axios.patch(`${BASE}/cart/${id}`, data)
//     return res.data
// }

// export const removeCartItem = async (id) => {
//     const res = await axios.delete(`${BASE}/cart/${id}`)
//     return res.data
// }

// export const clearUserCart = async (userId) => {
//     const cartItems = await getCartByUser(userId);
//     const deletePromises = cartItems.map((item) =>
//       axios.delete(`${BASE}/cart/${item.id}`)
//     );
//     return Promise.all(deletePromises);
// } 



import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL;
console.log("BASE URL:", BASE);


export const setCartDb = async (data) => {
    // console.log(data)
    const res = await axios.post(`${BASE}/cart`,data)
    return res.data
}

export const removeCartFromDb = async (id) => {
    console.log(id)
    const res = await axios.delete(`${BASE}/cart/${id}`)
    return res.data
}

export const setWishDb = async (data) => {
    // console.log(data)
    const res = await axios.post(`${BASE}/wishlist`,data)
    return res.data
}

export const removeWish = async (id) => {
  const res = await axios.delete(`${BASE}/wishlist/${id}`);
  return res.data;
};