import React, { useEffect, useRef } from 'react'
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
  const [previewImg, setPreviewImg] = useState(undefined);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  useEffect(() => {
    setText("");
    setImg(undefined);
    setPreviewImg(undefined);
  }, [data])

  
  const handleSend = async (e) => {
    e.preventDefault();
    if(text == "" && img == undefined) {
      return;
    }
    const textCopy = text;
    const imgCopy = img;
    setText("");
    setImg(undefined);
    if(img) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, imgCopy).then(
        () => {
          getDownloadURL(storageRef)
            .then(async (downloadUrl) => {
              await updateDoc(doc(db,'chats',data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text: textCopy,
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
          text: textCopy,
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
  }

  const handleSendEnter = async (e) => {
    if(e.key == 'Enter') {
      handleSend(e);
    }
  }

  const handleImgInput = async (file) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      setPreviewImg(e.target.result);
    }
    
    fileReader.readAsDataURL(file);
  }

  return (
    <div className="input_chat">
        <form action="" onSubmit={async (e) => await handleSend(e)} onKeyDown={async (e) => { await handleSendEnter(e) }}>
            <textarea type="text" className="input_chat-input" placeholder='Message' onChange={(e) => { setText(e.target.value)}} value={text}/>
            <button type='submit' className="input_chat-button"><SendSvg></SendSvg></button>
            <label className="input_chat-file">
              <ImgSvg></ImgSvg>
              <input type="file" onChange={(e) => { setImg(e.target.files[0]); handleImgInput(e.target.files[0])}}/>
              {previewImg && <img src={previewImg} alt="img" width={20} height={20}/>}
            </label>
        </form>
    </div>
  )
}
