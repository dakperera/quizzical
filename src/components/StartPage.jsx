import React from "react"

export default function StartPage(props){


    
    return(
        <main className="startPage">
            <h1>Quizzical</h1>
            <h3>Press the start quiz button to begin playing Quizzical! </h3>
            <br></br>
            <button onClick={props.startQuiz}  className="startButton">Start Quiz</button>
        </main>
    )
}