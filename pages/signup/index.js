import { useState } from 'react';
import { api } from '../api/api';



function Signup() {

    const [form, setForm] = useState({
        email: '',
        password: '',
        name: ''
    });

    function handleSubmit(event) {
        event.preventDefault()
        api.post('/users/create-user', form)
    }

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    return (
        <div>
            Signup page

            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                <button type="submit">Signup</button>
            </form>
        </div>);
}

export default Signup;