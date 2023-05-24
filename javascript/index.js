import { questionListFile } from "./questions.js";

const bodyElement = document.querySelector('[data-js="body"]');
const bookmarkBodyPage = document.querySelector(".bookmark-body");
const darkModeToggle = document.querySelector("#darkmode-switch");

// SET form variables
const form = document.querySelector('[data-js="form"]');
const questionElement = document.querySelector('[data-js="questionMessage"]');
const amountLeftQuestion = document.querySelector(
  '[data-js="amountLeftQuestion"]'
);
const answerElement = document.querySelector('[data-js="answerMessage"]');
const amountLeftAnswer = document.querySelector('[data-js="amountLeftAnswer"]');
const main = document.querySelector('[data-js="main"]');

var questionList;

if (bookmarkBodyPage) {
  questionList = questionListFile.filter(function (obj, index) {
    const bookmarkIndex = localStorage.getItem("bookMarkindex" + index);

    return bookmarkIndex === "true";
  });
  if (questionList.length < 1) {
    const main = document.querySelector('[data-js="main"]');
    const cardSection = document.createElement("section");
    main.append(cardSection);
    cardSection.className = "question-card";
    const questionParagraph = document.createElement("p");
    cardSection.append("You don't have any bookmarks");
  }
} else {
  questionList = [...questionListFile];
}

// Create question cards
if (main) {
  questionList.forEach((card, index) => {
    const main = document.querySelector('[data-js="main"]');
    const cardSection = document.createElement("section");
    main.append(cardSection);
    cardSection.className = "question-card";
    const questionParagraph = document.createElement("p");
    cardSection.append(questionParagraph);

    if (!bookmarkBodyPage) {
      const bookmarkArea = document.createElement("a");
      cardSection.append(bookmarkArea);

      const bookmarkImage = document.createElement("img");
      bookmarkArea.append(bookmarkImage);
      bookmarkImage.className = "question-card--bookmark";
      bookmarkImage.src = "./assets/bookmark.png";
    }
    //GET question text by classname
    questionParagraph.textContent = questionList[index].question;

    const answerButton = document.createElement("button");
    cardSection.append(answerButton);
    answerButton.className = "question-card--answer-button";
    answerButton.textContent = "Show Answer";

    const answerParagraph = document.createElement("p");
    cardSection.append(answerParagraph);
    //GET answer text by classname
    answerParagraph.textContent = questionList[index].answer;
    answerParagraph.className = "question-card--answer-text answer--hidden";

    if (card.hasOwnProperty("tags")) {
      // Accessing the 'tags' property
      const tags = card.tags;
      const tagList = document.createElement("ul");
      cardSection.append(tagList);
      tagList.className = "question-card--categories-list";
      tags.forEach((tag) => {
        const tagElement = document.createElement("li");
        tagList.append(tagElement);
        tagElement.className = "question-card--categories-list--item";
        tagElement.textContent = tag;
      });
    }
  });
}

//Char counter
if (questionElement || answerElement) {
  const maxLength = questionElement.getAttribute("maxlength");
  amountLeftQuestion.innerText = maxLength - questionElement.value.length;
  amountLeftAnswer.innerText = maxLength - answerElement.value.length;

  questionElement.addEventListener("input", () => {
    amountLeftQuestion.innerText = maxLength - questionElement.value.length;
  });
  answerElement.addEventListener("input", () => {
    amountLeftAnswer.innerText = maxLength - answerElement.value.length;
  });
}

// SET darkmode to the current page on load
if (localStorage.getItem("darkMode") == "true") {
  bodyElement.classList.add("dark");
} else {
  bodyElement.classList.remove("dark");
}

// Attach add listeners
ResetAnswerButton();
ResetBookmark();

//SET bookmark icon filled/unfilled on load
const bookmarkElement = document.querySelectorAll(".question-card--bookmark");
console.log(bookmarkElement.length);
for (let i = 0; i < bookmarkElement.length; i++) {
  console.log("FILL");
  if (localStorage.getItem("bookMarkindex" + i) === "true") {
    bookmarkElement[i].setAttribute("src", "./assets/bookmark_filled.png");
    if (bookmarkBodyPage) {
      bookmarkElement[i].parentNode.classList.add("hidden");
    }
  } else {
    bookmarkElement[i].setAttribute("src", "./assets/bookmark.png");
    //Check if we are on the bookmark page
    if (bookmarkBodyPage) {
      bookmarkElement[i].parentNode.parentNode.classList.add("hidden");
      bookmarkElement[i].parentNode.classList.add("hidden");
    }
  }
}

function ResetBookmark() {
  const bookmarkElement = document.querySelectorAll(".question-card--bookmark");
  for (let i = 0; i < bookmarkElement.length; i++) {
    bookmarkElement[i].addEventListener("click", () => {
      if (bookmarkElement[i].getAttribute("src") === "./assets/bookmark.png") {
        bookmarkElement[i].setAttribute("src", "./assets/bookmark_filled.png");
        let bookMarkCounter = localStorage.getItem("bookMarkCounter");
        bookMarkCounter = Number(bookMarkCounter) + 1;
        localStorage.setItem("bookMarkindex" + i, "true");
        console.log(localStorage.getItem("bookMarkindex" + i));
        localStorage.setItem("bookMarkCounter", bookMarkCounter);
      } else {
        bookmarkElement[i].setAttribute("src", "./assets/bookmark.png");
        let bookMarkCounter = localStorage.getItem("bookMarkCounter");
        bookMarkCounter = Number(bookMarkCounter) - 1;
        localStorage.setItem("bookMarkCounter", bookMarkCounter);
        localStorage.setItem("bookMarkindex" + i, "false");
      }
    });
  }
}

//SHOW & hide answer
function ResetAnswerButton() {
  //GET the elements
  const answerButtonElement = document.querySelectorAll(
    ".question-card--answer-button"
  );
  const answerTextElement = document.querySelectorAll(
    ".question-card--answer-text"
  );

  for (let i = 0; i < answerButtonElement.length; i++) {
    answerButtonElement[i].addEventListener("click", () => {
      answerTextElement[i].classList.toggle("answer--hidden");

      if (answerButtonElement[i].textContent === "Show Answer") {
        answerButtonElement[i].textContent = "Hide Answer";
      } else if ((answerButtonElement[i].textContent = "Hide Answer")) {
        answerButtonElement[i].textContent = "Show Answer";
      }
    });
  }
}

//TOGGLE Checkbox Darkmode
if (darkModeToggle) {
  darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
      bodyElement.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      bodyElement.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // ADD to the DOM
    const cardSection = document.createElement("section");

    cardSection.className = "question-card";
    const main = document.querySelector('[data-js="form-main"]');

    main.append(cardSection);

    const questionParagraph = document.createElement("p");
    cardSection.append(questionParagraph);
    //GET question text by classname
    questionParagraph.textContent = data["your-question"];

    const answerButton = document.createElement("button");
    cardSection.append(answerButton);
    answerButton.className = "question-card--answer-button";
    answerButton.textContent = "Your Answer";

    const answerParagraph = document.createElement("p");
    cardSection.append(answerParagraph);
    //GET answer text by classname
    answerParagraph.textContent = data["your-answer"];
    answerParagraph.className = "question-card--answer-text answer--hidden";

    const tagList = document.createElement("ul");
    cardSection.append(tagList);
    tagList.className = "question-card--categories-list";

    const tagElement = document.createElement("li");
    tagList.append(tagElement);
    tagElement.className = "question-card--categories-list--item";
    tagElement.textContent = data["tags"];

    ResetAnswerButton();
    ResetBookmark();
  });
}
