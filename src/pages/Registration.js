import React,{useState} from 'react'
import { Grid,TextField,Button,Collapse,Alert,IconButton} from '@mui/material'
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,updateProfile  } from "firebase/auth";
import CloseIcon from '@mui/icons-material/Close';
import { getDatabase, ref, set} from "firebase/database";
const Registration = () => {
    const auth = getAuth();
    const db = getDatabase();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()
    let [name,setName] = useState("")
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let [confirmpassword,setConfirmpassword] = useState("")

    let [nameerr,setNameerr] = useState("")
    let [emailerr,setEmailerr] = useState("")
    let [passworderr,setPasswroderr] = useState("")
    let [confirmpassworderr,setConfirmPasswroderr] = useState("")
    let [passwordlengtherr,setPasswordlengtherr] = useState("")
    let [matchpassword,setMatchpassword] = useState("")
    let [passwordtype,setPasswordtype] = useState(true)
    let [existsEmailerror,setExistsemailerror] = useState("")
    let [userInfo,setUserInfo] = useState([])
    const handleSubmit = ()=>{
        if(!name){
            setNameerr("Please Enter a Name")
        }else if(!email){
            setEmailerr("Please Enter an Email")
            setNameerr("")
        }else if(!password){
            setPasswroderr("Plase Enter Password")
            setEmailerr("")
        }
        else if(password.length < 8){
            setPasswordlengtherr("Plase Enter Atleast 8 Character Password")
            setPasswroderr("")
        }
        else if(!confirmpassword){
            setConfirmPasswroderr("Plase Enter Confirm Password")
            setPasswordlengtherr("")
        }else if(password !== confirmpassword){
                setMatchpassword("Password Does not Match")
                setConfirmPasswroderr("")
        }else{
            setMatchpassword("")
            createUserWithEmailAndPassword(auth,email,password).then((user)=>{
                // sendEmailVerification(auth.currentUser)
                // .then(() => {
                    updateProfile(auth.currentUser, {
                        displayName: name
                      }).then(() => {
                        console.log("displayName Set Done")
                        set(ref(db, 'users/' + auth.currentUser.uid), {
                            username: name,
                            email: email
                          });
                      }).catch((error) => {
                        console.log(error)
                      });
                // });
                navigate('/login')
            }).catch((error)=>{
                const errorCode = error.code
                if(errorCode.includes('email')){
                    setExistsemailerror("This Email Already Exists. Try Another.")
                    setOpen(true)
                }
            })
        }
    }
        
        
    
    const handlepasstype= ()=>{
        setPasswordtype(!passwordtype)
    }
  
  return (
   <>
             <Grid container spacing={2}>
                <Grid item xs={6} className="boxheight">
                    <div className="leftbox">
                        <h2><span style={{fontSize:"45px",color:"rgb(51, 122, 204)"}}>W</span>elcome to the HashChat</h2>
                        <Collapse in={open}>
                            <Alert
                            variant="filled" 
                            severity="error"
                            action={
                                <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                                >
                                <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                            >
                           {existsEmailerror}
                            </Alert>
                        </Collapse>
                        <TextField
                            style={{width:"100%"}}
                            helperText={nameerr}
                            id="outlined-required1"
                            label="Full Name"
                            defaultValue=""
                            onChange={(e)=>setName(e.target.value)}
                            />
                        <TextField
                            style={{width:"100%",marginTop:"30px"}}
                            helperText={emailerr}
                            id="outlined-required2"
                            label="Email"
                            defaultValue=""
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                        <div className='eye'>
                        <TextField
                            style={{width:"100%",marginTop:"30px"}}
                            helperText={passworderr ? passworderr : passwordlengtherr? passwordlengtherr :""}
                            id="outlined-required3"
                            label="Password"
                            type={passwordtype?'password':'text'}
                            defaultValue=""
                            onChange={(e)=>setPassword(e.target.value)}
                            />
                            {
                                passwordtype
                                ?
                                <AiFillEye onClick={handlepasstype} className="eyeicon"/>

                                :
                                <AiFillEyeInvisible onClick={handlepasstype} className="eyeicon"/>
                            }
                        </div>
                        <TextField
                            style={{width:"100%",marginTop:"30px"}}
                            helperText={confirmpassworderr?confirmpassworderr:matchpassword?matchpassword:""}
                            id="outlined-required4"
                            label="Confirm Password"
                            defaultValue=""
                            onChange={(e)=>setConfirmpassword(e.target.value)}
                            />
                       <Button onClick={handleSubmit} style={{ borderRadius:"21px",display:"flex",background:"rgb(51, 122, 204)",width:"40%",margin:"30px auto",color:"#fff",textTransform:"uppercase",fontFamily:"Poppins', sans-serif"}} size="large">Sign Up</Button>
                        <p>Already Have an Account? <Link to="/login">Sign In</Link></p>
                    </div>
                </Grid>
                <Grid item xs={6} className="boxheight">
                    <img style={{width:"100%",height:"100vh"}} src="./assets/images/mainpagebg.jpg" alt="" />
                </Grid>
                
            </Grid>
   </>
  )
}

export default Registration