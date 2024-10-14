'use client'

import { createContext, useContext, useState } from 'react'

const ContentContext = createContext()

export function ContentProvider({ children }) {
    const [puzzleAnswered, setPuzzleAnswered] = useState(null);
    const [puzzleIndex, setPuzzleIndex] = useState(0);
    const [screenIndex, setScreenIndex] = useState(0);
    const [timeAtStart, setTimeAtStart] = useState(0);
    const [timerCount, setTimerCount] = useState(0);
    const [timeUp, setTimeUp] = useState(false);
    const [keyboardType, setKeyboardType] = useState(2);
    const [musicActivated, setMusicActivated] = useState(false);
    const puzzleTimerDuring = 30;
    const puzzleTimerAfter = 15;
    const puzzleIndexRange = 5;
    const waitingTimer = 10;
    //
    //const [puzzleIndexRange] = useState(3);
    //const [puzzleIndexRangeEnd, setPuzzleIndexRangeEnd] = useState(null);

    return (
        <ContentContext.Provider value={{
            puzzleAnswered, setPuzzleAnswered,
            puzzleIndex, setPuzzleIndex,
            screenIndex, setScreenIndex,
            timeAtStart, setTimeAtStart,
            timeUp, setTimeUp,
            timerCount, setTimerCount,
            keyboardType, setKeyboardType,
            musicActivated, setMusicActivated,
            waitingTimer,
            puzzleTimerDuring, puzzleTimerAfter, puzzleIndexRange
        }}>
            {children}
        </ContentContext.Provider>
    )
}

export function useContent() {
    return useContext(ContentContext)
}