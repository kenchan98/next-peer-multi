'use client';

import useSound from 'use-sound';
import { useContent } from '@/hooks/useContent';
import { useEffect } from 'react';
export default function SlotsStage({ valueInSlots }) {

    const { timeUp } = useContent();

    useEffect(() => {
        console.log(timeUp)
    }, [timeUp]);
    //
    //
    return (
        //flex flex-row gap-2 m-4 p-2
        //grid grid-cols-5 gap-4 place-items-center mt-4
        <div className={`flex justify-around rounded-xl w-5/6`}>
            {
                valueInSlots.map((slot, i) => {
                    return (<div className="flex aspect-square rounded-2xl justify-center items-center bg-white font-bold text-6xl text-black w-24" key={i} >
                        <span className={`${timeUp ? "" : "hidden"}`}>{slot.value}</span>
                    </div>)
                })
            }
        </div>
    )
}