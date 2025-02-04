import { handlePagination, populateBreweries } from "./populateBreweries.js";

window.onload = () => {
  populateBreweries({ breweryTypes: ["micro", "regional", "brewpub"] });
  handlePagination(1);
};
