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
        planetNameSpan.classList.add("hiddenInMobile");

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
      <svg width="24" height="24" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12M40 76h176a12 12 0 0 0 0-24H40a12 12 0 0 0 0 24m176 104H40a12 12 0 0 0 0 24h176a12 12 0 0 0 0-24"/></svg>
      `;
  } else {
    toggleButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z"/></g></svg>
      `;
  }
}

// Add click event listener to toggle the sidebar
toggleButton.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  updateToggleButtonIcon();  // Update the button icon when the sidebar is toggled
});

// Add transitionend event listener to ensure the button icon is correct after transition
sidebar.addEventListener('transitionend', updateToggleButtonIcon);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
  .then(function(registration) {
    console.log('Service Worker registered with scope:', registration.scope);
  }).catch(function(error) {
    console.log('Service Worker registration failed:', error);
  });
}