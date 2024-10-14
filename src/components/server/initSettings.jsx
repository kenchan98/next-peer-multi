import React, { useEffect, useState, useCallback } from 'react';
import Button from '../general/button';
import { useContent } from '@/hooks/useContent';

export default function InitSettings({ serverVariable, func1, func2, setQrCode }) {
    const [connectButtonPressed, setConnectButtonPressed] = useState(false);
    const { setMusicActivated } = useContent();

    return (
        <div className="absolute top-0 left-0 flex flex-col w-full h-full gap-4 justify-center text-center text-white">
            <div className="flex justify-center gap-2">
                <Button value="QR CODE 1" func={() => setQrCode(1)} />
                <Button value="QR CODE 2" func={() => setQrCode(2)} />
                <Button value="QR CODE 3" func={() => setQrCode(3)} />
            </div>
            Current server ID:
            <input
                className="w-48 h-12 self-center text-gray-900 text-center rounded"
                type="text"
                value={serverVariable}
                onChange={(e) => func1(e.target.value)}
                placeholder="Please enter server ID"
            />
            {!connectButtonPressed ? <Button value="Connect" func={() => {
                func2();
                setConnectButtonPressed(true);
                setMusicActivated(true);
            }} /> : "Connecting ..."
            }
        </div>
    )
}
