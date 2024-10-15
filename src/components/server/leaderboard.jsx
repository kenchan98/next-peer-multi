import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import useCountDown from '@/hooks/useCountDown';
import { useContent } from '@/hooks/useContent';
import useSound from 'use-sound';

export default function Leaderboard({ clientsList }) {
    const [sortedList, setSortedList] = useState([]);
    const [sound_sweep] = useSound('/assets/sound/sweep-sound.mp3');
    const [fastestList, setFastestList] = useState([])
    //
    //
    const { setScreenIndex } = useContent();
    const { count, reset, start, stop } = useCountDown();
    //
    // when the count down is 0 then it set screenIndex
    // back to 1 to loop the stage back to the beginning
    useEffect(() => {
        if (count === 14) {
            // play the welcome to leaderboard sound
            sound_sweep();
        } else if (count === 0) {
            stop();
            setScreenIndex(1);
        }
    }, [count]);
    //
    //
    useEffect(() => {
        const totalsList = [...clientsList];
        totalsList.map((client) => {
            client.total = client.results.length
        });
        const top10Sorted = [...totalsList].sort((a, b) => b.total - a.total).slice(0, 10);
        setSortedList(top10Sorted);
        //
        // create a list for the fastest in each puzzle
        let _list = []
        const list = [...clientsList];
        list.map(client => {
            client.results.map(result => {
                const data = { ...result.data, name: client.id }
                _list.push(data)
            })
        });
        const _list2 = _list.reduce(function (_list2, org) {
            (_list2[org.puzzleIndex] = _list2[org.puzzleIndex] || []).push(org);
            return _list2;
        }, {});
        //
        const _list3 = [];
        Object.keys(_list2).forEach(function (key) {
            _list2[key].sort((a, b) => b.timeTakenToAnswer - a.timeTakenToAnswer);
            _list3.push(_list2[key][_list2[key].length - 1])
        });
        setFastestList(_list3)
        //
        // start on the leaderboard for about 10 secs
        reset(15);
        start();
    }, [])
    //
    //
    return (
        <div className='flex flex-row animate-fadeIn w-full'>
            <div className='w-1/2 m-8'>
                <div className='flex w-auto items-center m-4 '>
                    <div className='flex items-center w-full'><Image className='w-full' src='/assets/img/leaderboard.svg' width='40' height='40' alt='logo' /></div>
                </div>
                <div className='flex flex-col w-full '>
                    {
                        sortedList.map((client, index) => {
                            return (
                                <div className='flex w-full font-[family-name:var(--font-ibm-bi)] text-white text-[2vw] animate-slide-in' key={index}
                                    style={{ animationDelay: `${index * 200}ms` }}>
                                    <style jsx>{`
                                    @keyframes slideIn {
                                        from {
                                            transform: translateY(30%);
                                            opacity: 0;
                                        }
                                        to {
                                            transform: translateY(0);
                                            opacity: 1;
                                        }
                                    }
                                    .animate-slide-in {
                                        animation: slideIn 0.5s ease-out forwards;
                                        opacity:0;
                                    }
                                `}</style>
                                    <div className='w-[8vw] text-right m-2 '>{index + 1}.</div>
                                    <div className='w-3/5 my-2 mx-4 truncate'>{client.id.toUpperCase()}</div>
                                    <div className='m-2 '>{client.total}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='w-1/2 m-8 mx-16'>
                <div className='flex w-auto items-center m-4 '>
                    <div className='flex items-center w-full'><Image className='w-full' src='/assets/img/quickest.svg' width='40' height='40' alt='logo' /></div>
                </div>
                <div className='flex flex-col w-full '>
                    {
                        fastestList.map((puzzle, index) => {
                            return (
                                <div className='flex w-full font-[family-name:var(--font-ibm-bi)] text-white text-[2vw] animate-slide-in' key={index}
                                    style={{ animationDelay: `${index * 200}ms` }}>
                                    <style jsx>{`
                                    @keyframes slideIn {
                                        from {
                                            transform: translateY(30%);
                                            opacity: 0;
                                        }
                                        to {
                                            transform: translateY(0);
                                            opacity: 1;
                                        }
                                    }
                                    .animate-slide-in {
                                        animation: slideIn 0.5s ease-out forwards;
                                        opacity:0;
                                    }
                                `}</style>
                                    <div className='w-[10vw] text-right m-2 '>PUZZLE {puzzle.puzzleIndex + 1}.</div>
                                    <div className='w-1/2 my-2 mx-4 truncate'>{puzzle.name.toUpperCase()}</div>
                                    <div className='m-2 '>{puzzle.timeTakenToAnswer}s</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='fixed bottom-0 flex w-1/2 content-center justify-center font-[family-name:var(--font-ibm-r)] text-[2.5vw] text-white m-8 animate-fadeIn'>
                NEXT GAME STARTS <span className='mx-4'>{count}</span>
            </div>
        </div>
    )
}
