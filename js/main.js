document.addEventListener("DOMContentLoaded", () => {
  // --- Text Animations ---
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
      if (modalTitle) modalTitle.classList.add("d-none");

      welcomeHeading.textContent = `Welcome to World Web, ${username}!`;
      welcomeArea.classList.remove("d-none");

      if (navSignInBtn) {
        navSignInBtn.className = "nav-link text-white fw-bold d-inline-block";
        navSignInBtn.innerHTML = `<i class="ri-user-line"></i> Hi, ${username}`;
        navSignInBtn.style.cursor = "default";
        navSignInBtn.removeAttribute("data-bs-toggle");
        navSignInBtn.removeAttribute("data-bs-target");
      }
    });
  }

  // --- QUIZ GAME CODE WITH SAFETY CHECKS ---
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
      question:
        "Which Bootstrap class is used to create a responsive grid row?",
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

  // Check if quiz elements exist on the current page before running quiz logic
  const qElement = document.getElementById("quiz-question");
  const optionsContainer = document.getElementById("quiz-options");
  const nextBtn = document.getElementById("next-quiz-btn");

  if (qElement && optionsContainer && nextBtn) {
    function loadQuiz() {
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
      const allButtons = optionsContainer.children;

      for (let btn of allButtons) {
        btn.disabled = true;
      }

      if (selectedIndex === correctIndex) {
        clickedBtn.classList.replace("btn-outline-primary", "btn-success");
        score++;
      } else {
        clickedBtn.classList.replace("btn-outline-primary", "btn-danger");
        allButtons[correctIndex].classList.replace(
          "btn-outline-primary",
          "btn-success",
        );
      }
      nextBtn.classList.remove("d-none");
    }

    nextBtn.onclick = () => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuiz();
      } else {
        qElement.classList.add("d-none");
        optionsContainer.classList.add("d-none");
        nextBtn.classList.add("d-none");

        const resultDiv = document.getElementById("quiz-result");
        if (resultDiv) resultDiv.classList.remove("d-none");
        document.getElementById("quiz-score").innerText =
          `You scored ${score} out of ${quizData.length}!`;
      }
    };

    // Global restart function
    window.restartQuiz = function () {
      currentQuestion = 0;
      score = 0;
      qElement.classList.remove("d-none");
      optionsContainer.classList.remove("d-none");
      const resultDiv = document.getElementById("quiz-result");
      if (resultDiv) resultDiv.classList.add("d-none");
      loadQuiz();
    };

    loadQuiz();
  }

  // --- BACK TO TOP BUTTON LOGIC FOR HOME PAGE ---
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    window.onscroll = function () {
      if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
      ) {
        backToTopBtn.classList.remove("d-none");
      } else {
        backToTopBtn.classList.add("d-none");
      }
    };

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
