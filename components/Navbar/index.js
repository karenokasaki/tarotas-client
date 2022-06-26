import Link from 'next/link';
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

function Navbar() {

    const { loggedInUser } = useContext(AuthContext)

    return (
        <>
            <div className='bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800'>
                <div className='container flex flex-wrap justify-between items-center mx-auto'>
                    <Link href="/" passHref ><p>Tarot-as</p></Link>
                    <Link href="/oracles" passHref><p>Oracles</p></Link>
                    {!loggedInUser.token &&
                        <>
                            <Link href="/login" passHref><p>Login</p></Link>
                            <Link href="/signup" passHref><p>SignUp</p></Link>
                        </>
                    }
                    {loggedInUser.token &&
                        <>
                            <Link href="/logout" passHref><p>Logout</p></Link>
                            <Link href={`/user/${loggedInUser.user._id}`} passHref><p>User</p></Link>
                        </>
                    }

                </div>
            </div>


            

        </>
    );
}

export default Navbar