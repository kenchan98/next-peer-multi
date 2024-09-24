import React, { useEffect, useState, useCallback } from 'react';

export default function Ready({ func }) {
    const [count, setCount] = useState(4);
    const [message, setMessage] = useState('')
    //
    //
    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount > 1) {
                    setMessage(`${prevCount - 1}...`);
                    return prevCount - 1;
                } else if (prevCount === 1) {
                    setMessage('Go!');
                    return 0;
                } else {
                    clearInterval(timer);
                    func();
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [])
    //
    //
    return (<div className='flex flex-col h-screen content-center justify-center items-center grow text-3xl'>
        Are you ready to play?
        <div className='flex text-9xl m-8'>{message}</div>
    </div>)
}
