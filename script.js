//User stories
//A start page as well as question, feedback, and grading pages should be rendered
//pages and questions should advance in order as well as page information should reflect
//We should be able to advance the pages
//We should be able to answer questions
//We should be able to submit our answer
//The resulting feedback page should be accurate 
//

'use strict';


const STORE = [
  { question: 'Currently at three members, how many did the xx start with at its founding?',
  answers: ['one', 'two', 'four', 'five'],
  correctAnswer: 'four'
  },

  {question: 'When communicating with Gil Scott-Heron about remixing I’m New Here, how did Jamie xx get around Scott-Heron’s aversion to using email for personal communication?',
  answers: [
    'Speaking on the telephone',
  'Handwritten letters',
  'Meeting face-to-face',
  'Emailing his publicity agent'
    ],
  correctAnswer: 'Handwritten letters'
  },
  { question: 'How many remixes are on the single version of I Know There’s Gonna Be (Good Times)?',
  answers: [2,
    3,
    4,
    0,
    ],
  correctAnswer: 2
  },
  {question: 'How many tracks feature xx members Oliver Sim and Romy respectively on Jamie xx’s album In Colour?',
  answers: ['zero and one',
    'one and one',
    'two and one',
    'one and two'
    ],
  correctAnswer: 'one and two'
  },
  {question: 'The music video for which song features hearing-impaired people dancing to it?',
  answers: ['I Know There’s Gonna Be (Good Times)',
    'NY is Killing Me',
    'Sleep Sound',
    'I Dare You'],
  correctAnswer: 'Sleep Sound'
  },
  {question: 'Which DJ forgot he and Jamie toured together in Australia during a BBC Radio mix?',
  answers: [
  'Four Tet',
  'SBTRKT',
  'Skream',
  'The Bug'
    ],
  correctAnswer: 'Four Tet'
  },
  {question: 'Which backing track did a Drake/Rihanna single repurpose in 2011?',
  answers: [
    'Ur Soul and Mine',
    'Far Nearer',
    'Crystalized',
    'I’ll Take Care of U' 
    ],
  correctAnswer: 'I’ll Take Care of U'
  },
  { question: 'Which megafamous popstar unexpectedly shares a label with the xx?',
    answers: [
      'Beyoncé',
      'Adele',
      'Ariana Grande',
      'Drake'

    ],
    correctAnswer: 'Adele' 

  },
  { question: 'Which track did Jamie rework for a remix compilation of Radiohead’s The King of Limbs?',
  answers: [
    'Lotus Flower',
    'Bloom',
    'Give Up The Ghost',
    'Codex'

  ],
  correctAnswer: 'Bloom'
  },
  {question: 'On a scale of one to four fire emojis, how lit would a Young Thug/Jamie xx collaborative album be?',
  answers: [
    '1 Lit enough to be getting on with',
    '2 A Travis Scott Adlib',
    '3 Straight Fire',
    '4 The Core of the Universe\'s Most Powerful Star'

  ],
  correctAnswer: '4 The Core of the Universe\'s Most Powerful Star'
  }
  
]

let questionNumber = 0;
let score = 0;


function makeQuestion() {
  //called to create a question
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset id="fieldset">
    <legend>Is the answer...</legend>
    <label class="answerOption">
    <input type="radio" id="anserOption1" value="${STORE[questionNumber].answers[0]}" name="answer"  required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" id="anserOption2" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" id="anserOption3" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" id="anserOption4" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
  } else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10)
  }
  }




function renderQuizQuestion() {
  //this function will render the quiz to the dom
  $('.questionAnswerForm').html(makeQuestion());
  console.log('`renderQuizQuestion` ran');
}

function handleSubmitAnswer() {
  //this function will handle the user input of their answer 
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      
      ifAnswerIsCorrect();
    } else {
      
      ifAnswerIsWrong();
    }
  });
    console.log('`handleSubmitAnswer` ran');
} 

function ifAnswerIsCorrect () {
  feedbackCorrect();
}

function ifAnswerIsWrong () {
  feedbackWrong();
}

function feedbackCorrect() {
  //for checking whether a submitted answer is correct
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><p>Heck yeah, buddy!</p><button type=button class="nextButton">Next</button></div>`);
  updateScore();
    console.log('`feedbackCorrect` ran');
}



function feedbackWrong() {
  //called if user submits wrong answer
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><p>That's not it, chief.</p>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
    console.log('`feedbackWrong` ran');
} 

function changeScore() {
  //called when the user answers a question correctly
  score++;
}

function changeQuestion() {
  
    questionNumber++;

  $('.questionNumber').text(questionNumber+1);
}


//changes score text
function updateScore() {
  changeScore();
  $('.score').text(score);
}

//what happens when the user clicks next
function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestion(); 
    renderQuizQuestion();
    handleSubmitAnswer();   
  });
}

function startQuiz () {
  $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
});
}


//restart quiz function - reloads page to start quiz over
function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}


function renderResults() {
  //called after 10 questions, display final score, have reset button
  {
  if (score >= 8) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h2>Incredible!</h2><p>You got ${score} / 10</p><p>I can't believe someone knows as much about this as me!</p><button class="restartButton">Once More?</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h2>Not Bad!</h2><p>You got ${score} / 10</p><p>You just need to bone up on your longread articles and Wikipedia deep dives!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h2>Nah man.</h2><p>You got ${score} / 10</p><p>Do you even know who this quiz is about? i mean, it's cool if you don't.</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}
}

function createQuiz () {
  startQuiz();
  renderQuizQuestion();
  renderNextQuestion();
  handleSubmitAnswer();
}

$(createQuiz);      