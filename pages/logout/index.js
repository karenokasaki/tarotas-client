import { useEffect } from 'react';
import { useRouter } from 'next/router'


function Logout() {

    const router = useRouter()

    useEffect(() => {
        function removeToken() {
            try {
                localStorage.removeItem('loggedInUser')
                setTimeout(() => {
                    router.push("/")
                    router.reload(window.location)
                }, 500);
            } catch (error) {
                console.error(error);
            }
        }
        removeToken();
    }, [])

    return (
        <>
            <h1>Você foi deslogado!</h1>
        </>);
}

export default Logout;