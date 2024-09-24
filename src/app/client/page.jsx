'use client';

import { useEffect } from 'react';
import Client from "@/components/client/client";
import Head from "next/head";

export default function ClientPage() {
    useEffect(() => {
        // Prevent zooming
        const handleTouchMove = (e) => {
            if (e.touches.length > 1) {
                e.preventDefault()
            }
        }

        const handleTouchEnd = (e) => {
            const now = Date.now()
            if (now - lastTouchEnd <= 300) {
                e.preventDefault()
            }
            lastTouchEnd = now
        }

        let lastTouchEnd = 0
        document.addEventListener('touchmove', handleTouchMove, { passive: false })
        document.addEventListener('touchend', handleTouchEnd, { passive: false })

        // Disable scrolling
        document.body.style.overflow = 'hidden'
    }, []);
    //
    //
    return (
        <>
            <Head>
                <title>Picture Pit Stop</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>
            <div className="font-[family-name:var(--font-ibm-r)]">
                <Client />
            </div>
        </>

    )
}
