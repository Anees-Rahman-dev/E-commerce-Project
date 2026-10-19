
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  fetchCart,
  changeCartQuantity,
  deleteCartItem,
} from "../redux/slices/cartSlice";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, status, error } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCart());
    }
  }, [dispatch, status]);

  const total = items.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity),
    0
  );

  const handleQuantityChange = async (item, quantity) => {
    if (!item.cartItemId) {
      toast.error("Cart item ID is missing. Please reload the cart.");
      return;
    }

    if (quantity < 1) return;

    try {
      await dispatch(
        changeCartQuantity({
          cartItemId: item.cartItemId,
          quantity,
        })
      ).unwrap();
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "Unable to update quantity."
      );
    }
  };

  const handleRemove = async (item) => {
    if (!item.cartItemId) {
      toast.error("Cart item ID is missing. Please reload the cart.");
      return;
    }

    try {
      await dispatch(deleteCartItem(item.cartItemId)).unwrap();
      toast.success(
        `${item.productName ?? item.name} removed from cart`
      );
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "Unable to remove item."
      );
    }
  };

  if (status === "loading" && items.length === 0) {
    return (
      <div className="text-center py-24 text-gray-500">
        Loading your cart...
      </div>
    );
  }

  if (status === "failed" && items.length === 0) {
    return (
      <div className="text-center py-24 text-red-600">
        <p>Unable to load your cart.</p>
        <p className="text-sm mt-2">
          {typeof error === "string" ? error : ""}
        </p>
        <button
          onClick={() => dispatch(fetchCart())}
          className="mt-4 text-amber-800 font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-24 text-gray-500 pt-30">
        <p className="text-5xl mb-4">
          <span className="material-symbols-outlined">
            shopping_cart
          </span>
        </p>
        <p className="text-xl font-medium">Your Cart Is Empty</p>
        <button
          onClick={() => navigate("/")}
          className="font-bold text-2xl text-amber-800"
        >
          Shop Now!
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 pt-40">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Your Cart
      </h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.cartItemId}
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm"
          >
            <img
              src={item.image}
              alt={item.productName ?? item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">
                {item.productName ?? item.name}
              </h3>
              <p className="text-amber-800 font-medium">
                ₹{item.price}
              </p>
            </div>

            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                disabled={item.quantity <= 1}
                onClick={() =>
                  handleQuantityChange(item, item.quantity - 1)
                }
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
              >
                −
              </button>

              <span className="px-4 py-1">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  handleQuantityChange(item, item.quantity + 1)
                }
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>

            <p className="w-20 text-right font-semibold">
              ₹{Number(item.price) * Number(item.quantity)}
            </p>

            <button
              onClick={() => handleRemove(item)}
              className="text-red-400 hover:text-red-600 text-xl"
              aria-label={`Remove ${item.productName ?? item.name}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-amber-50 p-6 rounded-xl">
        <div className="flex justify-between text-lg font-semibold text-gray-800">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="mt-4 w-full bg-amber-800 text-white py-3 rounded-lg hover:bg-amber-900 font-medium transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
 