'use client'

import { ContentProvider } from '@/hooks/useContent'

export function Providers({ children }) {
    return <ContentProvider>{children}</ContentProvider>
}