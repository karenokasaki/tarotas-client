import { useEffect, useState } from 'react';
import { api } from '../api/api';
import Link from 'next/link'

function Oracles() {

    const [isLoading, setIsloading] = useState(true)
    const [oracles, setOracles] = useState([])

    useEffect(() => {
        async function fetchOracles() {
            try {
                const response = await api.get(`/oracles/list`);
                setOracles([...response.data]);
                setIsloading(false)
            } catch (error) {
                console.error(error);
            }
        }
        fetchOracles();
    }, [])



    return (
        <div>
            {!isLoading &&
                oracles.map((cE) => {
                    return (
                        <div key={cE._id}>
                            <Link
                                href={`/oracles/${cE._id}`} passHref
                            >
                                <p className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                >{cE.name}</p></Link>
                        </div>
                    )
                })
            }

        </div>
    );
}

export default Oracles;