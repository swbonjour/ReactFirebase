import React from 'react'
import { Navbar } from './Navbar'
import { Searchbar } from './Searchbar'
import { ChatItem } from './ChatItem'
import './Sidebar.scss'

export const Sidebar = () => {
  return (
    <div className="sidebar" style={{color: 'white'}}>
        <Navbar></Navbar>
        <Searchbar></Searchbar>
        <ChatItem></ChatItem>
        <ChatItem></ChatItem>
    </div>
  )
}
