import { useState } from 'react';
import Confetti from 'react-confetti-boom';
//
//
const Celebration = ({ showConfetti }) => {
    //const [showConfetti, setShowConfetti] = useState(false)
    return (<div className="fixed left-0">
        {showConfetti && <Confetti mode={'boom'} particleCount={100} />}
    </div>)
}

export default Celebration;