
// Fonction principale pour afficher les informations du photographe et ses photos
async function displayPhotographerProfile() {
  const photographers = await getPhotographers();
  const photographer = photographers.find((p) => p.id === photographerId);
  if (photographer) {
    photographerImage.src = `assets/photographers/${photographer.portrait}`;
    photographerName.textContent = photographer.name;
    photographerLocation.textContent = `${photographer.city}, ${photographer.country}`;
    photographerTagline.textContent = photographer.tagline;
    displayPhotos(photographer);

    const contactButton = document.querySelector('.contact_button');
    contactButton.addEventListener('click', function() {
      displayModal();
    });
    const closeButton = document.querySelector('.modal-close');
    closeButton.addEventListener('click', function() {
      closeModal();
    });

    const photographerSubname = document.querySelector('.photographer_Name');
photographerSubname.textContent = photographer.name;

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
let photographerPhotos;
let photographer;




// Récupère les médias du photographe depuis le fichier JSON
async function getPhotographerMedia() {
  const response = await fetch("../data/photographers.json");
  const data = await response.json();
  return data.media;
}

// Fonction pour afficher les photos du photographe
async function displayPhotos(photographerData) {
  photographer = photographerData;
  const photographerMedia = await getPhotographerMedia();

  photographerPhotos = photographerMedia.filter(
    (mediaItem) => mediaItem.photographerId === photographerId
  );
  allPhotos.push(...photographerPhotos);

  
  const galleryContainer = document.createElement("div");
  galleryContainer.classList.add("gallery-container");
  document.body.appendChild(galleryContainer);
  
  photographerPhotos.forEach((photo, index) => {
    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media-container");


    
    const mediaLink = document.createElement("a");
    mediaLink.href = "#";
    mediaLink.setAttribute("data-index", index);
    mediaLink.addEventListener("click", function (event) {
      event.preventDefault();
      openLightbox(parseInt(this.getAttribute("data-index")));
    });

    if (photo.video) {
      const videoElement = document.createElement("video");
      videoElement.classList.add("video");
      const videoPath = `Sample Photos/${photographer.name}/${photo.video}`;
      videoElement.src = videoPath;

      mediaLink.appendChild(videoElement);
    } else {
      const photoElement = document.createElement("img");
      photoElement.classList.add("photo");
      const photoPath = `Sample Photos/${photographer.name}/${photo.image}`;
      photoElement.src = photoPath;

      mediaLink.appendChild(photoElement);
    }

    
    const likeContainer = document.createElement("div");
    likeContainer.classList.add("like-container");

    
    const likeIcon = document.createElement("img");
    likeIcon.classList.add("media-like-icon");
    likeIcon.src = "assets/icons/heart-regular.svg";
    

    const likeCount = document.createElement("span");
    likeCount.classList.add("like-count");
    likeCount.textContent = photo.likes;

    const likeButton = document.createElement("button");
    likeButton.classList.add("like-button", "media-like-button");
    likeButton.addEventListener("click", renderLikes);
   

    likeButton.appendChild(likeIcon);
    likeContainer.appendChild(likeButton);
    likeContainer.appendChild(likeCount);

    mediaContainer.appendChild(mediaLink);
    mediaContainer.appendChild(likeContainer);

    const photoInfo = document.createElement("div");
    photoInfo.classList.add("photo-info");

    const photoTitle = document.createElement("span");
    photoTitle.classList.add("photo-title");
    photoTitle.textContent = photo.title;

    const photoDate = document.createElement("span");
    photoDate.classList.add("photo-date");
    photoDate.textContent = photo.date;
    
    photoInfo.appendChild(photoDate);

    photoInfo.appendChild(photoTitle);
  

    mediaContainer.appendChild(mediaLink);
    mediaContainer.appendChild(likeContainer);
    mediaContainer.appendChild(photoInfo);

    galleryContainer.appendChild(mediaContainer);

    
  });

 // Fonction pour augmenter ou diminuer les likes

  function renderLikes() {
    const mediaLikeSpanEl = this.parentNode.querySelector(".like-count");
    const mediaLikeIconEl = this.querySelector(".media-like-icon");
  
    
    if (mediaLikeIconEl.src.includes("heart-regular.svg")) {
      let mediaLikeCount = Number(mediaLikeSpanEl.textContent);
      mediaLikeCount++;
      mediaLikeSpanEl.textContent = mediaLikeCount;
      mediaLikeIconEl.src = "assets/icons/heart-solid.svg";
      updateTotalLikesCount(1);
    } else if (mediaLikeIconEl.src.includes("heart-solid.svg")) {
      let mediaLikeCount = Number(mediaLikeSpanEl.textContent);
      mediaLikeCount--;
      mediaLikeSpanEl.textContent = mediaLikeCount;
      mediaLikeIconEl.src = "assets/icons/heart-regular.svg";
      updateTotalLikesCount(-1); 
    }
  }

// Fonction pour mettre à jour le compteur total de likes
function updateTotalLikesCount(change) {
  const totalLikesCountElement = document.getElementById("totalLikesCount");
  const currentTotalLikesCount = parseInt(totalLikesCountElement.textContent);
  const newTotalLikesCount = currentTotalLikesCount + change;
  totalLikesCountElement.textContent = newTotalLikesCount;
}

// Add an event listener to each media card like button to execute the renderLikes function on click
const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
mediaCardLikeButtons.forEach((button) => {
  button.addEventListener("click", renderLikes);
});

// Calculer le total de likes du photographe
const totalLikesCount = photographerPhotos.reduce(
  (total, photo) => total + photo.likes,
  0
);

// Mettre à jour le contenu de l'élément avec l'ID totalLikesCount
const totalLikesCountElement = document.getElementById("totalLikesCount");
totalLikesCountElement.textContent = totalLikesCount;


const priceLikesElement = document.querySelector(".price_likes");
priceLikesElement.textContent = photographer.price + "€ / jour";


}

// fonction pour trier les medias

function trierMedias() {
  var sortSelect = document.getElementById('sortSelect');
  var mediaContainer = document.querySelector('.gallery-container');

  var mediaElements = Array.from(mediaContainer.querySelectorAll('.media-container'));
  var sortedMediaElements;

  var sortBy = sortSelect.value;

  if (sortBy === 'popularity') {
    sortedMediaElements = mediaElements.sort(function(a, b) {
      var likeCountA = parseInt(a.querySelector('.like-count').textContent);
      var likeCountB = parseInt(b.querySelector('.like-count').textContent);
      return likeCountB - likeCountA;
    });
  } else if (sortBy === 'date') {
    sortedMediaElements = mediaElements.sort(function(a, b) {
      var dateA = new Date(a.querySelector('.photo-date').textContent);
      var dateB = new Date(b.querySelector('.photo-date').textContent);
      return dateB - dateA;
    });
  } else if (sortBy === 'alphabetical') {
    sortedMediaElements = mediaElements.sort(function(a, b) {
      var titleA = a.querySelector('.photo-title').textContent;
      var titleB = b.querySelector('.photo-title').textContent;
      return titleA.localeCompare(titleB);
    });
  }

  mediaElements.forEach(function(mediaElement) {
    mediaContainer.removeChild(mediaElement);
  });

  sortedMediaElements.forEach(function(sortedMediaElement) {
    mediaContainer.appendChild(sortedMediaElement);
  });
}

var sortSelect = document.getElementById('sortSelect');
sortSelect.addEventListener('change', trierMedias);



// Fonction pour afficher les photos dans la lightbox
function openLightbox(index) {
  currentIndex = index;
  updateLightboxMedia(currentIndex);

  const lightboxModal = document.getElementById("lightboxModal");
  lightboxModal.style.visibility = "visible";
  lightboxModal.setAttribute("aria-hidden", "false");

  const lightboxMedia = document.getElementById("lightboxMedia");
  lightboxMedia.innerHTML = "";

  const photo = photographerPhotos[index];

  if (photo.video) {
    const videoPath = `Sample Photos/${photographer.name}/${photo.video}`;
    lightboxMedia.innerHTML = `<video class="lightbox-content" src="${videoPath}" controls></video>`;
  } else {
    const imagePath = `Sample Photos/${photographer.name}/${photo.image}`;
    lightboxMedia.innerHTML = `<img class="lightbox-content" src="${imagePath}" alt="Media">`;
  }

  const lightboxTitle = document.createElement("figcaption");
  lightboxTitle.classList.add("lightbox-title");
  lightboxTitle.textContent = photo.title;
  lightboxMedia.appendChild(lightboxTitle);
}

let currentIndex = 0;
const lightboxPreviousBtn = document.getElementById("lightboxPreviousBtn");
const lightboxNextBtn = document.getElementById("lightboxNextBtn");

function scrollMedia(direction) {
  currentIndex += direction;
  if (currentIndex < 0) {
    currentIndex = photographerPhotos.length - 1;
  } else if (currentIndex >= photographerPhotos.length) {
    currentIndex = 0;
  }
  openLightbox(currentIndex);
}

// Gestionnaire d'événement pour les touches de direction
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowLeft") {
    // Appeler la fonction pour passer à la photo précédente
    scrollMedia(-1);
  } else if (event.key === "ArrowRight") {
    // Appeler la fonction pour passer à la photo suivante
    scrollMedia(1);
  }
});

