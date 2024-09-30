'use client';

import React, { useEffect, useState } from 'react';
import PeerConfig from '@/components/peerjs/peerConfig';
import Login from './login';
import GamePlay from './gamePlay';
import DataList from '@/store/data';
import { useContent } from '@/hooks/useContent';
import Top from './top';
import MessageWait from './message_wait';
import Ready from './ready';
import MessageConnecting from './message_connecting';
import MessageNextPuzzle from './message_nextPuzzle';
import MessageFill from './message_fill';
import ConfirmPlay from './confirmPlay';

const Client = () => {
    const [connection, setConnection] = useState(null);
    const [clientID, setClientID] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false)
    const [data, setData] = useState(null);
    const [timeTakenToAnswer, setTimeTakenToAnswer] = useState('');
    const [msgNextPuzzle, setMsgNextPuzzle] = useState(false)
    const { screenIndex, setScreenIndex, puzzleIndex, puzzleAnswered, setPuzzleAnswered, setPuzzleIndex, timerCount, setTimerCount, timeAtStart, setTimeAtStart, timeUp, setTimeUp } = useContent();
    const [serverID, setServerID] = useState();

    let pingTimeout;
    //
    // read serverVariable from server api
    useEffect(() => {
        fetchServerVariable();
    }, []);
    useEffect(() => {
        console.log('serverID : ', serverID)
    }, [serverID]);
    //
    //
    useEffect(() => {
        // reset / remove the message Next Puzzle Start Soon 
        setMsgNextPuzzle(false);
        // update the data (the image, the empty slots 
        // & the keyboard) for the next puzzle 
        setData(DataList[puzzleIndex]);
    }, [puzzleIndex]);
    //
    //
    /*useEffect(() => {
        console.log('timerCount +++ ', timerCount)
    }, [timerCount]);
    //
    //
    useEffect(() => {
    }, [screenIndex]);
    */
    //
    //
    useEffect(() => {
        // start counting time when puzzle begins
        setTimeAtStart(Date.now());
    }, [data]);
    //
    //
    useEffect(() => {
        if (puzzleAnswered === false) {
            // start counting time when puzzle begins
            setTimeAtStart(Date.now());
            //console.log(' game at start ----- ')
        }
        // calculate the time it has taken to answer
        // by subtracting timeAtSatart with current tick
        const timeNow = Date.now();
        const timeTaken = timeNow - timeAtStart;
        const seconds = Math.floor(timeTaken / 1000);
        const milliseconds = timeTaken % 1000;
        // for some reason its being called twice, the 2nd one straight after .3 second
        // so to prevent that, will ignore if the timeTaken is less then 1 second
        if (puzzleAnswered === true) {
            setTimeTakenToAnswer(`${seconds}.${milliseconds}`);
            //console.log(' time to answer >>> ', `${seconds}.${milliseconds}`)
        }
    }, [puzzleAnswered]);
    //
    // inform server this client has answered correctly
    useEffect(() => {
        if (connection) {
            connection.send({ type: "from-client-puzzleAnswered", data: { puzzleIndex: puzzleIndex, timeTakenToAnswer: timeTakenToAnswer } })
        }
    }, [timeTakenToAnswer]);
    //
    //
    useEffect(() => {
        let timeoutMsgNextPuzzle;
        if (timeUp) {
            timeoutMsgNextPuzzle = setTimeout(() => {
                setMsgNextPuzzle(true);
            }, 4000);
        }
    }, [timeUp])
    //
    //
    const fetchServerVariable = async () => {
        const res = await fetch('/api/');
        const data = await res.json();
        setServerID(data.value);
    };
    //
    //
    const confirmPlay = () => {
        connection.send({ type: "from-client-confirmPlay", data: { confirmPlay: true } });
        setScreenIndex(1);
    }
    //
    //
    const handleConnect = () => {

        if (clientID.trim() === '') {
            alert('Please enter a name');
            return;
        }

        const peer = new PeerConfig(clientID);
        peer.on('open', (id) => {
            console.log('Client connected with ID:', id, ' ||  serverId : ', serverID);
            // this client start connecting with the server
            const conn = peer.connect(serverID);
            setConnection(conn);

            conn.on('open', () => {
                console.log('Connected to server');
                setIsConnected(true);
            });

            // RECEIVE FROM SERVER
            conn.on('data', (data) => {
                console.log('Received data:', data);
                //
                if (data.type === 'from-server-pinging') {
                    if (data.data.screenIndex > 1) setScreenIndex(data.data.screenIndex)
                    if (data.data.puzzleIndex) setPuzzleIndex(data.data.puzzleIndex)
                    setTimeUp(data.data.timeUp);
                    // detect if the server is still alive
                    setIsConnected(true);
                    clearTimeout(pingTimeout)
                    pingTimeout = setTimeout(() => {
                        setIsConnected(false);
                        setIsConnecting(false);
                        console.log(" DISCONNECTED !!")
                    }, 2000);

                } else if (data.type === "from-server-timeUp") {
                    setTimeUp(data.timeUp)
                } else if (data.type === 'from-server-puzzleIndex') {
                    setPuzzleIndex(data.puzzleIndex);
                } else if (data.type === 'from-server-screenIndex') {
                    setScreenIndex(data.screenIndex);
                } else if (data.type === 'from-server-timerCount') {
                    setTimerCount(data.timerCount);
                }
            });

            conn.on('close', () => {
                alert('Lost connection to server');
            });
        });

        peer.on('error', (error) => {
            alert('Failed to connect. The ID might be taken or there was a network error.');
            setIsConnecting(false);
        });

        // 
        setIsConnecting(true);
    }
    //
    //
    return (
        <div className='flex flex-col h-[calc(100dvh)] bg-black p-4 animate-fadeIn'>
            <Top isConnected={isConnected} timerCount={screenIndex === 3 ? timerCount : ''} />
            {
                (!isConnected && (isConnecting ? (<MessageConnecting />) : (<Login func1={setClientID} func2={handleConnect} />))) ||
                (isConnected && screenIndex === 0 && (<ConfirmPlay func1={confirmPlay} />)) ||
                (isConnected && screenIndex === 1 && (<MessageWait />)) ||
                (isConnected && screenIndex === 2 && (<Ready />)) ||
                (isConnected && screenIndex === 3 && (msgNextPuzzle ? (<MessageNextPuzzle />) : (<GamePlay data={data} />))) ||
                (isConnected && screenIndex === 4 && (<MessageFill message="THANK YOU FOR PLAYING" />))
            }

        </div>
    )
}

export default Client;