import React from 'react'

function Options(props) {
  const {questions,dispatch,answer,points} = props;
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
          <p>{points}</p>
    </div>
  )
}

export default Options