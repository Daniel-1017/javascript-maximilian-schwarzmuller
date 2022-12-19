// const buttons = document.querySelectorAll("button");
const form = document.querySelector("form");

const buttonClickHandler = (event) => {
  event.target.disabled = true;
  console.log("Hello World!", event);
};

// buttons.forEach((btn) => btn.addEventListener("click", buttonClickHandler));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Submited");
});
