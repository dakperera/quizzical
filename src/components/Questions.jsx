import React, { useState, useEffect } from 'react';

export default function Questions(props){

    const {id, question, answers, correctAnswerPos, checkAnswers, updateTotalCorAnswers} = props
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    
    /*
    This useEffect will update the number of total correct answers the user has by one, representing
    this particular section if the users selected answer matches the correct answer for the question.
    This effect runs whenever the Check Answers button is pressed at the bottom of the QuizPage component.

    The sum total of the correct answers the user got for all 5 questions will be displayed in the Summary component.  The rest of the code in this component is for rendering the answer <div>'s particularly their correct color .
    */

    React.useEffect(()=>{
        if(checkAnswers){
            if(selectedAnswer==correctAnswerPos){
                updateTotalCorAnswers()
            }
        }        
    }, [checkAnswers])

    const handleAnswerClick= (answer) => {
        if(!checkAnswers){
            setSelectedAnswer(answer)
        }
    }
    
/*select the color class for the buttons */
    const selectClass = (index) => {
        let theClass = "answerButtonStyle"

        if(!checkAnswers){
            if(index==selectedAnswer){
                theClass += " selectButtonStyle"
            }
        }
        else{
            if(index==correctAnswerPos){
                theClass += " correctAnswerStyle"
            }
            if((index!=correctAnswerPos) && (index==selectedAnswer))
                theClass += " wrongAnswerStyle"
        }

        return theClass
    }
    
    //displays the answers for the section as <div> 's
    const buttonDisplay = answers.map((item,index) => {
        return(
 
            <div className={selectClass(index)} key={index}
            onClick={() => handleAnswerClick(index)}
            >{item}</div>
        )
    })


    return(
        <div >

            <h3>{question}</h3>
            <div className="buttonLayout" >
                {buttonDisplay}
            </div>
            <hr></hr>
            
        </div>
    )
}