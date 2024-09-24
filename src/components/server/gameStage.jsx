import React, { useEffect, useState } from 'react';
import Slots from './slots';
import Image from 'next/image';
import Timer from '@/components/general/timer';
import useSound from 'use-sound';
import useCountDown from '@/hooks/useCountDown';
import { useContent } from '@/hooks/useContent';

export default function gameStage({ data }) {
    const [valueInSlots, setValueInSlots] = useState([]);
    const [fadeIn, setFadeIn] = useState('');
    const { count, reset, start, stop } = useCountDown();
    const { puzzleIndex, setPuzzleIndex, timeUp } = useContent();

    const [sound_next] = useSound('/assets/sound/next.mp3')
    //
    // when the count down is 0 then it set
    // puzzleIndex + 1 to the next puzzle
    useEffect(() => {
        if (count === 0) {
            stop();
            setPuzzleIndex(puzzleIndex + 1);
        }
    }, [count]);
    //
    // when the timer for the puzzle ends 
    // the count down to next puzzle begins
    useEffect(() => {
        if (timeUp) {
            // start the count down to next puzzle
            reset(10);
            start();
        }
    }, [timeUp]);
    //
    //
    useEffect(() => {
        if (data) {
            // populate the letters and its slots
            // answer is hidden to start with 
            let slots = []
            for (let i = 0; i < data.theAnswer.length; i++) {
                slots.push({ id: i, keyId: "", value: data.theAnswer[i] })
            }
            sound_next();
            setValueInSlots(slots);
            // fade in the whole content
            setFadeIn('animate-fadeIn');
            setTimeout(() => { setFadeIn('') }, 500);
        }
    }, [data]);
    //
    //
    return (
        <div className={`flex flex-col justify-center content-center items-center w-2/3 grow ${fadeIn}`}>
            {
                data &&
                (<div className="flex flex-col items-center m-20">
                    <Image className="w-full m-4 rounded-lg" src={`/assets/img/` + data.img} alt={data.img} width={0} height={0} sizes="100vw" />
                    <Slots valueInSlots={valueInSlots} />
                    {<Timer init_counter={30} />}
                    {timeUp && (<div className='absolute w-2/3 bottom-48 left-12 text-3xl m-4'>Next puzzle in {count}</div>)}
                </div>)
            }
        </div>
    );
}