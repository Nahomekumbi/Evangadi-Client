import React from 'react'
import Logo from "./images/Logo1.png"
import classes from "./header.module.css";
import {Link, useNavigate} from "react-router-dom"

function Header({logout}) {
   const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const onClickChange = () => {
    logout();
    navigate("/login");
  };
   return (
     <div>
       <div className={classes.headerContainer}>
         <div className={classes.headerInnerContainer}>
           <div className={classes.headerLogo}>
             <img src={Logo} alt="Logo" />
           </div>
           <div className={classes.headerParts}>
             <Link to="/">Home</Link>
             <p>How it works</p>
             <button onClick={onClickChange} className={classes.header_button}>
               {token ? "LogOut" : "Sign In"}
             </button>
           </div>
         </div>
       </div>
     </div>
   );
}

export default Header