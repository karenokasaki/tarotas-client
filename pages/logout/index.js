import {useEffect} from 'react';


function Logout() {

    console.log("LOG OUT")

    useEffect(() => {
        function removeToken() {
            try {
                localStorage.removeItem('loggedInUser')
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