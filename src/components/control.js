'use client';

import React, { useState, useEffect } from 'react';
import PeerConfig from '@/components/peerConfig';
import { getServerVariable } from '@/lib/store';
import { useContent } from '@/hooks/useContent';

const Control = () => {
    const [peer, setPeer] = useState(null);
    const [connection, setConnection] = useState(null);
    const clientId = 'controller';
    //const serverId = 'hcd-test-2';
    const [serverID, setServerID] = useState(() => {
        return getServerVariable();
    })
    const [message, setMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [picIndex, setPicIndex] = useState(0);
    const { timeUp } = useContent();

    // a timeout flag for checking if client receives ping from server every sec
    let pingTimeout = 0;

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

            conn.on('data', (data) => {
                console.log('Received data:', data);
                if (data.type === 'clientList') {
                    setClientList(data.data);
                } else if (data.type === 'message') {
                    setMessages(prevMessages => [...prevMessages, data.data]);
                } else if (data.type === 'update') {
                    setPicIndex(data.data.picIndex);
                } else if (data.type === 'pinging') {
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

    const sendMessage = () => {
        if (connection && message.trim() !== '') {
            const messageData = {
                message: message
            };
            connection.send(messageData);
            setMessage('');
        }
    };

    const goPrevNext = (value) => {
        console.log(timeUp)
        //if (timeUp) {
        let num = picIndex;
        if (value == "prev") {
            if (num > 0) num -= 1;
        } else if (value == "next") {
            if (num < 2) num += 1
        }
        setPicIndex(num)
        connection.send({ type: "updatePicIndex", value: num });
        //}
        //connection.send({ type: "update", value: value });

    }

    return (
        <div>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Controller</h1>
            <span className={`connection-indicator ${isConnected ? 'connected' : ''} `}></span>
            {!isConnected ? (
                <div>
                    <button onClick={handleConnect}>Connect</button>

                </div>
            ) : (
                <div>
                    <p>Connected as: {clientId}</p>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message"
                    />
                    <button onClick={sendMessage}>Send</button>
                    <div>
                        <h3>Client List:</h3>
                        <ul>
                            {clientList.map(client => (
                                <li key={client.id}>
                                    {client.id} - {client.isConnected ? 'Connected' : 'Disconnected'}
                                    {client.disabled ? ' (Disabled)' : ''}
                                </li>
                            ))}
                        </ul>
                        <h3>Messages:</h3>
                        <ul>
                            {messages.map((msg, index) => (
                                <li key={index}>{msg.clientId}: {msg.message}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <button className="button-control" onClick={() => {
                goPrevNext('prev')
            }}>Previous</button>
            <button className="button-control" onClick={() => {
                goPrevNext('next')
            }}>Next</button>
        </div>
    );
};

export default Control;