'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import useSound from 'use-sound';
const Keyboard_2 = React.forwardRef(({ keyboard, hasEmptySlot, addKeyStrokeInSlots, deleteValueInSlot }, ref) => {

    const [keysList, setKeysList] = useState([]);
    const [keyboardActivated, setKeyboardActivated] = useState(true)
    //
    // take the 15 letters provided from data.keyboard
    // and split them into individuals & put in keysList 
    useEffect(() => {
        const list = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
        const list_3rows = [];
        let _list1 = [];
        let _list2 = [];
        let _list3 = [];
        for (let i = 0; i < list.length; i++) {
            let keyObj = { id: i, value: list[i], isActive: true }
            if (i >= 0 && i < 10) {
                // 1st row
                _list1.push(list[i]);
            } else if (i >= 10 && i < 19) {
                // 2nd row
                _list2.push(list[i]);
            } else if (i >= 19) {
                // 3rd row
                _list3.push(list[i])
            }
            //
        }
        // add DEL key at the end 
        _list3.push("DEL");
        //
        list_3rows.push(_list1, _list2, _list3);
        console.log(list_3rows)
        setKeysList(list_3rows);
    }, [keyboard])
    //
    //
    // if no more empty slot (hasEmptySlot = false) then
    // disable the keyboard (keyboardActivated = false)
    useEffect(() => {
        setKeyboardActivated(hasEmptySlot)
    }, [hasEmptySlot])
    //
    //
    return (
        <div className="w-full flex justify-center flex-wrap gap-1 mt-4">
            {keysList.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1 mb-1">
                    {row.map((letter, letterIndex) => (
                        (letter === "DEL") ?
                            (<KeyDelete key='del' keyboardActivated={keyboardActivated} deleteValueInSlot={deleteValueInSlot} />) :
                            (<Key_2
                                key={letterIndex}
                                id={letterIndex}
                                value={letter}
                                keyboardActivated={keyboardActivated}
                                addKeyStrokeInSlots={addKeyStrokeInSlots}
                            />)
                    ))}
                </div>
            ))}
        </div>
    );
});

export default Keyboard_2;


const Key_2 = ({ id, value, keyboardActivated, addKeyStrokeInSlots }) => {
    const [sound_click] = useSound('/assets/sound/click.mp3');
    const [keyIsDown, setKeyIsDown] = useState(false);
    //
    const handleKeyDown = () => {
        if (keyboardActivated && !keyIsDown) {
            sound_click();
            setKeyIsDown(true)
        }
    }
    //
    const handleKeyUp = () => {
        setKeyIsDown(null);
        const obj = { id: id, value: value };
        addKeyStrokeInSlots(obj);
    }
    //
    return (
        <div className={`flex justify-center items-center w-8 p-2 justify-center text-white text-2xl font-bold rounded  ${keyIsDown ? 'bg-amber-600' : 'bg-gray-800'}`}
            onMouseDown={() => {
                handleKeyDown()
            }}
            onMouseUp={() => {
                handleKeyUp()
            }}
            onTouchStart={(e) => {
                e.preventDefault();
                handleKeyDown();
            }}
            onTouchEnd={(e) => {
                e.preventDefault();
                handleKeyUp()
            }}>
            {value}
        </div>
    );
}

const KeyDelete = ({ keyboardActivated, deleteValueInSlot }) => {
    const [keyIsDown, setKeyIsDown] = useState(false);
    const [sound_click_r] = useSound('/assets/sound/click_reverse.mp3');
    //
    const handleKeyDown = () => {
        if (!keyIsDown) {
            sound_click_r();
            setKeyIsDown(true);
            deleteValueInSlot();
        }
    }
    //
    return (
        <div className={`flex justify-center items-center w-20 justify-center rounded ${keyIsDown ? 'bg-amber-600' : 'bg-gray-800'}`}
            onMouseDown={() => {
                handleKeyDown()
            }}
            onMouseUp={() => {
                setKeyIsDown(null)
            }}
            onTouchStart={(e) => {
                e.preventDefault();
                handleKeyDown();
            }}
            onTouchEnd={(e) => {
                e.preventDefault();
                setKeyIsDown(null)
            }}>
            <Image src="/assets/img/deleteKey.svg" width="30" height="30" alt='delete' />
        </div>
    )
}