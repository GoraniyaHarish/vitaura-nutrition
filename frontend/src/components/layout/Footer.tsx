import Link from "next/link";
import Image from "next/image";
import { MessageCircle, MapPin, Mail } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
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
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const FOOTER_LINKS = [
  { href: "/menu", label: "Our Menu" },
  { href: "/about", label: "About GronLiv" },
  { href: "/delivery", label: "Delivery Areas" },
  { href: "/contact", label: "Contact Us" },
];

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919000000000";
const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/gronliv";
const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@gronliv.com";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#FAF8F5] border-t border-[#183324]/10 pb-20 md:pb-0"
      aria-label="Site footer"
    >
      <div className="container-gronliv py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block" aria-label="GronLiv — Home">
              <Image
                src="/images/logo.jpg"
                alt="GrønLív — Eat Better. Live Better."
                width={240}
                height={90}
                className="h-14 md:h-16 w-auto object-contain mix-blend-multiply"
              />
            </Link>
            <p className="text-body-md text-[#48544D] max-w-sm leading-relaxed font-merriweather">
              Freshly prepared organic nutrition shakes crafted with real superfood ingredients.
              No artificial preservatives. Delivered fresh across Rajkot.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#112419] font-manrope uppercase tracking-wider">
              <MapPin size={14} className="text-[#C8A265]" aria-hidden="true" />
              <span>Cold-Chain Kitchen in Rajkot, Gujarat</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-[#183324]/20 text-[#48544D] hover:text-[#112419] hover:border-[#112419] transition-colors"
                aria-label="GronLiv on Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-[#183324]/20 text-[#48544D] hover:text-[#112419] hover:border-[#112419] transition-colors"
                aria-label="Chat with GronLiv on WhatsApp"
              >
                <MessageCircle size={18} strokeWidth={1.75} />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="p-2.5 rounded-full border border-[#183324]/20 text-[#48544D] hover:text-[#112419] hover:border-[#112419] transition-colors"
                aria-label={`Email GronLiv at ${CONTACT_EMAIL}`}
              >
                <Mail size={18} strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3
              className="text-xs font-bold text-[#112419] mb-4 font-manrope uppercase tracking-widest"
            >
              EXPLORE
            </h3>
            <ul className="space-y-3" role="list">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-body-md text-[#48544D] hover:text-[#112419] transition-colors font-merriweather"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + WhatsApp CTA */}
          <div>
            <h3
              className="text-xs font-bold text-[#112419] mb-4 font-manrope uppercase tracking-widest"
            >
              QUICK ORDER
            </h3>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to order fresh shakes from GronLiv 🧋")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#112419] text-[#FAF8F5] text-xs font-bold font-manrope uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-[#183324] transition-colors mb-6 border border-[#C8A265]/20 shadow-xs"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
            <ul className="space-y-3" role="list">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[#48544D] text-xs hover:text-[#112419] transition-colors font-manrope"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#183324]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-[#48544D] text-xs text-center md:text-left font-manrope"
          >
            © {currentYear} GrønLív. Freshly Prepared in Rajkot.
            <span className="text-[#112419] font-bold"> Eat Better - Live Better.</span>
          </p>
          <p
            className="text-[#48544D] text-xs font-manrope"
          >
            Organic Nutrition & Superfoods 🧋
          </p>
        </div>
      </div>
    </footer>
  );
}
