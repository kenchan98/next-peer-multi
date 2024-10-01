import React, { useEffect, useState } from 'react';
import Slots from './slots';
import Image from 'next/image';
import Timer from '@/components/general/timer';
import useSound from 'use-sound';
import useCountDown from '@/hooks/useCountDown';
import { useContent } from '@/hooks/useContent';

export default function GameStage({ data, puzzleIndexRangeEnd }) {
    const [valueInSlots, setValueInSlots] = useState([]);
    const [fadeIn, setFadeIn] = useState('');
    const { count, reset, start, stop } = useCountDown();
    const { puzzleIndex, setPuzzleIndex, setScreenIndex, timeUp, bottomHeight } = useContent();

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
            if (puzzleIndex === puzzleIndexRangeEnd - 1) {
                const timer = setTimeout(() => {
                    setScreenIndex(4);
                }, 4000);

                return () => clearTimeout(timer)
            } else {
                // start the count down to next puzzle
                reset(15);
                start();
            }
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
        <div className={`flex flex-col justify-center content-center items-center ${fadeIn}`}>
            {
                data &&
                (<>
                    <Image className="w-[45vh] m-8 rounded-3xl" src={`/assets/img/` + data.img} alt={data.img} width={0} height={0} sizes="100vw" />
                    <Slots valueInSlots={valueInSlots} />
                    <div className={`fixed bottom-0 font-[family-name:var(--font-ibm-r)] text-[2.5vw] text-white ${bottomHeight}`}>
                        {timeUp ?
                            ((puzzleIndex === puzzleIndexRangeEnd - 1) ? <></> : (count < 13) ? <div className='animate-fadeIn'>NEXT PUZZLE IN {count}</div> : <></>) :
                            (<Timer init_counter={30} />)
                        }
                    </div>
                </>)
            }
        </div>
    );
}


