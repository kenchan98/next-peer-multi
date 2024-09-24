import ConnectionIndicator from '../general/connectionIndicator';
import Image from 'next/image';

export default function Top({ isConnected }) {
    return (
        <div className='fixed flex w-full items-center top-0 left-0'>
            <div className='flex justify-center w-12'><ConnectionIndicator isConnected={isConnected} wh='3' /></div>
            <div className='flex items-center w-3/5'><Image className='w-full' src='/assets/img/logo.svg' width='40' height='40' alt='logo' /></div>
        </div>
    )
}