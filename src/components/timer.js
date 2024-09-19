import React, { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import useSound from 'use-sound';
//
//
const Timer = () => {
    const INIT_COUNTER = 10;
    const [counter, setCounter] = useState(INIT_COUNTER);
    const [isFlashing, setIsFlashing] = useState(false);
    const [isRunning, setIsRunning] = useState(true);
    const { timeUp, setTimeUp } = useContent()
    let timerInterval;
    let flashingInterval;
    //
    //
    const [sound_timer] = useSound('/assets/timer.mp3');
    //
    //
    /*useEffect(() => {
        startInterval();
        return () => {
            clearInterval(timerInterval);
            clearInterval(flashingInterval);
        }
    }, []);*/
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
        }

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
    useEffect(() => {
        if (isFlashing) sound_timer();
    }, [isFlashing])

    /*useEffect(() => {
        console.log(' timeUp : ', timeUp)
        if (!timeUp && counter === 0) {
            setCounter(counterMax)
        }
    }, [timeUp])*/

    return (
        <div >
            <div className={`text-4xl font-bold ${isFlashing ? 'text-red-600' : 'text-white'}`}>
                Timer : 0:{counter < 10 ? `0${counter}` : counter}
            </div>
        </div>
    );
};

export default Timer;