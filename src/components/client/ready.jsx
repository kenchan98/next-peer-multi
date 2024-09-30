import React, { useEffect, useState, useCallback } from 'react';
import useSound from 'use-sound';

export default function Ready({ func }) {
    const [count, setCount] = useState(5);
    const [colour, setColour] = useState('');
    const [message, setMessage] = useState('GET READY...');
    const [sound_pop] = useSound('/assets/sound/sound_click.mp3');
    //
    //
    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount > 1) {
                    return prevCount - 1;
                } else {
                    clearInterval(timer);
                    return '';
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [])
    //
    //
    useEffect(() => {
        if (count >= 3) {
            setColour('text-game-red');
        } else if (count === 2) {
            setColour('text-game-orange');
        } else if (count === 1) {
            setColour('text-game-green');
            setMessage('GO!');
        }
        //
        if (count > 0) sound_pop();
    }, [count])
    //
    //
    return (<div className='flex flex-col content-center justify-center items-center font-[family-name:var(--font-ibm-bi)] '>
        <div className={`flex grow my-24 text-9xl ${colour}`}>{count}</div>
        <div className='fixed bottom-0 font-[family-name:var(--font-ibm-r)] text-2xl text-white my-24'>{message}</div>
    </div>)
}

