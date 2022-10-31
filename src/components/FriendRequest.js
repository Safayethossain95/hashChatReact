import React,{useEffect,useState} from 'react'
import {Button} from '@mui/material'
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, set, push, remove} from "firebase/database";

const FriendRequest = () => {
  const db = getDatabase();
  const [friendrequestlist,setFriendrequestlist] = useState([])
  const [dlt,setDlt] = useState(true)
  const auth = getAuth();

  useEffect(()=>{
    let friendsarr = []
    const friendrequestRef = ref(db, 'friendrequests/');
    onValue(friendrequestRef, (snapshot) => {
      snapshot.forEach((item)=>{
        console.log("random id - ",item.key)
        if(item.val().receiverid === auth.currentUser.uid){
          friendsarr.push({
            id:item.key,
            sendername:item.val().sendername,
            receiverid:item.val().receiverid,
            senderid: item.val().senderid,
            receivername: item.val().receivername
          })
          
        }
        console.log(item.val().senderid , "-" , auth.currentUser.uid, " - ", item.id)
      })
      setFriendrequestlist(friendsarr)
    });
  },[dlt])
  const handleAcceptFriend=(friend)=>{
      set(push(ref(db, 'friends/')), {
        id:friend.id,
        sendername:friend.sendername,
        receiverid:friend.receiverid,
        senderid: friend.senderid,
        receivername: friend.receivername,
        date: `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
      }).then(()=>{
        remove(ref(db, 'friendrequests/' + friend.id)).then(()=>{
          setDlt(!dlt)
        })
      })
  }
  return (
    <>
        <div className="grouplistmain">
            <h2>Friend Requests</h2>
            <div className="groupitemwrapper">
              {
                friendrequestlist.map((item,key)=>(
                  <div key={key} className="groupreqitem">
                  <div className="gimg">
                    <img className='groupimg' src="./assets/images/friend1.jpg" alt="adf" />
                  </div>
                  <div className="gname">
                    <div className="innergname">
                    <h3>{item.sendername}</h3>
                    <p>Hello! ki obostha</p>
                    </div>
                  </div>
                  <div className="gbutton">
                  <Button onClick={()=>handleAcceptFriend(item)} variant="contained">Accept</Button>
                  </div>
                </div>
                ))
               
             
                }
             
              {
                friendrequestlist.length===0?
                <h2>No Friend Requests</h2>
                :""
              }
            </div>
           
        </div>
    </>
  )
}

export default FriendRequest