"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ShieldAlert, HeartPulse } from "lucide-react";
import Script from "next/script";

const adultImages = [
  "https://i.ibb.co/tTSCX6LK/download-12.jpg",
  "https://i.ibb.co/k6VRTBw6/download-14.jpg",
  "https://i.ibb.co/LdG4W1Nk/download-9.jpg",
  "https://i.ibb.co/VpqFwBKM/download-13.jpg",
];

// Real Ad Components using Adsterra Codes
const AdsterraBanner = () => {
  useEffect(() => {
    // Only inject once
    const container = document.getElementById("container-c790c11f43e36fac15a2938311d559ca");
    if (container && !container.hasChildNodes()) {
      const script = document.createElement("script");
      script.src = "https://walkingdrunkard.com/c790c11f43e36fac15a2938311d559ca/invoke.js";
      script.async = true;
      script.dataset.cfasync = "false";
      container.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center relative shrink-0 overflow-hidden my-1">
      <div id="container-c790c11f43e36fac15a2938311d559ca" className="min-w-[320px] min-h-[50px] flex justify-center"></div>
    </div>
  );
};

const AdsterraSocialBar = () => (
  <Script src="https://walkingdrunkard.com/31/6a/5a/316a5a2ae616c2865bce64654eb5436f.js" strategy="lazyOnload" />
);

const AdsterraPopunder = () => (
  <Script src="https://walkingdrunkard.com/05/8f/16/058f16578c078bdca3e7872a27e39676.js" strategy="lazyOnload" />
);

export default function Home() {
  const [is18Plus, setIs18Plus] = useState<boolean | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesPreloaded, setImagesPreloaded] = useState<Set<number>>(new Set());

  const getImageUrl = useCallback((index: number) => {
    return adultImages[index % adultImages.length];
  }, []);

  // Preload next image for instant swapping
  useEffect(() => {
    if (is18Plus) {
      const nextIndex = currentIndex + 1;
      if (!imagesPreloaded.has(nextIndex)) {
        const img = new window.Image();
        img.src = getImageUrl(nextIndex);
        img.onload = () => {
          setImagesPreloaded((prev) => new Set(prev).add(nextIndex));
        };
      }
    }
  }, [currentIndex, is18Plus, imagesPreloaded, getImageUrl]);

  // Handle preventing context menu and dragging globally
  useEffect(() => {
    const disableContextMenu = (e: MouseEvent) => e.preventDefault();
    const disableDrag = (e: DragEvent) => e.preventDefault();

    document.addEventListener("contextmenu", disableContextMenu);
    document.addEventListener("dragstart", disableDrag);

    // Disable touch callouts (iOS save image prompt)
    document.body.style.setProperty("-webkit-touch-callout", "none");
    document.body.style.userSelect = "none";

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("dragstart", disableDrag);
      document.body.style.removeProperty("-webkit-touch-callout");
      document.body.style.userSelect = "";
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  // Age Gate
  if (is18Plus === null) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center p-4 z-50">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-zinc-950 border border-red-900/40 p-8 rounded-2xl max-w-sm w-full text-center shadow-[0_0_50px_rgba(220,38,38,0.15)] relative overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-600/20 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-600/20 rounded-full blur-[60px] pointer-events-none" />
          
          <div className="w-16 h-16 bg-red-950/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-900/50 relative z-10">
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2 relative z-10">18+ WARNING</h1>
          <p className="text-zinc-400 text-sm mb-8 relative z-10">
            This website contains adult-themed content restricted to individuals 18 years of age or older. 
            By entering, you confirm you are of legal age.
          </p>
          
          <div className="space-y-3 relative z-10">
            <button 
              onClick={() => setIs18Plus(true)}
              className="w-full bg-gradient-to-r from-red-700 to-purple-800 text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(220,38,38,0.3)]"
            >
              I am 18 or older - Enter
            </button>
            <button 
              onClick={() => window.location.href = "https://google.com"}
              className="w-full bg-zinc-900 text-zinc-400 font-medium py-3 px-4 rounded-xl hover:bg-zinc-800 active:scale-[0.98] transition-all text-sm border border-zinc-800"
            >
              Exit
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main App with scrolling enabled for ads
  return (
    <main className="min-h-[100dvh] w-full bg-black flex flex-col relative font-sans max-w-lg mx-auto sm:border-x sm:border-zinc-900 pb-24">
      <AdsterraPopunder />
      <AdsterraSocialBar />
      
      {/* Header */}
      <header className="w-full p-3 flex justify-between items-center bg-black z-30 shrink-0 border-b border-zinc-900 sticky top-0">
        <div className="text-red-500 font-black tracking-widest text-xl flex items-center gap-2 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">
          NOIR<span className="text-white font-light">VIEW</span>
        </div>
        <div className="px-3 py-1 bg-red-950/40 border border-red-900/50 rounded-full flex items-center gap-2 shadow-[0_0_10px_rgba(220,38,38,0.2)]">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-500 text-xs font-bold uppercase tracking-wider">Hot</span>
        </div>
      </header>

      {/* Standard Ad Banner */}
      <div className="shrink-0 z-20 relative w-full flex justify-center py-1">
        <AdsterraBanner />
      </div>

      {/* Image Gallery Area */}
      <div className="w-full relative z-10 px-2 flex flex-col justify-center mt-4">
        
        <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.15)] bg-zinc-950 border border-zinc-800/50">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={getImageUrl(currentIndex)}
                alt="Gallery Content"
                fill
                priority
                referrerPolicy="no-referrer"
                className="object-cover pointer-events-none select-none" // Prevents interaction natively
                draggable={false}
                unoptimized
              />
              {/* Invisible overlay to absolutely block right-clicks and long presses on the image tag itself */}
              <div 
                className="absolute inset-0 z-20" 
                style={{ WebkitTouchCallout: 'none' }}
                onContextMenu={(e) => e.preventDefault()}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Big Next Button at Bottom */}
      <div className="w-full p-4 relative z-20 mt-2">
        <button 
          onClick={handleNext}
          className="w-full relative group overflow-hidden bg-gradient-to-r from-red-800 to-red-600 rounded-2xl border border-red-500 hover:border-red-400 transition-all shadow-[0_0_25px_rgba(220,38,38,0.4)] active:scale-[0.98] h-16"
        >
          {/* Ambient hover glow inside button */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="px-6 h-full flex items-center justify-center gap-3 relative z-10">
            <HeartPulse className="w-5 h-5 text-white animate-pulse" />
            <span className="font-extrabold text-white text-xl tracking-widest uppercase text-shadow-sm">Show Me More</span>
            <ChevronRight className="w-6 h-6 text-white" />
          </div>
        </button>
      </div>

      {/* Scrollable Ads Area */}
      <div className="w-full flex flex-col gap-4 px-4 pb-10">
        <div className="w-full min-h-[250px] bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded-xl relative group shadow-[0_0_15px_rgba(220,38,38,0.1)]">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-purple-900/20 to-red-900/20 opacity-50" />
          <span className="text-zinc-600 font-bold text-sm tracking-widest relative z-10 text-center">
            AD SPACE<br/>
            <span className="text-xs font-normal">ADD MORE AD SCRIPTS HERE</span>
          </span>
        </div>
      </div>

    </main>
  );
}
