import React,{useState} from "react";
import './UserSidebar.css';
import {RxAvatar} from "react-icons/rx"
import {CiLogout} from "react-icons/ci"
import {AiFillDelete} from "react-icons/ai"

import userEvent from "@testing-library/user-event";
import { CryptoState } from "../../Context/CryptoContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc,setDoc } from "firebase/firestore";
const UserSidebar = () => {
    // function openNav() {
    //     document.getElementById("mySidenav").style.width = "250px";
    //   }
      
    //   function closeNav() {
    //     document.getElementById("mySidenav").style.width = "0";
    //   }

    const [openNavbar, setopenNav] = useState();
    const [closeNavbar, setcloseNav] = useState();
    const {user,setAlert,watchlist,coins,symbol,alertVisible} = CryptoState();

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
        alertVisible();
}
// 
const numberWithCommas=(x)=>  {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// 
const removeFromWatchlist =async(coin)=>{
  const coinRef = doc(db,"watchlist",user.uid);

  
  try {
    await setDoc(coinRef,{
      // coins:watchlist?[...watchlist,coin?.id]:[coin?.id]},
      coins :watchlist.filter((watch)=>watch !==coin?.id),},
     {merge:'true'}
    );

    // setAlert({
    //   open:true,
    //   message:`${coin.name} Remove From  Watchlist !`,
    //   type:"success",
    // })
  } catch (err) {
    // setAlert({
    //   open:true,
    //   message:err.message,
    //   type:"danger",
    // })
  };
}

  return (
    <>
     
<div id="mySidenav" className="sidenav" style={{width:`${openNavbar}`}} >
  <a href="#" className="closebtn"  onClick={()=>closeNav()}>&times;</a>

  <div className="user_data">
        <div className="user-profile">
        <span style={{ fontSize: "30px", color:"#6900ff",textShadow: "0 0 5px black" }}>
                  User's Profile
                  </span>
        <img src={user.photoURL} alt={user.displayName || user.email} className="avatar"/>

        </div>
  {/* <p href="#">{user.email}</p> */}

  <div className="user-watchlist">
  <span style={{ fontSize: "30px", textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
      {coins ? coins.map(coin =>{
        if(watchlist.includes(coin.id)){
          return (
            <div className="coin-watchlist"   key={coin.id}>
              <span style={{color:"#6900ff"}}>{coin.name}</span>-
              <span>{symbol}{numberWithCommas(coin.current_price.toFixed(2))}
              <AiFillDelete style={{cursor:"pointer"}} fontSize="16" onClick={()=>removeFromWatchlist(coin)} />
              </span>

            </div>
          )
        }
      }) : ""}
  </div>

  </div>
  {/* <a href="#">About</a>
  <a href="#">Services</a>
  <a href="#">Clients</a>
<a href="#">Contact</a> */}

<button type="button" className="btn btn-lg logout-btn" onClick={()=>logOut()}><CiLogout/>Logout</button>
 
</div>
<RxAvatar style={{fontSize:"30px",cursor:"pointer"}} onClick={()=>openNav()} src={user.photoURL}/>
{/* <span >&#9776;</span> */}
    </>
  );
};

export default UserSidebar;
