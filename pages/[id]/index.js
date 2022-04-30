
import { useEffect, useState } from "react";
import { api } from '../api/api';
import Link from 'next/link'

function User() {

    const [isLoading, setIsloading] = useState(true)
    const [user, setUser] = useState({})

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await api.get(`/users/profile`);
                setUser({ ...response.data });
                setIsloading(false)
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, [])



    return (
        <div>Home do usuário

            <div>
                <h1>Informações do usuário</h1>
                <p>Nome {user.name}</p>
                <p>Email {user.email}</p>
                <p>Id {user._id}</p>
                <p>Oráculos Favoritos: </p>
                {!isLoading && (user.favorite.length > 0) &&
                    user.favorite.map((cE) => {
                        return (
                            <Link href={`/oracles/${cE._id}`} passHref key={cE._id}>{cE.name}</Link>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default User;