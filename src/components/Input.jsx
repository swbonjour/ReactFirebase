import React from 'react'
import { SendSvg } from '../imgs/SendSvg';
import { ImgSvg } from '../imgs/ImgSvg';
import { useState } from 'react';
import { AuthContext, ChatContext } from '../utils/context';
import { useContext } from 'react';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseStorage';
import { v4 as uuid } from 'uuid';
import { storage } from '../utils/firebaseStorage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import "./Input.scss";

export const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(undefined);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  
  const handleSend = async (e) => {
    e.preventDefault();
    if(img) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(
        () => {
          getDownloadURL(storageRef)
            .then(async (downloadUrl) => {
              await updateDoc(doc(db,'chats',data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text: text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadUrl,
                })
              })
            })
        }
      );
    } else {
      await updateDoc(doc(db,'chats',data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      })
    }

    await updateDoc(doc(db,'userChats',currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    })

    await updateDoc(doc(db,'userChats',data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    })

    setText("");
    setImg(undefined);
  }

  return (
    <div className="input_chat">
        <form action="" onSubmit={async (e) => await handleSend(e)}>
            <textarea type="text" className="input_chat-input" placeholder='Message' onChange={(e) => { setText(e.target.value)}} value={text}/>
            <button type='submit' className="input_chat-button"><SendSvg></SendSvg></button>
            <label className="input_chat-file">
              <ImgSvg></ImgSvg>
              <input type="file" onChange={(e) => { setImg(e.target.files[0])}}/>
            </label>
        </form>
    </div>
  )
}
