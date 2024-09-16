'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import InteractiveArea from '@/components/interactiveArea';
import GameWait from '@/components/gameWait';
import TimeUp from '@/components/timeUp';

const GameView = ({ data, informServerPuzzleDone, timeUpOnUserModule }) => {
    const [fadeIn, setFadeIn] = useState('');
    const [puzzleDone, setPuzzleDone] = useState(false);

    useEffect(() => {
        if (puzzleDone) {
            informServerPuzzleDone()
        }
    }, [puzzleDone])

    useEffect(() => {
        console.log(data)
        setFadeIn('animate-fadeIn');
        setTimeout(() => { setFadeIn('') }, 500)
        setPuzzleDone(false)
    }, [data])
    //
    //
    return (
        <div className={`flex flex-col content-center items-center max-w-lg ${fadeIn}`}>
            {puzzleDone && <GameWait />}
            {timeUpOnUserModule && <TimeUp />}
            <Image className="w-5/6 m-4 rounded-lg" src={`/assets/` + data.img} alt={data.img} width="600" height="600" />
            <InteractiveArea data={data} puzzleDone={puzzleDone} setPuzzleDone={setPuzzleDone} />
        </div>
    );
};

export default GameView;