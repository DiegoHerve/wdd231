



const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

document.querySelector("#current-year").textContent = new Date().getFullYear();

document.querySelector("#last-modified").textContent = document.lastModified;

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const members = await response.json();

        displayMembers(members);
    } catch (error) {
        console.error("Unable to load member data:", error);

        membersContainer.innerHTML = `
            <p class="error-message">
                Sorry, the business directory could not be loaded.
            </p>
        `;
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");
        card.classList.add("member-card");

        const membershipName = getMembershipName(member.membershipLevel);

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy"
            >

            <h2>${member.name}</h2>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>
                <a href="${member.website}" target="_blank" rel="noopener">
                    Visit Website
                </a>
            </p>

            <p>${member.description}</p>

            <span class="membership-level">
                ${membershipName}
            </span>
        `;

        membersContainer.appendChild(card);
    });
}

function getMembershipName(level) {
    switch (Number(level)) {
        case 3:
            return "Gold Member";

        case 2:
            return "Silver Member";

        case 1:
            return "Member";

        default:
            return "Member";
    }
}

gridButton.addEventListener("click", () => {
    membersContainer.classList.remove("members-list");
    membersContainer.classList.add("members-grid");

    gridButton.classList.add("view-active");
    listButton.classList.remove("view-active");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.remove("members-grid");
    membersContainer.classList.add("members-list");

    listButton.classList.add("view-active");
    gridButton.classList.remove("view-active");
});


menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-label", isOpen
        ? "Close navigation menu"
        : "Open navigation menu"
    );

    menuButton.setAttribute("aria-expanded", isOpen);
});

getMembers();


















