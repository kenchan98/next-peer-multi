import { useState, useEffect, useRef, useCallback } from 'react';

const useCountdown = (initialValue) => {
    const [count, setCount] = useState(initialValue);
    const [isActive, setIsActive] = useState(true);
    const intervalRef = useRef(null);

    const stopCountdown = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsActive(false);
    }, []);

    const startCountdown = useCallback(() => {
        if (!isActive && count > 0) {
            setIsActive(true);
        }
    }, [isActive, count]);

    const resetCountdown = useCallback((newValue) => {
        stopCountdown();
        setCount(newValue);
        setIsActive(true);
    }, [stopCountdown]);

    useEffect(() => {
        if (!isActive || count <= 0) {
            stopCountdown();
            return;
        }

        intervalRef.current = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isActive, count, stopCountdown]);

    return {
        count,
        isActive,
        start: startCountdown,
        stop: stopCountdown,
        reset: resetCountdown,
    };
};

export default useCountdown;

// Usage example:
// const { count, isActive, start, stop, reset } = useCountdown(60);