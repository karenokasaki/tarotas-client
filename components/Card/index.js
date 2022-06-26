import { useState } from 'react'


function Card({ card }) {

    const [showInfo, setShowInfo] = useState(false)

    return (
        <div onClick={() => setShowInfo(!showInfo)}>
            <p>{card.name} - {card.number}</p>
            <p>{card.description_short}</p>
            {showInfo &&
                <>
                    <p>{card.description}</p>
                    <p>{card.translation}</p>
                </>
            }
        </div>
    );
}

export default Card;