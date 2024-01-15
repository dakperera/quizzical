import React, { useState, useEffect } from 'react';
import './style.css'
import StartPage from './components/StartPage'
import QuizParameters from './components/QuizParameters'

export default function App() {

  const [quizStarted, setQuizStarted] = React.useState(false)

  function startQuiz(){
    setQuizStarted(value=>!value)
  }

  return (
    <main>
        
        {!quizStarted ?
          <StartPage startQuiz={startQuiz}/>
          :
          <QuizParameters />
        }
       
    </main>

  )
}