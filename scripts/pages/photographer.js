
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

    const contactButton = document.querySelector('.contact_button');
    contactButton.addEventListener('click', function() {
      displayModal();
    });
    const closeButton = document.querySelector('.modal-close');
    closeButton.addEventListener('click', function() {
      closeModal();
    });
  } else {
    console.error("Photographer not found");
  }
}

// Récupère les données des photographes depuis le fichier JSON
async function getPhotographers() {
  const response = await fetch("data/photographers.json");
  const { photographers } = await response.json();
  return photographers;
}

// Récupère l'id du photographe depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get("id"));


// Appelle la fonction pour afficher le profil du photographe
displayPhotographerProfile();

// Déclare une variable pour stocker les photos
let allPhotos = [];

// Récupère les médias du photographe depuis le fichier JSON
async function getPhotographerMedia() {
  const response = await fetch("../data/photographers.json");
  const data = await response.json();
  return data.media;
}

// Fonction pour afficher les photos du photographe
async function displayPhotos(photographer) {
  const photographerMedia = await getPhotographerMedia();

  const photographerPhotos = photographerMedia.filter(
    (mediaItem) => mediaItem.photographerId === photographerId
  );
  allPhotos.push(photographerPhotos);
  console.log(allPhotos);

  const galleryContainer = document.createElement("div");
  galleryContainer.classList.add("gallery-container");
  document.body.appendChild(galleryContainer);

  photographerPhotos.forEach((photo) => {
    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media-container");

    const mediaButton = document.createElement("button");
    mediaButton.classList.add("media-button");
    mediaButton.addEventListener("click", function () {
      openFullscreenMedia(photo.image);
    });

    if (photo.video) {
      const videoElement = document.createElement("video");
      videoElement.classList.add("video");
      const videoPath = `Sample Photos/${photographer.name}/${photo.video}`;
      videoElement.src = videoPath;

      mediaButton.appendChild(videoElement);
    } else {
      const photoElement = document.createElement("img");
      photoElement.classList.add("photo");
      const photoPath = `Sample Photos/${photographer.name}/${photo.image}`;
      photoElement.src = photoPath;

      mediaButton.appendChild(photoElement);
    }

    mediaContainer.appendChild(mediaButton);
    galleryContainer.appendChild(mediaContainer);
  });
}


function validateForm() {
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  let isValid = true;

  if (firstName.value === "") {
    firstName.classList.add("error");
    isValid = false;
  } else {
    firstName.classList.remove("error");
  }

  if (lastName.value === "") {
    lastName.classList.add("error");
    isValid = false;
  } else {
    lastName.classList.remove("error");
  }

  if (email.value === "") {
    email.classList.add("error");
    isValid = false;
  } else {
    email.classList.remove("error");
  }

  if (message.value === "") {
    message.classList.add("error");
    isValid = false;
  } else {
    message.classList.remove("error");
  }

  return isValid;
}

// Fonction pour afficher une boîte de dialogue d'erreur
function showErrorDialog(message) {
  alert(message);
}

// Fonction pour valider le formulaire avant l'envoi
function validateForm(event) {
  event.preventDefault();

  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  if (firstNameInput.value === '') {
    showErrorDialog('Veuillez renseigner le champ Prénom.');
    return;
  }

  if (lastNameInput.value === '') {
    showErrorDialog('Veuillez renseigner le champ Nom.');
    return;
  }

  if (emailInput.value === '') {
    showErrorDialog('Veuillez renseigner le champ E-mail.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    showErrorDialog('Veuillez saisir une adresse e-mail valide.');
    return;
  }

  if (messageInput.value === '') {
    showErrorDialog('Veuillez renseigner le champ Votre message.');
    return;
  }

  // Afficher les données du formulaire dans la console
  console.log({
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    message: messageInput.value
  });

  // Fermer la modale après avoir validé le formulaire
  closeModal();
}

// Ajoutez un écouteur d'événement au formulaire pour appeler la fonction de validation
const modalForm = document.getElementById('modalForm');
modalForm.addEventListener('submit', validateForm);
