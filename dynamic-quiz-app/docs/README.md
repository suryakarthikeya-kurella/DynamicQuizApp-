# Dynamic Quiz Application

Responsive, production-ready quiz platform powered by vanilla HTML, CSS, and JavaScript with an optional PHP wrapper for local servers. No backend database is required; quizzes run entirely on the client with state persisted in `sessionStorage`.

## Features

- Multiple categories (Math, General Knowledge, Science) and difficulty levels.
- Per-question countdown timer with automatic submission on timeout.
- Dynamic navigation with previous/next controls and jump-to-question panel.
- Client-side scoring, per-question analytics, and detailed review mode.
- Chart.js visualizations for accuracy and time spent per question.
- Responsive UI tuned for mobile, tablet, and desktop.

## Getting Started

### Option 1: Open directly

1. Navigate to `public/index.html`.
2. Open the file in your browser. All assets load relatively, so no server is necessary.

### Option 2: Run through XAMPP / Apache

1. Copy the `dynamic-quiz-app` folder into your web root (e.g., `htdocs`).
2. Start Apache.
3. Visit `http://localhost/dynamic-quiz-app/server/index.php`.
4. The PHP wrapper will load `public/index.html`.

## Folder Structure

```
dynamic-quiz-app/
 ├─ public/
 │   ├─ index.html
 │   ├─ quiz.html
 │   ├─ results.html
 │   ├─ assets/css/style.css
 │   ├─ assets/js/utils.js
 │   ├─ assets/js/questions.js
 │   ├─ assets/js/quiz.js
 │   ├─ assets/js/results.js
 │   └─ vendor/chart.min.js
 ├─ server/index.php
 ├─ docs/README.md
 └─ .gitignore
```

## Customization Guide

### Adding or Updating Questions

1. Open `public/assets/js/questions.js`.
2. Locate the category and difficulty you want to change.
3. Add a new object with `id`, `question`, `choices`, `correctAnswer`, and `explanation`.
4. Keep `correctAnswer` aligned with the array index of the right choice.
5. Save the file; the new questions will be available instantly.

### Adjusting the Timer

- The default timer is 30 seconds per question.
- On the landing page you can set the time between 10 and 120 seconds before starting the quiz.
- To enforce a new default, update the `value` attribute in `public/index.html` and/or tweak logic inside `quiz.js`.

### How Scoring Works

1. Each answer is stored client-side as you interact with the quiz.
2. On submission (manual or forced at the end), `quiz.js` compares each choice to the correct answer.
3. A detailed result payload with statuses, timestamps, and explanations is saved to `sessionStorage`.
4. `results.js` reads that payload, renders tables, and feeds Chart.js visualizations.

### Charts & Analytics

- The bar chart plots time spent on each question (seconds).
- The doughnut chart shows the ratio of correct, wrong, and unanswered items.
- `public/vendor/chart.min.js` loads the official Chart.js 4.4 UMD build from jsDelivr on demand.
- Update colors or behavior directly in `public/assets/js/results.js`.

## Screenshots

Replace these placeholders with actual captures when available:

- `docs/screenshots/landing.png` – Landing page
- `docs/screenshots/quiz.png` – Quiz in progress
- `docs/screenshots/results.png` – Results & analytics

## License

This project is provided as-is for educational use. Adapt freely to suit your needs.

