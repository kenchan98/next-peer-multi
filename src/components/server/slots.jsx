'use client';

import useSound from 'use-sound';
import { useContent } from '@/hooks/useContent';
import { useEffect, useState } from 'react';

export default function Slots({ valueInSlots }) {
    const [reveal, setReveal] = useState(false);
    const [animateIn, setAnimateIn] = useState('');
    const { timeUp } = useContent();
    const [sound_reveal] = useSound('/assets/sound/tada-fanfare.mp3');


    useEffect(() => {
        setAnimateIn('animate-dropIn');
        const timer = setTimeout(() => {
            setAnimateIn('')
        }, 1500)

        return () => clearTimeout(timer)
    }, [valueInSlots])

    useEffect(() => {
        let timeoutReveal;
        if (timeUp) {
            timeoutReveal = setTimeout(() => {
                setReveal(true);
            }, 700);
        } else {
            setReveal(false);
        }
        return () => clearTimeout(timeoutReveal);
    }, [timeUp]);
    //
    //
    useEffect(() => {
        // play the reveal of the answer sound
        if (reveal) sound_reveal();
    }, [reveal])
    //
    //
    return (
        <div className={`flex ${valueInSlots.length <= 6 ? 'gap-6' : 'gap-2'} m-8 justify-center w-full`}>
            {valueInSlots.map((slot, index) => (
                <div
                    key={`slot-${index}`}
                    className={`flex items-center justify-center p-2 
                        min-w-20 max-w-24 w-auto aspect-square rounded-xl
                        font-[family-name:var(--font-ibm-m)] text-black text-6xl
                        ${animateIn}
                        ${reveal ? 'bg-game-green' : 'bg-white'}`}
                    style={{ animationDelay: `${index * 70}ms` }}
                >
                    <span className={`${reveal ? 'animate-textPopGlow opacity-100' : 'opacity-0'}`}>{slot.value}</span>
                </div>
            ))}
        </div>

    )
}

/*

<div
                    key={index}
                    style={{
                        width: valueInSlots.length <= 6
                            ? `calc(${100 / 6}% - 2rem)`
                            : `calc(${100 / valueInSlots.length}% - 1rem)`,
                        maxWidth: '7rem' // This is equivalent to max-w-24
                    }}
                >
                    <div className={`aspect-square ${reveal ? 'bg-game-green' : 'bg-white'} w-full rounded-xl flex items-center justify-center p-2`}>
                        <span className={`font-[family-name:var(--font-ibm-m)] text-black text-6xl ${reveal ? 'animate-textPopGlow opacity-100' : 'opacity-0'}`}>{slot.value}</span>
                    </div>
                </div>
                */