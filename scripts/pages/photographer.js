// Récupération des éléments HTML
const photographerImage = document.getElementById('photographerImage');
const photographerName = document.getElementById('photographerName');
const photographerLocation = document.getElementById('photographerLocation');
const photographerTagline = document.getElementById('photographerTagline');
const photographerPrice = document.getElementById('photographerPrice');

// Définition des classes pour les éléments HTML
photographerImage.classList.add('photograph-img');
photographerName.classList.add('photograph-name');
photographerLocation.classList.add('photograph-location');
photographerTagline.classList.add('photograph-tagline');
photographerPrice.classList.add('photograph-price');

// Récupère les données des photographes depuis le fichier JSON
async function getPhotographers() {
  const response = await fetch("data/photographers.json");
  const { photographers } = await response.json();
  return photographers;
}

// Affiche les photos du photographe
function displayPhotos(photographer) {
  const photosSection = document.querySelector(".photos_section");
  const photographerPhotos = photographer.media.filter((media) => media.photographerId === photographerId);
  
  photographerPhotos.forEach((photo) => {
    const photoDOM = createPhotoDOM(photo);
    photosSection.appendChild(photoDOM);
  });
}

// Récupère l'id du photographe depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get("id"));

// Fonction principale pour afficher les informations du photographe et ses photos
async function displayPhotographerProfile() {
  const photographers = await getPhotographers();
  const photographer = photographers.find((p) => p.id === photographerId);
  if (photographer) {
    photographerImage.src = `assets/photographers/${photographer.portrait}`;
    photographerName.textContent = photographer.name;
    photographerLocation.textContent = `${photographer.city}, ${photographer.country}`;
    photographerTagline.textContent = photographer.tagline;
    photographerPrice.textContent = `${photographer.price}€/jour`;
    displayPhotos(photographer);
  } else {
    console.error("Photographer not found");
  }
}

// Appelle la fonction pour afficher le profil du photographe
displayPhotographerProfile();

