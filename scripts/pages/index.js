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


const photographerLinks = document.querySelectorAll('.photographer_section a');
photographerLinks.forEach(link => {
  link.addEventListener('click', event => {

    const photographerId = link.dataset.id;

    window.location.href = `photographer.html?id=${photographerId}`;
    
    event.preventDefault();
  });
});