import React from 'react'
import {Button} from '@mui/material'
const FriendRequest = () => {
  return (
    <>
        <div className="grouplistmain">
            <h2>Friend Requests</h2>
            <div className="groupitemwrapper">
              <div className="groupreqitem">
                <div className="gimg">
                  <img className='groupimg' src="./assets/images/friend1.jpg" alt="adf" />
                </div>
                <div className="gname">
                  <div className="innergname">
                  <h3>College Reunion</h3>
                  <p>Hello! ki obostha</p>
                  </div>
                </div>
                <div className="gbutton">
                <Button variant="contained">Accept</Button>
                </div>
              </div>
              <div className="groupreqitem">
                <div className="gimg">
                  <img className='groupimg' src="./assets/images/friend1.jpg" alt="adf" />
                </div>
                <div className="gname">
                  <div className="innergname">
                  <h3>College Reunion</h3>
                  <p>Hello! ki obostha</p>
                  </div>
                </div>
                <div className="gbutton">
                <Button variant="contained">Accept</Button>
                </div>
              </div>
              <div className="groupreqitem">
                <div className="gimg">
                  <img className='groupimg' src="./assets/images/friend1.jpg" alt="adf" />
                </div>
                <div className="gname">
                  <div className="innergname">
                  <h3>College Reunion</h3>
                  <p>Hello! ki obostha</p>
                  </div>
                </div>
                <div className="gbutton">
                <Button variant="contained">Accept</Button>
                </div>
              </div>
              
            </div>
           
        </div>
    </>
  )
}

export default FriendRequest