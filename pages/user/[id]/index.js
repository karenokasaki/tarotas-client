
import { useEffect, useState } from "react";
import { api } from '../../api/api';
import Link from 'next/link'
import { useRouter } from 'next/router'


function User() {

    const router = useRouter()
    const { id } = router.query

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

                <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        Nome
                    </span>
                    <div className="border font-medium focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
                        {user.name}
                    </div>
                </div>
                <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        Email
                    </span>
                    <div className="border focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
                        {user.email}
                    </div>
                </div>
                <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        Id
                    </span>
                    <div className="border  focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
                        {user._id}
                    </div>
                </div>

                <p>Oráculos Favoritos: </p>
                {!isLoading && (user.favorite.length > 0) &&
                    user.favorite.map((cE) => {
                        return (
                            <p key={cE.name}
                                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            ><Link href={`/user/${id}/oracle/${cE._id}`} passHref key={cE._id}>{cE.name}</Link></p>
                        )
                    })
                }

                <div
                    className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

                ><Link href={`/user/${id}/oracle/add`}>Criar um Oráculo</Link></div>
            </div>
        </div>
    );
}

export default User;