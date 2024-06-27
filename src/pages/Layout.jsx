import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout({children}) {
 const [user, setUser] = useState({});
  const logout = () => {
    setUser({});
    localStorage.removeItem("token");
  };
  
  return (
    <div>
      <Header logout={logout} />
      {children}
      <Footer />
    </div>
  );
}

export default Layout