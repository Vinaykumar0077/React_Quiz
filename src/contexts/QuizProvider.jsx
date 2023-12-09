import React, { useContext,createContext, useReducer, useEffect } from 'react'

const QuizContext = createContext();

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

function QuizProvider({children}) {
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
    <QuizContext.Provider value={{...state,numQuestions,maxPoints,dispatch}} >
        {children}
    </QuizContext.Provider>
  )
}

function UseQuiz(){
    const context = useContext(QuizContext);
    if (context === undefined)
    throw new Error("QuizContext was used outside the QuizProvider");
    return context
}

export  {QuizProvider,UseQuiz}