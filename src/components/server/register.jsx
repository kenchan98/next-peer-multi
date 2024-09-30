import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useCountDown from '@/hooks/useCountDown';
import { useContent } from '@/hooks/useContent';

const Register = ({ clearTimerToScreenTwo }) => {
    const { count, stop } = useCountDown(100);
    const { setScreenIndex, bottomHeight } = useContent();
    //
    //
    useEffect(() => {
        if (count === 0) {
            stop();
            setScreenIndex(2);
            clearTimerToScreenTwo();
        }
    }, [count]);
    //
    //
    return (
        <div className='flex flex-col h-full content-center  items-center text-4xl ml-8 animate-fadeIn'>
            <div className='w-2/3 m-8'>
                <div className='text-[5vh] leading-tight text-white'>Guess the word from an AI-generated picture before your friends and before the time runs out</div>
                <div className='flex my-16'>
                    <Image className="rounded-lg object-contain w-1/3" src="/assets/img/qrCode.png" alt="QR CODE" width={0} height={0} sizes='100' />
                    <div className='font-[family-name:var(--font-ibm-bi)] text-game-red text-[2.5vw] leading-relaxed mx-[1vw]'>SCAN QR CODE TO JOIN ON YOUR PHONE</div>
                </div>
            </div>

            <div className={`fixed bottom-0 font-[family-name:var(--font-ibm-r)] text-[2.5vw] text-white ${bottomHeight}`}>
                GAME STARTS <span className='mx-8'>{count}</span>
            </div>
        </div>
    )
}

export default Register;