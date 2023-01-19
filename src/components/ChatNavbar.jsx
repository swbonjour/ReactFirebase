import React from 'react'
import { useContext } from 'react'
import { CallSvg } from '../imgs/CallSvg'
import { SettingsSvg } from '../imgs/SettingsSvg'
import { ChatContext } from '../utils/context'
import './ChatNavbar.scss'

export const ChatNavbar = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat_navbar">
        <p className="chat_navbar-name">{data.user.displayName}</p>
        <div className="chat_navbar-options">
            <CallSvg></CallSvg>
            <SettingsSvg></SettingsSvg>
        </div>
    </div>
  )
}
