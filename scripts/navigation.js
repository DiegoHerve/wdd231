

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");
menuButton.addEventListener("click", () => {
const isOpen = navigation.classList.toggle("open");
menuButton.setAttribute("aria-expanded", isOpen);
menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation"
);
});



















