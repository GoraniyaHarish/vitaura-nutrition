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
import { Button } from "@/components/ui/Button";
import { submitContact } from "@/lib/api";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919000000000";
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@gronliv.com";
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/gronliv";
const INSTAGRAM_HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "gronliv";

// Demo Instagram grid - DEMO DATA
const DEMO_INSTAGRAM_POSTS = [
  { id: 1, alt: "Fresh GronLiv shake with seasonal fruits", src: "/images/instagram/post-1.jpg" },
  { id: 2, alt: "Premium ingredients laid out on a clean surface", src: "/images/instagram/post-2.jpg" },
  { id: 3, alt: "GronLiv delivery being packed in our kitchen", src: "/images/instagram/post-3.jpg" },
  { id: 4, alt: "Green vitality shake in morning light", src: "/images/instagram/post-4.jpg" },
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
    <div className="container-gronliv py-10 md:py-16 space-y-14">
      {/* Page Header */}
      <section className="max-w-2xl">
        <h1
          className="text-display-lg-mobile md:text-display-lg text-[#154212] mb-4"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Get in Touch
        </h1>
        <p className="text-body-lg text-[#5f5e5a]">
          We&apos;d love to hear from you. Whether it&apos;s a question about
          our menu, an order, or just a hello — drop us a message.
        </p>
      </section>

      {/* Main Contact Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Contact Form (7 cols) */}
        <div
          className="md:col-span-7 bg-white rounded-3xl p-8 border border-[#c2c9bb]/20"
          style={{ boxShadow: "0 4px 12px rgba(27,51,26,0.04)" }}
        >
          <h2
            className="text-headline-sm text-[#154212] mb-6"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Send a Message
          </h2>

          {status === "success" ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-[#154212]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={28} className="text-[#154212]" />
              </div>
              <h3
                className="text-headline-sm text-[#154212] mb-2"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Message Sent!
              </h3>
              <p className="text-body-md text-[#42493e]">
                Thank you for reaching out. We&apos;ll get back to you as soon
                as possible.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-[#154212] font-semibold underline underline-offset-4"
                style={{ fontFamily: "var(--font-manrope)" }}
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
                  className="block text-label-md text-[#42493e] mb-2"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Name
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
                  className={`w-full px-4 py-3.5 bg-[#fff8f3] border rounded-xl text-[#1f1b15] placeholder-[#72796e] focus:outline-none focus:ring-2 focus:ring-[#154212]/10 transition-all ${
                    errors.name
                      ? "border-[#ba1a1a]"
                      : "border-[#c2c9bb]/40 focus:border-[#154212]"
                  }`}
                  style={{ fontFamily: "var(--font-merriweather)" }}
                  placeholder="Your name"
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="mt-1 text-sm text-[#ba1a1a]"
                    style={{ fontFamily: "var(--font-manrope)" }}
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
                  className="block text-label-md text-[#42493e] mb-2"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Email
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
                  className={`w-full px-4 py-3.5 bg-[#fff8f3] border rounded-xl text-[#1f1b15] placeholder-[#72796e] focus:outline-none focus:ring-2 focus:ring-[#154212]/10 transition-all ${
                    errors.email
                      ? "border-[#ba1a1a]"
                      : "border-[#c2c9bb]/40 focus:border-[#154212]"
                  }`}
                  style={{ fontFamily: "var(--font-merriweather)" }}
                  placeholder="your@email.com"
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-1 text-sm text-[#ba1a1a]"
                    style={{ fontFamily: "var(--font-manrope)" }}
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
                  className="block text-label-md text-[#42493e] mb-2"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Message
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
                  className={`w-full px-4 py-3.5 bg-[#fff8f3] border rounded-xl text-[#1f1b15] placeholder-[#72796e] focus:outline-none focus:ring-2 focus:ring-[#154212]/10 transition-all resize-y ${
                    errors.message
                      ? "border-[#ba1a1a]"
                      : "border-[#c2c9bb]/40 focus:border-[#154212]"
                  }`}
                  style={{ fontFamily: "var(--font-merriweather)" }}
                  placeholder="How can we help you?"
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message ? (
                    <p
                      id="message-error"
                      className="text-sm text-[#ba1a1a]"
                      style={{ fontFamily: "var(--font-manrope)" }}
                      role="alert"
                    >
                      {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span
                    className="text-xs text-[#72796e]"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {message.length}/2000
                  </span>
                </div>
              </div>

              {status === "error" && (
                <p
                  className="text-sm text-[#ba1a1a] bg-[#ffdad6] px-4 py-3 rounded-lg"
                  style={{ fontFamily: "var(--font-manrope)" }}
                  role="alert"
                >
                  Something went wrong. Please try again or reach us on
                  WhatsApp.
                </p>
              )}

              <Button
                type="submit"
                loading={status === "loading"}
                className="mt-2"
              >
                <Send size={16} aria-hidden="true" />
                Send Message
              </Button>
            </form>
          )}
        </div>

        {/* Right Column (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-5">
          {/* WhatsApp CTA */}
          <div className="bg-[#2d5a27] rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute -bottom-8 -right-8 opacity-10">
              <MessageCircle size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle size={28} />
                <h3
                  className="text-headline-sm"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  Instant Support
                </h3>
              </div>
              <p className="text-white/90 text-body-md mb-5">
                Need a quick answer about an order? Chat with our team directly
                on WhatsApp.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi GronLiv! I have a question about my order.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#154212] text-label-md px-6 py-3.5 rounded-xl font-bold hover:bg-[#f0e7dd] transition-colors shadow-sm"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Rajkot Hub Card */}
          <div
            className="bg-white rounded-3xl overflow-hidden border border-[#c2c9bb]/20 flex-1"
            style={{ boxShadow: "0 4px 12px rgba(27,51,26,0.04)" }}
          >
            <div className="h-40 relative bg-[#eae1d7]">
              <Image
                src="/images/rajkot-map.jpg"
                alt="GronLiv location in Rajkot"
                fill
                className="object-cover opacity-60 grayscale"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin size={48} className="text-[#154212] drop-shadow-md" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }} />
              </div>
            </div>
            <div className="p-6 space-y-3">
              <h3
                className="text-headline-sm text-[#154212]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Rajkot Kitchen
              </h3>
              <p className="text-body-md text-[#42493e]">
                Freshly prepared meals shipped directly from our central
                kitchen in Rajkot, Gujarat.
              </p>
              <div className="flex items-center gap-2 text-[#5f5e5a]">
                <Mail size={16} strokeWidth={1.75} />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-label-md hover:text-[#154212] transition-colors"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h2
            className="text-headline-sm text-[#154212]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Join the Community
          </h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#154212] font-semibold text-sm hover:underline underline-offset-4 transition-colors"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            <InstagramIcon size={16} />
            @{INSTAGRAM_HANDLE}
          </a>
        </div>
        {/* DEMO INSTAGRAM GRID — Replace with real Instagram feed */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DEMO_INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square relative overflow-hidden rounded-2xl group bg-[#eae1d7]"
              aria-label={`View on Instagram: ${post.alt}`}
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-[#154212]/0 group-hover:bg-[#154212]/20 transition-colors duration-300 flex items-center justify-center">
                <InstagramIcon
                  size={32}
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
