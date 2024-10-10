import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useCountDown from '@/hooks/useCountDown';
import { useContent } from '@/hooks/useContent';

const Register = ({ clearTimerToScreenTwo, clientsList }) => {
    const INIT_COUNT = 70;
    const { count, start, stop, reset } = useCountDown(INIT_COUNT);
    const { setScreenIndex } = useContent();
    //
    //
    useEffect(() => {
        if (count === 0) {
            if (clientsList.length > 0) {
                stop();
                setScreenIndex(2);
                clearTimerToScreenTwo();
            } else {
                reset(INIT_COUNT);
                start()
            }

        }
    }, [count]);
    //
    //
    return (
        <div className='flex flex-col h-full content-center  items-center text-4xl ml-8 animate-fadeIn'>
            <div className='w-2/3 m-8'>
                <div className='text-[5vh] leading-tight text-white animate-dropIn'>Guess the word from an AI-generated picture before your friends and before the time runs out</div>
                <div className='flex my-16 animate-dropIn' style={{ animationDelay: '200ms' }}>
                    <Image className="rounded-lg object-contain w-1/3" src="/assets/img/qrCode2.png" alt="QR CODE" width={0} height={0} sizes='100' />
                    <div className='font-[family-name:var(--font-ibm-bi)] text-game-red text-[2.5vw] leading-relaxed mx-[1vw]'>SCAN QR CODE TO JOIN ON YOUR PHONE</div>
                </div>
            </div>

            <div className={`font-[family-name:var(--font-ibm-r)] text-[2.5vw] text-white m-8 animate-dropIn`} style={{ animationDelay: '400ms' }}>
                GAME STARTS <span className='mx-8'>{count}</span>
            </div>
        </div>
    )
}

export default Register;