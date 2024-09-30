import ConnectionIndicator from '../general/connectionIndicator';
import Image from 'next/image';

export default function Top({ isConnected }) {
    return (
        <div className='flex w-auto items-center m-4'>
            <div className='flex justify-center'><ConnectionIndicator isConnected={isConnected} wh='3' /></div>
            <div className='flex items-center w-full'><Image className='w-full' src='/assets/img/logo.svg' width='40' height='40' alt='logo' /></div>
        </div>
    )
}