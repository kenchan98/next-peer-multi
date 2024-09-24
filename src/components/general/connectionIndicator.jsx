const ConnectionIndicator = ({ isConnected, wh = '2' }) => {
    return (
        <div className='flex content-center justify-center w-12'>
            <span className={`w-3 h-3 rounded-full m-1 ${isConnected ? 'bg-green-500 connected' : 'bg-gray-400'} `}></span>
        </div>
    )
}

export default ConnectionIndicator;