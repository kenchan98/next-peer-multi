import React, { useEffect, useState, useRef } from 'react';
import useSound from 'use-sound';
import Image from 'next/image';
import Keyboard from './keyboard';
import Slots from './slots';
import { useContent } from '@/hooks/useContent';
import MessageTimeUp from './message_timeUp';
import MessageCorrect from './message_correct';
import Keyboard_2 from './keyboard-2';

export default function GamePlay({ data }) {

    const [hasEmptySlot, setHasEmptySlot] = useState(true);
    const [valueInSlots, setValueInSlots] = useState([]);
    const [animateResultInSlots, setAnimateResultInSlots] = useState('');
    const [showMessageCorrect, setShowMessageCorrect] = useState(false);
    const [fadeIn, setFadeIn] = useState('');
    const [sound_correct] = useSound('/assets/sound/correct.mp3');
    const [sound_wrong] = useSound('/assets/sound/wrong2.mp3');
    const [sound_timeUp] = useSound('/assets/sound/church-bell.mp3');
    const [sound_next] = useSound('/assets/sound/next.mp3')


    const { setPuzzleAnswered, timeUp, keyboardType, setKeyboardType } = useContent();
    //
    //
    // we need a ref to the keyboard as we call on its function, 
    // keyboardFunc refer to 'setKeyActiveStatus' and its set in
    // the React.useImperativeHandle in the keyboard component
    const keyboardRef = useRef();

    useEffect(() => {
        if (data) {
            // reset and create the empty slots based on
            // the anwser at the start of a new puzzle
            let slots = []
            for (let i = 0; i < data.theAnswer.length; i++) {
                slots.push({ id: i, keyId: "", value: "", answer: data.theAnswer[i] })
            }
            setValueInSlots(slots);
            // reset from previous puzzle so that 
            // interaction is active on the board
            setPuzzleAnswered(false);
            // reset the winning screen to false so that
            // it hides itself at start for next puzzle
            setShowMessageCorrect(false);
            //
            sound_next();
            setFadeIn('animate-fadeIn');
            const fadeInTimeout = setTimeout(() => { setFadeIn('') }, 500);

            return () => clearTimeout(fadeInTimeout)
        }
    }, [data]);
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
    useEffect(() => {
        let timer;
        if (timeUp && !showMessageCorrect) {
            sound_timeUp();
            // if didnt get the correct answer then show times up screen
            //timer = setTimeout(() => sound_timeUp(), 500);
        }
        //return () => clearTimeout(timer);
    }, [timeUp]);
    //
    //
    useEffect(() => {

    }, [keyboardType])
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
        if (keyboardType === 1) {
            // reset key in keyboard
            setKeyActiveStatusInsideKeyboardComponent(slot.keyId, true)
        }
        // reset the slot prop inside valueInSlots
        let list = [...valueInSlots];
        console.log(slot)
        list[slot.id] = { id: slot.id, keyId: '', value: '', answer: slot.answer }
        setValueInSlots(list)
        //console.log(list)
    }
    //
    //
    const deleteValueInSlot = () => {
        if (keyboardType === 2) {
            // reset the slot prop inside valueInSlots
            let list = [...valueInSlots];
            for (let i = list.length - 1; i >= 0; i--) {
                if (list[i].value !== "") {
                    // set the value of the last filled slot to empty
                    list[i].value = "";
                    break;
                }
            }
            setValueInSlots(list)
        }
    }
    //
    //
    const addKeyStrokeInSlots = (key) => {
        //console.log(key)
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
    const checkAnswer = () => {
        let correctAnswer = data.theAnswer;
        let userAnswer = valueInSlots.map(obj => obj.value).join('');
        //console.log(correctAnswer, userAnswer)
        if (userAnswer === correctAnswer) {
            //console.log("CORRECT")
            sound_correct();
            setShowMessageCorrect(true);
            // inform the puzzle is correctly answered, 
            // useEffect of puzzleAnswered in client.js 
            setPuzzleAnswered(true);
            setAnimateResultInSlots('correct');
        } else {
            //console.log("OH NO")
            sound_wrong();
            // show incorrect anwser animation 
            let value = 'animate-shake drop-shadow-[0px_0px_20px_rgba(255,0,0,1)]'
            setAnimateResultInSlots('incorrect');
        }
    }
    //
    //
    return (
        <div className={`flex flex-col h-screen content-center items-center ${fadeIn}`}>
            {
                data &&
                <>
                    <Image className=" m-3 p-3 rounded-3xl object-contain" src={`/assets/img/` + data.img} alt={data.img} width="500" height="500" />
                    <Slots valueInSlots={valueInSlots} resetValueInSlot={resetValueInSlot} animateResultInSlots={animateResultInSlots} />
                    {keyboardType === 1 ?
                        (<Keyboard ref={keyboardRef} keyboard={data.keyboard} addKeyStrokeInSlots={addKeyStrokeInSlots} hasEmptySlot={hasEmptySlot} />) :
                        (<Keyboard_2 keyboard={data.keyboard} addKeyStrokeInSlots={addKeyStrokeInSlots} hasEmptySlot={hasEmptySlot} deleteValueInSlot={deleteValueInSlot} />)
                    }
                    {!showMessageCorrect && timeUp && <MessageTimeUp />}
                    {showMessageCorrect && <MessageCorrect />}
                </>
            }
        </div>
    )
}