import React from 'react'
import { TextField } from '@mui/material'
import {BsSearch} from 'react-icons/bs'
const SearchBar = () => {
  return (
    <>
        <div className="searchbarmain">
            <BsSearch className='searchicon'/>
            <input          
                className="searchbarinput"
                label="Search"
                type="text"          
                placeholder="Search"
                />
        </div>
        
    </>
  )
}

export default SearchBar