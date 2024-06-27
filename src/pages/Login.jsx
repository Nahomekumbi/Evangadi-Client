import { useRef } from "react";
import {Link, useNavigate } from "react-router-dom";
import axios from '../axiosConfig'
import classes from "./login.module.css"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const navigate=useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (
      
      !emailValue ||
      !passValue
    ) {
      toast.warning("please provide all required information");
      return;
    }

    try {
    const {data}=  await axios.post("/users/login", {
        
        email: emailValue,
        password: passValue,
      });
    toast.success("login successful.");

      localStorage.setItem("token", data.token);
  //  setTimeout(() => {
  //    navigate("/");
  //    window.location.reload();
  //    setProcess(false);
  //  }, 1000);
  navigate("/")



      console.log(data);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }
 return (
   <div className={classes.loginWrapper}>
     <section className={classes.loginInsideWrapper}>
       <section className={classes.section}>
         <form onSubmit={handleSubmit}>
           <div>
             <div className={classes.loginLink}>
               <h5>Login to your account</h5>

               <p>
                 Don't have an account?
                 <Link to="/register" className={classes.create}>
                   Create a new account
                 </Link>{" "}
               </p>
             </div>
             {/* <span>Email:</span> */}
             <input
               ref={emailDom}
               type="email"
               placeholder="Email"
               className={classes.input}
             />
           </div>
           <div>
             {/* <span>Password:</span> */}
             <input
               ref={passwordDom}
               type="password"
               placeholder="Password"
               className={classes.input}
             />
           </div>
           <button type="submit" className={classes.submitButton}>
             submit
           </button>
         </form>
         <Link to="/register" className={classes.createLink}>
           Create an account?
         </Link>
       </section>

       <div class="col-md-6 col-12 col-sm-6 description">
         <div class="padd-text fadeInLeft">
           <small class="small-text">
             {" "}
             <Link className={classes.aboutLink}> About</Link>
           </small>
           <h2 class="title-h2 text-gradient">Evangadi Networks</h2>
           <p class="font-p mg-bt-30">
             No matter what stage of life you are in, whether you’re just
             starting elementary school or being promoted to CEO of a Fortune
             500 company, you have much to offer to those who are trying to
             follow in your footsteps.
           </p>
           <p class="font-p mg-bt-30">
             Whether you are willing to share your knowledge or you are just
             looking to meet mentors of your own, please start by joining the
             network here.
           </p>
           <button className={classes.btn}>
             <a
               href="https://www.evangadi.com/explained/"
               className={classes.link}
             >
               HOW IT WORKS
             </a>
           </button>
         </div>
       </div>
     </section>
   </div>
 );
}

export default Login;
