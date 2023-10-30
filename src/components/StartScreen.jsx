import React from 'react'

function StartScreen(props) {
  const {numQuestions,dispatch} = props;
  return (
    <div className = "start">
        <h2 >Welcome to React Quiz!</h2>
        <h3>{numQuestions} questions to test your React mastrey</h3>
        <button className='btn btn-ui' onClick={()=>{dispatch({type:"start"})}}>Let's Start</button>
    </div>
  )
}

export default StartScreen