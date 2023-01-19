import { React, useState, useContext } from 'react'
import { AuthContext } from '../utils/context';
import { SearchSvg } from '../imgs/SearchSvg'
import { ChatItem } from './ChatItem'
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseStorage';
import './Searchbar.scss'

export const Searchbar = () => {
  const [username, setUsername] = useState("");
  const [usersArr, setUsersArr] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const usersRef = collection(db, "users");
  const userQuery = query(usersRef, where("displayName", "==", username));

  const getUser = async () => {
    const resArr = [];
    const userSnapshot = await getDocs(userQuery);
    userSnapshot.forEach((doc) => {
      setUsersArr([...resArr, doc.data()]);
      resArr.push(doc.data());
    })
  }

  const handleKey = async (e) => {
  if(e.key === 'Enter') {
      getUser();
      return;
    }
    return;
  }
  
  const clearUsersArr = () => {
    setUsersArr([]);
  }

  const selectUser = async (user) => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    console.log(1);
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));
      if(!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), {messages: []});

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })
      }
    } catch (error) {
      console.log(error);
      return true;
    }

    clearUsersArr();
    setUsername("");
  }
  return (
    <div className="searchbar">
        <div className="search" onKeyDown={(e) => { clearUsersArr(); handleKey(e) }}>
            <input type="text" className="search_input" placeholder='Search ...' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <div onClick={() => { clearUsersArr(); getUser(); }} style={{cursor: 'pointer'}}><SearchSvg /></div>
        </div>
        {usersArr.map((user) => 
          <ChatItem username={user.displayName} message=" " imgUrl={user.photoURL} key={user.uid} select={() => selectUser(user)}></ChatItem>
        )}
    </div>
  )
}
