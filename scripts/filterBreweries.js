import { populateBreweries } from "./populateBreweries.js";

document
  .getElementById("filter-by-type")
  .addEventListener("change", (event) => {
    let searchValue = document.getElementById("search-breweries").value;
    populateBreweries({
      nameContains: searchValue,
      breweryTypes: event.target.value
        ? [event.target.value]
        : ["micro", "regional", "brewpub"],
    });
  });

document
  .getElementById("search-breweries")
  .addEventListener("input", (event) => {
    event.preventDefault();
    let filterValue = document.getElementById("filter-by-type").value;
    populateBreweries({
      nameContains: event.target.value,
      breweryTypes: filterValue
        ? [filterValue]
        : ["micro", "regional", "brewpub"],
    });
  });
document
  .getElementById("search-breweries-form")
  .addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)
  });
