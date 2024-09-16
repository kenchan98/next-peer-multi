'use client'

import { createContext, useContext, useState } from 'react'

const ContentContext = createContext()

export function ContentProvider({ children }) {
    const [timeUp, setTimeUp] = useState(false)

    return (
        <ContentContext.Provider value={{ timeUp, setTimeUp }}>
            {children}
        </ContentContext.Provider>
    )
}

export function useContent() {
    return useContext(ContentContext)
}