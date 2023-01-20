import React from 'react'
import { useContext } from 'react'
import { ArrowBack } from '../imgs/ArrowBack'
import { CallSvg } from '../imgs/CallSvg'
import { SettingsSvg } from '../imgs/SettingsSvg'
import { ChatContext } from '../utils/context'
import './ChatNavbar.scss'

export const ChatNavbar = () => {
  const { data } = useContext(ChatContext);
  console.log(document.querySelector('.sidebar'));
  return (
    <div className="chat_navbar">
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}>
        <div onClick={() => {document.querySelector('.sidebar').style.transform = 'translateX(0px)'}} className="chat_navbar-arrow"><ArrowBack></ArrowBack></div>
        <p className="chat_navbar-name">{data.user.displayName}</p>
      </div>
      <div className="chat_navbar-options">
          {Object.keys(data.user).length != 0 &&  <CallSvg></CallSvg>}
          {Object.keys(data.user).length != 0 && <SettingsSvg></SettingsSvg>}
      </div>
    </div>
  )
}
