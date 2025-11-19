import questionBank from "./questions.js";
import { formatTime, getFromSession, saveToSession, ensureSessionKeys } from "./utils.js";

const PREFERENCE_KEY = "quizPreferences";
const RESULT_KEY = "quizResults";

if (!ensureSessionKeys([PREFERENCE_KEY], "index.html")) {
  throw new Error("Missing quiz preferences.");
}

const preferences = getFromSession(PREFERENCE_KEY);
const { category, difficulty, timeLimit = 30 } = preferences;

const questionList = (questionBank[category] && questionBank[category][difficulty]) || [];
if (!questionList.length) {
  alert("No questions available for the selected filters. Returning to home.");
  window.location.replace("index.html");
}

const timerDisplay = document.getElementById("timer");
const questionPrompt = document.getElementById("questionPrompt");
const questionCounter = document.getElementById("questionCounter");
const choicesForm = document.getElementById("choicesForm");
const navContainer = document.getElementById("questionNav");
const prevBtn = document.getElementById("prevQuestion");
const nextBtn = document.getElementById("nextQuestion");
const submitBtn = document.getElementById("submitQuiz");
const quizMeta = document.getElementById("quiz-meta");

quizMeta.textContent = `${category} • ${difficulty.toUpperCase()} • ${timeLimit}s per question`;

const state = {
  currentIndex: 0,
  remainingTime: timeLimit,
  elapsedForCurrent: 0,
  timerId: null,
  responses: questionList.map((question) => ({
    id: question.id,
    selectedIndex: null,
    timeSpent: 0,
    status: "unanswered",
    timedOut: false,
  })),
};

const updateTimerDisplay = () => {
  timerDisplay.textContent = formatTime(state.remainingTime);
  timerDisplay.classList.toggle("warning", state.remainingTime <= 5);
};

const stopTimer = () => {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
};

const persistTimeForCurrent = () => {
  const spent = state.elapsedForCurrent;
  const response = state.responses[state.currentIndex];
  response.timeSpent += spent;
  state.elapsedForCurrent = 0;
};

const handleTimeout = () => {
  persistTimeForCurrent();
  const response = state.responses[state.currentIndex];
  response.timedOut = true;
  if (response.selectedIndex === null) {
    response.status = "unanswered";
  }

  if (state.currentIndex === questionList.length - 1) {
    submitQuiz();
  } else {
    goToQuestion(state.currentIndex + 1);
  }
};

const startTimer = () => {
  stopTimer();
  state.remainingTime = timeLimit;
  state.elapsedForCurrent = 0;
  updateTimerDisplay();
  state.timerId = setInterval(() => {
    state.remainingTime -= 1;
    state.elapsedForCurrent += 1;
    updateTimerDisplay();
    if (state.remainingTime <= 0) {
      stopTimer();
      handleTimeout();
    }
  }, 1000);
};

const renderNav = () => {
  navContainer.innerHTML = "";
  state.responses.forEach((response, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = index + 1;
    button.classList.toggle("active", index === state.currentIndex);
    button.classList.toggle("answered", response.selectedIndex !== null);
    button.classList.toggle("timed-out", response.timedOut && response.selectedIndex === null);
    button.addEventListener("click", () => {
      if (state.currentIndex !== index) {
        persistTimeForCurrent();
        goToQuestion(index);
      }
    });
    navContainer.appendChild(button);
  });
};

const renderQuestion = () => {
  const currentQuestion = questionList[state.currentIndex];
  questionPrompt.textContent = currentQuestion.question;
  questionCounter.textContent = `Question ${state.currentIndex + 1} of ${questionList.length}`;
  choicesForm.innerHTML = "";

  currentQuestion.choices.forEach((choice, idx) => {
    const label = document.createElement("label");
    label.className = "choice-option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "choice";
    input.value = idx;
    input.checked = state.responses[state.currentIndex].selectedIndex === idx;
    input.addEventListener("change", () => handleChoiceSelection(idx));

    label.appendChild(input);
    label.appendChild(document.createTextNode(choice));

    if (input.checked) {
      label.classList.add("selected");
    }

    choicesForm.appendChild(label);
  });

  prevBtn.disabled = state.currentIndex === 0;
  nextBtn.disabled = state.currentIndex === questionList.length - 1;
  renderNav();
  startTimer();
};

const handleChoiceSelection = (choiceIndex) => {
  const response = state.responses[state.currentIndex];
  response.selectedIndex = choiceIndex;
  response.status = "answered";

  Array.from(choicesForm.children).forEach((child, idx) => {
    child.classList.toggle("selected", idx === choiceIndex);
  });
  renderNav();
};

const goToQuestion = (index) => {
  state.currentIndex = index;
  renderQuestion();
};

const calculateResults = () => {
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  let totalTimeSpent = 0;

  const detail = questionList.map((question, idx) => {
    const response = state.responses[idx];
    totalTimeSpent += response.timeSpent;

    let status = "Unanswered";
    if (response.selectedIndex === null) {
      unanswered += 1;
    } else if (response.selectedIndex === question.correctAnswer) {
      correct += 1;
      status = "Correct";
    } else {
      incorrect += 1;
      status = "Wrong";
    }

    return {
      question: question.question,
      choices: question.choices,
      selectedChoice: response.selectedIndex !== null ? question.choices[response.selectedIndex] : "—",
      correctChoice: question.choices[question.correctAnswer],
      timeSpent: response.timeSpent,
      status,
      timedOut: response.timedOut,
      explanation: question.explanation,
    };
  });

  const totalQuestions = questionList.length;
  const percentage = Math.round((correct / totalQuestions) * 100);

  return {
    category,
    difficulty,
    totalQuestions,
    correct,
    incorrect,
    unanswered,
    totalTimeSpent,
    percentage,
    timeLimit,
    detail,
    completedAt: new Date().toISOString(),
  };
};

const submitQuiz = () => {
  stopTimer();
  persistTimeForCurrent();
  const results = calculateResults();
  saveToSession(RESULT_KEY, results);
  window.location.href = "results.html";
};

prevBtn.addEventListener("click", () => {
  persistTimeForCurrent();
  if (state.currentIndex > 0) {
    goToQuestion(state.currentIndex - 1);
  }
});

nextBtn.addEventListener("click", () => {
  persistTimeForCurrent();
  if (state.currentIndex < questionList.length - 1) {
    goToQuestion(state.currentIndex + 1);
  }
});

submitBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to submit the quiz?")) {
    submitQuiz();
  }
});

renderQuestion();

