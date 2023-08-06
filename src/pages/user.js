// user-dashboard.js

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchResultsDiv = document.getElementById("searchResults");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = searchInput.value;

  fetch(`/search?query=${query}`)
    .then((response) => response.json())
    .then((data) => displaySearchResults(data))
    .catch((error) => console.error("Error fetching search results:", error));
});

function displaySearchResults(results) {
  searchResultsDiv.innerHTML = "";

  if (results.length === 0) {
    searchResultsDiv.innerHTML = "<p>No matching restaurants found.</p>";
  } else {
    results.forEach((restaurant) => {
      const restaurantDiv = document.createElement("div");
      restaurantDiv.innerHTML = `<p><strong>${restaurant.name}</strong></p><p>${restaurant.address}</p>`;
      searchResultsDiv.appendChild(restaurantDiv);
    });
  }
}
