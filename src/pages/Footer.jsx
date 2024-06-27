import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import classes from "./footer.module.css";
import { Link } from "react-router-dom";
import footer from "./images/evangadi-logo-footer.png";
import Layout from "./Layout";

const Footer = () => {
  return (
    <section className={classes.footer_wrapper}>
      <div>
        <img src={footer} alt="evangadi logo" />
        <div className={classes.icon_links}>
          <FaFacebook />
          <FaInstagram />
          <FaYoutube />
        </div>
      </div>
      <div className={`${classes.usefulLinks} row`}>
        <h3>Useful Links</h3>
        <div className={classes.footerLinks}>
          <Link to="#">How it Works</Link>
          <Link to="#">Terms of Service</Link>
          <Link to="#">Privacy Policy</Link>
        </div>
      </div>
      <div className={classes.contactInfo}>
        <h3>Contact Info</h3>
        <Link to="https://www.evangadi.com/">Evangadi Networks</Link>
        <p>support@evangadi.com</p>
        <p>+1-202-386-2702</p>
      </div>
    </section>
  );
};

// const App = () => {
//   return (
//     <div className={classes.page_wrapper}>
//       <main className={classes.main_content}>
//         {/* Your main content goes here */}
//       </main>
//       <Footer />
//     </div>
//   );
// };

export default Footer;
