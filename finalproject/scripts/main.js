

// HAMBURGER MENU
const menuButton = document.querySelector("#menu-button");
const mainNavigation = document.querySelector("#main-navigation");

if (menuButton && mainNavigation) {
    menuButton.addEventListener("click", function () {
       
        mainNavigation.classList.toggle("menu-open");

        const menuIsOpen = mainNavigation.classList.contains("menu-open");
        menuButton.setAttribute("aria-expanded", menuIsOpen ? "true" : "false");
        menuButton.setAttribute(
            "aria-label",
            menuIsOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}

// ACTIVITY CARDS FETCH
const activityList = document.querySelector("#activity-list");
const loadMessage = document.querySelector("#load-message");
const activityDialog = document.querySelector("#activity-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogContent = document.querySelector("#dialog-content");
const closeDialogButton = document.querySelector("#close-dialog");

let favourites = JSON.parse(localStorage.getItem("spaceParkFavourites")) || [];

function saveFavourites() {
    localStorage.setItem("spaceParkFavourites", JSON.stringify(favourites));
}

function showActivityDetails(activity) {
    dialogTitle.textContent = activity.name;
    dialogContent.innerHTML = `
        <p><strong>Type:</strong> ${activity.type}</p>
        <p><strong>Place:</strong> ${activity.place}</p>
        <p><strong>Duration:</strong> ${activity.duration}</p>
        <p><strong>Description:</strong> ${activity.description}</p>
    `;
    activityDialog.showModal();
}

function displayActivities(activities) {
    activityList.innerHTML = "";

    activities.forEach(function (activity) {
        const card = document.createElement("article");
        card.classList.add("activity-card");

        const savedAlready = favourites.includes(activity.name);
        card.innerHTML = `
            <h2>${activity.name}</h2>
            <p><strong>Type:</strong> ${activity.type}</p>
            <p><strong>Place:</strong> ${activity.place}</p>
            <p><strong>Duration:</strong> ${activity.duration}</p>
            <p>${activity.description}</p>
            <button class="details-button" type="button">More details</button>
            <button class="favourite-button" type="button">
                ${savedAlready ? "Remove favourite" : "Save favourite"}
            </button>
        `;

        card.querySelector(".details-button").addEventListener("click", function () {
            showActivityDetails(activity);
        });

        card.querySelector(".favourite-button").addEventListener("click", function () {
            if (favourites.includes(activity.name)) {
                
                favourites = favourites.filter(function (name) {
                    return name !== activity.name;
                });
            } else {
                favourites.push(activity.name);
            }

            saveFavourites();
            displayActivities(activities);
        });

        activityList.append(card);
    });
}

async function loadActivities() {
 
    if (!activityList || !loadMessage) {
        return;
    }

    try {
        const response = await fetch("data/activities.json");

        if (!response.ok) {
            throw new Error("The activity data could not be loaded.");
        }

        const activities = await response.json();
        loadMessage.textContent = "Activities loaded: " + activities.length;
        displayActivities(activities);
    } catch (error) {
        loadMessage.textContent = "The activities could not load. Please open this site with a local web server.";
        console.error(error);
    }
}

if (closeDialogButton && activityDialog) {
    closeDialogButton.addEventListener("click", function () {
        activityDialog.close();
    });
}

loadActivities();
