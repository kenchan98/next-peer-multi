import React, { useState, useEffect } from 'react';
import Badge from './badge';
import useSound from 'use-sound';
import { useContent } from '@/hooks/useContent';

export default function Clients({ clientsList }) {
    const [totalClients, setTotalClients] = useState(0);
    const { screenIndex } = useContent();
    //
    const [sound_pop] = useSound('/assets/sound/pop.mp3')
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
        <div className={`w-auto h-full m-4 transition-transform ease-in-out duration-300`}>
            <div className="font-[family-name:var(--font-ibm-bi)] ">
                {screenIndex > 0 && (clientsList.length > 0 && <div className='text-[4vw] mx-[2vw] text-game-red animate-fadeIn'>PLAYERS</div>)}
                <div className="grid grid-cols-7 gap-6 m-12 place-items-center content-start">
                    {clientsList.map((user, i) => {
                        return <Badge user={user} key={i} />
                    })}
                </div>
            </div>

        </div>
    );
}

