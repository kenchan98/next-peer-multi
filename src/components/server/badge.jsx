import { useEffect } from 'react';
import useSound from 'use-sound';

export default function Badge({ user }) {

    const [sound_pop] = useSound('/assets/sound/cheers4.mp3');
    const [sound_correct] = useSound('/assets/sound/ding.mp3');

    useEffect(() => {
        setTimeout(() => { sound_pop() }, 1000)
    }, []);

    useEffect(() => {
        if (user.answered) {
            sound_correct();
        }
    }, [user.answered])
    //
    //
    return (
        <div className={`flex aspect-square w-full justify-center items-center rounded-full text-5xl  
                ${user.answered ? 'bg-game-green text-black animate-popUp' : 'bg-game-gray text-white animate-popIn'}`}>
            {user.id.substring(0, 2)}
        </div>
    )
}

