'use client';

import React, { useEffect, useState, useCallback } from 'react';
import PeerConfig from '@/components/peerConfig';
import DataList from "@/app/data";
import GameStage from './gameStage';
import Users from '@/components/users';
import Button from '@/components/button'
import { getServerVariable } from '@/lib/store';
import { useContent } from '@/hooks/useContent'
import Image from 'next/image';

const Server = () => {
    //const [peerId, setPeerId] = useState('');
    const [connections, setConnections] = useState({});
    const [usersList, setUsersList] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState('')
    const [serverID, setServerID] = useState();
    const [connectBtnPressed, setConnectBtnPressed] = useState(false)
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
        const serverValue = getServerVariable();
        setServerID(serverValue)
        /*setTimeout(() => {
            initialiseServer();
        }, 300)*/
    }, []);

    useEffect(() => {
        console.log(usersList)
    }, [usersList]);

    useEffect(() => {
        //console.log("connection changed!!")
        // start binging to all clients
        clearInterval(pingInterval)
        pingInterval = setInterval(() => {
            pingAllUsers(connections)
        }, 1000);

        return () => {
            clearInterval(pingInterval)
        }
    }, [connections])

    useEffect(() => {
        //console.log("picIndex :" + picIndex)
        updateAllUsers({ type: 'updatePicIndex', picIndex: picIndex });
        setTimeUp(false)
    }, [picIndex])

    useEffect(() => {
        console.log('timeup :', timeUp)
        updateAllUsers({ type: 'updateTimeUp', timeUp: timeUp })
    }, [timeUp])

    useEffect(() => {
        console.log('screenIndex : ', screenIndex)
        if (screenIndex === 2) {
            updateAllUsers({ type: 'gameStart', value: true })
        }
    }, [screenIndex])
    const initialiseServer = () => {
        setConnectBtnPressed(true);
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
                // put all newly joined users into the usersList except the remote control (controller)
                if (conn.peer !== 'controller') {
                    // Add new client to the list
                    setUsersList(prevList => {
                        console.log('>>>>>> : ', conn.peer)

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

            conn.on('data', (data) => {
                //console.log('Received data:', data);
                const newMessage = { userId: conn.peer, message: data.message };
                setMessages(prev => [...prev, newMessage]);
                //broadcastMessage(newMessage);
                //
                //
                switch (data.type) {
                    case "pinging":
                        // this pulsating signal is for all users to
                        // check every second if the server is alive 
                        pingAllUsers();
                        break;
                    case "updatePicIndex":
                        setPicIndex(data.value)
                        //
                        //
                        // WHY NOT WORKING?
                        /*let num = picIndex
                        if (data.value === 'prev') {
                            if (picIndex > 0) {
                                num -= 1
                            }
                        } else if (data.value === 'next') {
                            if (picIndex < 14) {
                                num += 1
                            }
                        }
                        setPicIndex(num)*/
                        break;
                    case "puzzleDone":
                        console.log(conn.peer, data)
                        break;
                    /*case "timeUp":
                        console.log(conn.peer, data)
                        break;*/
                }
            });

            conn.on('close', () => {
                // Remove client from the list when disconnected
                setUsersList(prevList => {
                    const newList = prevList.filter(user => user.id !== conn.peer);
                    // Broadcast updated list to all remaining clients
                    //broadcastClientList(newList, connections);
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

    const pingAllUsers = (connections) => {
        pingIndex++;
        Object.values(connections).forEach(conn => {
            conn.send({ type: 'pinging', data: { pingIndex: pingIndex, picIndex: picIndex } });
        });
    }

    const updateAllUsers = (data) => {
        console.log(connections)
        Object.values(connections).forEach(conn => {
            conn.send(data);
        });
    }

    return (
        <div className="flex flex-col content-center items-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Server</h1>
            <div className='connection-indicator '><span className={`connection-indicator-dot ${isConnected ? 'connected' : ''} `}></span></div>
            {

                <p>Connected Clients: {Object.keys(connections).length}</p>
                /*<h2>Client List</h2>
                    <ul>
                        {clientList.map(client => (
                            <li key={client.id}>
                                {client.id} - {client.isConnected ? 'Connected' : 'Disconnected'}
                                {client.disabled ? ' (Disabled)' : ''}
                            </li>
                        ))}
                    </ul>
                    <h2>Messages</h2>
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index}>
                                {msg.clientId}: {msg.message}
                            </li>
                        ))
                    </ul>
                <button onClick={() => {
                    setPicIndex(picIndex + 1)
                }}>++ PRESS ME ++</button>*/
            }
            <Users usersList={usersList} />
            {
                //(!connectBtnPressed && !isConnected) ? <Button value="Connect Server" func={initialiseServer} /> : <GameStage data={DataList[picIndex]} />
                (!connectBtnPressed && !isConnected && <Button value="Connect Server" func={initialiseServer} />) ||
                (screenIndex === 0 && (<div className="flex flex-col justify-center content-center"><Image className=" m-16 rounded-lg" src="/assets/qrCode.png" alt="QR CODE" width="300" height="300" /><Button value="Next" func={() => { setScreenIndex(1) }} /></div>)) ||
                (screenIndex === 1 && (<div className="flex flex-col justify-center content-center"><div className="h-36 m-12 text-3xl font-extrabold">INSTRUCTION</div><Button value="Next" func={() => { setScreenIndex(2) }} /></div>)) ||
                (screenIndex === 2 && <GameStage data={DataList[picIndex]} />)
            }
        </div>
    );
};

export default Server;
