import React from 'react'
import { SearchSvg } from '../imgs/SearchSvg'
import './Searchbar.scss'

export const Searchbar = () => {
  return (
    <div className="searchbar">
        <div className="search">
            <input type="text" className="search_input" placeholder='Search ...'/>
            <SearchSvg />
        </div>
    </div>
  )
}
