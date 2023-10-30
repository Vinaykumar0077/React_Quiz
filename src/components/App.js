import { useEffect, useReducer } from 'react';

import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';

const initialState = {
  questions : [{
    "question": "Which company invented React?",
    "options": ["Google", "Apple", "Netflix", "Facebook"],
    "correctOption": 3,
    "points": 10
  }],
  status : "loading",  //loading, error, ready, active, finished
  index : 0,
  answer : null,
  points : 0,
  highScore : 0,
  remainingTime : null
};

const SEC_PER_QUESTION = 30;

function reducer (state,action){
  switch(action.type){
    case "dataReceived":
      return {...state,
        questions:action.payload,
        status : "ready"
      }
    case "dataFailed":
      return {...state,
        status : "error"
      }
    case "start":
      return {...state,
        status : "active",
        remainingTime : state.questions.length * SEC_PER_QUESTION
      }
    case "newAnswer":
      const question = state.questions.at(state.index)
      return {...state,
      answer:action.payload,
      points:action.payload === question.correctOption ? state.points + question.points : state.points
    }
    case "nextQuestion":
      return {...state,
        index : state.index + 1,
        answer : null
      }
    case "finish":
      return {...state,
        status : "finished",
        highScore : (state.points > state.highScore) ? state.points : state.highScore,
      }
    case "restartQuiz":
      return {...state,
        status:"ready",
        index : 0,
        points : 0,
        answer : null,
        remainingTime :SEC_PER_QUESTION
      }
      // return {...initialState,
      // questions : state.questions,
      // highScore : state.highScore,
      // status : "ready"
      // }
    case "timer":
      return {...state,
      remainingTime : state.remainingTime - 1,
      status : state.remainingTime <= 0 ? "finished" : state.status
      }
    default :
    throw new Error("Action is unknown")
  }
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState);
  const {status,questions,index,answer,points,highScore,remainingTime} = state;
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev,curr)=>prev + curr.points,0);
  useEffect(()=>{
    fetch("http://localhost:8000/questions")
    .then((res)=>res.json())
    .then(res=> dispatch({type:"dataReceived",payload:res}))
    .catch(err=>dispatch({type:"dataFailed"}))
  },[])
  return (
    <div className="app">
      <Header/>
      <Main>
        {status == "loading" && <Loader/>}
        {status == "error" && <Error/>}
        {status == "ready" && <StartScreen numQuestions = {numQuestions} dispatch = {dispatch}/>}
        {status == "active" && (
        <>
        <Progress index = {index} numQuestions = {numQuestions}
         points = {points} maxPoints = {maxPoints} answer = {answer} />

        <Question questions={questions[index]} dispatch = {dispatch}
         answer = {answer} points = {points} />

        <Footer>
          <Timer remainingTime = {remainingTime} dispatch = {dispatch} />
          <NextButton dispatch = {dispatch} answer = {answer}
           index={index} numQuestions = {numQuestions} />
        </Footer>
        </>
        )}
        {status == "finished" && <FinishScreen points={points} 
        maxPoints={maxPoints} highScore = {highScore} dispatch = {dispatch} />}
      </Main>
    </div>
  );
}

export default App;
