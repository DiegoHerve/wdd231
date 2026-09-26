async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();
        const qualifiedMembers = members.filter(
        member =>
            member.membershipLevel === 2 ||
            member.membershipLevel === 3
    );

    const shuffled = qualifiedMembers.sort(
        () => Math.random() - 0.5
    );

    displaySpotlights(shuffled.slice(0, 3));

} catch (error) {
    console.error("Error loading members:", error);
}
}
function displaySpotlights(members) {
    const container = document.querySelector("#spotlight-container");
container.innerHTML = "";

members.forEach(member => {
    const card = document.createElement("article");

    const membership =
        member.membershipLevel === 3
            ? "Gold"
            : "Silver";

    card.classList.add("spotlight-card");

    card.innerHTML = `
        <img
            src="images/${member.image}"
            alt="${member.name} logo"
            loading="lazy"
        >
        <h3>${member.name}</h3>
        <p>${member.description}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Membership:</strong> ${membership}</p>
        <a
            href="${member.website}"
            target="_blank"
            rel="noopener noreferrer"
        >
            Visit Website
        </a>
    `;

    container.appendChild(card);
});
}
const API_KEY = "3583533b7133c964d42af153f78dabbb";
const LATITUDE = -18.8792;
const LONGITUDE = 47.5079;
async function getCurrentWeather() {
    try {
        const response = await fetch(
           `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`
        );
 const data = await response.json();

    document.querySelector("#weather-current").innerHTML = `
        <p>
            <strong>Temperature:</strong>
            ${Math.round(data.main.temp)}°C
        </p>
        <p>
            <strong>Weather:</strong>
            ${data.weather[0].description}
        </p>
    `;

} catch (error) {
    console.error("Error loading weather:", error);
}
}
async function getForecast() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`
        );
    const data = await response.json();

    const container =
        document.querySelector("#weather-forecast");

    container.innerHTML = "";

    const days = {};

    data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];

        if (!days[date]) {
            days[date] = item;
        }
    });

    Object.values(days).slice(0, 3).forEach(day => {
        const date = new Date(day.dt * 1000);

        const dayName = date.toLocaleDateString(
            "en-US",
            { weekday: "long" }
        );

        const card = document.createElement("div");

        card.classList.add("forecast-card");

        card.innerHTML = `
            <h4>${dayName}</h4>
            <p>${Math.round(day.main.temp)}°C</p>
            <p>${day.weather[0].description}</p>
        `;

        container.appendChild(card);
    });

} catch (error) {
    console.error("Error loading forecast:", error);
}

}
getSpotlights();
getCurrentWeather();
getForecast();