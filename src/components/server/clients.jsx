import React, { useState, useEffect } from 'react';
import Badge from './badge';
import useSound from 'use-sound';
import FloatingBubbles from '../general/bg_floatingBubbles';

export default function Clients({ clientsList, show }) {
    const [totalClients, setTotalClients] = useState(0);
    //
    const [sound_pop] = useSound('/assets/sound/pop.mp3')
    //
    //
    //const [answered, setAnswered] = useState(false)
    const [wiggle, setWiggle] = useState('')
    //
    //
    useEffect(() => {
        if (clientsList.length > totalClients) {
            sound_pop();
        }
        setTotalClients(clientsList.length);
    }, [clientsList])
    //
    //
    return (
        <div className={`absolute right-0 w-1/3 h-screen  transition-transform ease-in-out duration-300`}
            style={{ transform: show ? 'translateX(0)' : 'translateX(100%)' }}>
            {<div className=" p-4 m-4 ">
                <FloatingBubbles />
                {(clientsList.length > 0) && <div className='text-4xl mt-16 mb-8'>People joined so far ...</div>}
                <div className="grid grid-cols-5 gap-4 place-items-center content-start">
                    {clientsList.map((user, i) => {
                        return <Badge user={user} key={i} />
                    })}
                </div>
            </div>}

        </div>
    );
}

//? (<div className='text-4xl mt-16 mb-8'>Waiting for people to join ...</div>) : (<div className='text-4xl mt-16 mb-8'>People joined so far ...</div>)