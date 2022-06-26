

function RandomCard({ oracle }) {

    const randomNumber = Math.floor(Math.random() * oracle.cards.length)
    const randomCard = oracle.cards[randomNumber]

    console.log(randomCard, "random card")

    return (
        <div>
            {randomCard.name} - {randomCard.number}
        </div>
    );
}

export default RandomCard;