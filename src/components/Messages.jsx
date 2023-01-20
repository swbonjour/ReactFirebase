import { doc, onSnapshot } from 'firebase/firestore'
import React, { useRef } from 'react'
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

  const ref = useRef();

  useEffect(() => {
    const unsub = onSnapshot(doc(db,'chats',data.chatId), (doc) => {
      if(doc.exists()) {
        setMessages(doc.data().messages);
      }
    })

    ref.current.scroll({ top: ref.current.scrollHeight });

    return () => unsub();
  }, [data.chatId, messages.length])
  return (
    <div className="messages" ref={ref}>
        {messages.map((m) => (
          <Message message={m} key={m.id}/>
        ))}
    </div>
  )
}
