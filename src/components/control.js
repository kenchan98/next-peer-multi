'use client';

import React, { useState, useEffect } from 'react';
import PeerConfig from '@/components/peerConfig';
import Button from './button';
import { getServerVariable } from '@/lib/store';

const Control = () => {
    const [connection, setConnection] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [screenIndex, setScreenIndex] = useState(0);
    const [picIndex, setPicIndex] = useState(0);
    const [serverID] = useState(() => {
        return getServerVariable();
    });
    const clientId = 'controller';
    // a timeout flag for checking if client receives ping from server every sec
    let pingTimeout = 0;
    //
    //
    useEffect(() => {
        if (connection) connection.send({ type: 'from-con-screenIndex', value: screenIndex })
    }, [screenIndex])
    //
    //
    const handleConnect = () => {
        const newPeer = new PeerConfig(clientId);

        newPeer.on('open', (id) => {
            // Controller starts connecting with the server
            const conn = newPeer.connect(serverID);
            setConnection(conn);

            conn.on('open', () => {
                console.log('Connected to server');
                setIsConnected(true);
            });

            // RECEIVE FROM SERVER
            conn.on('data', (data) => {
                console.log('Received data:', data);
                if (data.type === 'from-ser-pinging') {
                    //
                    setScreenIndex(data.data.screenIndex)
                    // detect if the server is still alive
                    setIsConnected(true)
                    clearTimeout(pingTimeout)
                    pingTimeout = setTimeout(() => {
                        setIsConnected(false)
                        console.log(" DISCONNECTED !!")
                    }, 2000)
                }
            });
        });

        newPeer.on('error', (error) => {
            console.error('PeerJS error:', error);
            alert('Failed to connect. The ID might be taken or there was a network error.');
        });
    };
    //
    //
    const goPrevNext = (value) => {
        let num = picIndex;
        if (value == "prev") {
            if (num > 0) num -= 1;
        } else if (value == "next") {
            if (num < 2) num += 1
        }
        setPicIndex(num)
        connection.send({ type: "from-con-picIndex", value: num });
    }
    //
    //
    return (
        <div className="flex flex-col">
            <h1 className="m-4 text-4xl font-extrabold text-gray-900 text-center dark:text-white">Controller</h1>
            <div className='connection-indicator'>
                <span className={`connection-indicator-dot ${isConnected ? 'connected' : ''} `}></span> {isConnected && (`connected as ${clientId}`)}
                {!isConnected && <Button value="Connect" func={handleConnect} />}
            </div>

            {
                (isConnected && (screenIndex < 2) && <div className="flex content-center justify-center grow m-16"><Button value="Next screen" func={() => setScreenIndex(screenIndex + 1)} /></div>) ||
                (isConnected && (screenIndex == 2) && <div className="flex content-center justify-center grow m-16 gap-4">
                    <Button func={() => { goPrevNext('prev') }} value="Previous" />
                    <Button func={() => { goPrevNext('next') }} value="Next" /></div>)
            }
        </div>
    );
};

export default Control;