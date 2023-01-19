import { React, useState, useContext } from 'react'
import { Navbar } from './Navbar'
import { Searchbar } from './Searchbar'
import { ChatItem } from './ChatItem'
import { useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../utils/firebaseStorage'
import { AuthContext } from '../utils/context'
import './Sidebar.scss'

export const Sidebar = () => {
  const [chats, setChats] = useState([]);

  const {currentUser} = useContext(AuthContext);

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
        {Object.entries(chats).map((chat) => 
          <ChatItem username={chat[1][1].userInfo.displayName} message="" imgUrl={chat[1][1].userInfo.photoURL} key={chat[0][0]}></ChatItem>
        )}
    </div>
  )
}
