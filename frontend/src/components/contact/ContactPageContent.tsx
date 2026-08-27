"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, Mail, MapPin, Send } from "lucide-react";

function InstagramIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
import { submitContact } from "@/lib/api";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_VITAURA_WHATSAPP_NUMBER ||
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
  "919000000000";
const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_VITAURA_CONTACT_EMAIL ||
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
  "concierge@vitauranutrition.com";
const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_VITAURA_INSTAGRAM_URL ||
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
  "https://instagram.com/vitauranutrition";
const INSTAGRAM_HANDLE =
  process.env.NEXT_PUBLIC_VITAURA_INSTAGRAM_HANDLE ||
  process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ||
  "vitauranutrition";

const DEMO_INSTAGRAM_POSTS = [
  { id: 1, alt: "Fresh Vitaura matcha formulation", src: "/images/vanilla-matcha-zen.jpg" },
  { id: 2, alt: "Raw whole superfoods and ingredients", src: "/images/raw-cacao.jpg" },
  { id: 3, alt: "Acai power bowl with fresh organic berries", src: "/images/acai-power-bowl.jpg" },
  { id: 4, alt: "Dark cacao recharge formulation", src: "/images/dark-cacao-recharge.jpg" },
];

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactPageContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim() || name.length < 2)
      newErrors.name = "Please enter your name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Please enter a valid email address.";
    if (!message.trim() || message.length < 10)
      newErrors.message = "Please enter a message (at least 10 characters).";
    if (message.length > 2000)
      newErrors.message = "Message must be under 2000 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    if (!validate()) return;
    setStatus("loading");

    try {
      await submitContact({ name, email, message });
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container-vitaura py-10 md:py-16 space-y-14 bg-transparent">
      {/* Page Header */}
      <section className="max-w-2xl">
        <span className="text-xs font-bold text-[#C87D55] uppercase tracking-widest block mb-2 font-sans">
          CONCIERGE & SUPPORT
        </span>
        <h1
          className="text-3xl sm:text-5xl font-light text-[#F7F2EA] mb-4 tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Get in Touch
        </h1>
        <p className="text-base text-[#C8BDB2] font-sans leading-relaxed">
          Have questions about our formulations, dietary ingredients, or active orders? Our nutrition concierge team is here to assist.
        </p>
      </section>

      {/* Main Contact Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Contact Form (7 cols) */}
        <div
          className="md:col-span-7 bg-[#1A1412]/85 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
        >
          <h2
            className="text-2xl font-light text-[#F7F2EA] mb-6 font-serif"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Send a Message
          </h2>

          {status === "success" ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-[#211B18] rounded-full flex items-center justify-center mx-auto mb-4 text-[#6D9B79] border border-white/10">
                <Send size={24} />
              </div>
              <h3
                className="text-2xl font-semibold text-[#F7F2EA] mb-2 font-serif"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Inquiry Received
              </h3>
              <p className="text-sm text-[#C8BDB2] font-sans">
                Thank you for contacting Vitaura Nutrition. Our culinary concierge team will review your inquiry and respond promptly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-[#C87D55] font-bold underline underline-offset-4 font-sans text-xs uppercase tracking-wider cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-[11px] font-bold uppercase tracking-wider text-[#F7F2EA] mb-2 font-sans"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((p) => ({ ...p, name: "" }));
                  }}
                  className={`w-full px-4 py-3.5 bg-[#211B18] border rounded-xl text-[#F7F2EA] placeholder-[#91857B] focus:outline-none focus:border-[#C87D55] transition-all font-sans text-sm ${
                    errors.name
                      ? "border-red-500"
                      : "border-white/10"
                  }`}
                  placeholder="Your full name"
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="mt-1 text-xs text-red-400 font-sans font-semibold"
                    role="alert"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-[11px] font-bold uppercase tracking-wider text-[#F7F2EA] mb-2 font-sans"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: "" }));
                  }}
                  className={`w-full px-4 py-3.5 bg-[#211B18] border rounded-xl text-[#F7F2EA] placeholder-[#91857B] focus:outline-none focus:border-[#C87D55] transition-all font-sans text-sm ${
                    errors.email
                      ? "border-red-500"
                      : "border-white/10"
                  }`}
                  placeholder="your@email.com"
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-1 text-xs text-red-400 font-sans font-semibold"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-[11px] font-bold uppercase tracking-wider text-[#F7F2EA] mb-2 font-sans"
                >
                  Inquiry Details
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message)
                      setErrors((p) => ({ ...p, message: "" }));
                  }}
                  className={`w-full px-4 py-3.5 bg-[#211B18] border rounded-xl text-[#F7F2EA] placeholder-[#91857B] focus:outline-none focus:border-[#C87D55] transition-all resize-y font-sans text-sm ${
                    errors.message
                      ? "border-red-500"
                      : "border-white/10"
                  }`}
                  placeholder="How can our culinary nutrition team assist you?"
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message ? (
                    <p
                      id="message-error"
                      className="text-xs text-red-400 font-sans font-semibold"
                      role="alert"
                    >
                      {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span
                    className="text-xs text-[#91857B] font-sans"
                  >
                    {message.length}/2000
                  </span>
                </div>
              </div>

              {status === "error" && (
                <p
                  className="text-xs text-red-400 bg-red-950/40 px-4 py-3 rounded-xl border border-red-800/60 font-sans"
                  role="alert"
                >
                  Unable to send message right now. Please try again or chat with us on WhatsApp.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 bg-[#C87D55] text-[#12100F] hover:bg-[#E09A72] border border-[#E09A72]/40 font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full cursor-pointer font-sans shadow-md inline-flex items-center gap-2"
              >
                <Send size={14} aria-hidden="true" />
                <span>{status === "loading" ? "Submitting..." : "Send Inquiry"}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-5">
          {/* WhatsApp CTA */}
          <div className="bg-[#211B18]/85 backdrop-blur-xl rounded-3xl p-8 text-[#F7F2EA] relative overflow-hidden border border-white/15 shadow-2xl">
            <div className="absolute -bottom-8 -right-8 opacity-10">
              <MessageCircle size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C87D55] border border-white/15">
                  <MessageCircle size={20} />
                </div>
                <h3
                  className="text-xl font-light font-serif text-[#F7F2EA]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Direct Concierge WhatsApp
                </h3>
              </div>
              <p className="text-[#C8BDB2] text-xs sm:text-sm mb-5 font-sans leading-relaxed">
                Need immediate help with custom dietary requirements or formulation recommendations? Reach our team directly.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Vitaura Nutrition! I have an inquiry regarding your clean formulations.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C87D55] text-[#12100F] text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full hover:bg-[#E09A72] transition-all shadow-md font-sans border border-[#E09A72]/40"
              >
                <MessageCircle size={16} />
                <span>Chat with Concierge</span>
              </a>
            </div>
          </div>

          {/* Kitchen Hub Card */}
          <div
            className="bg-[#1A1412] rounded-3xl overflow-hidden border border-white/10 flex-1 shadow-2xl"
          >
            <div className="h-40 relative bg-[#211B18]">
              <Image
                src="/images/rajkot-map.jpg"
                alt="Vitaura artisan kitchen location"
                fill
                className="object-cover opacity-75"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin size={36} className="text-[#C87D55] drop-shadow-md" />
              </div>
            </div>
            <div className="p-6 space-y-3">
              <h3
                className="text-lg font-semibold text-[#F7F2EA] font-serif"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Artisan Nutrition Kitchen
              </h3>
              <p className="text-[#C8BDB2] font-sans text-xs sm:text-sm leading-relaxed">
                Chef-crafted nutrition formulations prepared fresh daily in our small-batch kitchen.
              </p>
              <div className="flex items-center gap-2 text-[#C8BDB2]">
                <Mail size={16} strokeWidth={1.75} className="text-[#C87D55]" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-xs font-bold font-sans text-[#F7F2EA] hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h2
            className="text-2xl font-light text-[#F7F2EA] font-serif"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Follow the Journey
          </h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#F7F2EA] font-bold text-xs uppercase tracking-wider hover:text-[#C87D55] transition-colors font-sans"
          >
            <InstagramIcon size={16} />
            <span>@{INSTAGRAM_HANDLE}</span>
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DEMO_INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square relative overflow-hidden rounded-2xl group bg-[#1A1412] border border-white/10 shadow-md"
              aria-label={`View on Instagram: ${post.alt}`}
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-[#12100F]/0 group-hover:bg-[#12100F]/50 transition-colors duration-300 flex items-center justify-center">
                <InstagramIcon
                  size={28}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
