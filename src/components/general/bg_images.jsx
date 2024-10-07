import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useContent } from '@/hooks/useContent';

const BgImages = ({ clientsList }) => {

    const [count, setCount] = useState(1);
    const [imgUrl, setImgUrl] = useState('/assets/img/bg_1.jpg');
    const [animateIn, setAnimateIn] = useState('animate-fadeIn');
    const { screenIndex } = useContent();
    let timerInterval, timerTimeout;


    useEffect(() => {
        setImgUrl('/assets/img/bg_' + count + '.jpg');
        setAnimateIn('animate-fadeIn');

        timerInterval = setInterval(() => {
            setCount(prevCount => {
                if (prevCount < 7) {
                    return prevCount + 1;
                }
                clearInterval(timerInterval);
                return 1;
            });
        }, 5000);

        timerTimeout = setTimeout(() => {
            setAnimateIn('');
        }, 500)

        return () => {
            clearTimeout(timerTimeout);
            clearInterval(timerInterval);
        }
    }, [count]);


    return (
        <div className='-z-10 fixed top-0 left-0 flex w-full h-full bg-black'>
            {screenIndex < 3 && (<div className={`fixed right-0 h-full ${animateIn} `}>
                <Image className={(clientsList.length > 0) ? 'animate-fadeTo40' : ''} src={imgUrl} width={0} height={0} alt="logo" sizes='100vw' style={{ width: 'auto', height: '100%' }} />
            </div>)}
            {screenIndex === 3 && (<div className={`fixed right-0 h-full`}>
                <Image className='opacity-80' src='/assets/img/bg.jpg' width={0} height={0} alt="logo" sizes='100vw' style={{ width: 'auto', height: '100%' }} />
            </div>)}
        </div>
    )
}

export default BgImages;