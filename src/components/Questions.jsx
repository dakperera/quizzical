import React, { useState, useEffect } from 'react';

export default function Questions(props){
    const {id, question, answers, correctAnswerPos, checkAnswers} = props

    const [selectedAnswer, setSelectedAnswer] = useState(null)
    
    const handleAnswerClick= (answer) => {
        if(!props.checkAnswers){
            setSelectedAnswer(answer)
        }
        
    }

/*select the color class for the buttons */
    const selectClass = (index) => {
        let theClass = "answerButtonStyle"

        if(!props.checkAnswers){
            if(index==selectedAnswer){
                theClass += " selectButtonStyle"
            }
        }
        else{
            if(index==props.correctAnswerPos){
                theClass += " correctAnswerStyle"
            }
            if((index!=props.correctAnswerPos) && (index==selectedAnswer))
                theClass += " wrongAnswerStyle"
        }

        return theClass
    }
    
    const buttonDisplay = props.answers.map((item,index) => {
        return(
 
            <div className={selectClass(index)} key={index}
            onClick={() => handleAnswerClick(index)}
            >{item}</div>
        )
    })


    return(
        <div >

            <h3>{props.question}</h3>
            <div className="buttonLayout" >
                {buttonDisplay}
                
            </div>
            <hr></hr>
        </div>
    )
}