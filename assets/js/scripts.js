// Grab HTML elements
var viewScoresBtn = document.getElementById("view-scores");
var timerEl = document.getElementById("timer");
var mainContentEl = document.getElementById("main-content");


// Game variables
var score = 0; // Tracks score which relates to time left of the game
var questionIdx = 0; // Tracks the current question index
var questionCorrect; // Tracks if previous question was answered correctly
var userAnswerKey = ""; // Holds the key to the user's answer

// Add questions
var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        a1: "<script>",
        a2: "<js>",
        a3: "<scripting>",
        a4: "<javascript>",
        correct: "a1",
    },
    {
        question: 'How do you write "Hello World" in an alert box?', 
        a1: 'msg("Hello World");',
        a2: 'msgBox("Hello World");',
        a3: 'alert("Hello World");',
        a4: 'alertBox("Hello World");',
        correct: "a3",
    },
    {
        question: "How do you round the number 7.25, to the nearest integer?",
        a1: "Math.round(7.25)",
        a2: "round(7.25)",
        a3: "Math.rnd(7.25)",
        a4: "rnd(7.25)",
        correct: "a1",
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        a1: "Math.ceil(x, y)",
        a2: "Math.max(x, y)",
        a3: "top(x, y)",
        a4: "ceil(x, y)",
        correct: "a2",
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        a1: "=",
        a2: "x",
        a3: "-",
        a4: "*",
        correct: "a1",
    },
    {
        question: "Commonly used data types do not include:",
        a1: "strings",
        a2: "booleans",
        a3: "alerts",
        a4: "numbers",
        correct: "a3",
    },
    {
        question: "The condition in an if / else statement is enclosed with _______.",
        a1: "quotes",
        a2: "curly brackets",
        a3: "square brackets",
        a4: "parentheses",
        correct: "a4",
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        a1: "document.write()",
        a2: "console.log()",
        a3: "window.alert()",
        a4: "All of the above",
        correct: "a4",
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        a1: "const",
        a2: "var",
        a3: "let",
        a4: "constant",
        correct: "a1",
    },
    {
        question: "Which function is used to serialize an object into a JSON string in Javascript?",
        a1: "convert()",
        a2: "parse()",
        a3: "stringify()",
        a4: "None of the above",
        correct: "a3",
    },
];

// Clear the main container
function clearMainContainer() {
    mainContentEl.innerHTML = "";
}

// Show quiz start page
function showStartPage() {
    clearMainContainer();

    // Create HTML elements and add to page
    var h1 = document.createElement("h1");
    var p = document.createElement("p");
    var btn = document.createElement("button");

    btn.id = "start-quiz";

    h1.textContent = "Coding Quiz Challenge";
    p.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds! There are a total of " + questions.length + " questions.";
    btn.textContent = "Start Quiz";

    mainContentEl.append(h1);
    mainContentEl.append(p);
    mainContentEl.append(btn);
}

// Start countdown timer
function startCountdown() {
    // The score is the amount of time left - set initial time to 75 seconds
    score = 75;
    
    // Update the HTML timer every second and check for end game conditions
    var timeInterval = setInterval(function() {
        timerEl.innerHTML = "Time: " + score;
        if (score <= 0 || questionIdx === questions.length) { // Check for win criteria        
            // Reset score to 0 if below 0
            if (score < 0) {
                score = 0;
                timerEl.innerHTML = "Time: " + score;
            }
            // Reset the question index so quiz can be retaken
            questionIdx = 0;
            
            // Stop timer and conclude game
            clearInterval(timeInterval);
            endGame();
        } else {
            score--;
        }
    }, 1000);
}

// Displays the next question
function showQuestion() {
    clearMainContainer();
    
    if (questionIdx < questions.length) { // Show next question
        // Create HTML elements and add to page
        var h3 = document.createElement("h3");
        var answer1 = document.createElement("button");
        var answer2 = document.createElement("button");
        var answer3 = document.createElement("button");
        var answer4 = document.createElement("button");
        
        answer1.className = "answers";
        answer2.className = "answers";
        answer3.className = "answers";
        answer4.className = "answers";

        answer1.setAttribute("data-index", 'a1');
        answer2.setAttribute("data-index", 'a2');
        answer3.setAttribute("data-index", 'a3');
        answer4.setAttribute("data-index", 'a4');
        
        h3.textContent = "(" + (questionIdx + 1) + " of " + questions.length + ") " + questions[questionIdx].question;
        answer1.textContent = "1. " + questions[questionIdx].a1;
        answer2.textContent = "2. " + questions[questionIdx].a2;
        answer3.textContent = "3. " + questions[questionIdx].a3;
        answer4.textContent = "4. " + questions[questionIdx].a4;
        
        mainContentEl.append(h3);
        mainContentEl.append(answer1);
        mainContentEl.append(answer2);
        mainContentEl.append(answer3);
        mainContentEl.append(answer4);

    } else { // Out of questions - end game
        endGame();
    }    
}

