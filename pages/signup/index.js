import { useState } from 'react';
import { api } from '../api/api';
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/router'

function Signup() {

    const router = useRouter()

    return (
        <div>
            Signup page

            <Formik
                initialValues={{ email: '', password: '', name: '' }}
                onSubmit={async function (values) {
                    try {
                        await api.post("/users/create-user", values);
                        router.push("/login")
                    } catch (e) { alert(`Algo deu errado`) }
                }}>

                <Form>
                    <Field
                        id='email'
                        name='email'
                        type='text'
                        placeholder='Email'
                        className="mb-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"

                    />
                    <Field
                        id='password'
                        name='password'
                        type='password'
                        placeholder='Password'
                        className="mb-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"

                    />
                    <Field
                        id='name'
                        name='name'
                        type='text'
                        placeholder='Nome Completo'
                        className="mb-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"

                    />
                    <button 
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                        >Cadastre-se Agora!</button>
                </Form>
            </Formik>
        </div>);
}

export default Signup;