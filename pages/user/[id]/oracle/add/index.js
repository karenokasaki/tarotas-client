import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/router'
import { api } from '../../../../api/api';



function AddOracle() {

    const router = useRouter()
    const { id } = router.query


    return (
        <div>
            <p>Crie seu oráculo!</p>

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
                    <Field
                        name="name"
                        type='text'
                        placeholder='Nome do Oráculo'
                        require="true"
                    /><Field
                        name="description"
                        as='textarea'
                        placeholder='Descrição do Oráculo'
                        require="true"
                    /><Field
                        name="category"
                        type='text'
                        placeholder='Categoria'
                        require="true"
                    /><Field
                        name="author"
                        type='text'
                        placeholder='Autor(a)'
                        require="true"
                    />
                    <Field
                        as="select"
                        name="public"
                    >
                        <option value={true}>Público</option>
                        <option value={false}>Privado</option>
                    </Field>
                    <button type='submit'>Criar!</button>
                </Form>
            </Formik>
        </div>
    );
}

export default AddOracle;