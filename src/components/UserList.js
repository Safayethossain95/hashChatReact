import React,{useEffect,useState} from 'react'
import { getDatabase, ref, onValue} from "firebase/database";
const UserList = () => {
  const db = getDatabase();
  const [userlist,setUserlist] = useState([])
  const userRef = ref(db, 'users/');
  useEffect(()=>{
    let userlistarr = []
      onValue(userRef, (snapshot) => {
        snapshot.forEach((item) =>{
          userlistarr.push(item.val())
        })
          
        setUserlist(userlistarr)
        });
          console.log(userlist)
    },[])
   
  return (
    <>
        <div className="grouplistmain friendsmain userList">
            <h2>User List</h2>
            <div  className="groupitemwrapper">
            {
              userlist.map((item,key)=>(
                
                      <div key={key} className="groupreqitem">
                        <div className="gimg">
                          <img className='groupimg' src="./assets/images/group1pic.jpg" alt="adf" />
                        </div>
                        <div className="gname">
                          <div className="innergname">
                          <h3>{item.username}</h3>
                          <p>Hello! ki obostha</p>
                          </div>
                        </div>
                        <div className="gbutton">
                        <button className="userplusbutton">+</button>
                        </div>
                      </div>
                
                ))
                
                
                
                
              }
              </div>
            
              
            
           
        </div>
    </>
  )
}

export default UserList