// Fonction pour mettre à jour le contenu de la lightbox
function updateLightboxMedia(index) {
  const lightboxMedia = document.getElementById("lightboxMedia");
  const photo = photographerPhotos[index];

  if (photo.video) {
    const videoPath = `Sample Photos/${photographer.name}/${photo.video}`;
    lightboxMedia.innerHTML = `<video class="lightbox-content" src="${videoPath}" controls></video>`;
  } else {
    const imagePath = `Sample Photos/${photographer.name}/${photo.image}`;
    lightboxMedia.innerHTML = `<img class="lightbox-content" src="${imagePath}" alt="Media">`;
  }
}

// Gestionnaire d'événement pour ouvrir la lightbox
const mediaContainers = document.querySelectorAll(".media-container");
mediaContainers.forEach((container, index) => {
  container.addEventListener("click", () => {
    openLightbox(index);
  });
});

// Gestionnaire d'événement pour fermer la lightbox
const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
lightboxCloseBtn.addEventListener("click", function() {
  closeLightbox();
});

function closeLightbox() {
  const lightboxModal = document.getElementById("lightboxModal");
  lightboxModal.setAttribute("aria-hidden", "true");
  lightboxModal.style.visibility = "hidden";
}

// Gestionnaire d'événement pour le bouton précédent de la lightbox
lightboxPreviousBtn.addEventListener("click", function() {
  scrollMedia(-1);
});

// Gestionnaire d'événement pour le bouton suivant de la lightbox
lightboxNextBtn.addEventListener("click", function() {
  scrollMedia(1);
});


// Fonction pour récupérer les données du formulaire


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


// naviguer avec les flèches du clavier

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeModal();
    closeLightbox();
  }
});
