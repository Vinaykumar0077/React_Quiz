import React from 'react'
import Options from './Options';

function Question(props) {
    const {questions,dispatch,answer,points} = props;
  return (
    <div>
        <h4>{questions.question}</h4>
        <Options questions={questions} dispatch = {dispatch} answer = {answer} points = {points} />
    </div>
  )
}

export default Question