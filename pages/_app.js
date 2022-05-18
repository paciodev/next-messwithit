import '../styles/globals.css'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from '../firebase'
import Login from './login';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const q = doc(db, 'users', user.uid);
      
      setDoc(q, {
        email: user.email,
        lastSeen: serverTimestamp(),
        photoURL: user.photoURL
      }, { merge: true });
    }
  }, [user]);

  if (loading) return <Loading />
  if (!user) return <Login />

  return (
    <>
      <Head>
        <link rel="icon" href="/MessWithIt.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