// Checks if question was answered correctly
function checkAnswer() {
    var answeredQuestion = questions[questionIdx];
    var answerKey = answeredQuestion["correct"];

    if (answerKey === userAnswerKey) {
        questionCorrect = true;
    } else {
        questionCorrect = false;
        score -= 10;
    }

}

function showCorrectOrIncorrect() {
    // Display correct or incorrect
    if (questionCorrect != null) {
        var correctOrIncorrect = document.createElement("p");
        if (questionCorrect == true) {
            correctOrIncorrect.textContent = "Previously answered question: Correct";
        } else if (questionCorrect == false) {
            correctOrIncorrect.textContent = "Previously answered question: Incorrect";
        }
        mainContentEl.append(correctOrIncorrect);
    }
}

// Displays score and asks user for initials to save the score
function endGame() {
    clearMainContainer();
    
    // Create HTML elements and add to page
    var h3 = document.createElement("h3");
    var p1 = document.createElement("p");
    var span = document.createElement("span");
    var inputField = document.createElement("input");
    var inputSubmit = document.createElement("button");

    inputField.id = "user-initials";
    inputSubmit.id = "submit-score";

    h3.textContent = "All done!";
    p1.textContent = "Your final score is " + score + ".";
    span.textContent = "Enter initials: ";
    inputSubmit.textContent = "Submit";

    mainContentEl.append(h3);
    mainContentEl.append(p1);
    mainContentEl.append(span);
    mainContentEl.append(inputField);
    mainContentEl.append(inputSubmit);
    
    showCorrectOrIncorrect();
    questionCorrect = null;
}

// Show previous quiz scores from local storage
function showScores() {
    clearMainContainer();

    // Create HTML elements
    var h3 = document.createElement("h3");
    var ol = document.createElement("ol");
    var resumeBtn = document.createElement("button");

    resumeBtn.id = "back";

    h3.textContent = "Previous Scores";
    resumeBtn.textContent = "Back";

    // Grab scores from local storage
    var storedScores = JSON.parse(localStorage.getItem("scores"));

    // Check if there are stored scores
    if (storedScores != null) { // Scores exist - display them
        // Create and add new li for each score
        for (var i = 0; i < storedScores.length; i++) {
            var li = document.createElement("li");
            li.textContent = "Score: " + storedScores[i].score + " User: " + storedScores[i].initials;
            ol.append(li);
        }

    } else { // Scores do not exist - let user know
        var li = document.createElement("li");
        li.textContent = "No previous scores";
        ol.append(li);
    }

    // Add HTML elements to page
    mainContentEl.append(h3);
    mainContentEl.append(ol);
    mainContentEl.append(resumeBtn);
}

// *** EVENT LISTENERS ***

// Listen for elements in the main container to be clicked
mainContentEl.addEventListener("click", function (e) {
    e.preventDefault();

    // Determine what element was clicked
    var element = e.target;
    if (element.id == "start-quiz") { // Start quiz button was clicked
        startCountdown();
        showQuestion();

    } else if (element.className === "answers") { // Quiz answer button was clicked
        // Track the user's answer selection
        userAnswerKey = element.getAttribute("data-index");
        checkAnswer();

        // Go to next question
        questionIdx++;
        showQuestion();

    } else if (element.id === "submit-score") { // Submit score button was clicked
        // Get user initials from input field
        var userInitials = document.getElementById("user-initials").value;
        
        // Get the previous scores or initialize an empty array if there are none
        var storedScores = JSON.parse(localStorage.getItem("scores"));
        if (storedScores == null) {
            storedScores = [];
        }

        // Add initials and score to scores array
        storedScores.push({
            initials: userInitials,
            score: score,
        });

        // Re-add the scores with the new score
        localStorage.setItem("scores", JSON.stringify(storedScores));
        showScores();

    } else if (element.id === "back") { // Back button was clicked
        clearMainContainer();
        if (questionIdx == 0) { // Quiz isn't running - go to start page
            showStartPage();
        } else { // Quiz is running - resume quiz
            showQuestion();
        }
    }
});

// Listen for the view scores button to be clicked
viewScoresBtn.addEventListener("click", function (e) {
    e.preventDefault();
    showScores();
});

showStartPage();