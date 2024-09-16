'use client';

import React, { useState, useEffect } from 'react';
import PeerConfig from '@/components/peerConfig';
import DataList from '@/app/data';
import GameView from './gameView';
import Button from '@/components/button';
import { useContent } from '@/hooks/useContent';
import { getServerVariable } from '@/lib/store';

const Client = () => {
    const [connection, setConnection] = useState(null);
    const [clientId, setClientId] = useState('');
    //const [message, setMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    //const [messages, setMessages] = useState([]);
    const [picIndex, setPicIndex] = useState(0);
    const [connectBtnPressed, setConnectBtnPressed] = useState(false);
    const [timeUpOnUserModule, setTimeUpOnUserModule] = useState(false);
    const [gameStart, setGameStart] = useState(false)
    //
    //
    //
    const [serverID] = useState(() => {
        return getServerVariable();
    })
    // a timeout flag for checking if client receives ping from server every sec
    let pingTimeout = 0;
    //
    //
    const handleConnect = () => {

        setConnectBtnPressed(true)
        if (clientId.trim() === '') {
            alert('Please enter a name');
            setConnectBtnPressed(false)
            return;
        }

        const newPeer = new PeerConfig(clientId);

        newPeer.on('open', (id) => {
            console.log('Client connected with ID:', id);

            console.log(' serverId : ', serverID)
            // this client start connecting with the server
            const conn = newPeer.connect(serverID);
            setConnection(conn);

            conn.on('open', () => {
                console.log('Connected to server');
                setIsConnected(true);
            });

            conn.on('data', (data) => {
                console.log('Received data:', data);
                /*if (data.type === 'clientList') {
                    setClientList(data.data);
                } else if (data.type === 'message') {
                    setMessages(prevMessages => [...prevMessages, data.data]);
                } else*/
                if (data.type === 'pinging') {
                    // detect if the server is still alive
                    setIsConnected(true)
                    clearTimeout(pingTimeout)
                    pingTimeout = setTimeout(() => {
                        setIsConnected(false)
                        console.log(" DISCONNECTED !!")
                    }, 2000);
                    // set picIndex so that it starts displaying the right image
                    //if (picIndex === null) setPicIndex(data.data.picIndex)
                } else if (data.type === "updateTimeUp") {
                    setTimeUpOnUserModule(data.timeUp)
                } else if (data.type === 'updatePicIndex') {
                    setPicIndex(data.picIndex)
                    //setTimeUpOnUserModule(false)
                } else if (data.type === 'gameStart') {
                    setGameStart(true)
                }

            });
        });

        newPeer.on('error', (error) => {
            alert('Failed to connect. The ID might be taken or there was a network error.');
            setConnectBtnPressed(false)
        });
    };

    const sendMessage = () => {
        if (connection && message.trim() !== '') {
            const messageData = {
                message: message
            };
            connection.send(messageData);
            setMessage('');
        }
    };

    const informServerPuzzleDone = () => {
        if (connection) {
            connection.send({ type: "puzzleDone", data: { picIndex: picIndex, puzzleDone: true } })
        }
    }

    const screenLogin = ``

    return (
        <div>
            <div className='connection-indicator'>
                <span className={`connection-indicator-dot ${isConnected ? 'connected' : ''} `}></span> {isConnected && (`connected as ${clientId}`)}
            </div>
            {
                (!isConnected && (
                    <div className="flex flex-col gap-4 m-3 justify-center text-center">
                        <input
                            className="w-48 h-12 self-center text-gray-900 text-center"
                            type="text"
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            placeholder="Please enter your name"
                        />
                        {!connectBtnPressed ? <Button value="Connect" func={handleConnect} /> : "Connecting ..."}
                    </div>
                )) ||
                (isConnected && !gameStart && (<div className="flex flex-col justify-center content-center"><div className="h-36 m-12 text-3xl text-center font-extrabold">Please wait for other users to join ...</div></div>)) ||
                (isConnected && gameStart && (<div className="flex flex-col content-center items-center "><GameView data={DataList[picIndex]} informServerPuzzleDone={informServerPuzzleDone} timeUpOnUserModule={timeUpOnUserModule} /></div>))
            }
        </div >
    );
};

export default Client;