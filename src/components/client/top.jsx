import ConnectionIndicator from '../general/connectionIndicator';
import Image from 'next/image';

export default function Top({ isConnected, timerCount }) {
    return (
        <div className='flex w-full justify-center content-center items-center '>
            <div className='flex justify-center w-6 text-white'>{timerCount}</div>
            <div className='flex items-center grow'><Image className='w-full' src='/assets/img/logo.svg' width='40' height='40' alt='logo' /></div>
            <div className='flex justify-center w-6'><ConnectionIndicator isConnected={isConnected} /></div>
        </div>
    )
}