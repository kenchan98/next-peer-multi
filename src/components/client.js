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
    const [isConnected, setIsConnected] = useState(false);
    const [picIndex, setPicIndex] = useState(0);
    const [connectBtnPressed, setConnectBtnPressed] = useState(false);
    const [timeItTakes, setTimeItTakes] = useState(0)
    //
    //
    const { puzzleStarted, setPuzzleStarted, puzzleAnswered, timeAtStart, timeUp, setTimeUp } = useContent();
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
    useEffect(() => {
        // calculate the time it has taken to finish
        const timeNow = Date.now();
        const timeTaken = timeNow - timeAtStart;
        const seconds = Math.floor(timeTaken / 1000);
        const milliseconds = timeTaken % 1000;
        const timeTakenFull = `${seconds}.${milliseconds}`;
        // for some reason its doing it twice, the 2nd one straight after .3 second
        // so to prevent that, will ignore if the timeTaken is less then 1 second
        if (seconds > 1) {
            setTimeItTakes(timeTakenFull);
            console.log(">>> puzzleAnswered : ", puzzleAnswered)
        }
    }, [puzzleAnswered]);
    //
    //
    useEffect(() => {
        if (connection) {
            connection.send({ type: "from-cli-puzzleAnswered", data: { picIndex: picIndex, puzzleAnswered: true, timeItTook: timeItTakes } })
        }
    }, [timeItTakes])
    //
    //
    useEffect(() => {
        console.log(" timeUp : ", timeUp)
    }, [timeUp])
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

            // RECEIVE FROM SERVER
            conn.on('data', (data) => {
                console.log('Received data:', data);
                //
                if (data.type === 'from-ser-pinging') {
                    if (data.data.screenIndex > 1) setPuzzleStarted(true)
                    if (data.data.picIndex) setPicIndex(data.data.picIndex)
                    setTimeUp(data.data.timeUp);
                    // detect if the server is still alive
                    setIsConnected(true)
                    clearTimeout(pingTimeout)
                    pingTimeout = setTimeout(() => {
                        setIsConnected(false)
                        console.log(" DISCONNECTED !!")
                    }, 2000);
                    // set picIndex so that it starts displaying the right image
                    //if (picIndex === null) setPicIndex(data.data.picIndex)
                } else if (data.type === "from-ser-timeUp") {
                    //setTimeUpOnUserModule(data.timeUp)
                    setTimeUp(data.timeUp)
                } else if (data.type === 'from-ser-picIndex') {
                    setPicIndex(data.picIndex)
                    //setTimeUpOnUserModule(false)
                } else if (data.type === 'from-ser-gameStart') {
                    setPuzzleStarted(true)
                }

            });
        });

        newPeer.on('error', (error) => {
            alert('Failed to connect. The ID might be taken or there was a network error.');
            setConnectBtnPressed(false)
        });
    };
    //
    //
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
                (isConnected && !puzzleStarted && (<div className="flex flex-col justify-center content-center"><div className="flex items-center h-96 m-24 text-3xl text-center font-extrabold">Please wait for other users to join ...</div></div>)) ||
                (isConnected && puzzleStarted && (<div className="flex flex-col content-center items-center "><GameView data={DataList[picIndex]} /></div>))
            }
        </div >
    );
};

export default Client;
