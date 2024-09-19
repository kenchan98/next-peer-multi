import React, { useEffect, useState, useRef } from 'react';
import Slots from "./slots";
import useSound from 'use-sound';
import Keyboard from "@/components/keyboard";
import Celebration from "@/components/celebration";
import { useContent } from '@/hooks/useContent';
//
//
export default function InteractiveArea({ data }) {
    const [hasEmptySlot, setHasEmptySlot] = useState(true);
    const [valueInSlots, setValueInSlots] = useState([]);
    const [animateResultInSlots, setAnimateResultInSlots] = useState('')
    const [showConfetti, setShowConfetti] = useState(false)
    const [sound_gotIt] = useSound('/assets/cheers4.mp3');
    const [sound_wrong] = useSound('/assets/wrong2.mp3');
    //
    //
    const { puzzleAnswered, setPuzzleAnswered } = useContent();
    //
    // we need a ref to the keyboard as we call on its function, 
    // keyboardFunc refer to 'setKeyActiveStatus' and its set in
    // the React.useImperativeHandle in the keyboard component
    const keyboardRef = useRef();
    //
    //
    useEffect(() => {
        let slots = []
        for (let i = 0; i < data.ans.length; i++) {
            slots.push({ id: i, keyId: "", value: "" })
        }
        setValueInSlots(slots);
        // reset from previous puzzle so that 
        // interaction is active on the board
        setPuzzleAnswered(false);
        //
        setShowConfetti(false);
    }, [data])
    //
    //
    useEffect(() => {
        let noEmptySlot = true;
        // check if any empty slots
        for (let i = 0; i < valueInSlots.length; i++) {
            if (valueInSlots[i].value === "") {
                noEmptySlot = false;
                //console.log(i, noEmptySlot)
                break;
            }
        }
        // keyboard uses flag 'hasEmptySlot' to determine
        // its own flag 'keyboardActivated' to inform its
        // children Key whether they should be available 
        // to be pressed or not
        setHasEmptySlot(!noEmptySlot)
        // reset the animation for correct/wrong answer on the slots
        setAnimateResultInSlots('')
        // if all slots filled then check if the word is correct
        if (noEmptySlot && valueInSlots.length > 0) checkAnswer()
        //console.log(valueInSlots)
    }, [valueInSlots]);
    //
    //
    const checkAnswer = () => {
        let correctAnswer = data.ans;
        let userAnswer = valueInSlots.map(obj => obj.value).join('');
        console.log(correctAnswer, userAnswer)
        if (userAnswer === correctAnswer) {
            //console.log("CORRECT")
            sound_gotIt();
            setShowConfetti(true)
            let value = 'bg-green-500 shadow-[0px_-10px_35px_10px_rgba(34,197,94,1)] '
            setAnimateResultInSlots(value)
            // inform the puzzle is correctly answered, 
            // useEffect of puzzleAnswered in client.js 
            setPuzzleAnswered(true);
        } else {
            //console.log("OH NO")
            sound_wrong();
            //shadow-[0px_-10px_35px_10px_rgba(0,80,255,0.6)] 
            let value = 'animate-shake drop-shadow-[0px_0px_20px_rgba(255,0,0,1)]'
            setAnimateResultInSlots(value)
        }
    }
    //
    //
    const addKeyStrokeInSlots = (key) => {
        let list = [...valueInSlots];
        for (let i = 0; i < list.length; i++) {
            let slot = list[i];
            if (slot.value === "") {
                slot.value = key.value;
                slot.keyId = key.id;
                break;
            }
        }
        setValueInSlots(list)
    }
    //
    //
    const setKeyActiveStatusInsideKeyboardComponent = (id, value) => {
        if (keyboardRef.current) {
            keyboardRef.current.keyboardFunc(id, value)
        }
    }
    //
    //
    const resetValueInSlot = (slot) => {
        // reset key in keyboard
        setKeyActiveStatusInsideKeyboardComponent(slot.keyId, true)
        // reset the slot prop inside valueInSlots
        let list = [...valueInSlots];
        list[slot.id] = { id: slot.id, keyId: '', value: '' }
        setValueInSlots(list)
        //console.log(list)
    }
    //
    //
    return (
        <>
            <Celebration showConfetti={showConfetti} />
            <Slots valueInSlots={valueInSlots} resetValueInSlot={resetValueInSlot} animateResultInSlots={animateResultInSlots} />
            <Keyboard ref={keyboardRef} keyboard={data.keyboard} addKeyStrokeInSlots={addKeyStrokeInSlots} hasEmptySlot={hasEmptySlot} />
        </>
    )
}