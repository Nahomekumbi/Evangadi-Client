import React,{useEffect,useRef,useState} from 'react'
import axios from '../axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import classes from "./questionAndAnswer.module.css"
import { CgProfile } from "react-icons/cg";
import Layout from './Layout';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function QuestionAndAnswer() {
  const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { questionid } = useParams();
const answerRef=useRef()
    const [question, setQuestion] = useState([]);
    const [answer, setAnswer] = useState([]);
   async function QuestionDetails() {
     try {
       const response = await axios.get(
         `/questions/single-question/${questionid}`,
         {
           headers: {
             Authorization: "Bearer " + token,
           },
         }
       );
       setQuestion(response.data);
       console.log(response.data.question);
     } catch (error) {
       console.error("Error with question details:", error);
       if (error.response) {
         console.error("Response data:", error.response.data);
         console.error("Response status:", error.response.status);
       }
     }
   }   
     async function AnswerDetails() {
       try {
         const response = await axios.get(
           `/answer/get-answer/${questionid}`,
           {
             headers: {
               Authorization: "Bearer " + token,
             },
           }
         );
         setAnswer(response.data);
         console.log(response);
       } catch (error) {
         console.error("Error with question details:", error);
         if (error.response) {
           console.error("Response data:", error.response.data);
           console.error("Response status:", error.response.status);
         }
       }
     }
useEffect(() => {
  // const token = localStorage.getItem("token");
  console.log("/questions/single-question", questionid);
 AnswerDetails();
  QuestionDetails();
}, [questionid]);
console.log(question);

 const sendAnswer= async (e) => {
   e.preventDefault();

   const answerValue = answerRef.current.value;
   
   if (!answerValue) {
     toast.warning("Please fill out the form");
     return;
   }
   const token = localStorage.getItem("token");
   try {
     const { data } = await axios.post(
       `/answer/all-answer/${questionid}`,
       {
         answer:answerValue,
       },
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     );
     console.log(data);
     toast.success("Answer Posted");
     navigate("/")
   } catch (error) {
    toast.error(error.response)
     console.log(error.response);
   }
 };
  return (
    <>
      <div>
        <div className={classes.question}>
          <h1>Question</h1>

          <div>
            {question.map((question) => (
              <div className={classes.detail} key={question.questionid}>
                <div>{question.title}</div>
                <div>{question.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={classes.community}>
          <p>Answer from the community</p>
        </div>

        <div>
          {answer.map((a) => (
            <div key={a.questionid}>
              <div className={classes.questionProfile}>
                <div className={classes.specificProfile}>
                  <div>
                    <CgProfile size={46} />
                  </div>
                  <div>
                    <p className={classes.welcome_user}>{a.username}</p>
                  </div>
                </div>

                <div>{a.answer}</div>
              </div>

              <br />
            </div>
          ))}
        </div>

        <div>
          <h5></h5>
        </div>

        <div>
          <form onSubmit={sendAnswer} className={classes.form}>
            <h2 className={classes.form_heading}>Answer The Top Questions</h2>

            <textarea
              ref={answerRef}
              rows="5"
              cols="90"
              placeholder="your answer..."
              className={classes.textarea}
            ></textarea>
            <button type="submit" className={classes.submit_button}>
              Post Your Answer
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default QuestionAndAnswer;