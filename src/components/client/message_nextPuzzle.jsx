import React, { useEffect, useState } from 'react';
import FloatingBubbles from '../general/bg_floatingBubbles';

const MessageNextPuzzle = () => {

    return (
        //flex flex-col h-screen gap-4 m-3 content-center justify-center text-center text-3xl
        <div className="absolute flex top-0 left-0 justify-center h-screen w-screen animate-fadeIn">
            <FloatingBubbles />
            <div className="flex font-[family-name:var(--font-ibm-bi)]">
                <div className="flex text-center items-center text-3xl m-12 text-white">
                    NEXT PUZZLE WILL START SOON
                </div>
            </div>
        </div>
    )
}

export default MessageNextPuzzle;