import { useState } from 'react'


function Card({ card }) {

    const [showInfo, setShowInfo] = useState(false)

    return (
        <div onClick={() => setShowInfo(!showInfo)}>
            <p>Nome: {card.name} - Numero: {card.number}</p>
            <p>Descrição curta: {card.description_short}</p>
            {showInfo &&
                <>
                    <p>Descrição: {card.description}</p>
                    <p>Tradução: {card.translation}</p>
                </>
            }
        </div>
    );
}

export default Card;