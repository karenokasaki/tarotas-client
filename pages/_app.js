import { AuthContextComponent } from '../contexts/AuthContext';
import "../styles/globals.css";
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextComponent>
      <Navbar />
      <Component {...pageProps} />
    </AuthContextComponent>
  )
}

export default MyApp