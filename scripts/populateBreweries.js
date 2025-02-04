// import { breweries } from "../templates/breweryObject.js";

function populateBreweries({ page = 1, perPage = 10 }) {
  let breweryTypes = document.getElementById("filter-by-type").value;
  if (breweryTypes === null || breweryTypes.length === 0) {
    breweryTypes = ["micro", "regional", "brewpub"];
  } else {
    breweryTypes = [breweryTypes];
  }
  let nameContains = document.getElementById("search-breweries").value;
  console.log(nameContains, breweryTypes);
  const breweryList = document.getElementById("breweries-list");
  breweryList.innerHTML = "";
  let query = `https://api.openbrewerydb.org/v1/breweries?per_page=${perPage}&page=${page}`;
  if (nameContains) {
    query += `&query=${encodeURIComponent(nameContains)}`;
  }
  breweryTypes.forEach((type) => {
    query += `&by_type=${type}`;
  });
  console.log(query);
  fetch(query)
    .then((response) => response.json())
    .then((breweries) => {
      breweries.forEach((brewery) => {
        if (!breweryTypes.includes(brewery.brewery_type)) {
          return;
        }
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
      });
    });
}

function handlePagination(page) {
  const perPage = 10;
  let breweryTypes = document.getElementById("filter-by-type").value;
  if (breweryTypes === null || breweryTypes.length === 0) {
    breweryTypes = ["micro", "regional", "brewpub"];
  } else {
    breweryTypes = [breweryTypes];
  }
  let nameContains = document.getElementById("search-breweries").value;
  const breweryList = document.getElementById("breweries-list");
  breweryList.innerHTML = "";
  let query = `https://api.openbrewerydb.org/v1/breweries/meta?per_page=${perPage}&page=${page}&sort=name,type:asc`;
  if (nameContains) {
    query += `&query=${encodeURIComponent(nameContains)}`;
  }
  breweryTypes.forEach((type) => {
    query += `&by_type=${type}`;
  });
  fetch(query)
    .then((response) => response.json())
    .then((meta) => {
      console.log(meta);
      const totalPages = Math.ceil(meta.total / perPage);
      const pagination = document.getElementById("pagination");
      let navigation = [];

      if (page > 1) {
        let firstPage = document.createElement("a");
        firstPage.href = "#";
        firstPage.classList.add("page-list");
        firstPage.innerHTML = `<i class="fa fa-angle-double-left" aria-hidden="true"></i>`;
        firstPage.addEventListener("click", (event) => {
          handlePagination(1);
          populateBreweries({
            page: 1,
            perPage: perPage,
          });
        });
        let previousPage = document.createElement("a");
        previousPage.href = "#";
        previousPage.classList.add("page-list");
        previousPage.innerHTML = `<i class="fa fa-angle-left" aria-hidden="true"></i>`;
        previousPage.addEventListener("click", (event) => {
          handlePagination(page - 1);
          populateBreweries({
            page: page - 1,
            perPage: perPage,
          });
        });
        pagination.appendChild(firstPage);
        pagination.appendChild(previousPage);
      }

      for (let i = -2; i <= 2; i++) {
        if (page + i < 1 || page + i > totalPages) {
          continue;
        }
        console.log("hi");
        let numberedPage = document.createElement("a");
        numberedPage.href = "#";
        numberedPage.classList.add("page-list");
        numberedPage.innerHTML = page + i;
        numberedPage.addEventListener("click", (event) => {
          handlePagination(page + i);
          populateBreweries({
            page: page + i,
            perPage: perPage,
          });
        });
        pagination.appendChild(numberedPage);
      }
      if (page < totalPages) {
        let nextPage = document.createElement("a");
        nextPage.href = "#";
        nextPage.classList.add("page-list");
        nextPage.innerHTML = `<i class="fa fa-angle-right" aria-hidden="true"></i>`;
        nextPage.addEventListener("click", (event) => {
          handlePagination(page + 1);
          populateBreweries({
            page: page + 1,
            perPage: perPage,
          });
        });
        let lastPage = document.createElement("a");
        lastPage.href = "#";
        lastPage.classList.add("page-list");
        lastPage.innerHTML = `<i class="fa fa-angle-double-left" aria-hidden="true"></i>`;
        lastPage.addEventListener("click", (event) => {
          handlePagination(totalPages);
          populateBreweries({
            page: totalPages,
            perPage: perPage,
          });
        });
        pagination.appendChild(nextPage);
        pagination.appendChild(lastPage);
      }
      pagination.innerHTML = navigation.join("\n");
    });
}

export { populateBreweries, handlePagination };
