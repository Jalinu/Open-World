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
});
