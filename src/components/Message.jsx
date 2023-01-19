import React from 'react'
import { useContext } from 'react'
import { AuthContext, ChatContext } from '../utils/context'
import "./Message.scss"

export const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  return (
    <div className={`message ${message.senderId == currentUser.uid && 'owner'}`}>
        <div className="message_info">
            <img src={message.senderId == currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="profile" width="40" height="40" className="message_info-img" />
            <p className="message_info-time">{new Date(message.date.seconds * 1000).toDateString()}</p>
            <p className="message_info-time">{new Date(message.date.seconds * 1000).toLocaleTimeString()}</p>
        </div>
        <div className="message_content">
            <p className="message_content-text">{message.text}</p>
            {message.img && <img src={message.img} alt="img" className="message_content-img"/>}
        </div>
    </div>
  )
}
