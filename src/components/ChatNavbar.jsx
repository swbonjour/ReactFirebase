import React from 'react'
import { CallSvg } from '../imgs/CallSvg'
import { SettingsSvg } from '../imgs/SettingsSvg'
import './ChatNavbar.scss'

export const ChatNavbar = () => {
  return (
    <div className="chat_navbar">
        <p className="chat_navbar-name">Aboba</p>
        <div className="chat_navbar-options">
            <CallSvg></CallSvg>
            <SettingsSvg></SettingsSvg>
        </div>
    </div>
  )
}
