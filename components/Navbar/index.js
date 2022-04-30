import Link from 'next/link';
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

function Navbar() {

    const { loggedInUser } = useContext(AuthContext)
    console.log(loggedInUser)

    return (
        <div>
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
                    <Link href={`/${loggedInUser.user._id}`} passHref><p>User</p></Link>
                </>

            }

        </div>
    );
}

export default Navbar;