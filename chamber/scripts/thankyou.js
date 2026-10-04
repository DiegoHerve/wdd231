const information = new URLSearchParams(window.location.search);

document.querySelector("#first-name").textContent = information.get("firstName");
document.querySelector("#last-name").textContent = information.get("lastName");
document.querySelector("#email").textContent = information.get("email");
document.querySelector("#phone").textContent = information.get("phone");
document.querySelector("#organization").textContent = information.get("organization");
document.querySelector("#timestamp").textContent = information.get("timestamp");