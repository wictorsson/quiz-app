const mainElement = document.querySelector('[data-js="main"]');
const bodyElement = document.querySelector('[data-js="body"]');
const darkModeToggle = document.querySelector("#darkmode-switch");
//let darkModeState;

const answerButtonElement = document.querySelectorAll(
  ".question-card--answer-button"
);
const answerTextElement = document.querySelectorAll(
  ".question-card--answer-text"
);
const bookmarkElement = document.querySelectorAll(".question-card--bookmark");

for (let i = 0; i < answerButtonElement.length; i++) {
  answerButtonElement[i].addEventListener("click", () => {
    answerTextElement[i].classList.toggle("hidden");

    if (answerButtonElement[i].textContent === "Show Answer") {
      answerButtonElement[i].textContent = "Hide Answer";
    } else if ((answerButtonElement[i].textContent = "Hide Answer")) {
      answerButtonElement[i].textContent = "Show Answer";
    }
  });
}

for (let i = 0; i < bookmarkElement.length; i++) {
  bookmarkElement[i].addEventListener("click", () => {
    //console.log(i);
    if (bookmarkElement[i].getAttribute("src") === "./assets/bookmark.png") {
      bookmarkElement[i].setAttribute("src", "./assets/bookmark_filled.png");
    } else {
      bookmarkElement[i].setAttribute("src", "./assets/bookmark.png");
    }
  });
}

//let darkModeState = "darkMode";

if (darkModeToggle) {
  darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
      bodyElement.classList.add("dark");
      localStorage.setItem("darkMode", true);
      console.log(localStorage.getItem("darkMode"));
    } else {
      bodyElement.classList.remove("dark");
      localStorage.setItem("darkMode", false);
      console.log(localStorage.getItem("darkMode"));
    }
  });
}

if (localStorage.getItem("darkMode") == "true") {
  bodyElement.classList.add("dark");
  console.log("added");
} else {
  bodyElement.classList.remove("dark");
}

/*
answerButtonElement.forEach((button, i) => {
  button.addEventListener("click", () => {
    // const answerText = button.nextElementSibling;
    answerTextElement[i].classList.toggle("hidden");

    if (button.textContent === "Show Answer") {
      button.textContent = "Hide Answer";
      answerTextElement.textContent = "Flex-direction";
    } else if ((button.textContent = "Hide Answer")) {
      button.textContent = "Show Answer";
      answerTextElement.textContent = "";
    }
  });
});
*/
