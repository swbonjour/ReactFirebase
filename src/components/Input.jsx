import React from 'react'
import { SendSvg } from '../imgs/SendSvg';
import "./Input.scss";

export const Input = () => {
  return (
    <div className="input_chat">
        <form action="">
            <textarea type="text" className="input_chat-input" placeholder='Message'/>
            <button type='submit' className="input_chat-button"><SendSvg></SendSvg></button>
        </form>
    </div>
  )
}
