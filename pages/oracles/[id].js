import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { api } from '../api/api'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'
import Card from '../../components/Card'
import RandomCard from '../../components/randomCard'
function Oracle() {

    const { loggedInUser } = useContext(AuthContext)
    console.log(loggedInUser)

    const router = useRouter()
    const { id } = router.query

    const [showCard, setShowCard] = useState(false)

    const [isLoading, setIsloading] = useState(true)
    const [oracle, setOracle] = useState({
        name: '',
        description: '',
        category: '',
        author: '',
        public: "false",
        cards: []
    })

    useEffect(() => {

        async function fetchOracle() {
            setIsloading(true)
            try {
                const response = await api.get(`/oracles/list/${id}`);
                setOracle({ ...response.data })
                setIsloading(false)
                console.log(response, "response do usuario logado")
            } catch (error) {
                console.error(error);
            }
        }
        fetchOracle();
    }, [id, loggedInUser])


    return (
        <>
            {!isLoading &&
                <div>
                    <p>Pagina de detalhes do oracle</p>
                    <p>Nome: {oracle.name}</p>
                    <p>Descrição: {oracle.description}</p>
                    <p>Cartas</p>
                    {oracle.cards.map((cE) => {
                        return (
                            <Card card={cE} key={cE.name} />
                        )
                    })}

                    <div>
                        <button onClick={() => setShowCard(!showCard)}>Tirar uma carta!</button>
                        {showCard && oracle.cards.length > 0 &&
                            <RandomCard oracle={oracle} />
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default Oracle;