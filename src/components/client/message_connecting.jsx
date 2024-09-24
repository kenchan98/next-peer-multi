import React, { useEffect, useState } from 'react';

const MessageConnecting = () => {
    //
    //
    return (
        <div className="absolute flex top-0 left-0 justify-center h-screen w-screen bg-amber-600 opacity-80">
            <div className="flex font-[family-name:var(--font-ibm-bi)]">
                <div className="flex text-center items-center text-3xl m-12 text-black">
                    CONNECTING ...
                </div>
            </div>
        </div>
    )
}

export default MessageConnecting;