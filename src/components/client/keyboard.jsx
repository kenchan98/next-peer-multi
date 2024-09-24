'use client';

import React, { useState, useEffect, useRef } from 'react';
import Key from './key';

const Keyboard = React.forwardRef(({ keyboard, hasEmptySlot, addKeyStrokeInSlots }, ref) => {
    const [keysList, setKeysList] = useState([]);
    const [keyboardActivated, setKeyboardActivated] = useState(true)
    //
    // take the 15 letters provided from data.keyboard
    // and split them into individuals & put in keysList 
    useEffect(() => {
        const list1 = keyboard.split("")
        const list2 = [];
        for (let i = 0; i < list1.length; i++) {
            let keyObj = { id: i, value: list1[i], isActive: true }
            list2.push(keyObj)
        }
        setKeysList(list2);
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
    // this function is made available for both parent <InteractiveArea /> 
    // with the use of React.useImperativeHandle and its children <Key />
    const setKeyActiveStatus = (id, status) => {
        let list = [...keysList];
        //console.log(keysList)
        list[id].isActive = status;
        setKeysList(list)
    }
    //
    //
    // Expose keyboard's setKeyActiveStatus 
    // upward to its parent InteractiveArea
    React.useImperativeHandle(ref, () => ({
        keyboardFunc: setKeyActiveStatus
    }));
    //
    //
    return (
        <div className="w-full grid grid-cols-5 gap-2 mt-4">
            {//place-items-center
                keysList.map((key, index) => (
                    <Key key={index} id={key.id} value={key.value} isActive={key.isActive} keyboardActivated={keyboardActivated} setKeyActiveStatus={setKeyActiveStatus} addKeyStrokeInSlots={addKeyStrokeInSlots} />
                ))
            }
        </div>
    );
});

export default Keyboard;
