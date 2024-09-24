import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';


export default function Key({ id, value, isActive, keyboardActivated, addKeyStrokeInSlots, setKeyActiveStatus }) {

    const [sound_click] = useSound('/assets/sound/click.mp3');

    return (
        <div className={`flex justify-center items-center p-2 justify-center text-white text-2xl font-bold rounded-lg bg-teal-950 ${isActive ? '' : 'opacity-10'}`}
            onClick={() => {
                if (keyboardActivated && isActive) {
                    sound_click();
                    const obj = { id: id, value: value };
                    addKeyStrokeInSlots(obj);
                    setKeyActiveStatus(id, false);
                }
            }}>
            {value}
        </div>
    );
}
