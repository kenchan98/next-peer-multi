import React, { useEffect, useState, useRef } from 'react';
import ShowConfetti from './showConfetti';

const MessageCorrect = () => {
    const [showText, setShowText] = useState(false);
    const [confetti, setConfetti] = useState(false);
    //
    //
    useEffect(() => {
        const timer1 = setTimeout(() => setShowText(true), 500);
        const timer2 = setTimeout(() => setConfetti(true), 1000);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        }
    }, []);

    return (
        <div className="absolute flex top-0 left-0 justify-center h-screen w-screen">
            {showText && (
                <div className="flex font-[family-name:var(--font-ibm-bi)]">
                    <div className="fixed top-0 left-0 flex h-screen w-screen" style={{
                        animation: 'fade-bg .5s ease-out forwards'
                    }}>
                    </div>
                    <div className="flex mt-60">
                        {confetti && <ShowConfetti />}
                        <span
                            className="text-4xl font-bold text-black whitespace-nowrap opacity-0"
                            style={{
                                animation: 'slide-down 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards'
                            }}
                        >
                            CORRECT!
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
                background-color: #B2EC68;
                opacity: 0.8; 
            }
        }
        @keyframes slide-down {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          70% {
            transform: translateY(5%);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    )
}

export default MessageCorrect;