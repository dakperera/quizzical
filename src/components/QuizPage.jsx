import React, { useState, useEffect, useRef } from 'react';
import Questions from './Questions'
import Summary from './Summary'
import {nanoid} from "nanoid"


export default function QuizPage(props){  

    const [quizData, setQuizData] = React.useState([]);
    const [sections, setSections] = React.useState([])
    const [checkAnswers, setCheckAnswers] = React.useState(false)
    const [totalCorctAnsrs, setTotalCorctAnsrs] = React.useState(0)
    const [playAgain, setPlayAgain] = React.useState(false)

    /* 
    useRef is a React hook that is like useState, except it doesn't cause
    a re-rendering when it changes
    */
    const isInitialRender = useRef(true);

    /*
    This useEffect fetch's the data from the opentdb api. Aside from
    initial rendering, it runs when there is a new url presented as props 
    from QuizParameters, and when the playAgain state variable is toggled
    by Summary, to play the quiz again with the same parameters.
    */
    React.useEffect(() => {
        fetch(props.urlParams)
          .then(res => res.json())
          .then(data => {
            setQuizData(data.results);  
          })          
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, [playAgain, props]);    
   

    /* 
    This useEffect uses the useRef isInitialRender to ensure that 
    this useEffect will not run on the initial render of the 
    component, and in subsequent renderings, will only run after
    the other useEffect has run, and obtained data for quizData.

    This useEffect will call the createSections() function, which will take the data obtained from the fetch, and organize it into 5 objects, representing 5 sections.  This info will be sent to the Questions component, which itself will be rendered 5 times for each section.  All 5 sections will be stored in and rendered by theSections object.  This useEffect will run whenever there is new data from the fetch, like when the app first loads, or the PlayAgain button is clicked.
    */

    /*
    The Check Answers button will grade the selected answers, and have the answer <div>'s change color depending on the user's selection.  The logic for this is handled in the Questions component.  When Check Answers is pressed it will also load the Summary component, which will score the number of correct answers, and render the Play Again button and the Reset Params & Play button.  The latter will load QuizParams, where the user can set new params, and then load a new quiz.  The former will load a new quiz with the same params as before. 
    */
    React.useEffect(()=>{
        if(!isInitialRender.current){
            setSections(createSections())
        }
        else{
            isInitialRender.current = false;
        }
        return ()=> {
            console.log('cleanup code')
        }        
    }, [quizData])


    function createSections(){
        const newSection = []
        for(let i=0; i<5; i++){
            let decodeQuestion = decodeHtmlEntities(quizData[i].question);
            let decodeCorrectAnswer = decodeHtmlEntities(quizData[i].correct_answer);
            let decodeIncorrectAnswer = quizData[i].incorrect_answers.map(item=>{
                return decodeHtmlEntities(item)
            })
            let corrAnsPlcement = Math.ceil(Math.random()*(quizData[i].incorrect_answers.length+1))-1
            let answersArr = [...decodeIncorrectAnswer]
            answersArr.splice(corrAnsPlcement, 0, decodeCorrectAnswer)
            newSection.push(
                {
                    question: decodeQuestion,
                    answers: answersArr, 
                    correctAnswerPos: corrAnsPlcement, 
                    id:nanoid(), 
                }
            )
        }
        return newSection
    }

    function decodeHtmlEntities(text){
        const textArea = document.createElement('textArea')
        textArea.innerHTML = text
        return textArea.value
    }

    const theSections = sections.map(section => {
        return(
            <Questions key={section.id} question={section.question} answers={section.answers}  correctAnswerPos={section.correctAnswerPos} checkAnswers={checkAnswers} updateTotalCorAnswers={updateTotalCorAnswers}/>
        )
    })

    function checkQuiz(){
        setCheckAnswers(value=>!value)
    }

    function updateTotalCorAnswers(){
        setTotalCorctAnsrs(total => total+1)
    }

    function clearTotalCorAnswers(){
        setTotalCorctAnsrs(0)
    }

    function restartQuiz(){
        setPlayAgain(value=>!value)
    }
    
    return (
      <main className='quizPage'>
        {
            sections.length > 0 && (
                theSections
            )
        }

        {
            sections.length > 0 && (
                !checkAnswers ? <button className="chckAnswersBttn buttonStyle" onClick={checkQuiz}>Check Answers</button>
                :
                <Summary restartQuiz={restartQuiz} checkQuiz={checkQuiz} resetQuiz={props.resetQuiz} totalCorctAnsrs={totalCorctAnsrs} clearTotalCorAnswers={clearTotalCorAnswers}/>
            )
        }

      </main>
    )
  }

  