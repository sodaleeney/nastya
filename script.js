const screens = document.querySelectorAll(".screen");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const musicBtn = document.getElementById("music-btn");
const song = document.getElementById("birthday-song");

// Конфетти
function party() {
  confetti({
    particleCount: 140,
    spread: 80,
    origin: { y: 0.6 },
    colors: ["#ff5c8a", "#ffd166", "#8ecae6", "#c77dff"]
  });
}

// Конфетти при открытии сайта
window.addEventListener("load", () => {
  setTimeout(party, 500);
});

// Счётчик «мы знакомы уже X дней»
const friendshipStart = new Date("2023-08-10"); // поставь свою дату
const today = new Date();
const days = Math.floor((today - friendshipStart) / (1000 * 60 * 60 * 24));
document.getElementById("known-days").textContent =
  `Мы знакомы уже ${days} дней 💫`;

// Навигация между экранами
document.querySelectorAll("[data-target]").forEach(button => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    screens.forEach(screen => screen.classList.remove("active"));
    document.getElementById(targetId).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (targetId !== "start") party();
  });
});

// Кнопка Yes
yesBtn.addEventListener("click", () => {
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById("folders").classList.add("active");
  party();
  setTimeout(party, 400);
  setTimeout(party, 800);
});

// Убегающая кнопка No
const noTexts = [
  "Нет 😌",
  "Ты уверена?",
  "Неа 🙈",
  "Подумай ещё…",
  "Так нельзя!",
  "Только Yes 💖",
  "Ладно, нажми Yes"
];

let noIndex = 0;

function escapeNo() {
  noIndex = (noIndex + 1) % noTexts.length;
  noBtn.textContent = noTexts[noIndex];

  const x = (Math.random() - 0.5) * 220;
  const y = (Math.random() - 0.5) * 120;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

noBtn.addEventListener("mouseenter", escapeNo);
noBtn.addEventListener("touchstart", escapeNo);

// Музыка
let musicOn = false;

musicBtn.addEventListener("click", () => {
  musicOn = !musicOn;

  if (musicOn) {
    song.play();
    musicBtn.textContent = "⏸️ Pause song";
  } else {
    song.pause();
    musicBtn.textContent = "🎵 Play birthday song";
  }
});

// Викторина
const quiz = [
  {
    question: "какую фразу ты используешь чаще всего в нашем чате?",
    answers: ["«Окак»", "«Капец»", "«пу пу пу»"],
    correct: 0
  },
  {
    question: "мэны",
    answers: ["кринж", "угар", "норм"],
    correct: 0
  },
  {
    question: "продолжи: 'Капец, я люблю качели'",
    answers: [ "но бесплатные","но не эмоциональные", "но капец блин"],
    correct: 1
  },
  {
    question: "кто сказал: 'насть во скажи, то что я сказала христос воскрес по середине видео, это считается богохульством?'",
    answers: ["Рита", "Алёна", "Аня"],
    correct: 2
  },
  {
    question: "кто сказал: 'капец вы мне вибратор устроили. я сижу тест пишу, телефон под куртокй рядом. жужжит каждые 5 секунд'",
    answers: ["Настя", "Алёна", "Рита"],
    correct: 0
  },
  {
    question: "какого числа был создан наш чат?",
    answers: ["20 мая", "25 июня", "18 июня"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  const question = quiz[currentQuestion];
  document.getElementById("quiz-question").textContent = question.question;

  const answersBox = document.getElementById("quiz-answers");
  answersBox.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = answer;

    btn.addEventListener("click", () => {
      if (index === question.correct) {
        score++;
        btn.style.background = "#b7f5c4";
      } else {
        btn.style.background = "#ffc9c9";
      }

      setTimeout(() => {
        currentQuestion++;

        if (currentQuestion < quiz.length) {
          showQuestion();
        } else {
          document.getElementById("quiz-question").textContent =
            "Твой результат:";
          answersBox.innerHTML = "";

          let resultText = "";

          if (score === quiz.length) {
            resultText = `${score}/${quiz.length} — ты знаешь нас идеально 💖`;
          } else if (score >= quiz.length / 2) {
            resultText = `${score}/${quiz.length} — неплохо, но есть что вспомнить 😌`;
          } else {
            resultText = `${score}/${quiz.length} — срочно нужна ещё одна тусовка 😭`;
          }

          document.getElementById("quiz-result").textContent = resultText;
          party();
        }
      }, 700);
    });

    answersBox.appendChild(btn);
  });
}

showQuestion();

document.querySelectorAll(".reason").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});