import { AuthContextComponent } from '../contexts/authContext';
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextComponent>
      <Component {...pageProps} />
    </AuthContextComponent>
  )
}

export default MyApp