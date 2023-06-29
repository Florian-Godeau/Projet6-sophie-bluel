document.addEventListener("DOMContentLoaded", function() {
    // Obtenir la fenêtre modale
    const modal = document.querySelector(".modal");

    // Obtenir tous les boutons qui ouvrent la fenêtre modale
    const buttonProject = document.querySelector(".edit-buttonProject");

    // Obtenir l'élément <i> qui ferme la fenêtre modale
    const closeModalElement = document.querySelector(".close-modal");

    // Lorsqu'on clique sur un bouton, ouvrir la fenêtre modale 
    buttonProject.onclick = function() {
        modal.style.display = "flex";
    }
    

    // Lorsqu'on clique sur <i> (x), fermer la fenêtre modale
    closeModalElement.onclick = function() {
        modal.style.display = "none";
    }

    // Lorsqu'on clique en dehors de la fenêtre modale, la fermer
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});