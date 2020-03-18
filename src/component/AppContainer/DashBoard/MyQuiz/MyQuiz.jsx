import React,{useEffect,useState}  from "react";
import { withRouter } from 'react-router-dom';
import Quiz from 'react-quiz-component';
import api from "../../../../services";
import { Skeleton } from 'antd';
const MyQuiz = ({match}) => {
   
   const { quizId } = match.params;

   const [quiz, setQuiz] = useState(null);
   
   useEffect(()=>{
     api.getDoc('quiz', quizId).then((quiz) => {
        console.log(quiz);
        if(quiz) setQuiz(quiz);
     }).catch((err)=>console.error(err));
   }, []);
   

   return <>
        {quiz ?  <Quiz quiz={quiz}></Quiz> : <Skeleton></Skeleton> }
    </>
   
}

export default withRouter(MyQuiz);
