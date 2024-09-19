import React, { useState, useEffect } from 'react';

export default function Clients({ clientsList }) {
    //
    //
    const [answered, setAnswered] = useState(false)
    const [wiggle, setWiggle] = useState('')
    //
    //
    useEffect(() => {
        if (answered) {
            setWiggle('animate-wiggle');
        }
        console.log(answered)
    }, [answered])
    //
    //
    return (
        <div className="absolute right-0 w-1/3 h-screen">
            <div className=" p-4 m-4 ">
                People joined so far ...
                <div className="grid grid-cols-5 gap-4 place-items-center content-start">
                    {clientsList.map((user, i) => {
                        return <div className={`flex text-gray-900 aspect-square w-16 justify-center items-center rounded-lg bg-gray-200 text-4xl animate-popIn ${user.answered ? "animate-wiggle" : ""}`} key={i}>{user.id.substring(0, 2)}</div>
                    })}
                </div>
            </div>
        </div>
    );
}