import React from 'react'
import { UseQuiz } from '../contexts/QuizProvider'

function StartScreen(props) {
  // const {numQuestions,dispatch} = props;
  const {numQuestions,dispatch} = UseQuiz()
  return (
    <div className = "start">
        <h2 >Welcome to React Quiz!</h2>
        <h3>{numQuestions} questions to test your React mastrey</h3>
        <button className='btn btn-ui' onClick={()=>{dispatch({type:"start"})}}>Let's Start</button>
    </div>
  )
}

export default StartScreen