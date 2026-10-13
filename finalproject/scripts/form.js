
const formDetails = document.querySelector("#form-details");
const submittedData = new URLSearchParams(window.location.search);

const fields = [
    ["Full name", "name"],
    ["Email address", "email"],
    ["Activity", "activity"],
    ["Preferred date", "date"],
    ["Additional details", "message"]
];

fields.forEach(function (field) {
    const label = document.createElement("dt");
    const value = document.createElement("dd");

    label.textContent = field[0];
    value.textContent = submittedData.get(field[1]) || "Not provided";

    formDetails.append(label, value);

});