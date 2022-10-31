import React,{useEffect,useState} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Alert,Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import {AiOutlineHome} from 'react-icons/ai'
import {MdOutlineTextsms} from 'react-icons/md'
import {BsBell} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import {GoSignOut} from 'react-icons/go'
import Homepage from '../components/Homepage';
import SearchBar from '../components/SearchBar';
import FriendRequest from '../components/FriendRequest'
import GroupRequest from './../components/GroupRequest';
import Friends from '../components/Friends';
import UserList from '../components/UserList';
const Home = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [emailVerify,setEmailVerify] = useState(false)
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // user.emailVerified
        setEmailVerify(true)
      } else {
        navigate('/login')
      }
    });
  },[])
  return (
    <>
      {
        emailVerify
        ?
        <>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Homepage active="notification"/>
          </Grid>
          <Grid item xs={4}>
            <div className="secondColumn">
            <SearchBar className="searchbarmain"/>
            <GroupRequest/>
            <FriendRequest/>
            </div>
          </Grid>
          <Grid item xs={3}>
            <Friends/>
          </Grid>
          <Grid item xs={3}>
            <UserList/>
          </Grid>
        </Grid>
        </>
        :
        <Grid container spacing={2}>
          <Grid item xs={5} style={{margin:"100px auto"}}>
            <Alert variant="outlined" severity="error">
              Please Verify Your Email 
            </Alert>
          </Grid>
          
        </Grid>
        
        

      }
    </>
    
  )
}

export default Home