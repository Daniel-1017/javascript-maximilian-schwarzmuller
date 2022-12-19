const buttons = document.querySelectorAll("button");

const buttonClickHandler = (event) => {
  event.target.disabled = true;
  console.log("Hello World!", event);
};

buttons.forEach((btn) => btn.addEventListener("click", buttonClickHandler));
