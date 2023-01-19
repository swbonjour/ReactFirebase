import React from 'react'
import './ChatItem.scss'

export const ChatItem = ({username, message, imgUrl, select}) => {
  return (
    <div className="chat_item" onClick={select}>
        <div className="chat_item-img"><img src={imgUrl || require('../imgs/profileImg.jpg')} alt="profile" width='40' height='40' /></div>
        <div className="chat_item-content">
            <p className="chat_item-name">{username || "Aboba"}</p>
            <p className="chat_item-message">{message}</p>
        </div>
    </div>
  )
}
