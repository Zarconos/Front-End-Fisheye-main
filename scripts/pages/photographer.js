// Récupère les données des photographes depuis le fichier JSON
async function getPhotographers() {
    const response = await fetch("data/photographers.json");
    const { photographers } = await response.json();
    return photographers;
  }
  
  // Affiche les données du photographe correspondant à l'id
  function displayPhotographer(photographer) {
    const photographerSection = document.querySelector(".photographer_section");
    const userCardDOM = photographerFactory(photographer).getUserCardDOM();
    photographerSection.appendChild(userCardDOM);
  }
  
  // Récupère l'id du photographe depuis l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get('id'));


