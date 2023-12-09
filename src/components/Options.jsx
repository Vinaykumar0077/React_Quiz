import React from 'react'
import { UseQuiz } from '../contexts/QuizProvider';

function Options(props) {
  const {questions} = props;
  const {dispatch,answer,points,highScore} = UseQuiz()
  const hasAnswered = answer !== null;
  return (
    <div className ='options'>
        {questions.options.map((option,index) => <button
         className={`btn btn-option ${index === answer ?
          'answer' : ''} ${hasAnswered ?
            index === questions.correctOption ? 'correct' :
           'wrong' : ''
          }`} 
          key={option}
          disabled = {hasAnswered}
          onClick={()=>{dispatch({type:"newAnswer",
          payload:index})}} 
          >
            {option}
          </button>)}
    </div>
  )
}

export default Options