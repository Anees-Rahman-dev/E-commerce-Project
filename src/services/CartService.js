

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





import api from "./api";

export const setCartDb = async (productId, quantity = 1) => {
  const response = await api.post("/cart", {
    productId,
    quantity,
  });

  return response.data;
};

export const getCartFromDb = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const updateCartInDb = async (cartItemId, quantity) => {
  const response = await api.put(`/cart/${cartItemId}`, {
    quantity,
  });

  return response.data;
};

export const removeCartFromDb = async (cartItemId) => {
  // console.log(cartItemId)
  const response = await api.delete(`/cart/${cartItemId}`);
  return response.data;
};

export const getWishDb = async () => {
  const res = await api.get(`/wishlist`);
  console.log(res.data)
  return res.data;
}

export const setWishDb = async (productId) => {
  console.log(productId)
  
  const response = await api.post(`/wishlist/${productId}`);
  return response.data;
};

export const removeWish = async (wishlistItemId) => {
  const response = await api.delete(`/wishlist/${wishlistItemId}`);
  return response.data;

};