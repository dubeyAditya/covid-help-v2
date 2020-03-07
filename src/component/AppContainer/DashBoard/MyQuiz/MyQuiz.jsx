import React  from "react";
import { withRouter, RouteComponentProps } from 'react-router-dom';


interface Props extends RouteComponentProps {
    children?: React.ReactNode
}

const MyQuiz: React.FC<Props> = ({ history }) => {
    
   
   return <>
      <div>Hello Quiz</div>
    </>
}

export default withRouter(MyQuiz);
