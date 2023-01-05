import React,{useState} from "react";
import './UserSidebar.css';
import {RxAvatar} from "react-icons/rx"
import {CiLogout} from "react-icons/ci"

import userEvent from "@testing-library/user-event";
import { CryptoState } from "../../Context/CryptoContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
const UserSidebar = () => {
    // function openNav() {
    //     document.getElementById("mySidenav").style.width = "250px";
    //   }
      
    //   function closeNav() {
    //     document.getElementById("mySidenav").style.width = "0";
    //   }

    const [openNavbar, setopenNav] = useState();
    const [closeNavbar, setcloseNav] = useState();
    const {user,setAlert} = CryptoState();

    const openNav=()=>{
        setopenNav("250px");
}
const closeNav=()=>{
    setopenNav("0");
}

const logOut=()=>{
        signOut(auth);
        setAlert({
            open:true,
            type:'success',
            message:"Logout Successfull !",
        });
        closeNav();
}
  return (
    <>
     
<div id="mySidenav" className="sidenav" style={{width:`${openNavbar}`}} >
  <a href="#" className="closebtn"  onClick={()=>closeNav()}>&times;</a>

  <div className="user_data">
        <div className="user-profile">
        <img src={user.photoURL} alt={user.displayName || user.email} className="avatar"/>

        </div>
  <p href="#">{user.email}</p>

  <div className="user-watchlist">

  </div>

  </div>
  {/* <a href="#">About</a>
  <a href="#">Services</a>
  <a href="#">Clients</a>
<a href="#">Contact</a> */}

<button type="button" class="btn btn-secondary btn-lg" onClick={()=>logOut()}><CiLogout/>Logout</button>
 
</div>
<RxAvatar style={{fontSize:"30px",cursor:"pointer"}} onClick={()=>openNav()} src={user.photoURL}/>
{/* <span >&#9776;</span> */}
    </>
  );
};

export default UserSidebar;
