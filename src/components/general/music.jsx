import { useState, useEffect, useRef } from 'react';
import Button from './button';
import { useContent } from '@/hooks/useContent';
import { Volume2, VolumeX } from 'lucide-react';

export default function Music() {
    const musicRef = useRef();
    const { screenIndex, musicActivated } = useContent();
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        if (screenIndex === 1) {
            musicRef.current.play();
            musicRef.current.volume = .4;
        }
    }, [screenIndex]);

    useEffect(() => {
        if (isPlaying) {
            if (musicActivated) musicRef.current.play();
        } else {
            musicRef.current.pause();
        }
    }, [isPlaying])


    return (
        <div className='fixed bottom-0 right-0 m-8'>
            <audio ref={musicRef} loop autoPlay>
                <source src={'assets/sound/bg_track3.mp3'} />
            </audio>

            <div className='w-12 text-white m-8' onClick={() => {
                setIsPlaying(!isPlaying)
            }}>
                {isPlaying ? <Volume2 /> : <VolumeX />}
            </div>
        </div>
    )
}