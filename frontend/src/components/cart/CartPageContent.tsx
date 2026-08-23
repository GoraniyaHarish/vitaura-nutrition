"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, CheckCircle2, AlertCircle, ShieldCheck, ArrowRight, Truck, Lock, Trash2 } from "lucide-react";
import { createOrder, checkDelivery, type OrderResponse } from "@/lib/api";
import { useCart } from "@/context/CartContext";

export function CartPageContent() {
  const { items, updateQuantity, removeItem, clearCart, isHydrated } = useCart();

  const [form, setForm] = useState({
    name: "Demo Customer",
    phone: "9876543210",
    email: "demo@gronliv.in",
    address: "GronLiv Staging Area, Rajkot Central",
    pincode: "360001",
    notes: "Demo order test",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderResult, setOrderResult] = useState<OrderResponse | null>(null);

  const calculateSubtotalPaise = () => items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (!/^\d{6}$/.test(form.pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // 1. Verify delivery availability
      const deliveryCheck = await checkDelivery(form.pincode);
      if (deliveryCheck.available === false && !deliveryCheck.eligible) {
        setError(deliveryCheck.message || "Delivery not available to this pincode.");
        setLoading(false);
        return;
      }

      // 2. Submit order to backend (Backend authoritatively calculates prices & fees)
      const res = await createOrder({
        customerName: form.name,
        customerPhone: form.phone,
        customerEmail: form.email,
        deliveryAddress: form.address,
        pincode: form.pincode,
        paymentMethod: "DEMO",
        notes: form.notes,
        items: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
      });

      setOrderResult(res);
      clearCart();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Order placement failed.");
      } else {
        setError("Order placement failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="container-gronliv py-20 text-center">
        <div className="max-w-md mx-auto animate-pulse">
          <div className="w-16 h-16 bg-[#183324]/10 rounded-full mx-auto mb-4" />
          <div className="h-6 bg-[#183324]/10 rounded w-1/2 mx-auto mb-2" />
          <div className="h-4 bg-[#183324]/10 rounded w-3/4 mx-auto" />
        </div>
      </div>
    );
  }

  if (orderResult) {
    return (
      <div className="container-gronliv py-12 md:py-20">
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 md:p-10 border border-[#183324]/10 shadow-[0_12px_32px_rgba(17,36,25,0.06)] text-center">
          <div className="w-16 h-16 bg-[#183324]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#112419] border border-[#C8A265]/30">
            <CheckCircle2 size={36} />
          </div>

          <span className="inline-block bg-[#112419] text-[#D8B778] text-xs font-bold px-3.5 py-1 rounded-full mb-3 font-manrope uppercase tracking-wider">
            DEMO MODE — ORDER CONFIRMED
          </span>

          <h1
            className="text-2xl md:text-3xl font-extrabold text-[#112419] mb-2"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            Order #{orderResult.orderId || orderResult.orderNumber}
          </h1>

          <p className="text-body-md text-[#48544D] mb-6 font-merriweather">
            Thank you! Your order has been placed in **Demo Evaluation Mode**.
          </p>

          {/* Demo Payment Information Box */}
          <div className="bg-[#FAF8F5] border border-[#183324]/15 rounded-2xl p-5 text-left mb-6 text-sm">
            <div className="flex items-center gap-2 font-bold mb-3 text-[#112419] font-manrope uppercase tracking-wider text-xs">
              <ShieldCheck size={18} className="text-[#C8A265]" />
              <span>Simulated Payment Details</span>
            </div>
            <div className="space-y-1.5 font-mono text-xs text-[#48544D]">
              <p>Payment Status: <strong className="text-[#112419]">{orderResult.paymentStatus || "DEMO_PAID"}</strong></p>
              <p>Payment Method: <strong className="text-[#112419]">{orderResult.paymentMethod || "DEMO"}</strong></p>
              <p>Order Status: <strong className="text-[#112419]">{orderResult.status}</strong></p>
              <p>Total Charged: <strong className="text-[#112419]">₹{Math.round(orderResult.total / 100)}</strong></p>
            </div>
            <p className="mt-3 text-[11px] italic text-[#48544D]/80 font-merriweather">
              * Note: Zero actual money was deducted. System calculated prices authoritatively.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="bg-[#112419] text-[#FAF8F5] px-6 py-3.5 rounded-xl hover:bg-[#183324] transition-colors text-xs font-bold font-manrope uppercase tracking-wider inline-flex items-center justify-center gap-2 border border-[#C8A265]/20"
            >
              <span>Explore More Menu</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-gronliv py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-[#183324]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#112419] border border-[#183324]/10">
            <ShoppingCart size={36} />
          </div>
          <h1
            className="text-2xl font-extrabold text-[#112419] mb-3"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            Your Cart is Empty
          </h1>
          <p className="text-body-md text-[#48544D] mb-8 font-merriweather">
            Discover our fresh organic shakes prepared daily with whole superfoods.
          </p>
          <Link
            href="/menu"
            className="inline-block bg-[#112419] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#183324] transition-colors font-manrope border border-[#C8A265]/20 shadow-xs"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  const subtotalPaise = calculateSubtotalPaise();

  return (
    <div className="container-gronliv py-10 md:py-16">
      <h1
        className="text-2xl md:text-3xl font-extrabold text-[#112419] mb-6"
        style={{ fontFamily: "var(--font-merriweather)" }}
      >
        Your Cart & Secure Checkout
      </h1>

      {/* Refined Demo Mode Banner */}
      <div className="bg-[#FAF8F5] border border-[#183324]/15 rounded-2xl p-4 mb-8 flex items-start gap-3.5 text-xs text-[#112419] font-manrope">
        <ShieldCheck className="shrink-0 text-[#C8A265] mt-0.5" size={20} />
        <div>
          <strong className="font-bold block mb-0.5 uppercase tracking-wider text-[#112419]">Demo Evaluation Environment</strong>
          All transactions are safely processed in simulated demo mode. Backend calculates prices and delivery fees authoritatively.
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-xs font-manrope flex items-center gap-2">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-sm font-bold text-[#112419] uppercase tracking-wider font-manrope mb-4">
            Selected Items ({items.length})
          </h2>
          
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#183324]/10 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:border-[#183324]/20 transition-all"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-16 rounded-xl bg-[#F4F0E8] overflow-hidden relative shrink-0 border border-[#183324]/10">
                  <Image src={item.imageUrl} alt={item.name} fill sizes="64px" className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-[#112419] font-manrope text-base">{item.name}</h3>
                  <p className="text-xs text-[#48544D] font-manrope">₹{Math.round(item.price / 100)} per bottle</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Quantity Control */}
                <div className="flex items-center border border-[#183324]/20 rounded-xl overflow-hidden bg-[#FAF8F5]">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-3 py-1.5 hover:bg-[#183324]/10 text-[#112419] font-bold text-sm transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-[#112419] font-manrope min-w-[24px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-3 py-1.5 hover:bg-[#183324]/10 text-[#112419] font-bold text-sm transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Line total */}
                <span className="font-extrabold text-[#112419] min-w-[70px] text-right font-manrope text-base">
                  ₹{Math.round((item.price * item.quantity) / 100)}
                </span>

                {/* Explicit Trash Removal Button */}
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-[#48544D] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#183324]/10 flex items-center justify-between text-xs font-manrope text-[#48544D]">
            <span className="flex items-center gap-2">
              <Truck size={16} className="text-[#C8A265]" />
              <span>Cold-Chain Insulated Shipping</span>
            </span>
            <span className="font-bold text-[#112419]">Rajkot Express</span>
          </div>
        </div>

        {/* Right Column: Customer Details & Checkout Form */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleSubmitOrder}
            className="bg-white border border-[#183324]/10 rounded-3xl p-6 md:p-8 shadow-[0_4px_24px_rgba(17,36,25,0.04)] space-y-4"
          >
            <h2 className="text-sm font-bold text-[#112419] uppercase tracking-wider font-manrope pb-2 border-b border-[#183324]/10">
              Delivery Information
            </h2>

            <div>
              <label className="block text-xs font-bold text-[#112419] mb-1 font-manrope uppercase tracking-wide">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#183324]/20 rounded-xl text-sm font-manrope focus:outline-none focus:ring-1 focus:ring-[#183324] focus:border-[#183324] transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#112419] mb-1 font-manrope uppercase tracking-wide">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#183324]/20 rounded-xl text-sm font-manrope focus:outline-none focus:ring-1 focus:ring-[#183324] focus:border-[#183324] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#112419] mb-1 font-manrope uppercase tracking-wide">
                  Pincode *
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#183324]/20 rounded-xl text-sm font-manrope focus:outline-none focus:ring-1 focus:ring-[#183324] focus:border-[#183324] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#112419] mb-1 font-manrope uppercase tracking-wide">
                Delivery Address *
              </label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#183324]/20 rounded-xl text-sm font-manrope focus:outline-none focus:ring-1 focus:ring-[#183324] focus:border-[#183324] transition-all"
              />
            </div>

            {/* Financial Summary */}
            <div className="border-t border-[#183324]/10 pt-4 space-y-2 font-manrope">
              <div className="flex justify-between text-xs text-[#48544D]">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#112419]">₹{Math.round(subtotalPaise / 100)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#48544D]">
                <span>Cold-Chain Shipping</span>
                <span className="font-semibold text-[#112419]">₹30</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#112419] pt-3 border-t border-[#183324]/10">
                <span>Estimated Total</span>
                <span>₹{Math.round(subtotalPaise / 100) + 30}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#112419] hover:bg-[#183324] text-[#FAF8F5] py-4 px-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md disabled:opacity-50 mt-4 cursor-pointer font-manrope border border-[#C8A265]/20"
            >
              {loading ? "Processing Order..." : "Place Order"}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#48544D] mt-2 font-manrope">
              <Lock size={12} className="text-[#C8A265]" />
              <span>Server-Authoritative Price Validation</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
