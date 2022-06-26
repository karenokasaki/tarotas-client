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

            <button
                onClick={() => setShowForm(!showForm)}
                className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Criar uma carta!</button>
            {showForm &&
                <div>
                    <div className="mt-5 sm:mt-0">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Crie sua carta!</h3>
                                    <p className="mt-1 text-sm text-gray-600">Complete o formulário com as informações da sua carta e ela será adicionada ao seu oráculo.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 ml-2 mr-2 md:mt-0 md:col-span-2">

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
                                <label>Nome</label>
                                <Field
                                    name='name'
                                    type='text'
                                    placeholder='Nome da carta'
                                    require="true"
                                    className="md-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                                <label>Descrição completa</label>
                                <Field
                                    name='description'
                                    as='textarea'
                                    placeholder='Descriçao longa'
                                    className="md-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                                <label>Resumo</label>
                                <Field
                                    name='description_short'
                                    type='text'
                                    placeholder='Descriçao curta'
                                    require="true"
                                    className="md-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"

                                />
                                <label>Descrição invertida</label>
                                <Field
                                    name='description_reverse'
                                    as='textarea'
                                    placeholder='Descriçao invertida'
                                    require="true"
                                    className="md-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"

                                />
                                <label>Numero</label>
                                <Field
                                    name='number'
                                    as='textarea'
                                    placeholder='Numero da Carta'
                                    require="true"
                                    className="md-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"

                                />
                                <label>Tradução</label>
                                <Field
                                    name='translate'
                                    as='textarea'
                                    placeholder='Tradução'
                                    className="md-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"

                                />
                                <button
                                    type='submit'
                                    className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >Salvar Carta</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            }

            <div>
                <button
                    onClick={() => setShowCard(!showCard)}
                    className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Tirar uma carta!</button>
                {showCard && oracle.cards.length > 0 &&
                    <RandomCard oracle={oracle} />
                }
            </div>

        </div>
    );
}

export default IdOracle;