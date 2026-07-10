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

  // --- Sign In Form Logic ---
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
        navSignInBtn.removeAttribute("data-bs-toggle");
        navSignInBtn.removeAttribute("data-bs-target");
      }
    });
  }

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

  // --- BACK TO TOP BUTTON LOGIC ---
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- DARK / LIGHT MODE LOGIC ---
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");
  const htmlTag = document.documentElement;

  const savedTheme = localStorage.getItem("theme") || "dark";
  htmlTag.setAttribute("data-bs-theme", savedTheme);
  updateToggleIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlTag.getAttribute("data-bs-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      htmlTag.setAttribute("data-bs-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateToggleIcon(newTheme);
    });
  }

  function updateToggleIcon(theme) {
    if (!themeIcon) return;
    if (theme === "light") {
      themeIcon.className = "ri-moon-line";
    } else {
      themeIcon.className = "ri-sun-line";
    }
  }
});
