'use client';

import React, { useEffect, useState, useRef } from 'react';
import PeerConfig from '@/components/peerjs/peerConfig';
import DataList from "@/store/data";
import { useContent } from '@/hooks/useContent';
import Clients from './clients';
import Main from './main';
import Leaderboard from './leaderboard';
import Music from '../general/music';
import Button from '../general/button';
import BgImages from '../general/bg_images';
//

const Server = () => {
    const [connections, setConnections] = useState({});
    const [isConnected, setIsConnected] = useState('');
    const [clientsList, setClientsList] = useState([]);
    const [serverID, setServerID] = useState(null);
    const [serverVariable, setServerVariable] = useState('');
    const [userResults, setUserResults] = useState([]);
    const [confirmPlay, setConfirmPlay] = useState([]);
    const [qrCode, setQrCode] = useState(3)
    const timerRef = useRef(null);
    const { timerCount, timeUp, setTimeUp, screenIndex, setScreenIndex, puzzleIndex, setPuzzleIndex, puzzleIndexRange } = useContent();

    //
    const [puzzleIndexRangeEnd, setPuzzleIndexRangeEnd] = useState(puzzleIndexRange);
    let pingInterval, pingIndex = 0;
    //
    //
    //
    //
    // for customising server ID before connecting
    // -------------------------------------------
    useEffect(() => {
        fetchServerVariable();
    }, []);
    //
    // fetch serverVariable from the server api
    const fetchServerVariable = async () => {
        const res = await fetch('/api/');
        const data = await res.json();
        setServerVariable(data.value);
    };
    //
    // if serverVariable been updated in the input field pressing 
    // the connect button will connect with serverID = serverVariable
    const updateServerVariable = async () => {
        const res = await fetch('/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: serverVariable }),
        });
        const data = await res.json();
        setServerID(data.value);
        //
        //
        setScreenIndex(1);
    };
    //
    //
    useEffect(() => {
        console.log(serverID)
        if (serverID) {
            initialiseServer();
        }
    }, [serverID]);
    //
    //
    /* 
    // for connecting the server automatically by default
    // --------------------------------------------------
    useEffect(() => {
        console.log(serverVariable)
        if (serverVariable) {
            setServerID(serverVariable);
            setScreenIndex(1);
        }
    }, [serverVariable]);
    // --------------------------------------------------
    */
    //
    //
    useEffect(() => {
        if (!isConnected) clearInterval(pingInterval);
    }, [isConnected]);
    //
    //
    useEffect(() => {
        if (isConnected) {
            // start pinging to all clients
            clearInterval(pingInterval)
            pingInterval = setInterval(() => {
                pingAllClients(connections)
            }, 1000);
        }
        return () => {
            clearInterval(pingInterval)
        }
    }, [connections, puzzleIndex, screenIndex, timeUp])
    //
    //
    useEffect(() => {
        updateAllClients({ type: 'from-server-screenIndex', screenIndex: screenIndex });
        //
        // reset for a new round
        if (screenIndex === 1) {
            setTimeUp(false);
            // reset the results if users has previously answered
            setUserResults([])
            //
            const list = [...clientsList];
            list.map(client => {
                client.results = [];
                client.answered = false;
                client.total = 0;
            });
            setClientsList(list)
        }
        //
        // HACK - it doesnt always clear the green badge 
        if (screenIndex === 2) {
            resetAnsweredInClientsList()
        }
        //
        //
    }, [screenIndex]);
    //
    // every time when we move on to the next puzzle
    useEffect(() => {
        //console.log('puzzleIndex : ', puzzleIndex)
        //console.log('puzzleIndexRangeEnd : ', puzzleIndexRangeEnd)
        //if (puzzleIndex < puzzleIndexRangeEnd) {
        updateAllClients({ type: 'from-server-puzzleIndex', puzzleIndex: puzzleIndex });
        resetAnsweredInClientsList();
        setTimeUp(false);
        //}
        /* else {
            if (screenIndex === 3) {
                //
                setPuzzleIndexRangeThisRound();
                // if all puzzles done then move on to loaderboard
                //setScreenIndex(4);
            }
        }*/
    }, [puzzleIndex]);
    //
    // this only get called when the game starts
    useEffect(() => {
        updateAllClients({ type: 'from-server-timerCount', timerCount: timerCount });
    }, [timerCount]);
    //
    //
    useEffect(() => {
        updateAllClients({ type: 'from-server-timeUp', timeUp: timeUp });
    }, [timeUp]);
    //
    // set the 'answered' prop on the client who got it correctly so
    // that it plays a little animation with green outline on its badge
    useEffect(() => {
        const list = [...clientsList];
        list.map((client) => {
            if (client.id === userResults.id) {
                client.answered = true;
                client.results.push(userResults)
            }
        });
        setClientsList(list)
    }, [userResults]);
    //
    //
    useEffect(() => {
        const list = [...clientsList];
        list.map((client) => {
            if (client.id === confirmPlay.id) {
                client.answered = true;
            }
        });
        setClientsList(list);
    }, [confirmPlay])
    //
    //
    useEffect(() => {
        if (clientsList.length > 0) {
            // check if evryone is ready by pressing the PLAY button
            if (screenIndex === 1) {
                const isEveryoneReady = clientsList.every(client => client.answered);
                //
                if (isEveryoneReady) {
                    // Clear any existing timer
                    if (timerRef.current) {
                        clearTimeout(timerRef.current);
                    }

                    // Set new timer
                    timerRef.current = setTimeout(() => {
                        resetAnsweredInClientsList();
                        setScreenIndex(2);
                    }, 5000);
                }
            }
        }

        // Cleanup function
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };

    }, [clientsList]);
    //
    //
    const clearTimerToScreenTwo = () => {
        resetAnsweredInClientsList();
        // Clear the timer if it exists
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }
    //
    //
    const initialiseServer = () => {
        // open a connection session with id from variable serverVariable at store 
        const peer = new PeerConfig(serverID);

        peer.on('open', (id) => {
            console.log('Server ID:', id);
            setIsConnected(true)
        });

        peer.on('connection', (conn) => {
            console.log('New client connected:', conn);
            conn.on('open', () => {
                // Add new client to the list
                setClientsList(prevList => {
                    const index = prevList.findIndex(client => client.id === conn.peer);
                    if (index === -1) {
                        // Item doesn't exist, add it
                        return [...prevList, { id: conn.peer, results: [] }];
                    } else {
                        return [...prevList];
                    }
                });
                // add all joined users including controller into the 'connections'
                setConnections(prevConnections => ({ ...prevConnections, [conn.peer]: conn }));
            });

            // RECEIVE FROM CONTROLLER / CLIENTS
            conn.on('data', (data) => {
                console.log('Received data:', data);
                let user;
                //
                //
                switch (data.type) {
                    case "from-client-puzzleAnswered":
                        user = { id: conn.peer, data: data.data };
                        setUserResults(user);
                        break;
                    case "from-client-confirmPlay":
                        user = { id: conn.peer, data: data }
                        setConfirmPlay(user);
                        break;
                }
            });

            conn.on('error', (error) => {
                console.log('ERRORRRRRR --- ', error);
                setClientsList(prevList => {
                    const newList = prevList.filter(user => user.id !== conn.peer);
                    return newList;
                });
            });

            conn.on('close', () => {
                // Remove client from the list when disconnected
                setClientsList(prevList => {
                    const newList = prevList.filter(user => user.id !== conn.peer);
                    return newList;
                });

                setConnections(prevConnections => {
                    const newConnections = { ...prevConnections };
                    delete newConnections[conn.peer];
                    return newConnections;
                });
            });
        });
    }
    //
    //
    const updateAllClients = (data) => {
        //console.log(connections)
        Object.values(connections).forEach(conn => {
            conn.send(data);
        });
    }
    //
    //
    const pingAllClients = (connections) => {
        pingIndex++;
        const pingData = { serverID: serverID, pingIndex: pingIndex, screenIndex: screenIndex, puzzleIndex: puzzleIndex, timeUp: timeUp };
        Object.values(connections).forEach(conn => {
            conn.send({ type: 'from-server-pinging', data: pingData });
        });
        //console.log(pingData)
    }
    //
    // each client in the clientsList has a prop 'answered'
    // to keep track if they have correctly aswered the puzzle
    // in the round, this also reflects on their badge with a green 
    // outline, so this is to reset the flag in each of round of the puzzle at start
    const resetAnsweredInClientsList = () => {
        const list = [...clientsList];
        list.map(client => {
            if (client.answered) delete client.answered
        });
        setClientsList(list)
    }
    //
    // a HACK to pass around the rendering components error
    const setScreenIndexToThree = () => {
        setTimeout(() => { setScreenIndex(3) }, 10)
    }
    //
    //
    const setPuzzleIndexRangeInTheRound = () => {
        /*console.log('puzzleIndexRangeEnd : ', puzzleIndexRangeEnd)
        console.log(DataList.length - puzzleIndexRange);
        console.log('_____________________')*/
        if (puzzleIndexRangeEnd > DataList.length - 1) {
            console.log("RESET puzzleIndexRange back to initial value")
            // reset puzzleIndex so that it restart from the 1st round
            setPuzzleIndex(0);
            setPuzzleIndexRangeEnd(puzzleIndexRange);
        } else {
            console.log("NEXT batch of puzzles ")
            setPuzzleIndex(puzzleIndex + 1);
            setPuzzleIndexRangeEnd(puzzleIndexRangeEnd + puzzleIndexRange);
        }
    };
    //
    //
    return (
        <div className='flex h-screen animate-fadeIn w-full h-full m-4'>
            <Music />
            {screenIndex <= 3 &&
                <>
                    <div className='w-1/2'>
                        <Main isConnected={isConnected} screenIndex={screenIndex}
                            serverVariable={serverVariable} setServerVariable={setServerVariable} updateServerVariable={updateServerVariable}
                            setScreenIndexToThree={setScreenIndexToThree}
                            DataList={DataList} puzzleIndex={puzzleIndex}
                            puzzleIndexRangeEnd={puzzleIndexRangeEnd}
                            setPuzzleIndexRangeInTheRound={setPuzzleIndexRangeInTheRound}
                            clientsList={clientsList}
                            clearTimerToScreenTwo={clearTimerToScreenTwo}
                            setQrCode={setQrCode}
                            qrCode={qrCode}
                        />
                    </div>
                    <div className='w-1/2'>
                        <Clients clientsList={clientsList} />
                    </div>
                </>}
            {screenIndex === 4 && <Leaderboard clientsList={clientsList} />}

            {/*<div className="flex gap-2 fixed bottom-0 left-0 opacity-5">
                <Button value='screenIndex' func={() => { setScreenIndex(screenIndex + 1) }} />
                <Button value='puzzleIndex --' func={() => { setPuzzleIndex(puzzleIndex - 1) }} />
                <Button value='puzzleIndex ++' func={() => { setPuzzleIndex(puzzleIndex + 1) }} />
            </div>*/}
            <BgImages clientsList={clientsList} />
        </div>
    )
}

export default Server;
