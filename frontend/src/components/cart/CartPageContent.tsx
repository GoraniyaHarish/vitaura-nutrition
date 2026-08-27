"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, CheckCircle2, AlertCircle, ShieldCheck, ArrowRight, Truck, Lock, Trash2 } from "lucide-react";
import { createOrder, checkDelivery, type OrderResponse } from "@/lib/api";
import { useCart } from "@/context/CartContext";

export function CartPageContent() {
  const { items, updateQuantity, removeItem, clearCart, isHydrated } = useCart();

  const [form, setForm] = useState({
    name: "Vitaura Customer",
    phone: "9876543210",
    email: "customer@vitauranutrition.com",
    address: "Vitaura Staging Zone, Rajkot Central",
    pincode: "360001",
    notes: "Vitaura order test",
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
      <div className="container-vitaura py-20 text-center">
        <div className="max-w-md mx-auto animate-pulse">
          <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-4" />
          <div className="h-6 bg-white/10 rounded w-1/2 mx-auto mb-2" />
          <div className="h-4 bg-white/10 rounded w-3/4 mx-auto" />
        </div>
      </div>
    );
  }

  if (orderResult) {
    return (
      <div className="container-vitaura py-12 md:py-20">
        <div className="max-w-xl mx-auto bg-[#1A1412] rounded-3xl p-6 md:p-10 border border-white/10 shadow-[0_20px_48px_rgba(0,0,0,0.6)] text-center">
          <div className="w-16 h-16 bg-[#211B18] rounded-full flex items-center justify-center mx-auto mb-4 text-[#F7F2EA] border border-white/10">
            <CheckCircle2 size={32} className="text-[#6D9B79]" />
          </div>

          <span className="inline-block bg-[#C87D55] text-[#12100F] text-[10px] font-bold px-3.5 py-1 rounded-full mb-3 font-sans uppercase tracking-widest border border-[#E09A72]/30">
            DEMO MODE — ORDER CONFIRMED
          </span>

          <h1
            className="text-2xl md:text-3xl font-light text-[#F7F2EA] mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Order #{orderResult.orderId || orderResult.orderNumber}
          </h1>

          <p className="text-sm text-[#C8BDB2] mb-6 font-sans">
            Thank you! Your order has been placed in **Demo Evaluation Mode**.
          </p>

          {/* Demo Payment Information Box */}
          <div className="bg-[#211B18] border border-white/10 rounded-2xl p-5 text-left mb-6 text-xs font-sans shadow-xs">
            <div className="flex items-center gap-2 font-bold mb-3 text-[#F7F2EA] uppercase tracking-wider text-[11px]">
              <ShieldCheck size={16} className="text-[#C87D55]" />
              <span>Simulated Payment Details</span>
            </div>
            <div className="space-y-1.5 font-mono text-xs text-[#C8BDB2]">
              <p>Payment Status: <strong className="text-[#F7F2EA]">{orderResult.paymentStatus || "DEMO_PAID"}</strong></p>
              <p>Payment Method: <strong className="text-[#F7F2EA]">{orderResult.paymentMethod || "DEMO"}</strong></p>
              <p>Order Status: <strong className="text-[#F7F2EA]">{orderResult.status}</strong></p>
              <p>Total Charged: <strong className="text-[#F7F2EA]">₹{Math.round(orderResult.total / 100)}</strong></p>
            </div>
            <p className="mt-3 text-[11px] italic text-[#91857B] font-sans">
              * Note: Zero actual money was deducted. System calculated prices authoritatively.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="bg-[#C87D55] text-[#12100F] px-6 py-3.5 rounded-full hover:bg-[#E09A72] transition-colors text-xs font-bold font-sans uppercase tracking-widest inline-flex items-center justify-center gap-2 border border-[#E09A72]/40 shadow-md"
            >
              <span>Explore More Formulations</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-vitaura py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-[#1A1412] rounded-full flex items-center justify-center mx-auto mb-6 text-[#F7F2EA] border border-white/10">
            <ShoppingBag size={32} strokeWidth={1.75} />
          </div>
          <h1
            className="text-3xl font-light text-[#F7F2EA] mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Your Atelier Cart is Empty
          </h1>
          <p className="text-sm text-[#C8BDB2] mb-8 font-sans">
            Discover our chef-crafted protein shakes, organic wellness bowls, and nutrient-dense power bites.
          </p>
          <Link
            href="/menu"
            className="inline-block bg-[#C87D55] text-[#12100F] text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#E09A72] transition-colors font-sans border border-[#E09A72]/40 shadow-md"
          >
            Explore Formulations
          </Link>
        </div>
      </div>
    );
  }

  const subtotalPaise = calculateSubtotalPaise();

  return (
    <div className="container-vitaura py-10 md:py-16">
      <h1
        className="text-3xl md:text-4xl font-light text-[#F7F2EA] mb-6 tracking-tight"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Your Cart & Secure Checkout
      </h1>

      {/* Demo Mode Banner */}
      <div className="bg-[#1A1412] border border-white/10 rounded-2xl p-4 mb-8 flex items-start gap-3.5 text-xs text-[#F7F2EA] font-sans shadow-xs">
        <ShieldCheck className="shrink-0 text-[#C87D55] mt-0.5" size={18} />
        <div>
          <strong className="font-bold block mb-0.5 uppercase tracking-wider text-[#F7F2EA]">Demo Evaluation Environment</strong>
          All transactions are safely processed in simulated demo mode. Backend calculates prices and delivery fees authoritatively.
        </div>
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-800/60 text-red-300 rounded-2xl p-4 mb-6 text-xs font-sans flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xs font-bold text-[#C87D55] uppercase tracking-widest font-sans mb-4">
            Selected Formulations ({items.length})
          </h2>
          
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#1A1412]/85 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex items-center justify-between shadow-xs hover:border-[#C87D55]/40 transition-all"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-16 rounded-2xl bg-[#211B18] overflow-hidden relative shrink-0 border border-white/10">
                  <Image src={item.imageUrl} alt={item.name} fill sizes="64px" className="object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#F7F2EA] font-serif text-base" style={{ fontFamily: "var(--font-serif)" }}>{item.name}</h3>
                  <p className="text-xs text-[#C8BDB2] font-sans">₹{Math.round(item.price / 100)} per formulation</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Quantity Control */}
                <div className="flex items-center border border-white/10 rounded-full overflow-hidden bg-[#211B18] shadow-xs">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-3 py-1 hover:bg-white/10 text-[#F7F2EA] font-bold text-sm transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-2.5 py-1 text-xs font-bold text-[#F7F2EA] font-sans min-w-[20px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-3 py-1 hover:bg-white/10 text-[#F7F2EA] font-bold text-sm transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Line total */}
                <span className="font-extrabold text-[#F7F2EA] min-w-[65px] text-right font-sans text-base tabular-nums">
                  ₹{Math.round((item.price * item.quantity) / 100)}
                </span>

                {/* Explicit Trash Removal Button */}
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-[#91857B] hover:text-red-400 hover:bg-red-950/30 rounded-full transition-colors cursor-pointer"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          <div className="bg-[#1A1412] p-4 rounded-2xl border border-white/10 flex items-center justify-between text-xs font-sans text-[#C8BDB2]">
            <span className="flex items-center gap-2 text-[#F7F2EA]">
              <Truck size={16} className="text-[#C87D55]" />
              <span>Cold-Chain Protected Dispatch</span>
            </span>
            <span className="font-bold text-[#F7F2EA]">Vitaura Express</span>
          </div>
        </div>

        {/* Right Column: Customer Details & Checkout Form */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleSubmitOrder}
            className="bg-[#1A1412]/85 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.6)] space-y-4"
          >
            <h2 className="text-xs font-bold text-[#C87D55] uppercase tracking-widest font-sans pb-2 border-b border-white/10">
              Delivery Destination
            </h2>

            <div>
              <label className="block text-[11px] font-bold text-[#F7F2EA] mb-1 font-sans uppercase tracking-wider">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#211B18] border border-white/10 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:border-[#C87D55] text-[#F7F2EA] transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#F7F2EA] mb-1 font-sans uppercase tracking-wider">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#211B18] border border-white/10 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:border-[#C87D55] text-[#F7F2EA] transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#F7F2EA] mb-1 font-sans uppercase tracking-wider">
                  Pincode *
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#211B18] border border-white/10 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:border-[#C87D55] text-[#F7F2EA] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#F7F2EA] mb-1 font-sans uppercase tracking-wider">
                Delivery Address *
              </label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#211B18] border border-white/10 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:border-[#C87D55] text-[#F7F2EA] transition-all"
              />
            </div>

            {/* Financial Summary */}
            <div className="border-t border-white/10 pt-4 space-y-2 font-sans">
              <div className="flex justify-between text-xs text-[#C8BDB2]">
                <span>Formulations Subtotal</span>
                <span className="font-semibold text-[#F7F2EA] tabular-nums">₹{Math.round(subtotalPaise / 100)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#C8BDB2]">
                <span>Cold-Chain Shipping</span>
                <span className="font-semibold text-[#F7F2EA] tabular-nums">₹30</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#F7F2EA] pt-3 border-t border-white/10">
                <span>Estimated Total</span>
                <span className="tabular-nums">₹{Math.round(subtotalPaise / 100) + 30}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C87D55] hover:bg-[#E09A72] text-[#12100F] py-4 px-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-md disabled:opacity-50 mt-4 cursor-pointer font-sans border border-[#E09A72]/40"
            >
              {loading ? "Processing Formulation..." : "Place Order"}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#91857B] mt-2 font-sans">
              <Lock size={12} className="text-[#C87D55]" />
              <span>Server-Authoritative Price Validation</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
