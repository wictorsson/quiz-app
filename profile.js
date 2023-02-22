const bodyElement = document.querySelector('[data-js="body"]');
const toggleMode = document.querySelector("#darkmode-switch");

toggleMode.addEventListener("change", () => {
  bodyElement.classList.add("dark");
  console.log("Test");
});
