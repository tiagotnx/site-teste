import { phoneMask } from "./masks";

const inputTel = document.querySelector("#tel");
const form = document.querySelector("form");

const handleInput = (e) => {
    e.target.value = phoneMask(e.target.value);
};

inputTel.addEventListener("input", handleInput, false);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.reset();
});
