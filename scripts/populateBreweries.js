import { breweries } from "../templates/breweryObject.js";

function populateBreweries({
  nameContains = "",
  breweryTypes = ["micro", "regional", "brewpub"],
}) {
  console.log(breweryTypes);
  const breweryList = document.getElementById("breweries-list");
  breweryList.innerHTML = "";
  breweries.forEach((brewery) => {
    if (
      breweryTypes.includes(brewery.brewery_type.toLowerCase()) &&
      brewery.name.toLowerCase().includes(nameContains.toLowerCase())
    ) {
      const breweryCard = document.createElement("li");
      breweryCard.innerHTML = `
        <h2>${brewery.name}</h2>
        <div class="type">${brewery.brewery_type}</div>
        <section class="address">
          <h3>Address:</h3>
          <p>${brewery.street}</p>
          <p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>
        </section>
        <section class="phone">
          <h3>Phone:</h3>
          <p>${brewery.phone ? brewery.phone : "N/A"}</p>
        </section>
        <section class="link">
          <a href="${brewery.website_url}" target="_blank">Visit Website</a>
        </section>
      `;
      breweryList.appendChild(breweryCard);
    }
  });
}

export { populateBreweries };
