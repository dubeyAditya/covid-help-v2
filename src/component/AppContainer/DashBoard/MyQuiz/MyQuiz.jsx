import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import Quiz from 'react-quiz-component';
import api from "../../../../services";
import { Skeleton, PageHeader, Descriptions, Button,Divider } from 'antd';
import { QuizSummary } from "./QuizSummary";
const MyQuiz = ({ match, history }) => {

   const { quizId } = match.params;

   const [quiz, setQuiz] = useState(null);

   const [started, setStarted] = useState(false);

   const [completed, setCompleted] = useState(false);

   const [showSummary, setShowSummary] = useState(false);

   useEffect(() => {

      window.onbeforeunload = function (value) {
         return 'Please stay on page';
      };

      api.getDoc('quiz', quizId).then((quiz) => {
         if (quiz) setQuiz(quiz);
      }).catch((err) => console.error(err));
      
   // eslint-disable-next-line
   }, []);


   const onQuizComplete = (summary) => {
      setCompleted(true);
      //api.add('userResults', summary).then();
   }

   const getQuizVisibility = () => {
      return !(completed && !showSummary) ? 'block' : 'none'
   }


   return <>
      {quiz ?
         <>
            {!started &&
               <>
                  <PageHeader
                     className="site-page-header"
                     ghost={true}
                     onBack={() => history.push('/myQuizs')}
                     title={quiz.quizTitle}
                     subTitle={quiz.quizSynopsis}
                     extra={[
                        <Button key="1" type="primary" onClick={() => setStarted(true)}>
                           Start
                        </Button>
                     ]}
                  >
                     <Descriptions size="small" column={2}>
                        <Descriptions.Item label="Quiz Date"> {new Date().toLocaleDateString()} </Descriptions.Item>
                        <Descriptions.Item label="Total Time">20 min</Descriptions.Item>
                        <Descriptions.Item label="No of Questions">{quiz.questions.length}</Descriptions.Item>
                        <Descriptions.Item label="Remarks">
                           Please select one correct answer out of four and click next to go to next question.
                        </Descriptions.Item>
                     </Descriptions>
                  </PageHeader>
               </>}
            {started && <>
              { completed && <QuizSummary onSummary={setShowSummary}/>} 
              <Divider></Divider> 
              <div style={{display:getQuizVisibility()}}> <Quiz shuffle={true} quiz={quiz} onComplete={onQuizComplete}></Quiz></div>
             </>
             }

         </>
         : <Skeleton></Skeleton>
      }
   </>

}

export default withRouter(MyQuiz);
