async function getPhotographers() {
  const response = await fetch("data/photographers.json");
  const { photographers } = await response.json();
  return { photographers };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
};

init();

// Écouter les clics sur les profils de photographes
const photographerLinks = document.querySelectorAll('.photographer_section a');
photographerLinks.forEach(link => {
  link.addEventListener('click', event => {
    // Récupérer l'ID du photographe à partir de l'attribut "data-id"
    const photographerId = link.dataset.id;
    // Rediriger vers la page photographer.html avec l'ID en tant que paramètre
    window.location.href = `photographer.html?id=${photographerId}`;
    // Empêcher le comportement par défaut du lien
    event.preventDefault();
  });
});