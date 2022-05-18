import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components'
import { auth, db } from '../firebase';
import { useRouter } from 'next/router';
import { Avatar, IconButton } from '@mui/material';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';
import { addDoc, collection, doc, orderBy, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { useRef, useState } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from 'timeago-react';

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("")
  const router = useRouter()
  const endOfTheMessagesRef = useRef(null)
  const q = query(collection(db, 'chats', router.query.id, 'messages'), orderBy('timestamp', 'asc'));
  const [messagesSnapshot] = useCollection(q);

  const recQ = query(collection(db, 'users'), where('email', '==', getRecipientEmail(chat.users, user)))
  const [recipientSnapshot] = useCollection(recQ)

  const scrollToBottom = () => {
    endOfTheMessagesRef.current.scrollIntoView({ behavior: 'smooth' , block: "start"})
  }

  const sendMessage = (e) => {
    e.preventDefault();

    const userRef = collection(db, 'users') 
    setDoc(doc(userRef, user.uid), {
      lastSeen: serverTimestamp()
    }, { merge: true })

    const messageCollectionRef = collection(db, 'chats', router.query.id, 'messages')
    addDoc(messageCollectionRef, {
      timestamp: serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL
    })

    setInput("")
    scrollToBottom()
  }

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map(message => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime()
          }}
        />
      ))
    } else {      
      messages.map(message => (
        <Message
          key={message.id}
          user={message.user}
          message={message}
        />
      ))
    }
  }

  const recipient = recipientSnapshot?.docs[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user)

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}
        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>Last active: {' '} 
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessagesContainer>
        {showMessages()}
        <EndOfTheMessages ref={endOfTheMessagesRef} />
      </MessagesContainer>
      
      <InputContainer>
        <HideIcon>
          <InsertEmoticonIcon />
        </HideIcon>
        <Input value={input} onChange={e => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
        <HideIcon>
          <MicIcon />
        </HideIcon>
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div`
  
`

const Header = styled.header`
  position: sticky;
  top: 0;
  background: whitesmoke;
  z-index: 100;
  display: flex;
  height: 80px;
  padding: 11px;
  align-items: center;
  border-bottom: 1px solid lightgray;
`

const HeaderInformation = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  margin-left: 15px;
  flex: 1;
  
  @media (max-width: 850px) {
    margin-bottom: 0px;
  }

  > h3 {
    margin-bottom: 3px;

    @media (max-width: 850px) {
      display: none;
    }
  }

  > p {
    font-size: 14px;
    color: gray;
    margin: 0;

    @media (max-width: 850px) {
      font-weight: 500;
    }
  }
`

const HeaderIcons = styled.div`
  > * {
    color: black !important;
  }

  @media (max-width: 850px) {
    display: none;
  }
`

const MessagesContainer = styled.div`
  padding: 30px;
  background: white;
  min-height: 90vh;
`

const EndOfTheMessages = styled.div`
  margin-bottom: 50px;
`

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: #fff;
  z-index: 100;
`

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: 0;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`

const HideIcon = styled.div`
  @media (max-width: 850px) {
    display: none;
  }
`