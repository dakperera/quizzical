# Quizzical React Project

First checkin does not have the play again feature working, or the correct number of answers tabulated next to the button in the summary component.

second checkin
All features are implemented now, and tested.

New Branch quizzical upgraded
Added a new component and file - QuizParameters.jsx
 - This allows for the configuration of the quiz parameters, we used a hardcoded url before.

 Fetch was moved from App.jsx, to Questions.jsx
 Summary component in addition to PlayAgain button which resets the quiz with the same parameters, 
 has a Reset Params and Play Again button, which will load QuizParameters component. After 
 Params are set, QuizPage component loads.