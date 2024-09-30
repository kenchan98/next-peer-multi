import React, { useEffect, useState } from 'react';

const StarLayer = ({ count, size, speed, zIndex }) => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const newStars = Array.from({ length: count }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 150}%`,
        }));
        setStars(newStars);
    }, [count]);

    return (
        <div
            className={`absolute inset-0 z-${zIndex}`}
            style={{
                perspective: '300px',
                animation: `gentle-rise ${speed}s linear infinite`
            }}
        >
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute bg-white rounded-full "
                    style={{
                        left: star.left,
                        top: star.top,
                        width: `${size}px`,
                        height: `${size}px`,
                        //transform: `translateZ(${zIndex * 5}px)`,
                        //animation: `twinkle 4s linear infinite`,
                    }}
                >
                    <style jsx>{`
                    @keyframes gentle-rise {
                        0% {
                            transform: translateY(100vh);
                            opacity:0.7;
                        }
                        100% {
                            transform: translateY(-100vh);
                            opacity: 0.2;
                        }
                    }

                    @keyframes twinkle {
                        0% { opacity: $.1 }
                        50% { opacity: .7 }
                        100% { opacity: .6 }
                    },
                `}</style>
                </div>

            ))}
        </div>
    );
};

const StarryNight = () => {
    return (
        <div className="-z-10 absolute top-0 left-0 inset-0 bg-gradient-to-b from-[#163252] to-[#090A0F] overflow-hidden">
            <StarLayer count={200} size={2} speed={250} zIndex={10} />
            <StarLayer count={180} size={3} speed={200} zIndex={20} />
            <StarLayer count={160} size={4} speed={50} zIndex={30} />
            <StarLayer count={180} size={3} speed={100} zIndex={20} />
            <StarLayer count={160} size={5} speed={350} zIndex={30} />
            <StarLayer count={10} size={8} speed={30} zIndex={30} />
        </div>
    );
};

export default StarryNight;