import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const MessageCorrect = () => {
    const [showText, setShowText] = useState(false);
    //
    //
    useEffect(() => {
        const timer1 = setTimeout(() => setShowText(true), 500);
        return () => {
            clearTimeout(timer1);
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
                    <div className="flex mt-60 ">
                        <span
                            className="text-4xl font-bold text-black whitespace-nowrap opacity-0"
                            style={{
                                animation: 'slide-down 1s cubic-bezier(0.25, 1, 0.5, 1) forwards'
                            }}
                        >
                            CORRECT!
                            <span className="flex w-full justify-center my-16" style={{
                                animation: 'float-up-down 5s ease-in-out infinite'
                            }}>
                                <Image src="/assets/img/icon_cup.svg" width={80} height={80} alt="icon" />
                            </span>
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
                opacity: 1; 
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

        @keyframes float-up-down {
         0%{
            transform: translateY(-20%);
         }
         50%{
            transform: translateY(20%);
         }
         100%{
            transform: translateY(-20%);
         }
        }
      `}</style>
        </div>
    )
}

export default MessageCorrect;