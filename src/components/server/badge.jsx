import { useEffect } from 'react';
import useSound from 'use-sound';

export default function Badge({ user }) {

    const [sound_pop] = useSound('/assets/sound/cheers4.mp3')
    useEffect(() => {
        setTimeout(() => { sound_pop() }, 1000)
    }, []);
    //
    //
    return (
        <div className={`flex text-gray-900 aspect-square w-16 justify-center items-center rounded-full bg-gray-200 text-4xl animate-popIn ${user.answered ? "animate-popUp" : ""}`}>
            {user.id.substring(0, 2)}
        </div>
    )
}