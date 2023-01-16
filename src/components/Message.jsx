import React from 'react'
import "./Message.scss"

export const Message = () => {
  return (
    <div className="message">
        <div className="message_info">
            <img src={require('../imgs/profileImg.jpg')} alt="profile" width="40" height="40" className="message_info-img" />
            <p className="message_info-time">Just Now</p>
        </div>
        <div className="message_content">
            <p className="message_content-text">Abobaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
            <img src={require('../imgs/profileImg.jpg')} alt="img" className="message_content-img"/>
        </div>
    </div>
  )
}
