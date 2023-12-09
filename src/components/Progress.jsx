import React from 'react'
import { UseQuiz } from '../contexts/QuizProvider'

function Progress(props) {
    // const {index,numQuestions,points,maxPoints,answer} = props;
    const {index,numQuestions,points,maxPoints,answer,highScore} = UseQuiz()
  return (
    <header className='progress' >
        <progress value={index + Number(answer !== null)} max={numQuestions} />
        <p>
            Question <strong>{index+1}</strong>/ <strong> {numQuestions} </strong>
        </p>
        <p><strong>{points}</strong>/<strong>{maxPoints}</strong></p>
    </header>
  )
}

export default Progress