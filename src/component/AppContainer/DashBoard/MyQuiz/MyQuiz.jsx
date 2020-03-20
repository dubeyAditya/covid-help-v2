import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import Quiz from 'react-quiz-component';
import api from "../../../../services";
import { Skeleton, PageHeader, Descriptions, Button } from 'antd';
import { useContext } from "react";
import { AuthContext } from "../../../../context";

const MemoizedQuiz = React.memo(({ shuffle, quiz, onQuizComplete }) => <Quiz shuffle={shuffle} quiz={quiz} onComplete={onQuizComplete}></Quiz>)


const MyQuiz = ({ match, history }) => {

   const { quizId } = match.params;

   const { user } = useContext(AuthContext);

   const [quiz, setQuiz] = useState(null);

   const [started, setStarted] = useState(false);

   useEffect(() => {

      window.onbeforeunload = function (value) {
         return 'Please stay on page';
      };

      api.getDoc('quiz', quizId).then((quiz) => {
         if (quiz) setQuiz(quiz);
         console.log("Quiz Effect")
      }).catch((err) => console.error(err));

      // eslint-disable-next-line
   }, []);


   const onQuizComplete = (summary) => {
      const uid = user.uid;
      const result = {
         uid,
         quizId,
         summary
      }
      api.add('userResults', result).then((result) => {
         api.find('userQuiz', 'quizId', '==', quizId).then((quizs) => {
            const quiz = quizs.find((quiz) => quiz.uid === uid);
            const { id } = quiz;
            return api.update('userQuiz', id, { state: 'Completed', resultId: result.id });
         }).then(() => {
            console.log(result, quiz)
         });
      });
   }

   return <>
      {quiz ?
         <>
            {!started ?
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
               </>
               : <>
                  <div>
                     <MemoizedQuiz quiz={quiz} shuffle={true} onQuizComplete={onQuizComplete}> </MemoizedQuiz>
                  </div>
               </>
            }
         </>
         : <Skeleton></Skeleton>
      }
   </>

}

export default withRouter(MyQuiz);
