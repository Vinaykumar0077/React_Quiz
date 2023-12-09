import React from 'react'
import { UseQuiz } from '../contexts/QuizProvider';

function NextButton(props) {
    // const {dispatch,answer,index,numQuestions} = props;
    const {dispatch,answer,index,numQuestions} = UseQuiz()
    if(answer === null) return null;
    if(index < numQuestions - 1){
      return (
        <button className='btn btn-ui' onClick={()=>{dispatch({type:"nextQuestion"})}} >Next</button>
      )
    }else{
      return (
        <button className='btn btn-ui' onClick={()=>{dispatch({type:'finish'})}} >Result</button>
      )
    }
}

export default NextButton