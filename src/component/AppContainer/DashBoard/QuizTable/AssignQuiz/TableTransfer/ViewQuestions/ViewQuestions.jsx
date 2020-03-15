import * as React from "react";
import { Modal } from "antd";

import { QuizWrapper } from './style';

import Quiz from 'react-quiz-component';


const ViewQuestions = ({
  showDrawer,
  hideDrawer,
  quiz
}) => {



  return (
    <div>
      <Modal
        title={quiz.quizTitle}
        visible={showDrawer}
        onOk={hideDrawer}
        onCancel={hideDrawer}
        width={window.innerWidth * 0.8}
        destroyOnClose={true}
        maskClosable={false}
      >
        <QuizWrapper><Quiz quiz={quiz}></Quiz></QuizWrapper>
      </Modal>
    </div>
  );
};

export default ViewQuestions;
