import React from 'react'
import { ChatNavbar } from './ChatNavbar'
import { Input } from './Input'
import { Messages } from './Messages'
import './Chat.scss'
import { useContext } from 'react'
import { ChatContext } from '../utils/context'

export const Chat = () => {
  const {data} = useContext(ChatContext);
  return (
    <div className="chat" style={{color: 'white'}}>
        <ChatNavbar></ChatNavbar>
        {Object.keys(data.user).length != 0 && <Messages></Messages>}
        <Input></Input>
    </div>
  )
}
