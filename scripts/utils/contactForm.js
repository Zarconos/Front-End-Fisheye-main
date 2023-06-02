function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    document.body.classList.add("modal-open");
  
    const modalForm = document.getElementById("modalForm");
    modalForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (validateForm()) {
        // Envoyer le formulaire
        console.log("Formulaire valide. Envoi en cours...");
      }
    });
  }
  