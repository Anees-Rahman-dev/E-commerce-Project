
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../redux/slices/orderSlice";

const STATUS_COLORS = {
  placed: "bg-blue-100 text-blue-700",
  pending: "bg-blue-100 text-blue-700",
  shipped: "bg-yellow-100 text-yellow-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((s) => s.auth);
  const { orders = [], status } = useSelector((s) => s.orders);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    dispatch(fetchOrders(user.id ?? user.userId));
  }, [user, dispatch, navigate]);

  if (status === "loading") {
    return (
      <p className="mt-20 text-center text-gray-400">
        Loading orders...
      </p>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-24 text-center text-gray-500">
        <p className="mb-4 text-5xl">📦</p>
        <p className="text-xl font-medium">No orders yet</p>
        <button
          onClick={() => navigate("/")}
          className="mt-5 rounded-lg bg-amber-800 px-5 py-2 text-white hover:bg-amber-900"
        >
          Explore Chocolates
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pt-30 pb-12">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => {
          const orderItems = order.orderItems ?? [];
          const address = order.address;

          return (
            <div
              key={order.orderId}
              className="rounded-xl bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm text-gray-400">
                  Order #{order.orderId} •{" "}
                  {order.orderDate
                    ? new Date(order.orderDate).toLocaleDateString("en-IN")
                    : "Date unavailable"}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                    STATUS_COLORS[String(order.status ?? "").toLowerCase()] ??
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.status ?? "Unknown"}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                {orderItems.length > 0 ? (
                  orderItems.map((item, index) => (
                    <div
                      key={item.orderItemId ?? item.productId ?? index}
                      className="flex justify-between gap-4"
                    >
                      <span>
                        {item.productName ?? item.name ?? "Product"} ×{" "}
                        {item.quantity}
                      </span>

                      <span className="shrink-0">
                        ₹
                        {(
                          Number(item.price ?? 0) *
                          Number(item.quantity ?? 0)
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">
                    Order item details are unavailable.
                  </p>
                )}
              </div>

              <div className="mt-3 flex justify-between border-t pt-3 font-semibold">
                <span>Total</span>
                <span className="text-amber-800">
                  ₹{Number(order.totalAmount ?? 0).toFixed(2)}
                </span>
              </div>

              {address && (
                <div className="mt-3 text-xs text-gray-400">
                  <p>📍 {address.fullName}</p>
                  <p>
                    {address.addressLine}, {address.city}, {address.state} -{" "}
                    {address.pincode}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
