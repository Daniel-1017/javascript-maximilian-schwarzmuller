// const buttons = document.querySelectorAll("button");
const div = document.querySelector("div");
const button = document.querySelector("button");
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

div.addEventListener("click", (event) => {
  console.log("DIV CLICKED");
});

button.addEventListener("click", (event) => {
  event.stopPropagation();
  console.log("BUTTON CLICKED");
});

const ul = document.querySelector("ul");
// const lis = document.querySelectorAll("li");

// lis.forEach((li) => {
//   li.addEventListener("click", (e) => {
//     e.target.classList.toggle("active");
//   });
// });

// USING EVENT DELEGATION
ul.addEventListener("click", (e) => {
  e.target.closest("li").classList.toggle("active");
});
