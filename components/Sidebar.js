import styled from 'styled-components'
import { Avatar, IconButton, Button } from '@mui/material';
import * as EmailValidator from "email-validator"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { addDoc, collection, doc, query, setDoc, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'
import Chat from './Chat';
import { v4 as uuid } from 'uuid';

import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';


const Sidebar = () => {

  const [user] = useAuthState(auth);
  const userChatRef = query(collection(db, 'chats'), where('users', 'array-contains', user.email));
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt('Please enter an email address for the user you wish to chat with.');
    
    if (!input) return null;
    if (
        EmailValidator.validate(input) &&
        !chatCheck(input) &&
        input !== user.email
      ) {
      const q = collection(db, 'chats');
      addDoc(q, {
        users: [user.email, input]
      })
    }
  }

  const chatCheck = (recipientEmail) => 
    !!chatsSnapshot?.docs.find(
      chat => chat.data().users.find(user => user === recipientEmail)?.length > 0
    )
  
  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => signOut(auth)} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput />
      </Search>
      <ButtonWrapper>      
        <SidebarButton onClick={createChat}><BtnTextTrick>Start&nbsp;a&nbsp;</BtnTextTrick>new&nbsp;chat</SidebarButton>
      </ButtonWrapper>
      <Chats>
        {chatsSnapshot?.docs.map(chat => (
          <Chat
            key={chat.id}
            id={chat.id}
            users={chat.data().users}
          />
        ))}
      </Chats>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid lightgray;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  background: white;

  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 850px) {
    min-width: 100px;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`

const SearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
  background: transparent;
`

const ButtonWrapper = styled.div`
  margin: 0 20px;
`

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    color: black;
    background-color: lightgray;
    border-radius: 10px;
    padding: 10px;
    margin: 0 auto;
    margin-bottom: 20px;

    :hover {
      background-color: gray;
    }
  }
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  background: whitesmoke;
  top: 0;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid lightgray;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  transition: opacity .2s linear;

  :hover {
    opacity: .8;
  }
`;

const IconsContainer = styled.div`

  @media (max-width: 850px) {
    display: none;
  }
  > * {
     color: black !important;
  }
`;

const Chats = styled.div`
  @media (max-width: 850px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  } 
`

const BtnTextTrick = styled.span`
  @media (max-width: 850px) {
    display: none;
  }
`