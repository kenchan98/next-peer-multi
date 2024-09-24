import Confetti from 'react-confetti-boom';
//
//
const ShowConfetti = () => {
    return (<div className="fixed left-0 top-0">
        <Confetti mode={'boom'} particleCount={300} />
    </div>)
}

export default ShowConfetti;