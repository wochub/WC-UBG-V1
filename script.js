
document.addEventListener("DOMContentLoaded", function() {
  // Search functionality
  const input = document.querySelector('input');
  const games = document.querySelectorAll('#games img');

  input.addEventListener('input', () => {
    const searchTerm = input.value.toLowerCase();
    games.forEach(game => {
      game.style.display = game.alt.toLowerCase().includes(searchTerm) ? 'block' : 'none';
    });
  });

  // Fade-in animation for images in #games
  document.querySelectorAll('#games img').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.add('fade-in');
    });
  });

  // Check for a saved title in localStorage and set it if exists
  const savedTitle = localStorage.getItem('customTitle');
  document.title = savedTitle ? savedTitle : 'Home'; // Default title set to 'WC Games'

  // Check for a saved favicon and update it if found
  const savedFavicon = localStorage.getItem('customFavicon');
  if (savedFavicon) {
    updateFavicon(savedFavicon);
  }

  // Initialize star generation based on the user's preference
  initializeStars();

  // Adding background color change functionality
  document.getElementById("changeBackgroundColor").addEventListener("click", function() {
    const userColor = prompt("Enter a new background color (e.g., hex, rgba, or color name): ");
    if (userColor) {
      document.body.style.backgroundColor = userColor;
      localStorage.setItem('userBgColor', userColor); // Save the background color to localStorage.
    }
  });

  // Apply saved background color on page load if available.
  const savedBgColor = localStorage.getItem('userBgColor');
  if (savedBgColor) {
    document.body.style.backgroundColor = savedBgColor;
  }
});

function setRandomTitle() {
  const titles = ["Dashboard", "My Apps", "Google Classroom", "Moodle", "Blackboard", "Schoology", "Edmodo", "Khan Academy"];
  const selectedTitle = titles[Math.floor(Math.random() * titles.length)];
  document.title = selectedTitle;
  localStorage.setItem('customTitle', selectedTitle); // Save the title to localStorage for future visits
}

// Update the favicon link in the document's head.
function updateFavicon(fileName) {
  let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/png';
  link.rel = 'icon';
  link.href = `./favicons/${fileName}`;
  document.getElementsByTagName('head')[0].appendChild(link);
}

function chooseFavicon(fileName) {
  localStorage.setItem('customFavicon', fileName);
  updateFavicon(fileName);
}

function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  const duration = Math.random() * (15 - 10) + 10; // Slower movement
  const moveX = Math.random() * 1000 - 500; // Reduced range for subtle movement
  const moveY = Math.random() * 1000 - 500; // Reduced range for subtle movement

  star.style.left = `${Math.random() * 100}vw`;
  star.style.top = `${Math.random() * 100}vh`;

  const animationName = `moveStar${Math.floor(Math.random() * 10000)}`;
  star.style.animation = `${animationName} ${duration}s linear infinite`;

  document.body.appendChild(star);

  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    @keyframes ${animationName} {
      from {
        transform: translateX(0px) translateY(0px);
      }
      to {
        transform: translateX(${moveX}px) translateY(${moveY}px);
      }
    }
  `;
  document.head.appendChild(styleSheet);

  star.addEventListener('animationend', () => {
    star.remove();
    document.head.removeChild(styleSheet); // Prevent <head> from getting bloated with <style> tags
  });
}

let starCreationEnabled = localStorage.getItem('starCreationEnabled') === 'true';

function toggleStarCreation() {
  starCreationEnabled = !starCreationEnabled;
  localStorage.setItem('starCreationEnabled', starCreationEnabled);
  if (starCreationEnabled) {
    startStarCreation();
  } else {
    stopStarCreation();
  }
}

function initializeStars() {
  if (starCreationEnabled) {
    startStarCreation();
  }
  document.getElementById("toggleStarBackground").addEventListener('click', toggleStarCreation);
}

let starInterval;

function startStarCreation() {
  starInterval = setInterval(createStar, 275);
}

function stopStarCreation() {
  clearInterval(starInterval);
  removeExistingStars();
}

function removeExistingStars() {
  document.querySelectorAll('.star').forEach(star => star.remove());
}

function searchSites() {
  const input = document.getElementById('searchSitesInput');
  const filter = input.value.toUpperCase();
  const sitesDiv = document.getElementById('sites');
  const a = sitesDiv.getElementsByTagName('a');

  for (let i = 0; i < a.length; i++) {
    let img = a[i].getElementsByTagName('img')[0];
    if (img.alt.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

document.getElementById('searchSitesInput').addEventListener('keyup', searchSites);











