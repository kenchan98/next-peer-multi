'use client';

import useSound from 'use-sound';
import { useContent } from '@/hooks/useContent';
import { useState, useEffect } from 'react';

export default function Slots({ valueInSlots, resetValueInSlot, isAnswerCorrect }) {

    const [sound_click_r] = useSound('/assets/sound/click_reverse.mp3');
    const [colour, setColour] = useState('white') // consider calling this something like errorStateStyles

    const [animateIn, setAnimateIn] = useState('');
    const { puzzleAnswered } = useContent();
    //
    //
    const styles_correct = 'bg-game-green';
    const styles_incorrect = 'bg-game-pink animate-shake border-2 border-[#F43838]';

    return (
        <div className={`flex justify-around w-full`}>
            {
                valueInSlots.map((slot, i) => {
                    const isError = (isAnswerCorrect === false) && (slot.value !== slot.answer);
                    return <div className={`flex rounded-lg justify-center items-center aspect-square text-black text-xl min-w-8 max-w-12 w-auto
                                    ${isError ? styles_incorrect : (isAnswerCorrect ? styles_correct : 'bg-white')}`}
                        key={i}
                        onClick={() => {
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