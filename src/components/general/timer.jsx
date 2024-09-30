import React, { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import useSound from 'use-sound';
//
//
const Timer = ({ init_counter = 10 }) => {
    const INIT_COUNTER = init_counter;
    const [counter, setCounter] = useState(INIT_COUNTER);
    const [isFlashing, setIsFlashing] = useState(false);
    const [isRunning, setIsRunning] = useState(true);
    const { timeUp, setTimeUp, setTimerCount } = useContent()
    let timerInterval;
    let flashingInterval;
    //
    //
    const [sound_timer] = useSound('/assets/sound/timer2.mp3');
    //
    //
    useEffect(() => {
        let timerInterval;
        let flashingInterval;

        if (isRunning && counter > 0) {
            timerInterval = setInterval(() => {
                setCounter(prevCounter => {
                    if (prevCounter > 1) {
                        return prevCounter - 1;
                    }
                    clearInterval(timerInterval);
                    setIsRunning(false);
                    return 0;
                });
            }, 1000);

            flashingInterval = setInterval(() => {
                if (counter <= 5 && counter > 0) {
                    setIsFlashing(prev => !prev);
                } else {
                    setIsFlashing(false);
                }
            }, 500);
        }

        if (counter === 0) {
            setTimeUp(true)
        } else if (counter === 5) {
            sound_timer();
        }

        // inform components/server/server.js when it ticks
        setTimerCount(counter);

        return () => {
            clearInterval(timerInterval);
            clearInterval(flashingInterval);
        };
    }, [counter, isRunning]);
    //
    //
    useEffect(() => {
        if (!timeUp && counter === 0) {
            setCounter(INIT_COUNTER);
            setIsFlashing(false);
            setIsRunning(true);
            //startInterval();
        }
    }, [timeUp]);
    //
    //
    /*useEffect(() => {
        if (isFlashing) sound_timer();
    }, [isFlashing])
    */
    //
    //
    return (
        <div className={`${isFlashing ? 'text-game-red' : 'text-white'}`}>
            GAME ENDS IN <span className='mx-3'>{counter}</span>
        </div>
    );
};

export default Timer;