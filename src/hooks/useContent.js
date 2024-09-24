'use client'

import { createContext, useContext, useState } from 'react'

const ContentContext = createContext()

export function ContentProvider({ children }) {
    const [puzzleStarted, setPuzzleStarted] = useState(false);
    const [puzzleAnswered, setPuzzleAnswered] = useState(false);
    const [puzzleIndex, setPuzzleIndex] = useState(0);
    const [screenIndex, setScreenIndex] = useState(0);
    const [timeAtStart, setTimeAtStart] = useState(0);
    const [timerCount, setTimerCount] = useState(0);
    const [timeUp, setTimeUp] = useState(false);
    const [keyboardType, setKeyboardType] = useState(2);

    return (
        <ContentContext.Provider value={{ puzzleStarted, setPuzzleStarted, puzzleAnswered, setPuzzleAnswered, puzzleIndex, setPuzzleIndex, screenIndex, setScreenIndex, timeAtStart, setTimeAtStart, timeUp, setTimeUp, timerCount, setTimerCount, keyboardType, setKeyboardType }}>
            {children}
        </ContentContext.Provider>
    )
}

export function useContent() {
    return useContext(ContentContext)
}