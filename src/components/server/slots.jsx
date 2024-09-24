'use client';

import useSound from 'use-sound';
import { useContent } from '@/hooks/useContent';
import { useEffect, useState } from 'react';

export default function Slots({ valueInSlots }) {
    const [reveal, setReveal] = useState(false);
    const { timeUp } = useContent();
    const [sound_reveal] = useSound('/assets/sound/tada-fanfare.mp3')

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
        <div className={`flex ${valueInSlots.length <= 5 ? 'gap-6' : 'gap-2'} justify-center w-full`}>
            {valueInSlots.map((slot, index) => (
                <div
                    key={index}
                    style={{
                        width: valueInSlots.length <= 3
                            ? `calc(${100 / 3}% - 0.5rem)`
                            : `calc(${100 / valueInSlots.length}% - 0.5rem)`,
                        maxWidth: '5rem' // This is equivalent to max-w-24
                    }}
                >
                    <div className="aspect-square bg-white w-full rounded-xl flex items-center justify-center p-2">
                        <span className={`font-[family-name:var(--font-ibm-m)] text-black text-5xl ${reveal ? 'animate-textPopGlow opacity-100' : 'opacity-0'}`}>{slot.value}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

/*
<div className="flex flex-wrap justify-center gap-2 w-full ">
            {valueInSlots.map((slot, index) => (
                <div
                    key={index}
                    className="bg-blue-500 "
                    style={{ minWidth: `calc(${100 / valueInSlots.length}% - 0.5rem)` }}
                >
                    <div className="aspect-square bg-white max-w-24 rounded-xl"><span>{slot.value}</span></div>
                </div>
            ))}
        </div>
        */
/*
<div className={`flex justify-around rounded-xl w-full`}>
            {
                valueInSlots.map((slot, i) => {
                    return (<div className="flex aspect-square rounded-xl justify-center items-center bg-white font-bold text-6xl text-black w-20" key={i} >
                        <span className={`${timeUp ? "" : "hidden"}`}>{slot.value}</span>
                    </div>)
                })
            }
        </div>*/

/*
<div
            key={index}
            className="bg-blue-500 "
            style={{ minWidth: `calc(${100 / valueInSlots.length}% - 0.5rem)` }}
        >
            <div className="aspect-square bg-white max-w-24 rounded-xl"><span>{slot.value}</span></div>
        </div>*/