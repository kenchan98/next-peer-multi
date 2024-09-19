import React, { useState, useEffect } from 'react';

/*
const LeaderboardRow = ({ index, name, total }) => {
    return (
        <div
            className="flex justify-between items-center p-2 bg-gray-100 my-1 rounded animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <span className="w-1/2">{name}</span>
            <span className="w-1/2 text-right">{total}</span>
        </div>
    );
};

const Leaderboard = ({ data, clientsList }) => {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        // contruct dataList based on clientsList
        let list = []
        clientsList.map(client => {
            const data = { name: client.id, total: client.results.length }
            list.push(data)
        });
        // sort data based on total
        const sortedList = [...list].sort((a, b) => b.total - a.total);
        // Simulating data fetch
        setTimeout(() => {
            setLeaders(sortedList);
        }, 1000);
    }, []);

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
            <style jsx>{`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slide-in {
            animation: slideIn 0.5s ease-out forwards;
          }
        `}</style>
            <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
            <div className="flex justify-between font-bold mb-2">
                <span className="w-1/2">Name</span>
                <span className="w-1/2 text-right">Total puzzles solved</span>
            </div>
            {leaders.map((leader, index) => (
                <LeaderboardRow key={leader.name} index={index} {...leader} />
            ))}
        </div>
    );
};
*/


// Generate dummy entries
const generateDummyData = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        name: `User ${i + 1}`,
        total: Math.floor(Math.random() * 100) + 1
    }));
};

const dummyData = generateDummyData(50); // 50 entries for demonstration

const LeaderboardRow = ({ name, total }) => {
    return (
        <div className="flex justify-between items-center p-2 bg-gray-100 my-1 rounded">
            <span className="w-2/3 truncate">{name}</span>
            <span className="w-1/3 text-right">{total}</span>
        </div>
    );
};

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        // Simulating data fetch and sorting
        setTimeout(() => {
            const sortedData = [...dummyData].sort((a, b) => b.total - a.total);
            setLeaders(sortedData);
        }, 1000);
    }, []);

    return (
        <div className="w-4/5 mx-auto mt-10 p-4 text-gray-900 bg-white shadow-lg rounded-lg">
            <style jsx>{`
          @keyframes scrollWithPause {
            0%, 5% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          .scrolling-container {
            height: 400px;
            overflow: hidden;
          }
          .scrolling-content {
            animation: scrollWithPause 60s linear infinite;
          }
          .scrolling-content:hover {
            animation-play-state: paused;
          }
        `}</style>
            <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
            <div className="flex justify-between font-bold mb-2">
                <span className="w-2/3">Name</span>
                <span className="w-1/3 text-right">Total</span>
            </div>
            <div className="scrolling-container">
                <div className="scrolling-content">
                    {leaders.map((leader) => (
                        <LeaderboardRow key={leader.name} {...leader} />
                    ))}
                    {leaders.map((leader) => (
                        <LeaderboardRow key={`${leader.name}-dup`} {...leader} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;