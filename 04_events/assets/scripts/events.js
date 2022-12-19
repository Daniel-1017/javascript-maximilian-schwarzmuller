const button = document.querySelector("button");

const buttonClickHandler = () => console.log("Hello World!");

const boundFn = buttonClickHandler.bind(this);

button.addEventListener("click", boundFn);

setTimeout(() => button.removeEventListener("click", boundFn), 2000);
