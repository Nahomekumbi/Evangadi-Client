import React, { useRef } from "react";
import classes from "./askQuestion.module.css";
import axios from "../axiosConfig";
import Layout from "./Layout";
import {Link, useNavigate} from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AskQuestion() {
  const navigate = useNavigate();
  const tittleName = useRef("");
  const descriptionName = useRef("");
  const sendQuestion = async (e) => {
    e.preventDefault();

    const titleValue = tittleName.current.value;
    const descriptionValue = descriptionName.current.value;
    if (!titleValue || !descriptionValue) {
      toast.warning("Please fill out the form");
      return;
    }
    const token = localStorage.getItem("token");
    try {
        const {data} = await axios.post("/questions/post-questions",{
            title:titleValue,
            description:descriptionValue
        },{
        headers: {
          Authorization: `Bearer ${token}`,
        }},);
        console.log(data);
        toast.success("Question inserted")
        navigate("/")
    } catch (error) {
      toast.error(error.response)
        console.log(error.response);
    }
  };

  return (
    <>
      <section className={classes.container}>
        <div className={classes.steps_container}>
          <h3 className={classes.steps_heading}>
            Steps to write a good question
          </h3>
          <ul className={classes.steps_list}>
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
        <form onSubmit={sendQuestion} className={classes.form}>
          <h2 className={classes.form_heading}>Post Your Question</h2>
          <Link to="/">Go to question page</Link>
          <input
            ref={tittleName}
            type="text"
            size="97"
            placeholder="Enter title"
            className={classes.input_field}
          />
          <textarea
            ref={descriptionName}
            rows="5"
            cols="90"
            placeholder="Enter description"
            className={classes.textarea}
          ></textarea>
          <button type="submit" className={classes.submit_button}>
            Post Question
          </button>
        </form>
      </section>
    </>
  );
}

export default AskQuestion;
