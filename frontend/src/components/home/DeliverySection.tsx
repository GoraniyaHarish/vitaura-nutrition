'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { checkDelivery } from '@/lib/api';

export function DeliverySection() {
  const [pincode, setPincode] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleCheckPincode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) return;
    
    setStatus('checking');
    setMessage('');

    try {
      const res = await checkDelivery(pincode);
      if (res.available || res.eligible) {
        setStatus('success');
        setMessage(res.estimatedMinutes ? `Delivery active! Estimated time: ${res.estimatedMinutes} mins.` : 'Great news! Cold-chain dispatch is active in your area.');
      } else {
        setStatus('error');
        setMessage(res.message || 'We are expanding our temperature-protected zone to your area soon.');
      }
    } catch {
      // Fallback for offline/local simulation
      if (pincode.startsWith('360')) {
        setStatus('success');
        setMessage('Great news! Cold-chain dispatch is active in your area (30–45 mins).');
      } else {
        setStatus('error');
        setMessage('We are expanding our temperature-protected zone to your area soon.');
      }
    }
  };

  return (
    <section className="py-20 md:py-32 bg-transparent border-b border-white/10">
      <div className="container-vitaura">
        <div className="flex flex-col md:flex-row items-stretch gap-0 bg-[#1A1412]/85 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
          
          {/* Left Column: Form & Info */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-14 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-[#211B18] text-[#C87D55] text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest font-sans border border-white/10 self-start shadow-xs">
              <Sparkles size={13} className="text-[#C87D55]" aria-hidden="true" />
              <span>Cold-Chain Protection</span>
            </div>
            
            <h2
              className="text-3xl sm:text-4xl font-light text-[#F7F2EA] mb-3 tracking-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Fresh Direct Dispatch
            </h2>
            <p className="text-[#C8BDB2] text-sm sm:text-base font-sans leading-relaxed mb-8">
              We ensure all chef-crafted formulations reach you in peak enzymatic freshness through temperature-monitored cold-chain transit.
            </p>
            
            <form onSubmit={handleCheckPincode} className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91857B]" />
                  <input
                    type="text"
                    placeholder="Enter 6-digit Pincode (e.g. 360001)"
                    className="w-full pl-11 pr-4 py-3.5 rounded-full border border-white/10 bg-[#211B18] focus:outline-none focus:border-[#C87D55] text-[#F7F2EA] font-sans text-xs sm:text-sm placeholder:text-[#91857B]"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    maxLength={6}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'checking' || pincode.length < 6}
                  className="px-7 py-3.5 bg-[#C87D55] text-[#12100F] rounded-full font-sans font-bold text-xs uppercase tracking-widest hover:bg-[#E09A72] transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-[#E09A72]/40 cursor-pointer shadow-md shrink-0"
                >
                  {status === 'checking' ? 'Checking...' : 'Verify'}
                </button>
              </div>
              
              <div className="min-h-6 pt-1">
                {status === 'success' && (
                  <p className="text-[#6D9B79] font-sans text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="shrink-0" />
                    <span>{message}</span>
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-[#C96A62] font-sans text-xs font-semibold flex items-center gap-1.5">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{message}</span>
                  </p>
                )}
              </div>
            </form>
          </div>
          
          {/* Right Column: Service Map */}
          <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[320px] relative border-t md:border-t-0 md:border-l border-white/10">
            <Image
              src="/images/rajkot-map.jpg"
              alt="Vitaura Cold-Chain Delivery Service Area across Rajkot"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12100F]/70 via-transparent to-transparent flex items-end p-6 pointer-events-none">
              <span className="bg-[#12100F]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#F7F2EA] font-sans border border-white/15 shadow-md">
                📍 Active Service Hub: Rajkot Central & Ring Road
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
