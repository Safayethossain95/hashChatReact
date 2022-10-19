import React,{useEffect,useState} from 'react'
import {AiOutlineHome,AiOutlineClose} from 'react-icons/ai'
import {MdOutlineTextsms} from 'react-icons/md'
import {BsBell} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import {GoSignOut} from 'react-icons/go'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {Modal,Box} from '@mui/material'

const Homepage = (props) => {
  const [name,setName] = useState("")
  const [modalClose,setModaltoggle] = useState(false)
  let auth = getAuth()
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName)
      } 
    });
  },[])
  const handleClose = ()=>{
    setModaltoggle(false)
  }
  const handleOpen = ()=>{
    setModaltoggle(true)
  }

  return (
    <>
      <div className="sidebarleft">
            <img className="profilepic" src="./assets/images/profilepic.jpg" alt="" />
            <p className='displayName' onClick={handleOpen}>{name}</p>
            <div className="sidebaricons">
            <ul>
              <li className={props.active == "home"?"activemenu":''}>
                  <AiOutlineHome className='iconsidebar'/>
              </li>
              <li className={props.active == "msg"?"activemenu":''}>
                  <MdOutlineTextsms className='iconsidebar'/>
              </li>
              <li className={props.active == "notification"?"activemenu":''}>
                  <BsBell className='iconsidebar'/>
              </li>
              <li className={props.active == "settings"?"activemenu":''}>
                  <FiSettings className='iconsidebar'/>
              </li>
              <li className={props.active == "signout"?"activemenu":''}>
                  <GoSignOut className='iconsidebar'/>
              </li>
            </ul>
            
            </div>
            <Modal
                open={modalClose}
                
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                className="profileModal"
              >
                <Box className='profilemodalbox' sx={{ width: 400 }}>
                  <h2 id="parent-modal-title">Text in a modal</h2>
                  <p id="parent-modal-description">
                    My User Information
                  </p>
                  <AiOutlineClose onClick={handleClose} className='modalCloseIcon'/>
                </Box>
              </Modal>
      </div>
    </>
  )
}

export default Homepage