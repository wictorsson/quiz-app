const mainElement = document.querySelector('[data-js="main"]');

const questionCards = document.querySelectorAll(".question-card");
const answerButtonElement = document.querySelectorAll(
  ".question-card--answer-button"
);
const answerTextElement = document.querySelectorAll(
  ".question-card--answer-text"
);

// for (var i = 0; i < answerButtonElement.length; i++) {
answerButtonElement.forEach((button) => {
  button.addEventListener("click", () => {
    const answerText = button.nextElementSibling;
    answerText.classList.toggle("hidden");

    if (button.textContent === "Show Answer") {
      button.textContent = "Hide Answer";
      answerTextElement.textContent = "Flex-direction";
    } else if ((button.textContent = "Hide Answer")) {
      button.textContent = "Show Answer";
      answerTextElement.textContent = "";
    }
  });
});
