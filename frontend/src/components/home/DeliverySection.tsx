'use client';

import { useState } from 'react';
import Image from 'next/image';

export function DeliverySection() {
  const [pincode, setPincode] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode) return;
    
    setStatus('checking');
    // DEMO DATA - API connection stub
    setTimeout(() => {
      if (pincode.startsWith('360')) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }, 1000);
  };

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-stretch gap-0 bg-surface-container rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(27,51,26,0.08)]">
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-headline-sm md:text-headline-md font-manrope font-semibold text-primary mb-4">
              Freshly Delivered in Rajkot
            </h2>
            <p className="text-body-md font-merriweather text-on-surface-variant mb-8">
              We're currently serving the Rajkot area to ensure our products reach you perfectly fresh. Check if we deliver to your pincode.
            </p>
            
            <form onSubmit={checkPincode} className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Enter your Pincode"
                  className="flex-1 px-4 py-3 rounded-full border border-outline-variant bg-surface-container-lowest focus:outline-none focus:border-primary text-on-surface font-manrope"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  maxLength={6}
                />
                <button
                  type="submit"
                  disabled={status === 'checking' || pincode.length < 6}
                  className="px-8 py-3 bg-primary text-on-primary rounded-full font-manrope font-semibold hover:bg-primary-container transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'checking' ? 'Checking...' : 'Check'}
                </button>
              </div>
              
              <div className="h-6">
                {status === 'success' && (
                  <p className="text-green-700 font-manrope text-sm font-semibold">Great news! We deliver to your area.</p>
                )}
                {status === 'error' && (
                  <p className="text-red-600 font-manrope text-sm font-semibold">Sorry, we don't deliver to this pincode yet.</p>
                )}
              </div>
            </form>
          </div>
          
          <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px] relative">
            <Image
              src="/images/rajkot-map.jpg"
              alt="Rajkot Delivery Area Map"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
