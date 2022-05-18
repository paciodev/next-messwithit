import { Button } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import Head from 'next/head'
import styled from 'styled-components'
import { auth, provider } from '../firebase';

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert);
  }

  return (
    <div>
      <Container>
        <Head>
          <title>Login to MessWithIt</title>
        </Head>

        <LoginContainer>  
          <Logo src='/MessWithIt.png' />
          <Button onClick={signIn} variant='outlined'>Sign in with Google</Button>
        </LoginContainer>
      </Container>
    </div>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-content: center;
  height: 100vh; 
  background-color: white;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: whitesmoke;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0,0,0,.7);
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 10px;
  margin-bottom: 50px;
`;