import React from 'react'
import { ChatNavbar } from './ChatNavbar'
import { Input } from './Input'
import { Messages } from './Messages'
import './Chat.scss'

export const Chat = () => {
  return (
    <div className="chat" style={{color: 'white'}}>
        <ChatNavbar></ChatNavbar>
        <Messages></Messages>
        <Input></Input>
    </div>
  )
}
