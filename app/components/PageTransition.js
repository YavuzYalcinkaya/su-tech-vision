"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

// NProgress yapılandırması
NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 400,
  showSpinner: false,
  trickleSpeed: 100,
});

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("visible");

  const handleRouteChangeStart = useCallback(() => {
    setIsLoading(true);
    setTransitionStage("fadeOut");
    NProgress.start();
  }, []);

  const handleRouteChangeEnd = useCallback(() => {
    NProgress.done();
    setTransitionStage("fadeIn");
    setTimeout(() => {
      setIsLoading(false);
      setTransitionStage("visible");
    }, 300);
  }, []);

  useEffect(() => {
    // Sayfa değiştiğinde animasyon
    handleRouteChangeStart();
    
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      handleRouteChangeEnd();
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, children, handleRouteChangeStart, handleRouteChangeEnd]);

  // İlk yüklemede doğrudan göster
  useEffect(() => {
    setDisplayChildren(children);
  }, [children]);

  return (
    <>
      {/* NProgress Custom Styles */}
      <style jsx global>{`
        #nprogress {
          pointer-events: none;
        }
        
        #nprogress .bar {
          background: linear-gradient(to right, #22d3ee, #3b82f6, #8b5cf6);
          position: fixed;
          z-index: 9999;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          box-shadow: 0 0 10px #22d3ee, 0 0 5px #3b82f6;
        }
        
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 15px #22d3ee, 0 0 10px #3b82f6;
          opacity: 1;
          transform: rotate(3deg) translate(0px, -4px);
        }

        /* Animasyon sınıfları */
        .page-transition-fadeOut {
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 200ms ease-out, transform 200ms ease-out;
        }
        
        .page-transition-fadeIn {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 300ms ease-in, transform 300ms ease-in;
        }
        
        .page-transition-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Page Content with Transition */}
      <div
        className={`page-transition-${transitionStage}`}
        style={{
          minHeight: "calc(100vh - 80px)",
        }}
      >
        {displayChildren}
      </div>

      {/* Loading Overlay (optional subtle overlay) */}
      {isLoading && (
        <div 
          className="fixed inset-0 z-40 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(15, 23, 42, 0.3) 100%)",
            opacity: transitionStage === "fadeOut" ? 1 : 0,
            transition: "opacity 200ms ease",
          }}
        />
      )}
    </>
  );
}
