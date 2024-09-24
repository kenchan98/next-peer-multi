import React, { useEffect, useState } from 'react';
import useCountDown from '@/hooks/useCountDown';
import { useContent } from '@/hooks/useContent';

export default function Instruction() {

    const { count, stop } = useCountDown(21);
    const { setScreenIndex } = useContent();
    //
    //
    useEffect(() => {
        if (count === 0) {
            stop();
            setScreenIndex(3);
        }
    }, [count]);
    //
    //
    return (<div className='flex animate-fadeIn h-screen content-center justify-center items-center grow text-3xl'>
        <div className='text-6xl m-20'>
            <div className='ml-28'>Instruction</div>
            <div className='text-4xl w-3/5 mt-20 mx-28 leading-relaxed'>Unveil the secrets hidden within this image! The picture represents a word, but some letters are concealed. Can you decipher the clues and reveal the missing letters to solve the puzzle?</div>
        </div>
        <video className='m-4' width="250" preload="auto" loop autoPlay>
            <source src="/assets/video/instruction.mp4" type="video/mp4" />
        </video>
        <div className='text-2xl'>This is dummy page, It will move on to in <b className='text-3xl'>{count}</b> sec ...</div>
    </div>)
}
