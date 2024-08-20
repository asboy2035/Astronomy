document.addEventListener("DOMContentLoaded", () => {
  const sidebarContent = document.querySelector(".sidebar-content ul");
  const planetNameElement = document.getElementById("planetName");
  const planetImageElement = document.getElementById("planetImage");
  const descriptionElement = document.getElementById("description");
  const positionElement = document.getElementById("position").querySelector("p");
  const temperatureElement = document.getElementById("temperature");
  const moonsElement = document.getElementById("moons").querySelector("p");
  const distanceElement = document.getElementById("distance").querySelector("p");

  // Fetch the planets.json file
  fetch('/planets.json')
    .then(response => response.json())
    .then(planets => {
      // Iterate over each planet in the JSON file
      for (const planetName in planets) {
        const planet = planets[planetName];

        // Create a list item for each planet
        const listItem = document.createElement("li");
        listItem.setAttribute("data-planet", planetName);

        // Create an img element for the planet icon
        const imgIcon = document.createElement("img");
        imgIcon.setAttribute("src", planet.image_path); // Use the image path from JSON
        imgIcon.setAttribute("alt", `${planet.name} icon`);
        imgIcon.setAttribute("class", "icon");

        // Create a span element for the planet's name
        const planetNameSpan = document.createElement("span");
        planetNameSpan.textContent = planet.name;

        // Append the img icon and planet name to the list item
        listItem.appendChild(imgIcon);
        listItem.appendChild(planetNameSpan);

        // Append the list item to the sidebar
        sidebarContent.appendChild(listItem);

        // Add click event listener to update the info section
        listItem.addEventListener('click', () => {
          planetNameElement.innerHTML = `<h1>${planet.name}</h1>`;
          planetImageElement.setAttribute("src", planet.image_path);
          descriptionElement.textContent = planet.description;
          positionElement.textContent = planet.position;
          temperatureElement.innerHTML = `
            <h3>Average Temperature</h3>
            <p>${planet.average_temperature_celsius}°C</p>
            <p>${planet.average_temperature_fahrenheit}°F</p>`;
          moonsElement.textContent = planet.moons;
          distanceElement.textContent = `${planet.distance_from_sun_km} km`;
        });
      }
    })
    .catch(error => console.error('Error loading planets:', error));
});

const toggleButton = document.getElementById('toggle-button');
const sidebar = document.getElementById('sidebar');

// Function to update the button icon based on the sidebar state
function updateToggleButtonIcon() {
  if (sidebar.classList.contains('collapsed')) {
    toggleButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>`;
  } else {
    toggleButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>`;
  }
}

// Add click event listener to toggle the sidebar
toggleButton.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  updateToggleButtonIcon();  // Update the button icon when the sidebar is toggled
});

// Add transitionend event listener to ensure the button icon is correct after transition
sidebar.addEventListener('transitionend', updateToggleButtonIcon);
