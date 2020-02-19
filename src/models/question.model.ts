export interface IQuestion {
    question: string,
    questionType: string
    answers: string[],
    correctAnswer: string,
    messageForCorrectAnswer: string,
    messageForIncorrectAnswer: string,
    explanation: string,
    point: string
}
