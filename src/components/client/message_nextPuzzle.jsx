import React, { useEffect, useState } from 'react';

const MessageNextPuzzle = () => {

    return (
        <div className="absolute flex top-0 left-0 justify-center h-full w-full">
            <div className="flex font-[family-name:var(--font-ibm-bi)]">
                <div className="flex text-center items-center text-3xl m-12 text-white animate-fadeIn">
                    NEXT PUZZLE WILL START SOON
                </div>
            </div>
        </div>
    )
}

export default MessageNextPuzzle;