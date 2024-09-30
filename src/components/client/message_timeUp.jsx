import React, { useEffect, useState, useRef } from 'react';

const MessageTimeUp = () => {
  const [showText, setShowText] = useState(false);
  //
  //
  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500); // 2s for background fade
    return () => clearTimeout(timer);
  }, []);

  return (
    //flex flex-col h-screen gap-4 m-3 content-center justify-center text-center text-3xl
    <div className="absolute flex top-0 left-0 justify-center h-screen w-screen">
      {showText && (
        <div className="flex font-[family-name:var(--font-ibm-bi)]">
          <div className="fixed top-0 left-0 flex h-screen w-screen" style={{
            animation: 'fade-bg .5s ease-out forwards'
          }}>
          </div>
          <div className="flex space-x-3 mt-60">
            <span
              className="text-4xl font-bold text-white whitespace-nowrap opacity-0"
              style={{
                animation: 'slide-in-left 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards'
              }}
            >
              TIME'S
            </span>
            <span
              className="text-4xl font-bold text-white whitespace-nowrap opacity-0"
              style={{
                animation: 'slide-in-right 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards'
              }}
            >
              UP
            </span>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes fade-bg {
            from { 
                background-color: black;
                opacity:0; }
            to { 
                background-color: #FD4A4A;
                opacity: 1; 
            }
        }
        @keyframes slide-in-left {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          70% {
            transform: translateX(5%);
            opacity: 1;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slide-in-right {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          70% {
            transform: translateX(-5%);
            opacity: 1;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default MessageTimeUp;