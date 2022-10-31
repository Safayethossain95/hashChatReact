import React,{useEffect,useState} from 'react'
import {Button} from '@mui/material'
import { getDatabase, ref, onValue} from "firebase/database";
import { getAuth } from 'firebase/auth';

const Friends = () => {
  const [friends,setFriends] = useState([])
  const db = getDatabase();
  const auth = getAuth()
  useEffect(()=>{
    
      let friendsarr = []
      const starCountRef = ref(db, 'friends/');
      onValue(starCountRef, (snapshot) => {
        snapshot.forEach((item)=>{
          if(auth.currentUser.uid == item.val().senderid || auth.currentUser.uid == item.val().receiverid ){
            friendsarr.push(item.val())

          }
        })
        setFriends(friendsarr)
      })
  },[])
  return (
    <>
        <div className="grouplistmain friendsmain">
            <h2>{friends.length} {friends.length>1 ? "Friends":"Friend"}</h2>
            <div className="groupitemwrapper">
              {
                friends.length==0
                ?
                <h2>You have no friends</h2>
                :
                friends.map((fitem,key)=>(
                  <div key={key} className="groupreqitem">
                  <div className="gimg">
                    <img className='groupimg' src="./assets/images/group1pic.jpg" alt="adf" />
                  </div>
                  <div className="gname">
                    <div className="innergname">
                    <h3>{ auth.currentUser.uid !== fitem.senderid? fitem.sendername : fitem.receivername}</h3>
                    <p>Hello! ki obostha</p>
                    </div>
                  </div>
                  <div className="gbutton">
                  <p style={{fontSize:"10px",color:"#222"}}>{fitem.date}</p>
                  </div>
                </div>
              ))
              }
             
              
             
              
            </div>
           
        </div>
    </>
  )
}

export default Friends