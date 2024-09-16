'use client';

import { useState } from 'react';
import { updateServerVariable } from '@/lib/actions';
import { useRouter } from 'next/navigation';

const SetServer = ({ initialiseServer }) => {
    const [newValue, setNewValue] = useState('');
    const [serverValue, setServerValue] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedValue = await updateServerVariable(newValue);
        setServerValue(updatedValue);
        //setNewValue('');
        // Force a refresh of all routes
        router.refresh();
        initialiseServer();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
            />
            <button type="submit">Update Variable</button>
            {serverValue && <p>Updated server value: {serverValue}</p>}
        </form>
    )
}

export default SetServer;