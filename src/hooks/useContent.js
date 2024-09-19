'use client'

import { createContext, useContext, useState } from 'react'

const ContentContext = createContext()

export function ContentProvider({ children }) {
    const [puzzleStarted, setPuzzleStarted] = useState(false);
    const [puzzleAnswered, setPuzzleAnswered] = useState(false);
    const [timeAtStart, setTimeAtStart] = useState(0);
    const [timeUp, setTimeUp] = useState(false);

    return (
        <ContentContext.Provider value={{ puzzleStarted, setPuzzleStarted, puzzleAnswered, setPuzzleAnswered, timeAtStart, setTimeAtStart, timeUp, setTimeUp }}>
            {children}
        </ContentContext.Provider>
    )
}

export function useContent() {
    return useContext(ContentContext)
}