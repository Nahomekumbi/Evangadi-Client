// Home.js

import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../App";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import Layout from "./Layout";
import classes from "./home.module.css"; 
import { FaAngleRight } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Home() {
  const { user } = useContext(AppState);
  const navigate = useNavigate();
  const [question, setQuestion] = useState([]);

const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const { data } = await axios.get("/questions/all-questions", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setQuestion(data);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchQuestions();
  }, []); 
  const questionClick = () => {
    navigate("/ask-question");
  };

  const moreDetail = (questionid) => {
    navigate(`/${questionid}`);
  };
useEffect(() => {
  if (!token || !user) {
    toast.warning("please login");
    navigate("/login");
  } 
   
  
}, [user, navigate]);
return (
  <>
    <div className={classes.homeContainer}>
      <div>
        <button className={classes.askQuestionButton} onClick={questionClick}>
          Ask question
        </button>
      </div>

      <div className={classes.welcomeContainer}>
        <h2>Welcome: {user.username}</h2>
      </div>
    </div>
    <div className={classes.questionsList}>
      {question.map((q) => (
        <div
          className={classes.questionItem}
          onClick={() => moreDetail(q.questionid)}
          key={q.questionid}
        >
          <div className={classes.profile}>
            <div>
              <CgProfile size={40} />
            </div>
            <div>
              <p>{q.username}</p>
            </div>
          </div>
          <div className={classes.title}>{q.title}</div>
          <div className={classes.arrow}>
            <FaAngleRight />
          </div>
        </div>
      ))}
    </div>
  </>
);
}

export default Home;
