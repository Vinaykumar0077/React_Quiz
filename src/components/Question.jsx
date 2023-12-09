import React from 'react'
import Options from './Options';
import { UseQuiz } from '../contexts/QuizProvider';

function Question(props) {
    // const {questions,dispatch,answer,points} = props;
    const {questions,index,dispatch,answer,points} = UseQuiz()
  return (
    <div>
        <h4>{questions[index].question}</h4>
        <Options questions={questions[index]} />
    </div>
  )
}

export default Question