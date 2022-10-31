import React,{useEffect,useState} from 'react'
import { getDatabase, ref, onValue,set, push} from "firebase/database";
import { getAuth } from "firebase/auth";
import {AiOutlineCheck} from 'react-icons/ai'
import {HiUsers} from 'react-icons/hi'
const UserList = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [userlist,setUserlist] = useState([])
  const [friendrequestlist,setFriendrequestlist] = useState([])
  const [friend,setFriend] = useState([])
  const userRef = ref(db, 'users/');
  const [checked,setChecked] = useState(false)
  useEffect(()=>{
    let userlistarr = []
      onValue(userRef, (snapshot) => {
        snapshot.forEach((item) =>{
          userlistarr.push({
            username:item.val().username,
            email:item.val().email,
            id: item.key

          })
          
        })
          
        setUserlist(userlistarr)
        });
          
    },[])

    useEffect(()=>{
      const db = getDatabase();
      let friendsarr = []
      
      const friendrequestRef = ref(db, 'friendrequests/');
      onValue(friendrequestRef, (snapshot) => {
        snapshot.forEach((item)=>{
          
            friendsarr.push(item.val().receiverid+item.val().senderid)
            
            
        })
        setFriendrequestlist(friendsarr)
        
      });
      
    },[checked])

    useEffect(()=>{
    
      let friendarr = []
      const setFriendRef = ref(db, 'friends/');
      onValue(setFriendRef, (snapshot) => {
        snapshot.forEach((item)=>{
          
          friendarr.push(item.val().receiverid+item.val().senderid)
        })
        setFriend(friendarr)
      })
  },[])

    const handleFriendrequest = (info)=>{
      console.log(info)
      set(push(ref(db, 'friendrequests/')), {
        
        sendername: auth.currentUser.displayName,
        senderid: auth.currentUser.uid,
        receiverid : info.id,
        receivername: info.username
      });
      setChecked(true)
    }
   
  return (
    <>
        <div className="grouplistmain friendsmain userList">
            <h2>User List</h2>
            <div  className="groupitemwrapper">
            {
              userlist.map((item,key)=>(
                      
                        auth.currentUser.uid !== item.id &&
                          <div key={key} className="groupreqitem">
                          <div className="gimg">
                            <img className='groupimg' src="./assets/images/group1pic.jpg" alt="adf" />
                          </div>
                          <div className="gname">
                            <div className="innergname">
                            <h3>{item.username}</h3>
                            <p>hello! man</p>
                            </div>
                          </div>
                          {
                            (friend.includes(item.id+auth.currentUser.uid) || friend.includes(auth.currentUser.uid+item.id)  )  
                            ?
                            <div className="gbutton">
                                <button className="userplusbutton"><HiUsers/></button>
                            </div>
                            :
                                (friendrequestlist.includes(item.id+auth.currentUser.uid) || friendrequestlist.includes(auth.currentUser.uid+item.id)  )  ?
                                <div className="gbutton">
                                    <button className="userplusbutton"> <AiOutlineCheck style={{marginTop:"5px"}}/> </button>
                                  </div>
                                :
                                <div className="gbutton">
                                    <button onClick={()=>handleFriendrequest(item)} className="userplusbutton">+</button>
                              </div>
                          }
                         
                          
                        </div>
                      
                   
                
                ))
                
                
                
                
              }
              </div>
            
              
            
           
        </div>
    </>
  )
}

export default UserList