import "./styles/global.scss";
import layoutHeader from "./components/header.html?raw";
import layoutFooter from "./components/footer.html?raw";
import { closeMenu, openMenu } from "./ts/navbar";

//carrega componentes

const header = document.querySelector("header")!;
const footer = document.querySelector("footer")!;

header.innerHTML = layoutHeader;
footer.innerHTML = layoutFooter;

//interação com header responsivo

const btnOpen = document.querySelector("#btn-open");
const links = document.querySelectorAll(`
  .overlay,
  .header nav ul li a,
  #btn-close
`);

btnOpen.addEventListener("click", openMenu);
links.forEach((link) => link.addEventListener("click", closeMenu));
