import React from 'react'
import './ChatItem.scss'

export const ChatItem = () => {
  return (
    <div className="chat_item">
        <div className="chat_item-img"><img src={require('../imgs/profileImg.jpg')} alt="profiel" width='40' height='40' /></div>
        <div className="chat_item-content">
            <p className="chat_item-name">Aboba</p>
            <p className="chat_item-message">Abobaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
        </div>
    </div>
  )
}
