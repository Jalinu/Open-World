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
    const signInForm = document.getElementById('signInForm');
    const welcomeArea = document.getElementById('welcomeArea');
    const modalTitle = document.getElementById('modalTitle');
    const welcomeHeading = document.getElementById('welcomeHeading');
    const usernameInput = document.getElementById('usernameInput');
    const navSignInBtn = document.getElementById('navSignInBtn');

    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault(); // පිටුව රීෆ්‍රෙෂ් වෙන එක නවත්වනවා

            const username = usernameInput.value; // යූසර් ගහපු නම ගන්නවා

            // 1. Form එක හංගනවා
            signInForm.classList.add('d-none');
            modalTitle.classList.add('d-none'); // උඩ තියෙන "Sign In" මාතෘකාවත් හංගනවා

            // 2. Welcome මැසේජ් එකට නම එකතු කරනවා
            welcomeHeading.textContent = `Welcome to World Web, ${username}!`;

            // 3. Welcome Area එක පෙන්වනවා
            welcomeArea.classList.remove('d-none');

            // 4. (Optional) Navbar එකේ තියෙන Sign In බටන් එක "Hi, [Name]" විදිහට වෙනස් කරනවා
            if (navSignInBtn) {
                navSignInBtn.textContent = `Hi, ${username}`;
                navSignInBtn.disabled = true; // ආයේ ක්ලික් කරන්න බැරි වෙන්න දානවා
            }
        });
    }
});
