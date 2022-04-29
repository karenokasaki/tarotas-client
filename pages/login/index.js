import { api } from '../api/api';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { useRouter } from 'next/router'

function Login() {

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const { setLoggedInUser } = useContext(AuthContext) // Puxa o context (que é um objeto) e seleciona a função que atualiza o usuário
    const router = useRouter() // Instancia o router

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const response = await api.post("/users/login", form);
            setLoggedInUser(response.data); // Nossa função do useContext
            localStorage.setItem("loggedInUser", JSON.stringify(response.data)); // Passa pro cache local
            router.push('/') // Redirecionamento
        } catch (e) { alert(`Algo deu errado`) }
    }

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    return (
        <div>
            Login Page

            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;