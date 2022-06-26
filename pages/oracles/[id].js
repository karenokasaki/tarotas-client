import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { api } from '../api/api'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

function Oracle() {

    const { loggedInUser } = useContext(AuthContext)
    console.log(loggedInUser)

    const router = useRouter()
    const { id } = router.query
    console.log(id)

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
            if (loggedInUser.token) {
                try {
                    const response = await api.get(`/oracles/user/${id}`);
                    setOracle(...response.data)
                    setIsloading(false)
                    console.log(response.data, "response do usuario logado")
                } catch (error) {
                    console.error(error);
                }
            } else {

                try {
                    const response = await api.get(`/oracles/${id}`);
                    setOracle(...response.data);
                    setIsloading(false)
                    console.log("response sem estar logado")
                } catch (error) {
                    console.error(error);
                }
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
                    {oracle.cards.map((cE) => {
                        return (
                            <div key={cE}>
                                <p>{cE.name} - {cE.number}</p>
                                <p>{cE.desc_min}</p> <hr></hr>
                            </div>
                        )
                    })}
                    <p>Tiragens recentes:</p>
                </div>
            }
        </>
    );
}

export default Oracle;