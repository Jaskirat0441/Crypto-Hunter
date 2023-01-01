import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { CryptoState } from '../../Context/CryptoContext';
import Alert from '../Alert';
import {auth} from './../../firebase'


const SignupModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setconfirmPass] = useState("");

  const{setAlert} = CryptoState();

  const handleSignup= async()=>{
    if(password!==confirmPass){
        setAlert({
          open:true,
          message:"Password don't match",
          type:'danger'
        })
    }
    // else{
    //   setAlert({
    //     open:false,
    //     message:"Password don't match",
    //     type:'danger'
    //   })
    // }
    try {
      const res= await createUserWithEmailAndPassword(auth,email,password);
      setAlert({
        open:true,
        message:"Register Successfully.Welcome !",
        type:'success'
      })

    } catch (error) {
      setAlert({
        open:true,
        message:error.message,
        type:'success'
      })
    }
  }

  return (
    <>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signupModal">
SignUp
</button>
{/* <!-- Modal --> */}
<div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
    <Alert/>
      <div className="modal-header">
        <h5 className="modal-title" id="signupModalLabel">Register Form</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control"  value={email} onChange={(e)=>setEmail(e.target.value)}  id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control"  value={password} onChange={(e)=>setPassword(e.target.value)}  id="password"/>
  </div>
   <div className="mb-3">
    <label htmlFor="confirmpass" className="form-label">Confirm Password</label>
    <input type="password" className="form-control"  value={confirmPass} onChange={(e)=>setconfirmPass(e.target.value)}  id="confirmpass"/>
  </div>
  <div className="d-grid gap-2 col-6 mx-auto">
  <button className="btn btn-primary" onClick={handleSignup} type="button">Sign Up</button>
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