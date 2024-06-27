import {Route, Routes,useNavigate } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState, createContext } from 'react';
import axios from "./axiosConfig"
import QuestionAndAnswer from "./pages/QuestionAndAnswer";
import AskQuestion from './pages/AskQuestion';
import Footer from './pages/Footer';
import Layout from './pages/Layout';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppState = createContext()

function App() {

  const [user, setUser] = useState({});

const token =localStorage.getItem("token");
 const navigate= useNavigate();

  async function checkUser(){
try {
const {data} = await axios.get("users/check",{
  headers:{
    Authorization:"Bearer "  + token,
  },
 });
 setUser(data);
} catch (error) {
  console.log(error.response);
  navigate ("/login")
}


  }
useEffect(() => {
checkUser();

}, []);




  return (
    <AppState.Provider value={{ user, setUser }}>
      <Layout>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:questionid" element={<QuestionAndAnswer />} />
          <Route path="/ask-question" element={<AskQuestion />} />
        </Routes>
      </Layout>
    </AppState.Provider>
  );
}

export default App;
