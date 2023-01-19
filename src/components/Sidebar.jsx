import { React, useState, useContext } from 'react'
import { Navbar } from './Navbar'
import { Searchbar } from './Searchbar'
import { ChatItem } from './ChatItem'
import { useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../utils/firebaseStorage'
import { AuthContext, ChatContext } from '../utils/context'
import './Sidebar.scss'

export const Sidebar = () => {
  const [chats, setChats] = useState([]);

  const {currentUser} = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSelect = (user) => {
    dispatch({type: "CHANGE_USER", payload: user})
  }

  useEffect(() => {
    const userFetched = () => {
        const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(Object.entries(doc.data()));
      });
      return () => unsub();
    }
    currentUser.uid && userFetched();
  }, [currentUser.uid]);
  return (
    <div className="sidebar" style={{color: 'white'}}>
        <Navbar></Navbar>
        <Searchbar></Searchbar>
        {Object.entries(chats).sort((a,b) => b[1][1].date - a[1][1].date).map((chat) => 
          <ChatItem username={chat[1][1].userInfo.displayName} message={chat[1][1].lastMessage?.text} imgUrl={chat[1][1].userInfo.photoURL} key={chat[0][0]} select={() =>  handleSelect(chat[1][1].userInfo)}></ChatItem>
        )}
    </div>
  )
}
