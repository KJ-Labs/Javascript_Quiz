// Get all the elements in one spot. 
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var button1 = document.getElementById("1");
var button2 = document.getElementById("2");
var button3 = document.getElementById("3");
var button4 = document.getElementById("4");

// Make the questions
var quizQuestions = [{
    question: "What HTML Tag needs to be applied, before you can use JS?",
    choice1: "javascript",
    choice2: "None needed",
    choice3: "js",
    choice4: "script",
    correctAnswer: "4"},
  {
    question: "What is the correct syntax to create an alert box saying hello world?",
    choice1: "alert(“hello world”);",
    choice2: "msg(“hello world”);",
    choice3: "msgbox(“hello world”)",
    choice4: "alertbox(“hello world”)",
    correctAnswer: "1"},
    {
    question: "What do you use to define an array?",
    choice1: "{ }",
    choice2: "( )",
    choice3: "[ ]",
    choice4: "| |",
    correctAnswer: "3"},
    {
    question: "What is used to create an OR statement in a Function?",
    choice1: "||",
    choice2: "&&",
    choice3: "!!",
    choice4: "++",
    correctAnswer: "1"},  
    
    ];


// Add the variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    button1.innerHTML = currentQuestion.choice1;
    button2.innerHTML = currentQuestion.choice2;
    button3.innerHTML = currentQuestion.choice3;
    button4.innerHTML = currentQuestion.choice4;
};

// Starts the quiz, starts the timer and hides the other info
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Create a timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
// Shows when you reach the end of the quiz or the timer runs out. 
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

//This shows the highscore page and strigify the answers
submitScoreBtn.addEventListener("click", function highscore(){
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// Clears the list and gets new high score list
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// Shows you the high scores page
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

//Clears all the things
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

//Resets the quiz back to original
function restartQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 60;
    score = 0;
    currentQuestionIndex = 0;
}

//This checks if they selected the right answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;

        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){

        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}

// This button starts the quiz!
startQuizButton.addEventListener("click",startQuiz);