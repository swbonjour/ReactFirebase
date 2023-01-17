import { React, useState } from 'react'
import { SearchSvg } from '../imgs/SearchSvg'
import { ChatItem } from './ChatItem'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseStorage';
import './Searchbar.scss'

export const Searchbar = () => {
  const [username, setUsername] = useState("");
  const [usersArr, setUsersArr] = useState([]);

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
  const clearUsersArr = () => {
    setUsersArr([]);
  }
  return (
    <div className="searchbar">
        <div className="search">
            <input type="text" className="search_input" placeholder='Search ...' onChange={(e) => setUsername(e.target.value)}/>
            <div onClick={() => { clearUsersArr(); getUser(); }}><SearchSvg /></div>
        </div>
        {usersArr.map((user) => 
          <ChatItem username={user.displayName} message=" " imgUrl={user.photoURL} key={user.uid}></ChatItem>
        )}
    </div>
  )
}
