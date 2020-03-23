import React from "react";
import { Modal, PageHeader, Descriptions, Spin,Divider } from "antd";

import { QuizWrapper } from './style';

import Quiz from 'react-quiz-component';

const ViewQuestions = ({
  showDrawer,
  hideDrawer,
  quiz,
  summary
}) => {
  

  return (
    <div>
      <Modal
        title='View Result'
        visible={showDrawer}
        onOk={hideDrawer}
        onCancel={hideDrawer}
        width={window.innerWidth * 0.8}
        destroyOnClose={true}
        maskClosable={false}
      >
        <Spin spinning={false}>
          <QuizWrapper>
            <div className="site-page-header-ghost-wrapper">
              <PageHeader
                ghost={false}
                onBack={null}
                title='Your Result'
                subTitle='You have completed Quiz'
              >
                <Descriptions size="small" column={2}>
                  <Descriptions.Item label="Total Questions"> {summary.numberOfQuestions} </Descriptions.Item>
                  <Descriptions.Item label="Marks">{summary.correctPoints}</Descriptions.Item>
                  <Descriptions.Item label="Correct Answer">{summary.numberOfCorrectAnswers}</Descriptions.Item>
                  <Descriptions.Item label="Incorrect Answer">{summary.numberOfIncorrectAnswers}</Descriptions.Item>
                </Descriptions>
              </PageHeader>
            </div>
            <Divider></Divider>
            <div>Yoy can Retry this below But this is just for reference and wont affact your socre.</div>
            <Quiz quiz={quiz} continueTillCorrect={true}></Quiz>
          </QuizWrapper>
        </Spin>
      </Modal>
    </div>
  );
};

export default ViewQuestions;
