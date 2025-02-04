import { populateBreweries } from "./populateBreweries.js";

document
  .getElementById("filter-by-type")
  .addEventListener("change", (event) => {
    populateBreweries({ page: document.querySelector(".active").textContent });
  });

document
  .getElementById("search-breweries")
  .addEventListener("input", (event) => {
    event.preventDefault();
    populateBreweries({ page: document.querySelector(".active").textContent });
  });
document
  .getElementById("search-breweries-form")
  .addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)
  });
