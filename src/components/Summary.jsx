//import React, { useState, useEffect } from 'react';
import React from "react"


export default function Summary(props){
    return(
        <div className='summary'>
            <p className='summaryP'>You scored /5 correct answers</p>
            <button className="chckAnswersBttn playAgainButton">Play Again</button>
        </div>
    )
}