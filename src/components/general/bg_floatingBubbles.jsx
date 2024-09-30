import React, { useEffect, useState } from 'react';

const FloatingBubbles = () => {
    const [bubbles, setBubbles] = useState([]);

    useEffect(() => {
        const createBubble = () => {
            const bubble = {
                id: Math.random(),
                left: 10 + Math.random() * 50,
                size: Math.random() * 30 + 10,
                animationDuration: Math.random() * 10 + 5,
            };
            setBubbles(prevBubbles => [...prevBubbles, bubble]);

            setTimeout(() => {
                setBubbles(prevBubbles => prevBubbles.filter(b => b.id !== bubble.id));
            }, bubble.animationDuration * 1000);
        };

        const interval = setInterval(createBubble, 500);

        return () => clearInterval(interval);
    }, []);

    return ( //fixed inset-0 overflow-hidden pointer-events-none bg-black
        <div className="absolute top-0 left-0 -z-10 inset-0 overflow-hidden pointer-events-none bg-black">
            {bubbles.map(bubble => (
                <div
                    key={bubble.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${bubble.left}%`,
                        width: `${bubble.size}px`,
                        height: `${bubble.size}px`,
                        animation: `float ${bubble.animationDuration}s linear infinite`,
                    }}
                />
            ))}
            <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(-30px);
            opacity: 0.4;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
};

export default FloatingBubbles;
