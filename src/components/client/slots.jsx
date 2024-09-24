'use client';

import useSound from 'use-sound';
import { useContent } from '@/hooks/useContent';

export default function Slots({ valueInSlots, resetValueInSlot, animateResultInSlots }) {

    const [sound_click_r] = useSound('/assets/sound/click_reverse.mp3');
    const { puzzleAnswered } = useContent();
    //
    //
    return (
        <div className={`flex justify-around w-full ${animateResultInSlots}`}>
            {
                valueInSlots.map((slot, i) => {
                    return <div className="flex w-10 bg-white rounded-lg justify-center items-center aspect-square text-black text-xl" key={i} onClick={() => {
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