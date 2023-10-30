import React from 'react'

function Progress(props) {
    const {index,numQuestions,points,maxPoints,answer} = props;
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