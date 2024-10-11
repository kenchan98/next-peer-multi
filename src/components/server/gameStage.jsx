import React, { useEffect, useState } from 'react';
import Slots from './slots';
import Image from 'next/image';
import Timer from '@/components/general/timer';
import useSound from 'use-sound';
import useCountDown from '@/hooks/useCountDown';
import { useContent } from '@/hooks/useContent';

export default function GameStage({ data, puzzleIndexRangeEnd, setPuzzleIndexRangeInTheRound }) {
    const [valueInSlots, setValueInSlots] = useState([]);
    const [animateIn, setAnimateIn] = useState('');
    const { count, reset, start, stop } = useCountDown();
    const { puzzleIndex, setPuzzleIndex, setScreenIndex, timeUp } = useContent();

    const [sound_next] = useSound('/assets/sound/next.mp3');
    //
    // when the count down is 0 then it set
    // puzzleIndex + 1 to the next puzzle
    useEffect(() => {
        let timer;
        if (count === 0) {
            stop();
            setAnimateIn('animate-fadeOut');
            timer = setTimeout(() => {
                setPuzzleIndex(puzzleIndex + 1);
            }, 500);
        }
        return () => {
            clearTimeout(timer)
        }
    }, [count]);
    //
    // when the timer for the puzzle ends 
    // the count down to next puzzle begins
    useEffect(() => {
        if (timeUp) {
            if (puzzleIndex === puzzleIndexRangeEnd - 1) {
                const timer = setTimeout(() => {
                    setPuzzleIndexRangeInTheRound();
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
            setAnimateIn('animate-fadeIn');
            const timer = setTimeout(() => { setAnimateIn('') }, 500);

            return () => clearTimeout(timer);
        }
    }, [data]);
    //
    //
    return (
        <div className={`flex flex-col justify-center content-between items-center`}>
            {
                data &&
                (<>
                    <Image className={`w-[45vh] m-8 rounded-3xl ${animateIn}`} src={`/assets/img/` + data.img} alt={data.img} width={0} height={0} sizes="100vw" priority={true} />
                    <Slots valueInSlots={valueInSlots} />
                    <div className={`font-[family-name:var(--font-ibm-r)] text-[2.5vw] text-white m-8`}>
                        {timeUp ?
                            ((puzzleIndex === puzzleIndexRangeEnd - 1) ? <></> : (count < 13) ? <div className='animate-fadeIn'>NEXT PUZZLE IN <span className='mx-4'>{count}</span></div> : <></>) :
                            (<div className='animate-dropIn' style={{ animationDelay: '800ms' }}><Timer init_counter={30} /></div>)
                        }
                    </div>
                </>)
            }
        </div>
    );
}


