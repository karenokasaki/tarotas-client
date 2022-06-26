import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/router'
import { api } from '../../../../api/api';



function AddOracle() {

    const router = useRouter()
    const { id } = router.query


    return (
        <div>
            <div className="mt-5 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Crie seu oráculo!</h3>
                            <p className="mt-1 text-sm text-gray-600">Complete as informações abaixo e depois crie suas próprias cartas.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 ml-2 mr-2 md:mt-0 md:col-span-2">
                <Formik
                    initialValues={
                        {
                            name: '',
                            description: '',
                            category: '',
                            author: '',
                            public: "false"
                        }
                    }
                    onSubmit={async function (values) {
                        try {
                            console.log(values)
                            const response = await api.post("/oracles/create", values);

                            router.push(`/user/${id}/oracle/${response.data._id}`) // Redirecionamento
                        } catch (error) {
                            alert(error)
                        }
                    }}
                >
                    <Form>
                        <label>Nome: </label>
                        <Field
                            name="name"
                            type='text'
                            placeholder='Nome do Oráculo'
                            require="true"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />

                        <label>Descrição:</label>
                        <Field
                            name="description"
                            as='textarea'
                            placeholder='Descrição do Oráculo'
                            require="true"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"

                        />
                        <label>Categoria:</label>
                        <Field
                            name="category"
                            type='text'
                            placeholder='Categoria'
                            require="true"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"

                        />
                        <label>Autora:</label>
                        <Field
                            name="author"
                            type='text'
                            placeholder='Autor(a)'
                            require="true"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"

                        />
                        <label>Publico:</label>
                        <Field
                            as="select"
                            name="public"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value={true}>Público</option>
                            <option value={false}>Privado</option>
                        </Field>
                        <button
                            type='submit'
                            className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >Criar!</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default AddOracle;