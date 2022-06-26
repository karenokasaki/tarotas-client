import { useEffect, useState } from 'react';
import { api } from '../../../../api/api';
import { useRouter } from 'next/router'
import { Formik, Form, Field } from 'formik'
import RandomCard from '../../../../../components/randomCard';
import Card from '../../../../../components/Card';



function IdOracle() {

    const router = useRouter()
    const { id, idOracle } = router.query

    const [oracle, setOracle] = useState({
        name: '',
        description: '',
        category: '',
        author: '',
        public: "false",
        cards: []
    })
    const [showForm, setShowForm] = useState(false)
    const [showCard, setShowCard] = useState(false)

    useEffect(() => {
        async function fetchOracle() {
            try {

                const response = await api.get(`/oracles/${idOracle}`)
                setOracle({ ...response.data })

            } catch (error) {
                alert(error)
            }
        }
        fetchOracle()
    }, [idOracle, showForm])

    return (
        <div>
            <p>{oracle.name}</p>
            <p>{oracle.description}</p>
            <p>{oracle.category}</p>
            <p>{oracle.createBt}</p>
            <p>{oracle.createDate}</p>
            <p>É publico? {oracle.public}</p>

            <p>Cartas:</p>
            {oracle.cards.map((cE) => {
                return (
                    <Card card={cE} key={cE.name} />
                )
            })}

            <button onClick={() => setShowForm(!showForm)}>Criar uma carta!</button>
            {showForm &&
                <div>
                    <Formik
                        initialValues={{
                            name: '',
                            description: '',
                            description_short: '',
                            description_reverse: '',
                            number: '',
                            translate: '',
                            oracle: idOracle
                        }}
                        onSubmit={async function (values) {
                            try {
                                console.log(values)
                                const response = await api.post('cards/create-card', values)
                                console.log(response)

                                setShowForm(false)
                            } catch (error) {
                                alert(error)
                            }
                        }}
                    >
                        <Form>
                            <Field
                                name='name'
                                type='text'
                                placeholder='Nome da carta'
                                require="true"
                            />
                            <Field
                                name='description'
                                as='textarea'
                                placeholder='Descriçao longa'
                            />
                            <Field
                                name='description_short'
                                type='text'
                                placeholder='Descriçao curta'
                                require="true"
                            />
                            <Field
                                name='description_reverse'
                                as='textarea'
                                placeholder='Descriçao invertida'
                                require="true"
                            />
                            <Field
                                name='number'
                                type='textarea'
                                placeholder='Numero da Carta'
                                require="true"
                            />
                            <Field
                                name='translate'
                                type='textarea'
                                placeholder='Tradução'
                            />
                            <button type='submit'>Salvar Carta</button>
                        </Form>
                    </Formik>
                </div>
            }

            <div>
                <button onClick={() => setShowCard(!showCard)}>Tirar uma carta!</button>
                {showCard &&
                    <RandomCard oracle={oracle} />
                }
            </div>

        </div>
    );
}

export default IdOracle;