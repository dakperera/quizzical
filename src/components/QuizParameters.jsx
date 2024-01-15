import React, { useState, useEffect } from 'react';
import QuizPage from './QuizPage'

export default function QuizParameters(){

    const [getUrl, setGetUrl] = React.useState(false)
    const [urlParams, setUrlParams] = React.useState("")
    const [formData, setFormData] = React.useState(
        {
            category: "",
            difficulty: "", 
            type: ""
        }
    )

    function playQuiz(){
        setUrlParams(createUrl())
        setGetUrl(true)
    }

    function resetQuiz(){
        setGetUrl(false)
        setUrlParams("")
    }

    function createUrl(){
        let url1 = `https://opentdb.com/api.php?amount=5`
    
        if(formData.category!=0){
            url1+=`&category=${formData.category}`
        }
        if(formData.difficulty!=0){
            url1+=`&difficulty=${formData.difficulty}`
        }
        if(formData.type!=0){
            url1+=`&type=${formData.type}`
        }
        return url1
    }

    function handleChange(event){
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    console.log(urlParams)
    return(
        <main>

            {getUrl ? 
                <QuizPage resetQuiz={resetQuiz} urlParams={urlParams}/>
                :
                <div className="form">
                    <>
                    <label>Choose a Category</label>
                    <select
                        id="category"
                        value={formData.category} 
                        onChange={handleChange}
                        name="category"
                    >
                        <option value="0">Any Category</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musical and Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science and Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="31">Entertainment:Japanese Anime & Manga</option>
                        <option value="32">Entertainment: Cartoon & Animations</option>
                    </select>
                    </>
                    <label>Choose Difficulty</label>
                    <select
                        id="difficulty" 
                        value={formData.difficulty} 
                        onChange={handleChange}
                        name="difficulty"
                    >
                        <option value="0">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <label>Choose Question Type</label>
                    <select
                        id="type"
                        value={formData.type}
                        onChange={handleChange}
                        name="type"
                    >
                        <option value="0">Any Type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True/False</option>
                    </select>

                    <button className="startButton buttonStyle" onClick={playQuiz}>Play the Quiz!</button> 
                    <p className='paramsP'>Note: If database doesn't have enough questions that match the chosen parameters, resultying screen will be blank. In that case refresh browser, and choose new parameters.</p>

                </div>
       
            }
            
        </main>
    )
}