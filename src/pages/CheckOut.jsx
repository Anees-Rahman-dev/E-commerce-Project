
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { clearCart } from "../redux/slices/cartSlice";
import {
  PlaceNewOrder,
  PlaceBuyNowOrder,
} from "../services/OrderService";
import {
  getMyAddresses,
  addAddress,
} from "../services/AddressService";

const emptyAddress = {
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  pincode: "",
};

export default function CheckOut() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { items: cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // ProductDetails will pass this when the user clicks Buy Now.
  const buyNow = location.state?.buyNow;

  const buyNowProduct = buyNow?.product;
  const buyNowQuantity = Number(buyNow?.quantity ?? 1);

  const isBuyNow = Boolean(
    buyNowProduct &&
    (buyNowProduct.productId ?? buyNowProduct.id)
  );

  const checkoutItems = useMemo(() => {
    if (isBuyNow) {
      return [
        {
          id: buyNowProduct.productId ?? buyNowProduct.id,
          name: buyNowProduct.name,
          image: buyNowProduct.image,
          price: Number(buyNowProduct.price),
          quantity: buyNowQuantity,
        },
      ];
    }

    return cartItems;
  }, [isBuyNow, buyNowProduct, buyNowQuantity, cartItems]);

  const total = checkoutItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [addressForm, setAddressForm] = useState(emptyAddress);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [savingAddress, setSavingAddress] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadAddresses = async () => {
      setLoadingAddresses(true);

      try {
        const result = await getMyAddresses();

        if (cancelled) return;

        const list = Array.isArray(result) ? result : [];
        setAddresses(list);

        if (list.length > 0) {
          setSelectedAddressId(String(list[0].addressId));
        } else {
          setShowAddressForm(true);
        }
      } catch (error) {
        console.error("Failed to load addresses:", error);

        if (!cancelled) {
          toast.error("Unable to load saved addresses.");
        }
      } finally {
        if (!cancelled) setLoadingAddresses(false);
      }
    };

    loadAddresses();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleAddressChange = (event) => {
    const { name, value } = event.target;

    setAddressForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSaveAddress = async (event) => {
    event.preventDefault();

    const address = {
      fullName: addressForm.fullName.trim(),
      phone: addressForm.phone.trim(),
      addressLine: addressForm.addressLine.trim(),
      city: addressForm.city.trim(),
      state: addressForm.state.trim(),
      pincode: addressForm.pincode.trim(),
    };

    if (Object.values(address).some((value) => !value)) {
      toast.error("Please fill in all address fields.");
      return;
    }

    setSavingAddress(true);

    try {
      const created = await addAddress(address);

      // Select the newly saved address.
      setAddresses((previous) => [...previous, created]);
      setSelectedAddressId(String(created.addressId));
      setAddressForm(emptyAddress);
      setShowAddressForm(false);

      toast.success("Address saved successfully.");
    } catch (error) {
      console.error("Failed to save address:", error);

      toast.error(
        typeof error.response?.data === "string"
          ? error.response.data
          : "Unable to save address."
      );
    } finally {
      setSavingAddress(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address.");
      return;
    }

    if (checkoutItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setPlacingOrder(true);

    try {
      let createdOrder;

      if (isBuyNow) {
        createdOrder = await PlaceBuyNowOrder({
          productId: Number(
            buyNowProduct.productId ?? buyNowProduct.id
          ),
          quantity: buyNowQuantity,
          addressId: Number(selectedAddressId),
          paymentMethod,
        });
      } else {
        createdOrder = await PlaceNewOrder({
          addressId: Number(selectedAddressId),
          paymentMethod,
        });

        // The backend clears the database cart after a successful order.
        dispatch(clearCart());
      }

      navigate("/order-success", {
        state: { order: createdOrder },
        replace: true,
      });
    } catch (error) {
      console.error("Order failed:", error);

      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message;

      toast.error(message || "Order failed. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (!isBuyNow && cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h2 className="text-2xl font-bold text-amber-900">
          Your cart is empty
        </h2>
        <p className="mt-2 text-gray-600">
          Add some chocolates before checking out.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 rounded-lg bg-amber-800 px-6 py-3 text-white hover:bg-amber-900"
        >
          Explore Chocolates
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-2">
      <section>
        <h1 className="mb-2 text-3xl font-bold text-amber-950">
          Checkout
        </h1>

        <p className="mb-8 text-gray-600">
          {isBuyNow
            ? "You're buying this product directly."
            : "Review your cart and delivery details."}
        </p>

        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-gray-800">
              Delivery Address
            </h2>

            {!showAddressForm && (
              <button
                onClick={() => {
                  setAddressForm(emptyAddress);
                  setShowAddressForm(true);
                }}
                className="text-sm font-semibold text-amber-800 hover:underline"
              >
                + Add address
              </button>
            )}
          </div>

          {loadingAddresses ? (
            <p className="text-gray-500">Loading saved addresses...</p>
          ) : (
            <>
              {addresses.map((address) => (
                <label
                  key={address.addressId}
                  className={`mb-3 flex cursor-pointer gap-3 rounded-xl border p-4 transition ${
                    String(address.addressId) === selectedAddressId &&
                    !showAddressForm
                      ? "border-amber-800 bg-amber-50"
                      : "border-gray-200 hover:border-amber-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryAddress"
                    value={address.addressId}
                    checked={
                      String(address.addressId) === selectedAddressId &&
                      !showAddressForm
                    }
                    onChange={() => {
                      setSelectedAddressId(String(address.addressId));
                      setShowAddressForm(false);
                    }}
                    className="mt-1 accent-amber-800"
                  />

                  <span className="text-sm leading-6 text-gray-700">
                    <strong className="block text-gray-900">
                      {address.fullName}
                    </strong>
                    {address.phone}
                    <br />
                    {address.addressLine}, {address.city},{" "}
                    {address.state} - {address.pincode}
                  </span>
                </label>
              ))}

              {showAddressForm && (
                <form
                  onSubmit={handleSaveAddress}
                  className="space-y-3 rounded-xl border border-amber-200 bg-amber-50/50 p-5"
                >
                  <h3 className="font-semibold text-gray-800">
                    Add a delivery address
                  </h3>

                  {[
                    ["fullName", "Full name"],
                    ["phone", "Phone number"],
                    ["addressLine", "House name, street, or address"],
                    ["city", "City"],
                    ["state", "State"],
                    ["pincode", "PIN code"],
                  ].map(([name, placeholder]) => (
                    <input
                      key={name}
                      name={name}
                      value={addressForm[name]}
                      onChange={handleAddressChange}
                      placeholder={placeholder}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-100"
                    />
                  ))}

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={savingAddress}
                      className="rounded-lg bg-amber-800 px-5 py-2.5 font-medium text-white hover:bg-amber-900 disabled:opacity-60"
                    >
                      {savingAddress ? "Saving..." : "Save address"}
                    </button>

                    {addresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              )}

              {addresses.length === 0 && !showAddressForm && (
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="rounded-lg border border-amber-800 px-4 py-2 text-amber-900"
                >
                  Add your first address
                </button>
              )}
            </>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Payment Method
          </h2>

          <div className="space-y-3">
            {[
              ["COD", "Cash on Delivery"],
              ["Online", "Online Payment"],
            ].map(([value, label]) => (
              <label
                key={value}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${
                  paymentMethod === value
                    ? "border-amber-800 bg-amber-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={value}
                  checked={paymentMethod === value}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                  className="accent-amber-800"
                />
                <span className="font-medium text-gray-800">
                  {label}
                </span>
              </label>
            ))}
          </div>

          {paymentMethod === "Online" && (
            <p className="mt-3 text-sm text-amber-800">
              Online payment requires payment-provider integration before
              this option can safely be used for real payments.
            </p>
          )}
        </div>
      </section>

      <aside className="h-fit rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-gray-900">
          Order Summary
        </h2>

        <div className="space-y-4">
          {checkoutItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-4"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-amber-50">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="shrink-0 font-semibold text-gray-800">
                ₹{(Number(item.price) * Number(item.quantity)).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <hr className="my-6 border-amber-100" />

        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={
            placingOrder ||
            loadingAddresses ||
            savingAddress ||
            showAddressForm ||
            !selectedAddressId
          }
          className="mt-6 w-full rounded-xl bg-amber-800 py-3.5 font-semibold text-white transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {placingOrder
            ? "Placing order..."
            : isBuyNow
              ? "Buy Now"
              : "Place Order"}
        </button>

        <button
          onClick={() => navigate(isBuyNow ? `/product/${buyNowProduct.productId ?? buyNowProduct.id}` : "/cart")}
          className="mt-3 w-full rounded-xl border border-gray-300 py-3 text-gray-700 hover:bg-gray-50"
        >
          {isBuyNow ? "Back to product" : "Back to cart"}
        </button>
      </aside>
    </div>
  );
}
