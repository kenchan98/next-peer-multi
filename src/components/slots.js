'use client';

import useSound from 'use-sound';
import { useContent } from '@/hooks/useContent';
import { useEffect } from 'react';
export default function Slots({ valueInSlots, resetValueInSlot, animateResultInSlots }) {

    const [sound_click_r] = useSound('/assets/click_reverse.mp3');
    const { puzzleAnswered } = useContent();
    //
    //
    return (
        //flex flex-row gap-2 m-4 p-2
        //grid grid-cols-5 gap-4 place-items-center mt-4
        <div className={`flex justify-around rounded-xl w-5/6 ${animateResultInSlots}`}>
            {
                valueInSlots.map((slot, i) => {
                    return <div className="slot aspect-square text-black" key={i} onClick={() => {
                        if (!puzzleAnswered && slot.value !== "") {
                            resetValueInSlot(slot);
                            sound_click_r();
                        }
                    }}>{slot.value}</div>
                })
            }
        </div>
    )
}