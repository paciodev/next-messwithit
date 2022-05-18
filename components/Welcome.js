import styled from 'styled-components'

const Welcome = () => {
  return (
    <WelcomeContainer>
      <WelcomeContainerInner>
        <Title>Welcome on <b>MessWithIt</b> app</Title>
        <Subtitle>These are the main functions of this application:</Subtitle>
        <ul>
          <ListItem>You can text with other people by creating new chat with <b>START A NEW BUTTON</b> button. After clicking you have to write an email address that you want to chat with.</ListItem>
          <ListItem><b>WARNING!</b> By sending message to someone you will send it to person who created account on this app with email address that you passed in input.</ListItem>
          <ListItem>Click your Avatar on the sidebar to log out.</ListItem>
        </ul>
      </WelcomeContainerInner>
    </WelcomeContainer>
  );
}

export default Welcome;

const WelcomeContainer = styled.main`
  display: grid;
  place-content: center;
  height: 100vh;
  margin: 0 auto;
  max-width: 650px;
  `

const WelcomeContainerInner = styled.div`
  background-color: lightgray;
  border-radius: 15px;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform .2s ease-in-out;

  :hover {
    transform: scale(1.02)
  }
`

const Title = styled.p`
  font-size: 24px;
  margin-bottom: 0;
`

const Subtitle = styled.p`
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 0;
`

const ListItem = styled.li`
  margin: 10px 0;
`