import {IQuestion} from './question.model';

export interface IQuiz{
    quizTitle:string,
    quizSynopsis: string;
    questions:IQuestion[]
}

export class Quiz implements IQuiz{
    quizTitle: string; 
    quizSynopsis: string;
    questions: IQuestion[];
    

    constructor({quizTitle,quizSynopsis,questions}: IQuiz){
        this.quizTitle =  quizTitle;
        this.quizSynopsis =  quizSynopsis;
        this.questions =  questions;
    }


    serialize() {
        return JSON.parse(JSON.stringify(this));
    }
    
}

