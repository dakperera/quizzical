import React, { useState, useEffect } from 'react';
import Questions from './Questions'
import Summary from './Summary'
import {nanoid} from "nanoid"


export default function QuizPage(props){  

    const [sections, setSections] = React.useState(createSections())
    const [checkAnswers, setCheckAnswers] = React.useState(false)
    const [totalCorctAnsrs, setTotalCorctAnsrs] = React.useState(0)

    /*
    Note that a section is considered one question, and its corresponding three incorrect
    answers and one correct answer, arranged randomly as 4 clickable <div>'s below the
    question.  
    
    This useEffect will call the createSections() function, which will take the data obtained from the fetch, and organize it into 5 objects, representing 5 sections.  This info will be sent to the 
    Questions component, which itself will be rendered 5 times for each section.  All 5 sections will be stored in and rendered by theSections object.  This useEffect will run whenever there is new data from the fetch, like when the app first loads, or the PlayAgain button is clicked.
    
    The Check Answers button will grade the selected answers, and have the answer <div>'s change color
    depending on the user's selection.  The logic for this is handled in the Questions component.  When 
    Check Answers is pressed it will also load the Summary component, which will score the number of 
    correct answers, and render the Play Again button, which if pressed will call the fetch again to get more trivia, and rerender the sections.
    */
    
    React.useEffect(()=>{
        setSections(createSections())
    }, [props]);

    function createSections(){
        const newSection = []
        for(let i=0; i<5; i++){
            let decodeQuestion = decodeHtmlEntities(props.theQuizData[i].question);
        
            let decodeCorrectAnswer = decodeHtmlEntities(props.theQuizData[i].correct_answer);

            let decodeIncorrectAnswer = props.theQuizData[i].incorrect_answers.map(item=>{
                return decodeHtmlEntities(item)
            })

            let corrAnsPlcement = Math.ceil(Math.random()*(props.theQuizData[i].incorrect_answers.length+1))-1

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
    
    return (
      <main className='quizPage'>
        <div>
            {theSections}
        </div>
        
        {!checkAnswers ? <button className="chckAnswersBttn" onClick={checkQuiz}>Check Answers</button>
        :
        <Summary restartQuiz={props.restartQuiz} checkQuiz={checkQuiz} totalCorctAnsrs={totalCorctAnsrs} clearTotalCorAnswers={clearTotalCorAnswers}/>
        
        }
          
      </main>
    )
  }

  