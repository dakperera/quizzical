import React, { useState, useEffect } from 'react';
import './style.css'
import StartPage from './components/StartPage'
import QuizPage from './components/QuizPage'


export default function App() {

  const [quizStarted, setQuizStarted] = React.useState(false)

  const [quizData, setQuizData] = React.useState([]);

  //const [playAgain, setPlayAgain] = React.useState(false)

  
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
      .then(res => res.json())
      .then(data => {
        setQuizData(data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  function startQuiz(){
    setQuizStarted(value=>!value)
  }

  /*
  function restartQuiz(){
    setPlayAgain(value=>!value)
  }
*/


  return (
    <main>
        {!quizStarted ?
          <StartPage startQuiz={startQuiz}/>
          :
          <QuizPage theQuizData={quizData} />

        }
       
    </main>

  )
}