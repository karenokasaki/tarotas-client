import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { api } from '../api/api'

function Oracle() {

    const router = useRouter()
    const { id } = router.query

    const [isLoading, setIsloading] = useState(true)
    const [oracle, setOracle] = useState({})

    useEffect(() => {
        async function fetchOracle() {
            try {
                const response = await api.get(`/oracles/${id}`);
                setOracle({ ...response.data });
                setIsloading(false)
            } catch (error) {
                console.error(error);
            }
        }
        fetchOracle();
    }, [id])

    console.log(oracle)

    return (
        <div>
            <p>Pagina de detalhes do oracle</p>
            {oracle.name}
            {!isLoading &&
                oracle.cards.map((cE) => {
                    return (
                        <div key={cE}>
                            <p>{cE.name} - {cE.number}</p>
                            <p>{cE.desc_min}</p> <hr></hr>
                        </div>
                    )
                })}
        </div>
    );
}

export default Oracle;