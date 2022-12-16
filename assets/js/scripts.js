// Grab HTML elements
var viewScoresBtn = document.getElementById("view-scores");
var timerEl = document.getElementById("timer");
var mainContentEl = document.getElementById("main-content");


// Game variables
var score = 0; // Tracks score which is the amount of seconds left at the end of the game
// var scores = []; // Tracks all scores
var questionIdx = 0; // Tracks the current question index
var questionCorrect = false; // Tracks if previous question was answered correctly
var questions = []; // Holds all of the quiz questions

// Add questions
questions.push({
    question: "Commonly used data types do not include:",
    a1: "strings",
    a2: "booleans",
    a3: "alerts",
    a4: "numbers",
    correct: "a3",
});

questions.push({
    question: "The condition in an if / else statement is enclosed with _______.",
    a1: "quotes",
    a2: "curly brackets",
    a3: "parentheses",
    a4: "square brackets",
    correct: "a3"
});

// TODO: Add more questions

// Clears the main container
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
    p.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    btn.textContent = "Start Quiz";

    mainContentEl.append(h1);
    mainContentEl.append(p);
    mainContentEl.append(btn);
}

// Start countdown timer
function startCountdown() {
    var timeLeft = 75;
    
    // Update the HTML timer every second and check for end game conditions
    var timeInterval = setInterval(function() {
        timerEl.innerHTML = "Time: " + timeLeft;
        if (timeLeft == 0 || questionIdx === questions.length) {
            // Set score to the time remaining
            score = timeLeft;
            
            // Reset the question index so quiz can be retaken
            questionIdx = 0;
            
            // Stop timer and conclude game
            clearInterval(timeInterval);
            endGame();
        }
        timeLeft--;
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
        
        h3.textContent = questions[questionIdx].question;
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
    // TODO: Complete functionality
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
}

// Show previous quiz scores from local storage
function showScores() {
    clearMainContainer();

    // Create HTML elements
    var h3 = document.createElement("h3");
    var ol = document.createElement("ol");
    var resumeBtn = document.createElement("button");

    resumeBtn.id = "back";

    h3.textContent = "Top Scores";
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
        // TODO: Check if answer was correct

        // Go to next question
        questionIdx++;
        showQuestion();

        // TODO: Display if you were correct or wrong
        
    } else if (element.id === "submit-score") { // Submit score button was clicked
        // Get user initials from input field
        var userInitials = document.getElementById("user-initials").value;
        
        // Get the previous scores
        var storedScores = JSON.parse(localStorage.getItem("scores"));

        // Add initials and score to scores array
        storedScores.push({
            initials: userInitials,
            score: score,
        });

        // TODO: Sort the scores before setting
        
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

// Listen for the view high scores button to be clicked
viewScoresBtn.addEventListener("click", function (e) {
    e.preventDefault();
    showScores();
});

showStartPage();