import React, { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
//
//
const Timer = () => {
    const counterMax = 15;
    const [counter, setCounter] = useState(counterMax);
    const [isFlashing, setIsFlashing] = useState(false);
    const [isRunning, setIsRunning] = useState(true);
    const { timeUp, setTimeUp } = useContent()
    let timerInterval;
    let flashingInterval;
    //
    //
    useEffect(() => {
        /*console.log(timeUp, counter)
        if (timeUp && counter === 0) {
            setCounter(counterMax)
        }
        const timerInterval = setInterval(() => {
            setCounter(prevCounter => {
                console.log('counter : ', prevCounter);
                if (prevCounter > 0) {
                    return prevCounter - 1;
                }
                setTimeUp(true)
                clearInterval(timerInterval);
                return 0;
            });
        }, 1000);*/
        startInterval();
        return () => {
            clearInterval(timerInterval);
            clearInterval(flashingInterval);
        }
    }, []);

    useEffect(() => {
        console.log(timeUp, counter)
        if (!timeUp && counter === 0) {
            setCounter(counterMax);
            startInterval();
        }
    }, [timeUp]);

    /*useEffect(() => {
        console.log(' timeUp : ', timeUp)
        if (!timeUp && counter === 0) {
            setCounter(counterMax)
        }
    }, [timeUp])*/

    const startInterval = () => {
        clearInterval(timerInterval);
        clearInterval(flashingInterval);
        //
        timerInterval = setInterval(() => {
            setCounter(prevCounter => {
                //console.log('counter : ', prevCounter);
                if (prevCounter > 0) {
                    return prevCounter - 1;
                }
                setTimeUp(true)
                clearInterval(timerInterval);
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

    return (
        <div >
            <div className="text-4xl font-bold">
                Timer : 0:{counter < 10 ? `0${counter}` : counter}
            </div>
        </div>
    );
};

export default Timer;