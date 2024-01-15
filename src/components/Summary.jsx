import React from "react"

export default function Summary(props){

    const {restartQuiz, checkQuiz, resetQuiz, totalCorctAnsrs, clearTotalCorAnswers} = props;

    const newGameSameParams = () => {
        restartQuiz()
        checkQuiz()
        clearTotalCorAnswers()
    }

    return(
        <div className='summary'>
            <p className='summaryP'>You scored {totalCorctAnsrs}/5 correct answers</p>
            <button className="playAgainButton buttonStyle" onClick={newGameSameParams} >Play Again</button>
            <button className="resetParamsBttn buttonStyle" onClick={resetQuiz}>Reset Params & Play</button>
        </div>
    )
}