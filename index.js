const mainElement = document.querySelector('[data-js="main"]');
console.log(mainElement);
mainElement.classList.add("dark");

const answerButtonElement = document.querySelector("#answer-button");
const answerTextElement = document.querySelector("#answer-text");

answerButtonElement.addEventListener("click", function (event) {
  if (answerButtonElement.textContent === "Show Answer") {
    answerButtonElement.textContent = "Hide Answer";
    answerTextElement.textContent = "Flex-direction";
  } else if ((answerButtonElement.textContent = "Hide Answer")) {
    answerButtonElement.textContent = "Show Answer";
    answerTextElement.textContent = "";
  }
});
