import styled from 'styled-components'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Welcome from '../components/Welcome'

export default function Home() {
  return (
    <div>
      <Head>
        <title>MessWithIt</title>
      </Head>
      <AppContainer>
        <Sidebar />
        <Welcome />
      </AppContainer>
    </div>
  )
}

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`
