import React, { useState, useEffect } from 'react';

export default function Leaderboard({ clientsList }) {
    const [sortedList, setSortedList] = useState([
        /*    {
                id: 'Ken', total: 3, results: [
                    { id: 'Ken', data: { puzzleIndex: 0, timeTakenToAnswer: '23.567' } },
                    { id: 'Ken', data: { puzzleIndex: 1, timeTakenToAnswer: '12.829' } },
                    { id: 'Ken', data: { puzzleIndex: 3, timeTakenToAnswer: '13.451' } },
                ]
            },
            {
                id: 'May', total: 2, results: [
                    { id: 'May', data: { puzzleIndex: 0, timeTakenToAnswer: '13.567' } },
                    { id: 'May', data: { puzzleIndex: 3, timeTakenToAnswer: '29.451' } },
                ]
            },
            {
                id: 'Nina', total: 2, results: [
                    { id: 'Nina', data: { puzzleIndex: 1, timeTakenToAnswer: '14.567' } },
                    { id: 'Nina', data: { puzzleIndex: 3, timeTakenToAnswer: '27.451' } },
                ]
            }*/
    ]);
    //
    //
    useEffect(() => {
        console.log(clientsList)
        const totalsList = [...clientsList]
        totalsList.map((client) => {
            client.total = client.results.length
        });
        setSortedList([...totalsList].sort((a, b) => b.total - a.total));
        //
        //
    }, [])
    //
    //
    useEffect(() => {
        console.log(sortedList)
    }, [sortedList])
    return (
        <div className='flex w-full h-3/5 grow items-center justify-center font-[family-name:var(--font-ibm-b)] animate-fadeIn'>
            <div className="flex flex-col items-center w-1/3 text-black bg-gray-200 p-4 rounded-lg ">
                <h2 className="text-3xl font-bold mb-4 text-center ">Leaderboard</h2>
                <div className="flex text-xl font-bold mb-2 w-full">
                    <span className="w-2/3 m-4">Name</span>
                    <span className="w-1/3 m-4 text-right">Total</span>
                </div>
                {
                    sortedList.map((client, index) => {
                        return <RowTotal client={client} key={index} />
                    })
                }
            </div>
        </div>
    )
}

const RowTotal = ({ client }) => {
    return (
        <div className="flex w-full justify-between items-center text-xl p-4 bg-gray-100 my-1 rounded font-[family-name:var(--font-ibm-m)]">
            <span className="w-7/8 truncate">{client.id}</span>
            <span className="w-1/8 content-end items-end  text-center justify-end"><div className="w-10 h-10 bg-amber-500 content-center text-center rounded-full">{client.total}</div></span>
        </div>
    )
}