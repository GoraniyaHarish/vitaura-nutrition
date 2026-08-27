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
  { href: "/about", label: "About Vitaura" },
  { href: "/delivery", label: "Delivery Areas" },
  { href: "/contact", label: "Contact Us" },
];

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_VITAURA_WHATSAPP_NUMBER ||
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
  "919000000000";
const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_VITAURA_INSTAGRAM_URL ||
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
  "https://instagram.com/vitauranutrition";
const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_VITAURA_CONTACT_EMAIL ||
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
  "hello@vitauranutrition.com";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#0D0B0A] text-[#F7F2EA] border-t border-white/10 pb-20 md:pb-0"
      aria-label="Site footer"
    >
      <div className="container-vitaura py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block" aria-label="Vitaura Nutrition — Home">
              <Image
                src="/images/logo.png"
                alt="Vitaura Nutrition — Pure Nutrition. Elevated Living."
                width={220}
                height={80}
                className="h-12 md:h-14 w-auto object-contain brightness-0 invert opacity-95"
              />
            </Link>
            <p className="text-sm text-[#C8BDB2] max-w-sm leading-relaxed font-sans">
              Vitaura is a private culinary atelier offering chef-crafted protein shakes, organic wellness bowls, and nutrient-dense power bites made from 100% whole, clean superfoods.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C87D55] font-sans uppercase tracking-wider">
              <MapPin size={14} className="text-[#C87D55]" aria-hidden="true" />
              <span>Small-Batch Kitchen • Cold-Chain Protected</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-white/15 text-[#C8BDB2] hover:text-[#F7F2EA] hover:border-[#C87D55] hover:bg-[#C87D55]/15 transition-colors"
                aria-label="Vitaura Nutrition on Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-white/15 text-[#C8BDB2] hover:text-[#F7F2EA] hover:border-[#C87D55] hover:bg-[#C87D55]/15 transition-colors"
                aria-label="Chat with Vitaura Nutrition on WhatsApp"
              >
                <MessageCircle size={18} strokeWidth={1.75} />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="p-2.5 rounded-full border border-white/15 text-[#C8BDB2] hover:text-[#F7F2EA] hover:border-[#C87D55] hover:bg-[#C87D55]/15 transition-colors"
                aria-label={`Email Vitaura Nutrition at ${CONTACT_EMAIL}`}
              >
                <Mail size={18} strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3
              className="text-xs font-bold text-[#C87D55] mb-4 font-sans uppercase tracking-widest"
            >
              EXPLORE
            </h3>
            <ul className="space-y-3" role="list">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#C8BDB2] hover:text-[#F7F2EA] hover:underline underline-offset-4 transition-colors font-sans"
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
              className="text-xs font-bold text-[#C87D55] mb-4 font-sans uppercase tracking-widest"
            >
              CONCIERGE ORDER
            </h3>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to order from Vitaura Nutrition.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C87D55] text-[#12100F] text-xs font-bold font-sans uppercase tracking-wider px-5 py-3 rounded-full hover:bg-[#E09A72] transition-colors mb-6 shadow-md border border-[#E09A72]/40"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
            <ul className="space-y-3" role="list">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[#91857B] text-xs hover:text-[#F7F2EA] transition-colors font-sans"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-[#91857B] text-xs text-center md:text-left font-sans"
          >
            © {currentYear} Vitaura Nutrition.
            <span className="text-[#F7F2EA] font-semibold"> Pure Superfoods. Chef-Crafted Daily.</span>
          </p>
          <p
            className="text-[#91857B] text-xs font-sans"
          >
            100% Whole & Clean Botanical Ingredients
          </p>
        </div>
      </div>
    </footer>
  );
}
