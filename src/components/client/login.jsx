import { useState, useEffect, useRef } from 'react';
import Button from "../general/button";

const Login = ({ clientID, func1, func2 }) => {
    const [connectButtonPressed] = useState(false);
    /*const inputRef = useRef(null);
    //
    //
    useEffect(() => {
        // Prevent zoom on focus
        const preventZoom = () => {
            const viewport = document.querySelector('meta[name="viewport"]')
            if (viewport) {
                viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
            }
        }

        // Reset viewport on blur
        const resetViewport = () => {
            const viewport = document.querySelector('meta[name="viewport"]')
            if (viewport) {
                viewport.content = 'width=device-width, initial-scale=1.0'
            }
        }

        if (inputRef.current) {
            inputRef.current.addEventListener('focus', preventZoom)
            inputRef.current.addEventListener('blur', resetViewport)
        }
    }, []);*/
    //
    //
    return (
        <div className="flex flex-col grow justify-center text-center">
            <div className='flex font-[family-name:var(--font-ibm-bi)] justify-center items-center text-3xl h-1/2 text-white'>WELCOME!</div>
            <input
                className="w-full h-12 p-2 mb-4 self-center text-gray-950 text-center rounded"
                //ref={inputRef}
                type="text"
                value={clientID}
                onChange={func1}
                placeholder="Please enter your name"
            />
            {!connectButtonPressed ? <Button value="Join game" width='full' func={() => { func2(); }} /> : "Connecting ..."}
        </div>
    );
}

export default Login;