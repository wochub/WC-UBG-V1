
document.addEventListener("DOMContentLoaded", function() {
  // Track page view with Vercel Analytics
  if (typeof analytics !== 'undefined') {
    analytics.page('Home Page', {
      title: document.title,
      url: window.location.href
    });
  }
  
  // Search functionality
  const input = document.querySelector('input');
  const games = document.querySelectorAll('#games img');

  input.addEventListener('input', () => {
    const searchTerm = input.value.toLowerCase();
    games.forEach(game => {
      game.style.display = game.alt.toLowerCase().includes(searchTerm) ? 'block' : 'none';
    });
    
    // Track search events
    if (searchTerm.length > 2 && typeof analytics !== 'undefined') {
      analytics.track('Game Search', {
        search_term: searchTerm
      });
    }
  });

  // Fade-in animation for images in #games and track game clicks
  document.querySelectorAll('#games img').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.add('fade-in');
      
      // Track game click event
      if (typeof analytics !== 'undefined') {
        analytics.track('Game Clicked', {
          game_name: item.alt,
          game_url: item.closest('a')?.href
        });
      }
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

function setCustomTitle(title) {
  document.title = title;
  localStorage.setItem('customTitle', title); // Save the title to localStorage for future visits
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

// Only add event listener if the element exists
const searchSitesInput = document.getElementById('searchSitesInput');
if (searchSitesInput) {
  searchSitesInput.addEventListener('keyup', searchSites);
}











