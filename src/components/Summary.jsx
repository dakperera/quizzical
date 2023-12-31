import React from "react"

export default function Summary(props){

    const {restartQuiz, checkQuiz, totalCorctAnsrs, clearTotalCorAnswers} = props;

    const clickHandler = () => {
        restartQuiz()
        checkQuiz()
        clearTotalCorAnswers()
    }

    return(
        <div className='summary'>
            <p className='summaryP'>You scored {totalCorctAnsrs}/5 correct answers</p>
            <button className="chckAnswersBttn playAgainButton" onClick={clickHandler} >Play Again</button>
        </div>
    )
}