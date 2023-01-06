import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../../Context/CryptoContext';
import { auth } from '../../firebase';
import Alert from '../Alert';

const LoginModal = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const{setAlert,alertVisible} = CryptoState();
  const navigate = useNavigate();



  // const handleChange= (func,e)=>{
  //   func(e.target.value);
  //     //  setPassword(e.target.value);
  // }
  const handleLogin = async ()=>{
    // console.log("first")
    // const handleSignup= async()=>{
      if(!password || !email){
          setAlert({
            open:true,
            message:"Fill data Properly",
            type:'danger'
          })
          alertVisible();
          return;
      }
      try {
        const res= await signInWithEmailAndPassword(auth,email,password);
        setAlert({
          open:true,
          message:"Login successful",
          type:'success'
        })
        alertVisible();
        
      } catch (err) {
        setAlert({
          open:true,
          message:err.message,
          type:'danger'
        })
        alertVisible(); 
        return;
      }
      
      // }
      // navigate('/');
      window.location.reload(true)
    }
  // const {user}= CryptoState();
// const googleProvider= new GoogleAuthProvider();
// const signInWithGoogle =()=>{
//   signInWithPopup(auth,googleProvider).then(res =>{

//   })


  return (
    <>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
Login
</button>
{/* <!-- Modal --> */}
<div className="modal show" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content" style={{color:"#6900ff"}}>
      {/* <Alert/> */}
      <div className="modal-header">
        <h5 className="modal-title" id="loginModalLabel">Login Form</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="loginemail" className="form-label">Email address</label>
    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} id="loginemail" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="loginpass" className="form-label">Password</label>
    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} id="loginpass"/>
  </div>
  {/* <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div> */}
  <div className="d-grid gap-2 col-6 mx-auto" >
  <button className="btn " style={{backgroundColor:"#6900ff",color:"white"}} onClick={()=>handleLogin()} type="button">Login</button>
</div>
</form>
      </div>
    </div>
  </div>
</div>
</>

  )
}

export default LoginModal