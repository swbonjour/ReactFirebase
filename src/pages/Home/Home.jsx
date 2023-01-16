import React from 'react'
import { Sidebar } from '../../components/Sidebar'
import { Chat } from '../../components/Chat'
import './Home.scss'

export const Home = () => {
  return (
    <section className="home">
        <div className="container">
            <Sidebar></Sidebar>
            <Chat></Chat>
        </div>
    </section>
  )
}
