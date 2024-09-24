import React, { useEffect, useState } from 'react';
import FloatingBubbles from '../general/bg_floatingBubbles';

const MessageWait = () => {
    const [showText, setShowText] = useState(true);
    //
    //
    useEffect(() => {
        //const timer = setTimeout(() => setShowText(true), 500); // 2s for background fade
        //return () => clearTimeout(timer);
    }, []);

    return (
        //flex flex-col h-screen gap-4 m-3 content-center justify-center text-center text-3xl
        <div className="absolute flex top-0 left-0 justify-center h-screen w-screen">
            <FloatingBubbles />
            {showText && (
                <div className="flex font-[family-name:var(--font-ibm-bi)]">
                    <div className="flex text-center items-center text-3xl m-12">
                        PLEASE WAIT FOR OTHERS TO JOIN
                    </div>
                </div>
            )}
        </div>
    )
}

export default MessageWait;