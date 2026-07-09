document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector("h1");

  if (title) {
    title.style.opacity = "0";
    title.style.transform = "translateY(-30px)";
    title.style.transition = "opacity 1s ease, transform 1s ease";

    setTimeout(() => {
      title.style.opacity = "1";
      title.style.transform = "translateY(0)";
    }, 300);
  }

  const paragraph = document.querySelector(".lead");
  if (paragraph) {
    paragraph.style.opacity = "0";
    paragraph.style.transform = "translateY(30px)";
    paragraph.style.transition = "opacity 1s ease 0.5s, transform 1s ease 0.5s";
    setTimeout(() => {
      paragraph.style.opacity = "1";
      paragraph.style.transform = "translateY(0)";
    }, 100);
  }

  const button = document.querySelector(".btn-primary");

  if (button) {
    button.style.opacity = "0";
    button.style.transform = "scale(0.8)";
    button.style.transition = "opacity 1s ease 1s, transform 1s ease 1s";

    setTimeout(() => {
      button.style.opacity = "1";
      button.style.transform = "scale(1)";
    }, 100);
  }
  // --- Sign In Form & Welcome Message Logic ---
  const signInForm = document.getElementById("signInForm");
  const welcomeArea = document.getElementById("welcomeArea");
  const modalTitle = document.getElementById("modalTitle");
  const welcomeHeading = document.getElementById("welcomeHeading");
  const usernameInput = document.getElementById("usernameInput");
  const navSignInBtn = document.getElementById("navSignInBtn");

  if (signInForm) {
    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = usernameInput.value;

      signInForm.classList.add("d-none");
      modalTitle.classList.add("d-none");

      welcomeHeading.textContent = `Welcome to World Web, ${username}!`;

      welcomeArea.classList.remove("d-none");

      if (navSignInBtn) {
        navSignInBtn.className = "nav-link text-white fw-bold d-inline-block";

        navSignInBtn.textContent = `Hi, ${username}`;

        navSignInBtn.style.cursor = "default";
        navSignInBtn.removeAttribute("data-bs-toggle");
        navSignInBtn.removeAttribute("data-bs-target");
      }
    });
  }
});
document.getElementById("signInForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("usernameInput").value;

  document.getElementById("welcomeHeading").innerText =
    `Welcome to World Web, ${username}!`;

  document.getElementById("signInForm").classList.add("d-none");
  document.getElementById("welcomeArea").classList.remove("d-none");

  const signInBtn = document.getElementById("navSignInBtn");
  signInBtn.innerHTML = `<i class="ri-user-line"></i> Hi, ${username}`;
  signInBtn.classList.remove("btn-primary");
  signInBtn.classList.add("btn-outline-warning");
  signInBtn.disabled = true;
});
// --- QUIZ GAME CODE ---
const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
    ],
    correct: 0,
  },
  {
    question: "Which Bootstrap class is used to create a responsive grid row?",
    options: ["container", "row", "col-md-12"],
    correct: 1,
  },
  {
    question: "Which tag is used to link an external CSS file?",
    options: ["<script>", "<style>", "<link>"],
    correct: 2,
  },
];

let currentQuestion = 0;
let score = 0;

function loadQuiz() {
  const qElement = document.getElementById("quiz-question");
  const optionsContainer = document.getElementById("quiz-options");
  const nextBtn = document.getElementById("next-quiz-btn");

  optionsContainer.innerHTML = "";
  nextBtn.classList.add("d-none");

  qElement.innerText = quizData[currentQuestion].question;

  quizData[currentQuestion].options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.classList.add(
      "btn",
      "btn-outline-primary",
      "text-white",
      "py-2",
      "my-1",
    );
    btn.onclick = () => checkAnswer(index, btn);
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selectedIndex, clickedBtn) {
  const correctIndex = quizData[currentQuestion].correct;
  const allButtons = document.getElementById("quiz-options").children;

  for (let btn of allButtons) {
    btn.disabled = true;
  }

  if (selectedIndex === correctIndex) {
    clickedBtn.classList.replace("btn-outline-primary", "btn-success"); // නිවැරදි නම් කොළ පාට
    score++;
  } else {
    clickedBtn.classList.replace("btn-outline-primary", "btn-danger"); // වැරදි නම් රතු පාට
    allButtons[correctIndex].classList.replace(
      "btn-outline-primary",
      "btn-success",
    ); // නිවැරදි එක කොළ පාට කර පෙන්වයි
  }

  document.getElementById("next-quiz-btn").classList.remove("d-none");
}

document.getElementById("next-quiz-btn").onclick = () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuiz();
  } else {
    document.getElementById("quiz-question").classList.add("d-none");
    document.getElementById("quiz-options").classList.add("d-none");
    document.getElementById("next-quiz-btn").classList.add("d-none");

    const resultDiv = document.getElementById("quiz-result");
    resultDiv.classList.remove("d-none");
    document.getElementById("quiz-score").innerText =
      `You scored ${score} out of ${quizData.length}!`;
  }
};

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("quiz-question").classList.remove("d-none");
  document.getElementById("quiz-options").classList.remove("d-none");
  document.getElementById("quiz-result").classList.add("d-none");
  loadQuiz();
}

loadQuiz();
// --- BACK TO TOP BUTTON LOGIC ---

const backToTopBtn = document.getElementById("backToTopBtn");

// Show the button when the user scrolls down 300px from the top
window.onscroll = function () {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    backToTopBtn.classList.remove("d-none"); // Show button
  } else {
    backToTopBtn.classList.add("d-none"); // Hide button
  }
};

// Scroll to the top of the page smoothly when the button is clicked
backToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
