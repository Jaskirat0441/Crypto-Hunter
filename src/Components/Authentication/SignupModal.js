import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { CryptoState } from '../../Context/CryptoContext';
import Alert from '../Alert';
import {auth} from './../../firebase'


const SignupModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setconfirmPass] = useState("");

  const{setAlert,alertVisible} = CryptoState();

  const handleSignup= async()=>{
    console.log("first");
    if((!email || !password || !confirmPass ) || (password!==confirmPass)){
      // console.log("error in ekcm ");
      setAlert({
        open:true,
        message:"Fill data properly",
        type:'danger',
        
      });
     alertVisible();
        return
      }
    try {
      const res= await createUserWithEmailAndPassword(auth,email,password);
      setAlert({
        open:true,
        message:"Register Successfully.Welcome !",
        type:'success'
      })
     alertVisible();
    } catch (error) {
      setAlert({
        open:true,
        message:error.message,
        type:'success'
      })
    }
    setTimeout(() => {
      setAlert({
        open:false
      })
    }, 3000);
    window.location.reload(true)

  }
  

  return (
    <>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signupModal">
SignUp
</button>
{/* <!-- Modal --> */}
<div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content" style={{color:"#6900ff"}}>
      {/* <Alert/> */}
      <div className="modal-header">
        <h5 className="modal-title" id="signupModalLabel">Register Form</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control"  value={email} onChange={(e)=>setEmail(e.target.value)}  id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control"  value={password} onChange={(e)=>setPassword(e.target.value)}  id="password"/>
  </div>
   <div className="mb-3">
    <label htmlFor="confirmpass" className="form-label">Confirm Password</label>
    <input type="password" className="form-control"  value={confirmPass} onChange={(e)=>setconfirmPass(e.target.value)}  id="confirmpass"/>
  </div>
  <div className="d-grid gap-2 col-6 mx-auto" >
  <button className="btn" style={{backgroundColor:"#6900ff",color:"white"}}  onClick={()=>handleSignup()} type="button">Sign Up</button>
</div>
</form>

      </div>
    </div>
  </div>
</div>
</>
  )
}

export default SignupModal