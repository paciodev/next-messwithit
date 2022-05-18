import { Avatar } from '@mui/material';
import { collection, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components'
import { auth, db } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';


const Chat = ({ id, users }) => {
  const router = useRouter();

  const [user] = useAuthState(auth)
  const [recipientSnapshot] = useCollection(query(collection(db, 'users'), where('email', '==', getRecipientEmail(users, user))))
  const recipient = recipientSnapshot?.docs[0]?.data()
  const recipientEmail = getRecipientEmail(users, user);

  const enterChat = () => {
    router.push(`/chat/${id}`)
  }

  return (
    <div>
      <Container onClick={enterChat}>
        {recipient ? (
          <UserAvatar src={recipient?.photoURL} />
        ) : (
          <UserAvatar>{recipientEmail[0]}</UserAvatar>
        )}
        <UserEmailPlaceholder>{recipientEmail}</UserEmailPlaceholder>
      </Container>
    </div>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  transition: background .2s linear;

  :hover {
    background: #e9eaeb;
  }
`

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`

const UserEmailPlaceholder = styled.p`
  @media (max-width: 850px) {
    display: none;
  }
`