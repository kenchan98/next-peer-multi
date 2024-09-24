import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useCountDown from '@/hooks/useCountDown';
import { useContent } from '@/hooks/useContent';

const Register = () => {
    const { count, stop } = useCountDown(300);
    const { setScreenIndex } = useContent();
    //
    //
    useEffect(() => {
        if (count === 0) {
            stop();
            setScreenIndex(2);
        }
    }, [count]);
    //
    //
    return (<div className='flex h-screen flex-col w-3/5 content-center justify-center items-center text-4xl ml-8 animate-fadeIn'>
        <div className='w-100 unset'>
            <Image className=" m-16 rounded-lg object-contain w-full relative" src="/assets/img/qrCode.png" alt="QR CODE" width={300} height={300} />
        </div>
        <div><b className='text-8xl mx-4'>{count}</b>secs left ...</div>
    </div>)
}

export default Register;