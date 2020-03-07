
export class Quiz {

    constructor({quizTitle,quizSynopsis,questions}){
        this.quizTitle =  quizTitle;
        this.quizSynopsis =  quizSynopsis;
        this.questions =  questions;
    }


    serialize() {
        return JSON.parse(JSON.stringify(this));
    }
    
}

