import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';


export default function Key({ id, value, isActive, keyboardActivated, addKeyStrokeInSlots, setKeyActiveStatus }) {

    const [sound_click] = useSound('/assets/click.mp3');

    return (
        <div className={`aspect-square w-full flex items-center justify-center text-white font-bold rounded-lg bg-teal-950 ${isActive ? '' : 'key-inactive'}`}
            onClick={() => {
                if (keyboardActivated && isActive) {
                    sound_click();
                    const obj = { id: id, value: value };
                    addKeyStrokeInSlots(obj);
                    //
                    setKeyActiveStatus(id, false)
                }
            }}>
            {value}
        </div>)
}

//className="aspect-square   shadow-md transition-transform hover:scale-155"