import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import classes from "./register.module.css"; 
import Layout from "./Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const userNameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = userNameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      toast.warning("Please provide all required information");
      return;
    }

    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      toast.success("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <>
      <div className={classes["layout-container"]}>
        <div className={classes.innerContainer}>
          <div className={classes["form-container"]}>
            <form onSubmit={handleSubmit}>
              <div className={classes.joinNetwork}>
                <h5>Join the network</h5>

                <p>
                  Already have an account?
                  <a href="/login" className={classes.privacyPolicy}>
                    Sign in
                  </a>{" "}
                </p>
              </div>
              <div>
                <input ref={userNameDom} type="text" placeholder="Username" />
              </div>
              <div className={classes.firstandLastname}>
                <div>
                  <input
                    ref={firstnameDom}
                    type="text"
                    placeholder="First name"
                  />
                </div>

                <div>
                  <input
                    ref={lastnameDom}
                    type="text"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <input ref={emailDom} type="email" placeholder="Email" />
              </div>

              <div>
                <input
                  ref={passwordDom}
                  type="password"
                  placeholder="Password"
                />
              </div>

              <button type="submit">Agree and Join</button>
            </form>
            <div className={classes.agree}>
              <p>
                I agree to the{" "}
                <Link to="#" className={classes.privacyPolicy}>
                  {" "}
                  privacy policy{" "}
                </Link>
                and{" "}
                <Link className={classes.privacyPolicy}>terms of service.</Link>
              </p>
              <p>
                <Link to={"/login"} className={classes.privacyPolicy}>
                  Already have an account?
                </Link>{" "}
              </p>
            </div>
          </div>

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
        </div>
      </div>
    </>
  );
}

export default Register;
