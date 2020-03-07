import * as React from "react";
import { Modal } from "antd";
/** Stylesheet Imports */
import "./ViewQuestions.scss";
import { IQuiz } from "../../../../models/quiz.model";

import Quiz from 'react-quiz-component';

export interface Props {
  children?: React.ReactNode;
  showDrawer: boolean;
  hideDrawer: any;
  quiz: IQuiz;
}

const ViewQuestions: React.FC<Props> = ({
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
        width={window.innerWidth * 0.5}
        destroyOnClose={true}
      >
       <div><Quiz quiz={quiz}></Quiz></div>
      </Modal>
    </div>
  );
};

export default ViewQuestions;
