import React from 'react'
import { UseQuiz } from '../contexts/QuizProvider';

function FinishScreen(props) {
    // const {points,maxPoints,highScore,dispatch} = props;
    const {points,maxPoints,highScore,dispatch} = UseQuiz();
    console.log("----",highScore);
    console.log("po",points,"m",maxPoints);
    const percentage = Math.round((points/maxPoints)*100,2);

    let emoji;
    if(percentage == 100){
        emoji = "🥇";
    }else if(percentage >= 80 && percentage < 100){
        emoji = "🥳";
    }else if(percentage >= 50 && percentage < 80){
        emoji = "😁";
    }else if(percentage > 0 && percentage < 50){
        emoji = "😥";
    }else{
        emoji = "🤦‍♂️";
    }
  return (
    <>
    <p className='result' >
       <span>{emoji}</span> You scored <strong>{points}</strong> out of <strong>{maxPoints}</strong> with (<strong>{percentage}%)</strong>
    </p>
    <p className='highscore' >(Hightscore: {highScore} points)</p>
    <button className='btn btn-ui' onClick={()=>{dispatch({type:"restartQuiz"})}} >Restart Quiz</button>
    </>
  )
}

export default FinishScreen