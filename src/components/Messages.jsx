import { doc, onSnapshot } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { ChatContext } from '../utils/context'
import { db } from '../utils/firebaseStorage'
import { Message } from './Message'
import "./Messages.scss"

export const Messages = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db,'chats',data.chatId), (doc) => {
      if(doc.exists()) {
        setMessages(doc.data().messages);
      }
    })

    return () => unsub();
  }, [data.chatId])
  return (
    <div className="messages">
        {messages.map((m) => (
          <Message message={m} key={m.id}/>
        ))}
    </div>
  )
}
