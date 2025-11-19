import { formatTime, getFromSession, removeFromSession, ensureSessionKeys } from "./utils.js";

const RESULT_KEY = "quizResults";

if (!ensureSessionKeys([RESULT_KEY], "index.html")) {
  throw new Error("Missing quiz results.");
}

const data = getFromSession(RESULT_KEY);

const summaryGrid = document.getElementById("summaryGrid");
const resultMeta = document.getElementById("resultMeta");
const resultsBody = document.getElementById("resultsBody");
const reviewPanel = document.getElementById("reviewPanel");
const reviewSection = document.getElementById("reviewSection");
const reviewToggle = document.getElementById("reviewToggle");
const retakeQuiz = document.getElementById("retakeQuiz");

resultMeta.textContent = `${data.category} • ${data.difficulty.toUpperCase()} • Score ${data.percentage}%`;

const buildSummary = () => {
  const summaryItems = [
    { label: "Correct", value: data.correct, accent: "status-correct" },
    { label: "Incorrect", value: data.incorrect, accent: "status-wrong" },
    { label: "Unanswered", value: data.unanswered, accent: "status-unanswered" },
    { label: "Total Time", value: formatTime(data.totalTimeSpent) },
    { label: "Questions", value: data.totalQuestions },
    { label: "Percentage", value: `${data.percentage}%` },
  ];

  summaryGrid.innerHTML = summaryItems
    .map(
      (item) => `
        <article class="summary-card">
          <strong>${item.value}</strong>
          <span class="${item.accent ?? ""}">${item.label}</span>
        </article>
      `,
    )
    .join("");
};

const buildTable = () => {
  resultsBody.innerHTML = data.detail
    .map(
      (row, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td>${row.question}</td>
          <td>${row.selectedChoice}</td>
          <td>${row.correctChoice}</td>
          <td>${formatTime(row.timeSpent)}</td>
          <td><span class="status-tag ${
            row.status === "Correct" ? "status-correct" : row.status === "Wrong" ? "status-wrong" : "status-unanswered"
          }">${row.status}</span></td>
        </tr>
      `,
    )
    .join("");
};

const buildReview = () => {
  reviewPanel.innerHTML = data.detail
    .map(
      (row, idx) => `
        <article class="review-item">
          <h3>Question ${idx + 1}</h3>
          <p>${row.question}</p>
          <p><strong>Correct:</strong> ${row.correctChoice}</p>
          <p><strong>Your answer:</strong> ${row.selectedChoice}</p>
          <p><strong>Time spent:</strong> ${formatTime(row.timeSpent)} ${row.timedOut ? "(timed out)" : ""}</p>
          <p><strong>Status:</strong> ${row.status}</p>
          <p><strong>Explanation:</strong> ${row.explanation}</p>
        </article>
      `,
    )
    .join("");
};

const waitForChart = () =>
  new Promise((resolve, reject) => {
    if (window.Chart) {
      resolve(window.Chart);
      return;
    }
    const timeout = setTimeout(() => {
      clearInterval(poller);
      reject(new Error("Chart.js failed to load"));
    }, 7000);
    const poller = setInterval(() => {
      if (window.Chart) {
        clearInterval(poller);
        clearTimeout(timeout);
        resolve(window.Chart);
      }
    }, 50);
  });

const renderCharts = () => {
  const timeCtx = document.getElementById("timeChart").getContext("2d");
  const accuracyCtx = document.getElementById("accuracyChart").getContext("2d");

  new Chart(timeCtx, {
    type: "bar",
    data: {
      labels: data.detail.map((_, idx) => `Q${idx + 1}`),
      datasets: [
        {
          label: "Seconds spent",
          data: data.detail.map((row) => row.timeSpent),
          backgroundColor: "#2563eb",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Seconds" },
        },
      },
    },
  });

  new Chart(accuracyCtx, {
    type: "doughnut",
    data: {
      labels: ["Correct", "Wrong", "Unanswered"],
      datasets: [
        {
          data: [data.correct, data.incorrect, data.unanswered],
          backgroundColor: ["#22c55e", "#ef4444", "#eab308"],
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: "bottom",
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};

reviewToggle.addEventListener("click", () => {
  reviewSection.classList.toggle("hidden");
  reviewToggle.textContent = reviewSection.classList.contains("hidden") ? "Review Quiz" : "Hide Review";
});

retakeQuiz.addEventListener("click", () => {
  removeFromSession(RESULT_KEY);
  window.location.href = "index.html";
});

buildSummary();
buildTable();
buildReview();
waitForChart()
  .then(renderCharts)
  .catch((error) => console.error(error));

