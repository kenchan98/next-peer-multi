'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import InteractiveArea from '@/components/interactiveArea';
import GameWait from '@/components/gameWait';
import TimeUp from '@/components/timeUp';
import { useContent } from '@/hooks/useContent';

const GameView = ({ data }) => {
    const [fadeIn, setFadeIn] = useState('');
    const { puzzleAnswered, setPuzzleAnswered, setTimeAtStart, timeUp } = useContent()
    //
    //
    useEffect(() => {
        console.log(data)
        setFadeIn('animate-fadeIn');
        setTimeout(() => { setFadeIn('') }, 500)
        setPuzzleAnswered(false)
        //
        // start timer to record the time it takes to answer
        setTimeAtStart(Date.now())
    }, [data])
    //
    //
    return (
        <div className={`flex flex-col content-center items-center max-w-lg ${fadeIn}`}>
            {puzzleAnswered && <GameWait />}
            {timeUp && <TimeUp />}
            <Image className="w-5/6 m-4 mt-20 rounded-lg" src={`/assets/` + data.img} alt={data.img} width="600" height="600" />
            <InteractiveArea data={data} />
        </div>
    );
};

export default GameView;