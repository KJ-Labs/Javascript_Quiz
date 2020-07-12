
/* Set the variables so javascript can reference them*/ 
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let correctAnswer = 0;
let wrongAnswer = 0;

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

/* Starts the game and hides the  question container*/ 
function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

/* Shifts to Next Question*/ 
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

/* Shows the Next Question*/ 
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    correctAnswer ++;
  } else {
    wrongAnswer++;
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What HTML Tag needs to be applied, before you can use JS?',
    answers: [
      { text: '<javascript>', correct: false },
      { text: 'None needed', correct: false },
      { text: '<js>', correct: false },
      { text: '<script>', correct: true }
    ]
  },
  {
    question: 'What is the correct syntax to create an alert box saying "hello world"?',
    answers: [
      { text: 'alert(“hello world”);', correct: true },
      { text: 'msg(“hello world”);', correct: false },
      { text: 'msgbox(“hello world”)', correct: false },
      { text: 'alertbox(“hello world”);', correct: false }
    ]
  },
  {
    question: 'How do you reference an external script called file.js?',
    answers: [
      { text: '<script ref=”file.js”>', correct: false },
      { text: '<script src=”file.js”>', correct: true },
      { text: '<script ref=”file.js”>', correct: false },
      { text: '<script name=”file.js”>', correct: false }
    ]
  },
  {
    question: 'What is used to create an or statement?',
    answers: [
      { text: '||', correct: false },
      { text: '&&', correct: true },
      { text: '--', correct: true },
      { text: '!!', correct: true },
    ]
  }
]