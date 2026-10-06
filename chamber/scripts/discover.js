import { places } from "../data/discover.mjs";

const grid = document.querySelector("#discover-grid");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

function displayPlaces() {
    grid.innerHTML = "";

    places.forEach((place, index) => {
        const card = document.createElement("article");
        card.classList.add("discover-card", `card-${index + 1}`);

        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img src="images/${place.image}" alt="${place.name}" loading="lazy">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button type="button">Learn More</button>
        `;

        grid.appendChild(card);
    });
}

function showVisitMessage() {
    const message = document.querySelector("#visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        message.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const difference = now - Number(lastVisit);
        const oneDay = 24 * 60 * 60 * 1000;

        if (difference < oneDay) {
            message.textContent = "Back so soon! Awesome!";
        } else {
            const days = Math.floor(difference / oneDay);
            const word = days === 1 ? "day" : "days";
            message.textContent = `You last visited ${days} ${word} ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);
}

displayPlaces();
showVisitMessage();
