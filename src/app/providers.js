'use client'

import { ContentProvider } from '@/hooks/useContent'

export default function Providers({ children }) {
    return <ContentProvider>{children}</ContentProvider>
}