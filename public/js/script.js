const burgerBtn = document.querySelector("header nav button");
const mobileNav = document.querySelector("header nav ul");

burgerBtn.addEventListener("click", () => {
    burgerBtn.classList.toggle("showMenu");
    mobileNav.classList.toggle("showMenu");


});