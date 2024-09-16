'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Slots from './slots';
import Timer from './timer';

const GameStage = ({ data }) => {
    const [valueInSlots, setValueInSlots] = useState([]);
    const [fadeIn, setFadeIn] = useState('')
    useEffect(() => {
        console.log(data)
        //
        let slots = []
        for (let i = 0; i < data.ans.length; i++) {
            slots.push({ id: i, keyId: "", value: "" })
        }
        setValueInSlots(slots)
        //
        setFadeIn('animate-fadeIn');
        setTimeout(() => { setFadeIn('') }, 500)
    }, [data]);
    //
    //
    return (
        <div className={`flex flex-col content-center items-center max-w-lg ${fadeIn}`}>
            <Timer />
            <Image className="w-5/6 m-4 rounded-lg" src={`/assets/` + data.img} alt={data.img} width={0} height={0} sizes="100vw" />
            <Slots valueInSlots={valueInSlots} />
        </div>
    );
};

export default GameStage;