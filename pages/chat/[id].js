import styled from 'styled-components'
import Head from 'next/head'
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../../utils/getRecipientEmail';

const Chat = ({chat, messages}) => {
  const [user] = useAuthState(auth)

  return (
    <Container>
      <Head>
        <title>Chat with: {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}

export default Chat;

export const getServerSideProps = async (context) => {
  const chatQuery = doc(db, 'chats', context.query.id)
  const chatSnapshot = await getDoc(chatQuery)
  const chat = {
    id: chatSnapshot.id,
    ...chatSnapshot.data()
  }

  const messagesQuery = query(collection(db, 'chats', context.query.id, 'messages'), orderBy('timestamp', 'asc'));
  const messagesSnapshot = await getDocs(messagesQuery)
  const messages = messagesSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })).map(messages => ({
    ...messages,
    timestamp: messages.timestamp.toDate().getTime()
  }))

  return {
    props: {
      chat,
      messages
    }
  }
}

const Container = styled.div`
  display: flex;
`

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`