import React, { useEffect, useState, useCallback } from 'react';
import Button from '../general/button';

export default function InitSettings({ serverVariable, func1, func2 }) {
    const [connectButtonPressed, setConnectButtonPressed] = useState(false);

    return (
        <div className="flex flex-col h-screen gap-4 m-3 justify-center text-center">
            Current server ID:
            <input
                className="w-48 h-12 self-center text-gray-900 text-center"
                type="text"
                value={serverVariable}
                onChange={(e) => func1(e.target.value)}
                placeholder="Please enter server ID"
            />
            {!connectButtonPressed ? <Button value="Connect" func={() => { func2(); setConnectButtonPressed(true) }} /> : "Connecting ..."}
        </div>
    )
}
