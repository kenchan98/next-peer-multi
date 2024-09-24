'use client';

import React, { useEffect, useState } from 'react';
import PeerConfig from '@/components/peerjs/peerConfig';
import DataList from "@/store/data";
import Button from '../general/button';
import { useContent } from '@/hooks/useContent';
import Clients from './clients';
import Register from './register';
import Ready from './ready';
import Instruction from './instruction';
import GameStage from './gameStage';
import InitSettings from './initSettings';
import Top from './top';
import Leaderboard from './leaderboard';
//

const Server = () => {
    const [connections, setConnections] = useState({});
    const [isConnected, setIsConnected] = useState('');
    const [clientsList, setClientsList] = useState([]);
    const [showClientsList, setShowClientsList] = useState(true);
    const [serverID, setServerID] = useState(null);
    const [serverVariable, setServerVariable] = useState('');
    const [userResults, setUserResults] = useState([]);
    let pingInterval, pingIndex = 0;
    //
    //
    const { timerCount, timeUp, setTimeUp, screenIndex, setScreenIndex, puzzleIndex, setPuzzleIndex } = useContent();
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
    }, [screenIndex]);
    //
    // every time when we move on to the next puzzle
    useEffect(() => {
        if (puzzleIndex < DataList.length) {
            updateAllClients({ type: 'from-server-puzzleIndex', puzzleIndex: puzzleIndex });
            resetAnsweredInClientsList();
            setTimeUp(false);
        } else {
            // if all puzzles done then move on to loaderboard
            setScreenIndex(screenIndex + 1)
        }
        console.log(' DataList.length ??? ', DataList.length)
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
        if (clientsList.length > 0) {
            setShowClientsList(true);
        }
    }, [clientsList])
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
            console.log('New client connected:', conn.peer);

            conn.on('open', () => {
                // put all newly joined users into the clientsList
                // except the remote control (controller)
                if (conn.peer !== 'controller') {
                    // Add new client to the list
                    setClientsList(prevList => {
                        const newList = [...prevList, { id: conn.peer, results: [] }];
                        return newList;
                    }
                    );
                }
                // add all joined users including controller into the 'connections'
                setConnections(prevConnections => ({ ...prevConnections, [conn.peer]: conn }));
            });

            // RECEIVE FROM CONTROLLER / CLIENTS
            conn.on('data', (data) => {
                console.log('Received data:', data);
                //
                //
                switch (data.type) {
                    /*case "from-control-screenIndex":
                        setScreenIndex(data.value);
                        break;
                    case "from-control-puzzleIndex":
                        setPuzzleIndex(data.value)
                        break;*/
                    case "from-client-puzzleAnswered":
                        const user = { id: conn.peer, data: data.data };
                        setUserResults(user);
                        break;
                }
            });

            conn.on('error', (error) => {
                alert('Failed to connect. The ID might be taken or there was a network error.');
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
        console.log(pingData)
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
    const setScreenIndexToFour = () => {
        setTimeout(() => { setScreenIndex(4) }, 10)
    }
    //
    //
    return (
        <div className='flex flex-col h-screen animate-fadeIn w-full h-full'>
            <Top isConnected={isConnected} />

            {
                (screenIndex === 0 && (<InitSettings serverVariable={serverVariable} func1={setServerVariable} func2={updateServerVariable} />)) ||
                (screenIndex === 1 && (<><Register /><Clients clientsList={clientsList} show={showClientsList} /></>)) ||
                (screenIndex === 2 && (<Instruction />)) ||
                (screenIndex === 3 && (<Ready func={() => { setScreenIndexToFour() }} />)) ||
                (screenIndex === 4 && (<><GameStage data={DataList[puzzleIndex]} /><Clients clientsList={clientsList} show={showClientsList} /></>)) ||
                (screenIndex === 5 && (<Leaderboard clientsList={clientsList} />))
            }
            <div className="flex gap-2 fixed bottom-0 left-0 opacity-10">
                <Button value='screenIndex' func={() => { setScreenIndex(screenIndex + 1) }} />
                <Button value='puzzleIndex --' func={() => { setPuzzleIndex(puzzleIndex - 1) }} />
                <Button value='puzzleIndex ++' func={() => { setPuzzleIndex(puzzleIndex + 1) }} />
                <Button value='show clients' func={() => { setShowClientsList(!showClientsList) }} />
            </div>
        </div>
    )
}

export default Server;

/*

            */