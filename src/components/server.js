'use client';

import React, { useEffect, useState, useCallback } from 'react';
import PeerConfig from '@/components/peerConfig';
import DataList from "@/app/data";
import GameStage from './gameStage';
import Clients from '@/components/clients';
import Button from '@/components/button';
import Background from '@/components/background';
import Leaderboard from '@/components/leaderboard';
import { getServerVariable } from '@/lib/store';
import { useContent } from '@/hooks/useContent';
import Image from 'next/image';

const Server = () => {
    const [connections, setConnections] = useState({});
    const [clientsList, setClientsList] = useState([]);
    const [isConnected, setIsConnected] = useState('')
    const [serverID, setServerID] = useState();
    const [connectBtnPressed, setConnectBtnPressed] = useState(false)
    const [userResults, setUserResults] = useState([])
    //
    //
    const [picIndex, setPicIndex] = useState(0);
    const [screenIndex, setScreenIndex] = useState(0);
    const { timeUp, setTimeUp } = useContent();
    //
    //
    let pingInterval;
    let pingIndex = 0;
    //
    useEffect(() => {
        // get the serverID from store first
        const serverValue = getServerVariable();
        setServerID(serverValue);
    }, []);
    useEffect(() => {
        // automatically connect to server after 2 secs
        const timeout = setTimeout(() => {
            initialiseServer();
        }, 2000);

        return () => clearTimeout(timeout);
    }, [serverID])
    //
    //
    useEffect(() => {
        console.log(clientsList)
    }, [clientsList]);
    //
    //
    useEffect(() => {
        // start pinging to all clients
        clearInterval(pingInterval)
        pingInterval = setInterval(() => {
            pingAllClients(connections)
        }, 1000);

        return () => {
            clearInterval(pingInterval)
        }
    }, [connections, picIndex, screenIndex, timeUp])
    //
    //
    useEffect(() => {
        updateAllClients({ type: 'from-ser-picIndex', picIndex: picIndex });
        setTimeUp(false);
        resetAnsweredInClientsList();
    }, [picIndex])
    //
    //
    useEffect(() => {
        updateAllClients({ type: 'from-ser-timeUp', timeUp: timeUp });
    }, [timeUp]);
    //
    //
    useEffect(() => {
        console.log('screenIndex : ', screenIndex)
        if (screenIndex === 2) {
            updateAllClients({ type: 'from-ser-gameStart', value: true })
        }
    }, [screenIndex]);
    //
    //
    useEffect(() => {
        console.log(userResults)
        const list = [...clientsList];
        list.map((client) => {
            if (client.id === userResults.id) {
                client.answered = true;
                client.results.push(userResults)
            }
        })
        setClientsList(list)
    }, [userResults])
    /*
    //
    //
    //
    //
    */
    const initialiseServer = () => {
        setConnectBtnPressed(true);
        console.log(serverID)
        // open a connection session with id:"hcd-test"
        const peer = new PeerConfig(serverID);

        peer.on('open', (id) => {
            //setPeerId(id);
            console.log('Server ID:', id);
            setIsConnected(true)

        });

        peer.on('connection', (conn) => {
            console.log('New client connected:', conn.peer);

            conn.on('open', () => {
                // put all newly joined users into the clientsList except the remote control (controller)
                if (conn.peer !== 'controller') {
                    // Add new client to the list
                    setClientsList(prevList => {
                        const newList = [...prevList, { id: conn.peer, results: [] }];
                        // Broadcast updated list to all clients, including the new one
                        //broadcastClientList(newList, { ...connections, [conn.peer]: conn });
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
                    case "from-con-screenIndex":
                        setScreenIndex(data.value);
                        break;
                    case "from-con-picIndex":
                        setPicIndex(data.value)
                        break;
                    case "from-cli-puzzleAnswered":
                        const user = { id: conn.peer, data: data.data }
                        setUserResults(user)
                        break;
                }
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

    const pingAllClients = (connections) => {
        pingIndex++;
        Object.values(connections).forEach(conn => {
            conn.send({ type: 'from-ser-pinging', data: { pingIndex: pingIndex, screenIndex: screenIndex, picIndex: picIndex, timeUp: timeUp } });
        });
    }

    const updateAllClients = (data) => {
        //console.log(connections)
        Object.values(connections).forEach(conn => {
            conn.send(data);
        });
    }

    const resetAnsweredInClientsList = () => {
        const list = [...clientsList];
        list.map(client => {
            if (client.answered) delete client.answered
        });
        setClientsList(list)
    }


    return (
        <div className="flex flex-col content-center items-center">
            <Background />
            <Button value="screenIndex : 3" func={() => { setScreenIndex(3) }} />
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Server</h1>
            <div className='connection-indicator '><span className={`connection-indicator-dot ${isConnected ? 'connected' : ''} `}></span></div>
            {/*
                <p>Connected Clients: {Object.keys(connections).length}</p>
            */}
            <Clients clientsList={clientsList} />
            {
                //(!connectBtnPressed && !isConnected) ? <Button value="Connect Server" func={initialiseServer} /> : <GameStage data={DataList[picIndex]} />
                (!connectBtnPressed && !isConnected && <Button value="Connect Server" func={initialiseServer} />) ||
                (screenIndex === 0 && (<div className="flex flex-col justify-center content-center"><Image className=" m-16 rounded-lg" src="/assets/qrCode.png" alt="QR CODE" width="300" height="300" /><Button value="Next" func={() => { setScreenIndex(1) }} /></div>)) ||
                (screenIndex === 1 && (<div className="flex flex-col justify-center content-center"><div className="h-36 m-12 text-3xl font-extrabold">INSTRUCTION</div><Button value="Next" func={() => { setScreenIndex(2) }} /></div>)) ||
                (screenIndex === 2 && <GameStage data={DataList[picIndex]} />) ||
                (screenIndex === 3 && <Leaderboard data={DataList} clientsList={clientsList} />)
            }
        </div>
    );
};

export default Server;
