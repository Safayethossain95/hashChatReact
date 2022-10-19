import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import { getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Grid,TextField,Button,Collapse,Alert,IconButton} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';


const Login = () => {
    const auth = getAuth();
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
    let [wrongEmail,setWrongEmail] = useState("")
    let [wrongPassword,setWrongPassword] = useState("")
    const provider = new GoogleAuthProvider();
    const handleSubmit = ()=>{
        if(!email){
            setEmailerr("Please Enter an Email")
            setNameerr("")
        }else if(!password){
            setPasswroderr("Please Enter Password")
            setEmailerr("")
        }
        else if(password.length < 8){
            setPasswordlengtherr("Plase Enter Atleast 8 Character Password")
            setPasswroderr("")
        }
        else{
            setPasswordlengtherr("")
            signInWithEmailAndPassword(auth,email,password).then((user)=>{
                console.log(user)
                
                console.log("Login Successful")
                navigate('/home')
            }).catch((error)=>{
                const errorCode = error.code
                console.log(errorCode)
                if(errorCode.includes('user')){
                    setWrongEmail("Email is Wrong")
                    setOpen(true)
                    setWrongPassword('')
                }else if(errorCode.includes('password')){
                    setWrongPassword("Wrong Password")
                    setOpen(true)
                    setWrongEmail('')
                }
            })
        }
        
        
    }
    const handleGoogleClick =()=>{
        console.log("Congratulations You Logged in to Google")
        
        signInWithPopup(auth, provider)
            .then((result) => {                
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;                
                const user = result.user;
                navigate('/home')
            }).catch((error) => {                
                const errorCode = error.code;
                const errorMessage = error.message;                
                const email = error.customData.email;                
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
            
    }
    const handlepasstype= ()=>{
        setPasswordtype(!passwordtype)
    }
  return (
   <>
             <Grid container spacing={2} className="mycontainer">
                <Grid item xs={6} className="boxheight">
                    <div className="leftbox leftbox-login">
                        <h2><span style={{fontSize:"45px",color:"rgb(51, 122, 204)"}}>L</span>ogin to HashChat</h2>
                        <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <div className="box" onClick={handleGoogleClick}>
                                <img src="./assets/images/googlelogo.png" alt="" />
                                <p>Login in with Google</p>
                                
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="box">
                                <img src="./assets/images/facebooklogo.png" alt="" />
                                <p>Login in with Facebook</p>
                            </div>
                        </Grid>
                        </Grid>
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
                           {wrongEmail?wrongEmail:wrongPassword && wrongPassword}
                            </Alert>
                        </Collapse>
                        <TextField
                            style={{width:"100%",marginTop:"30px"}}
                            helperText={emailerr}
                            id="outlined-required"
                            label="Email"
                            defaultValue=""
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                        <div className='eye'>
                        <TextField
                            style={{width:"100%",marginTop:"30px"}}
                            helperText={passworderr ? passworderr : passwordlengtherr? passwordlengtherr :""}
                            id="outlined-required"
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
                      
                        <Button onClick={handleSubmit} style={{ borderRadius:"21px",display:"flex",background:"rgb(51, 122, 204)",width:"40%",margin:"30px auto",color:"#fff",textTransform:"uppercase",fontFamily:"Poppins', sans-serif"}} size="large">Login</Button>
                        <p>Don't Have an Account? <Link to="/">Sign Up</Link></p>
                    </div>
                </Grid>
                <Grid item xs={6} className="boxheight">
                    <img style={{width:"100%",height:"100vh"}} src="./assets/images/mainpagebg.jpg" alt="" />
                </Grid>
                
            </Grid>
   </>
  )
}

export default Login