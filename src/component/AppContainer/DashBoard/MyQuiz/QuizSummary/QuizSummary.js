import React from 'react';
import {Result, Button } from 'antd';

const QuizSummary = ({onSummary})=> {
    
   return <Result
    status="success"
    title="You have Successfully Completed Exam."
    subTitle="If you have any concern with exam Please contact your exam cordinator"
    extra={[
      <Button type="primary" onClick={()=> onSummary(true)} key="console">
        View Results
      </Button>
    ]}
  />
}

export default QuizSummary;