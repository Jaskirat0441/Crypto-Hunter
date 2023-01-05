import React, { useState } from "react";
import { FaCoins } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../Context/CryptoContext";
import LoginModal from "./Authentication/LoginModal";
import SignupModal from "./Authentication/SignupModal";
import UserSidebar from "./Authentication/UserSidebar";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

   const{currency,setCurrency,user} = CryptoState();
  return (
    <>
    <div className="navbar">
      <div className="navbar-heading" onClick={() => navigate("/")} >
        <FaCoins className="icon" />
        <h1>
          Crypto <span className="purple">Hunter</span>
        </h1>
      </div>
      {/* <div> */}
      <select  className="select-currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="INR">INR</option>
      </select>
      {user ? <UserSidebar/> :
      <>
      <LoginModal/>
      <SignupModal/>
      </>
  }
      </div>
    {/* </div> */}
    </>
  );
};

export default Navbar;
