
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate("/orders", { replace: true });
    }
  }, [order, navigate]);

  if (!order) return null;

  const orderItems = order.orderItems ?? [];
  const address = order.address;

  const formattedDate = order.orderDate
    ? new Date(order.orderDate).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Not available";

  return (
    <div className="mx-auto max-w-4xl px-6 pt-30 pb-12">
      <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
        <div className="mb-4 text-6xl">✅</div>

        <h1 className="text-3xl font-bold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="mt-2 text-gray-600">
          Thank you for your purchase. Your order has been placed.
        </p>

        <div className="mt-8 rounded-2xl bg-amber-50 p-6 text-left">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="font-semibold">#{order.orderId}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500">Order Date</p>
            <p className="font-semibold">{formattedDate}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500">Delivery Address</p>
            {address && typeof address === "object" ? (
              <div className="font-semibold">
                <p>{address.fullName}</p>
                <p>{address.phone}</p>
                <p>
                  {address.addressLine}, {address.city}, {address.state} -{" "}
                  {address.pincode}
                </p>
              </div>
            ) : (
              <p className="font-semibold">
                {address || "Address not available"}
              </p>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-500">Order Total</p>
            <p className="font-semibold">
              ₹{Number(order.totalAmount ?? 0).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3 text-left">
          <h2 className="text-xl font-semibold text-gray-800">
            Ordered Items
          </h2>

          {orderItems.length > 0 ? (
            <div className="space-y-2">
              {orderItems.map((item, index) => (
                <div
                  key={item.orderItemId ?? item.productId ?? index}
                  className="flex items-center justify-between gap-4 rounded-xl border border-amber-100 bg-white p-4"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.productName ?? item.name ?? "Product"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 font-semibold">
                    ₹
                    {(
                      Number(item.price ?? 0) * Number(item.quantity ?? 0)
                    ).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-amber-50 p-4 text-sm text-gray-600">
              Order placed successfully. Item details are not available in the
              response.
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => navigate("/")}
            className="rounded-full bg-amber-800 px-6 py-3 font-medium text-white hover:bg-amber-900"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="rounded-full border border-amber-800 px-6 py-3 font-medium text-amber-800 hover:bg-amber-50"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
}
