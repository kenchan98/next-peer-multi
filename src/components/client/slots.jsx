'use client';

import useSound from 'use-sound';
import { useContent } from '@/hooks/useContent';
import { useState, useEffect } from 'react';

export default function Slots({ valueInSlots, resetValueInSlot, animateResultInSlots }) {

    const [sound_click_r] = useSound('/assets/sound/click_reverse.mp3');
    const [colour, setColour] = useState('white')
    const [allCorrect, setAllCorrect] = useState(false)
    const { puzzleAnswered } = useContent();
    //
    //
    useEffect(() => {
        if (animateResultInSlots === 'correct') {
            //setColour('bg-game-green');
            setAllCorrect(true)
        } else if (animateResultInSlots === 'incorrect') {
            setColour('bg-white animate-shake border-2 border-[#F43838]');
        } else {
            setColour('bg-white');
        }
    }, [animateResultInSlots])
    //
    //
    useEffect(() => {
        console.log(valueInSlots)
    }, [valueInSlots]);
    //
    //
    return (
        <div className={`flex justify-around w-full`}>
            {
                valueInSlots.map((slot, i) => {
                    // adjust the width of the slot depending on the number of letters
                    return <div className={`flex rounded-lg justify-center items-center aspect-square text-black text-xl
                                w-${valueInSlots.length > 8 ? '8' : '8'} 
                                ${allCorrect ? 'bg-game-green' : (slot.value !== slot.answer ? colour : 'bg-white')}`}
                        key={i} onClick={() => {
                            if (!puzzleAnswered && slot.value !== "") {
                                resetValueInSlot(slot);
                                sound_click_r();
                            }
                        }}>{slot.value}</div>
                })
            }
        </div>
    );
}