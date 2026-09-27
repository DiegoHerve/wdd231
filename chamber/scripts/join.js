const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

document.querySelector("#timestamp").value = new Date().toISOString();

const links = document.querySelectorAll(".level-card a");
const closeButtons = document.querySelectorAll(".close-modal");

links.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const modalId = link.getAttribute("href").substring(1);
        document.querySelector(`#${modalId}`).showModal();
    });
});

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.parentElement.close();
    });
});
