document.addEventListener("DOMContentLoaded", function() {
    // Obtenir la fenêtre modale
    const modal = document.querySelector(".modal");
    const modalGallery = document.querySelector(".modal-galery");
    const modalContent = document.querySelector(".modal-content");
    const arrowLeft = document.querySelector(".fa-arrow-left-long");

    // Obtenir tous les boutons qui ouvrent la fenêtre modale
    const buttonProject = document.querySelectorAll(".open-modal");

    // Obtenir l'élément <i> qui ferme la fenêtre modale
    const closeModalElement = document.querySelector(".close-modal");

    //Créer la div d'ajout de photo
    const modalPicture = document.createElement("div");
    modalPicture.classList.add("modal-picture");
    modalContent.insertBefore(modalPicture, document.querySelector("h3").nextSibling)

    // Créer le bouton d'ajout de photo et l'ajouter après la ligne
    const addButton = document.createElement("button");
    addButton.textContent = "Ajouter une photo";
    addButton.classList.add("btn-add-picture");
    modalContent.insertBefore(addButton, document.querySelector(".line").nextSibling);

    // Créer le bouton de suppression de la gallerie et l'ajouter après le bouton ajout de photo
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer la galerie";
    deleteButton.classList.add("btn-delete-gallery");
    modalContent.insertBefore(deleteButton, addButton.nextSibling);

    // Créer le bouton de validation pour l'ajout de photo et l'ajouter après le bouton suppression de la galerie
    const validateButton = document.createElement("button");
    validateButton.textContent = "Valider";
    validateButton.classList.add("btn-validate");
    modalContent.insertBefore(validateButton, deleteButton.nextSibling);

    // Lorsqu'on clique sur un bouton, ouvrir la fenêtre modale et remplir la galerie
    buttonProject.forEach(function(button) {
        button.onclick = function() {
            fetch('http://localhost:5678/api/works')
                .then(response => response.json())
                .then(data => {
                    displayProjectsInModal(data, modalGallery);
                    modal.style.display = "flex";
                });
        }
    });

    // Lorsqu'on clique sur le bouton d'ajout, modifier le titre, cacher la galerie et modifier la hauteur
    addButton.addEventListener("click", function() {
        const titleElement = document.querySelector("h3");
        titleElement.textContent = "Ajout photo";
        modalGallery.style.display = "none";
        modalContent.style.height = "670px";
        arrowLeft.style.display = "flex";
        deleteButton.style.display = "none";
        modalPicture.style.display = "flex";
        validateButton.style.display = "block";
        addButton.style.display = "none";
    });

    // Lorsqu'on clique sur arrow left, réinitialiser le modal
    arrowLeft.addEventListener("click", function() {
        const titleElement = document.querySelector("h3");
        titleElement.textContent = "Galerie photo";
        modalGallery.style.display = "flex";
        modalContent.style.height = "731px";
        arrowLeft.style.display = "none";
        deleteButton.style.display = "block";
        modalPicture.style.display = "flex";
        validateButton.style.display = "none";
        addButton.style.display = "block";
    });

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

function displayProjectsInModal(projects, gallery) {
    gallery.innerHTML = '';

    projects.forEach((project, index) => {
        const figure = document.createElement('figure');
        figure.draggable = true;
        figure.dataset.id = index;
        figure.classList.add('draggable');

        figure.addEventListener('dragstart', handleDragStart);
        figure.addEventListener('dragover', handleDragOver);
        figure.addEventListener('drop', handleDrop);

        const img = document.createElement('img');
        img.src = project.imageUrl;
        img.alt = project.title;
        img.classList.add('modal-galery-img');

        const iconeElement = document.createElement("i");
        iconeElement.classList.add("fa-regular", "fa-trash-can", "trash-can");

        const hoverIconeElement = document.createElement("i");
        hoverIconeElement.classList.add("fa-solid", "fa-arrows-up-down-left-right", "arrows");

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = "éditer";

        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.appendChild(iconeElement);
        figure.appendChild(hoverIconeElement);

        gallery.appendChild(figure);
    });
}

let draggedItem = null;

function handleDragStart(e) {
    draggedItem = this;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    const gallery = document.querySelector(".modal-galery");
    gallery.insertBefore(draggedItem, this.nextSibling);
}