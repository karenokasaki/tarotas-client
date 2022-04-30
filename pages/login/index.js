import { api } from '../api/api';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/router'
import { Formik, Form, Field } from 'formik'

function Login() {

    const { setLoggedInUser } = useContext(AuthContext) // Puxa o context (que é um objeto) e seleciona a função que atualiza o usuário
    const router = useRouter() // Instancia o router

    return (
        <div>
            Login Page

            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={async function (values) {
                    try {
                        const response = await api.post("/users/login", values);
                        setLoggedInUser(response.data); // Nossa função do useContext
                        localStorage.setItem("loggedInUser", JSON.stringify(response.data)); // Passa pro cache local
                        console.log(response.data)
                        router.push(`/${response.data.user._id}`) // Redirecionamento
                    } catch (e) { alert(`Algo deu errado`) }
                }}>
                <Form>
                    <Field
                        id='email'
                        name='email'
                        type='text'
                        placeholder='Email'
                        require="true"
                        className="mb-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                    />
                    <Field
                        id="password"
                        name="password"
                        placeholder="Senha"
                        type="password"
                        required="true"
                        className="mt-5 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                    />
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >Login</button>
                </Form>
            </Formik>

        </div>
    );
}

export default Login;