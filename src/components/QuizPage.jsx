import React, { useState, useEffect } from 'react';
import Questions from './Questions'
import Summary from './Summary'
import {nanoid} from "nanoid"


export default function QuizPage(props){  

    const [sections, setSections] = React.useState(createSections())
    //const [sections, setSections] = React.useState([])

    const [checkAnswers, setCheckAnswers] = React.useState(false)


    function createSections(){
        const newSection = []
        for(let i=0; i<5; i++){
            let decodeQuestion = decodeHtmlEntities(props.theQuizData[i].question);
            //let decodeQuestion = decodeHtmlEntities(quizData.theQuizData[i].question);
        
            let decodeCorrectAnswer = decodeHtmlEntities(props.theQuizData[i].correct_answer);
            //let decodeCorrectAnswer = decodeHtmlEntities(quizData.theQuizData[i].correct_answer);

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
            <Questions key={section.id} question={section.question} answers={section.answers}  correctAnswerPos={section.correctAnswerPos} checkAnswers={checkAnswers}/>
        )
    })

    function checkQuiz(){
        setCheckAnswers(value=>!value)
    }

  

    return (
      <main className='quizPage'>
        <div>
            {theSections}
        </div>
        
        {!checkAnswers ? <button className="chckAnswersBttn" onClick={checkQuiz}>Check Answers</button>
        :
        <Summary />
        
        }
          
      </main>
    )
  }

  