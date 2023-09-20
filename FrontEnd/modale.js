// Déclaration de la fonction pour créer le contenu de la galerie dans la modale
const createModalGallery = (projects) => {
	const modalContentcrea = document.createElement('div');
	modalContentcrea.innerHTML = /*html*/ `
      <div class="modal-content">
        <i class="fa-solid fa-xmark close-modal"></i>
        <i class="fa-solid fa-arrow-left-long"></i>
        <h3>Galerie photo</h3>
        <div class="modal-picture">
            <i class="fa-regular fa-image img-add-photo"></i>
            <button class="btn-add-photo">+ Ajouter photo</button>
            <p class="add-photo-condition">jpg, png : 4mo max</p>
            <p class="add-photo-error">Cette image ne respecte pas les conditions</p>
            <input type="file" accept="image/png, image/jpeg" id="inputPhoto">
        </div>
        <form class="modal-form" method="post" action="#">
            <label for="photoTitle">Titre</label>
            <input type="text" name="photoTitle" id="photoTitle" required="true">
            <label for="photoCategory">Catégorie</label>
            <select name="photoCategory" id="photoCategory">
                <option value="null"></option>
                <option value="Objets">Objets</option>
                <option value="Appartements">Appartements</option>
                <option value="Hotels & restaurants">Hotels & restaurants</option>
            </select>
        </form>
        <div class="modal-galery">
          ${projects.map((project) => /*html*/`
            <figure data-id="${project.id}">
              <img src="${project.imageUrl}" alt="${project.title}" class="modal-galery-img"/>
              <figcaption>éditer</figcaption>
              <i class="fa-regular fa-trash-can trash-can"></i>
              <i class="fa-solid fa-arrows-up-down-left-right arrows"></i>
            </figure>    
          `).join('')}
        </div>
        <div class="modal-addPhoto"></div>
        <div class="line"></div>
        <button class="btn-add-picture">Ajouter une photo</button>
        <button class="btn-delete-gallery">Supprimer la galerie</button>
        <button class="btn-validate">Valider</button>
      </div>
    `;
	return modalContentcrea.innerHTML;
};
// Obtenir la fenêtre modale
const modal = document.querySelector(".modal");
// Obtenir tous les boutons qui ouvrent la fenêtre modale
const buttonProject = document.querySelectorAll(".open-modal");
// Lorsqu'on clique sur un bouton, ouvrir la fenêtre modale et remplir la galerie
buttonProject.forEach(function(button) {
	button.onclick = function() {
		displayProjectsInModal();
	}
});

function displayProjectsInModal() {
	fetch('http://localhost:5678/api/works').then(response => response.json()).then(data => {
		const modalContentHTML = createModalGallery(data);
		modal.innerHTML = modalContentHTML; // Insérer le contenu dans la div .modal
		modal.style.display = "flex";
		const modalGallery = document.querySelector(".modal-galery");
		const modalContent = document.querySelector(".modal-content");
		const arrowLeft = document.querySelector(".fa-arrow-left-long");
		const deleteButton = document.querySelector(".btn-delete-gallery");
		const modalPicture = document.querySelector(".modal-picture");
		const modalForm = document.querySelector(".modal-form");
		const validateButton = document.querySelector(".btn-validate");
		const addButton = document.querySelector(".btn-add-picture");
		const addBtnPhoto = document.querySelector(".btn-add-photo");
		const addCondition = document.querySelector(".add-photo-condition");
		const titleInput = document.getElementById('photoTitle');
		const categorySelect = document.getElementById('photoCategory');
		const fileInput = document.getElementById('inputPhoto');
		const closeModalElement = document.querySelector(".close-modal");
		const errorMessage = document.querySelector(".add-photo-error");
		const imageAddPhoto = document.querySelector(".img-add-photo")
		// Fonction pour fermer et réinitialiser la modale une fois fermée 
		function closeModal() {
			modal.style.display = "none";
			switchToGalleryMode();
		}
		addButton.addEventListener("click", switchToAddMode);
		arrowLeft.addEventListener("click", switchToGalleryMode);
		closeModalElement.onclick = closeModal;
		window.onclick = function(event) {
			if (event.target === modal) {
				closeModal();
			}
		}
		// Fonction pour afficher la modale d'ajout de projet
		function switchToAddMode() {
			const titleElement = document.querySelector("h3");
			titleElement.textContent = "Ajout photo";
			modalGallery.style.display = "none";
			modalContent.style.height = "670px";
			arrowLeft.style.display = "flex";
			deleteButton.style.display = "none";
			modalPicture.style.display = "flex";
			modalForm.style.display = "flex";
			validateButton.style.display = "block";
			addButton.style.display = "none";
			addBtnPhoto.style.display = "block";
			addCondition.style.display = "block";
		}
		// Fonction pour afficher la modale de base avec la galerie de projet
		function switchToGalleryMode() {
			const titleElement = document.querySelector("h3");
			const img = document.querySelector(".miniature-photo");
			titleElement.textContent = "Galerie photo";
			modalGallery.style.display = "flex";
			modalContent.style.height = "731px";
			arrowLeft.style.display = "none";
			deleteButton.style.display = "block";
			modalPicture.style.display = "none";
			modalForm.style.display = "none";
			validateButton.style.display = "none";
			addButton.style.display = "block";
			errorMessage.style.display = "none";
			// Supprimer l'image sélectionnée
			if (img) {
				img.parentNode.removeChild(img);
				// Rendre l'élément <i> visible à nouveau
				imageAddPhoto.style.display = "block";
			}
			// Effacer le texte du titre
			titleInput.value = '';
			// Remettre la catégorie à null
			categorySelect.value = 'null';
			// Rendre le bouton d'ajout de photo et le texte des conditions visibles à nouveau
			addBtnPhoto.style.display = "inline-block";
			addCondition.style.display = "block";
			// Réinitialiser la valeur de fileInput
			fileInput.value = '';
			// Mettre à jour l'état
			isImageSelected = false;
			isTitleEntered = false;
			isCategorySelected = false;
			checkConditions();
		}
		let isImageSelected = false;
		let isTitleEntered = false;
		let isCategorySelected = false;
		fileInput.addEventListener('change', function() {
			isImageSelected = !!this.files[0];
			checkConditions();
		});
		titleInput.addEventListener('input', function() {
			isTitleEntered = !!this.value;
			checkConditions();
		});
		categorySelect.addEventListener('change', function() {
			isCategorySelected = this.value !== 'null';
			checkConditions();
		});
		// Fonction pour regarder si les conditions d'ajout de la photo sont bonnes
		function checkConditions() {
			if (isImageSelected && isTitleEntered && isCategorySelected) {
				validateButton.style.backgroundColor = '#1D6154';
				validateButton.style.color = 'white';
				validateButton.style.cursor = 'pointer';
			} else {
				validateButton.style.backgroundColor = '';
				validateButton.style.color = '';
				validateButton.style.cursor = '';
				validateButton.addEventListener("click", uploadPhoto);
			}
		}
		// Lorsqu'on clique sur le bouton d'ajout de photo, ouvrir le file input
		addBtnPhoto.addEventListener("click", function() {
			fileInput.click();
		});
		// Lorsqu'un fichier est choisi
		fileInput.addEventListener("change", function() {
			const file = this.files[0];
			// Vérifier la taille et le type du fichier
			if (file.size > 4 * 1024 * 1024 || (file.type !== "image/png" && file.type !== "image/jpeg")) {
				errorMessage.style.display = "block";
				return;
			} else {
				errorMessage.style.display = "none";
			}
			// Créer une URL pour le fichier
			const url = URL.createObjectURL(file);
			// Cacher l'élément <i>
			imageAddPhoto.style.display = "none";
			// Créer un nouvel élément <img> et l'insérer après le fileInput
			const img = document.createElement("img");
			img.src = url;
			img.classList.add("miniature-photo");
			fileInput.parentNode.insertBefore(img, fileInput.nextSibling);
			// Cacher le bouton et le texte des conditions
			addBtnPhoto.style.display = "none";
			addCondition.style.display = "none";
		});
		
		function getCategoryId(categoryName) {
			const categories = [{
				"id": 1,
				"name": "Objets"
			}, {
				"id": 2,
				"name": "Appartements"
			}, {
				"id": 3,
				"name": "Hotels & restaurants"
			}];
			const category = categories.find(cat => cat.name === categoryName);
			return category ? category.id : null;
		}
		// Fonction pour upload un projet
		function uploadPhoto() {
			const file = document.getElementById("inputPhoto").files[0];
			const title = document.getElementById("photoTitle").value;
			const category = document.getElementById("photoCategory").value;
			const categoryId = getCategoryId(category);
			if (!categoryId) {
				alert("Catégorie invalide");
				return;
			}
			let formData = new FormData();
			formData.append("image", file);
			formData.append("title", title);
			formData.append("category", categoryId);
			fetch("http://localhost:5678/api/works/", {
				method: "POST",
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
				body: formData
			}).then(response => {
				if (response.status === 201) {
					return response.json();
				} else if (response.status === 400) {
					throw new Error("Requête incorrecte");
				} else if (response.status === 401) {
					throw new Error("Non autorisé");
				} else {
					throw new Error("Erreur inattendue");
				}
			}).then(data => {
				console.log(data);
				switchToGalleryMode();
				fetch('http://localhost:5678/api/works').then(response => response.json()).then(data => {
					displayProjectsInModal(data, modalGallery);
				});
				fetch('http://localhost:5678/api/works').then(response => response.json()).then(data => {
					displayProjects(data);
				});
				alert("Photo ajoutée avec succès !");
			}).catch(error => {
				alert("Une erreur est survenue lors de l'ajout de la photo : " + error.message);
				console.error(error);
			});
		}
		
		function deletePhoto(photoId) {
			fetch(`http://localhost:5678/api/works/${photoId}`, {
				method: "DELETE",
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}).then((response) => {
				if (response.status == 204) {
					console.log("Suppression du Projet");
					// Recharger la galerie dans la modale
					fetch('http://localhost:5678/api/works').then(response => response.json()).then(data => {
						displayProjectsInModal(data, modalGallery);
					});
					// Recharger la galerie sur la page
					fetch('http://localhost:5678/api/works').then(response => response.json()).then(data => {
						displayProjects(data);
					});
				} else {
					alert("Erreur dans la suppression du projet");
				}
			}).catch((error) => {
				alert(error);
			});
		}
		// Ajouter un gestionnaire d'événement délégué pour la galerie modale
		modalGallery.addEventListener("click", function(event) {
			const trashCan = event.target.closest('.trash-can');
			if (trashCan) {
				const figure = trashCan.parentNode;
				const photoId = figure.dataset.id;
				const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce projet ?");
				if (confirmDelete) {
					deletePhoto(photoId);
				}
			}
		});
		// Fonction pour supprimer toute la galerie de projets
		function deleteGallery() {
			const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer toute la galerie ?");
			if (confirmDelete) {
				// Supprimer tous les projets de la galerie
				const gallery = document.querySelector('.gallery');
				gallery.innerHTML = '';
				// Appeler la fonction deletePhoto pour supprimer chaque projet individuellement
				allProjects.forEach(project => {
					deletePhoto(project.id);
				});
				// Réinitialiser la variable allProjects
				allProjects = [];
			}
		}
		// Ajouter un gestionnaire d'événement au bouton de suppression de la galerie
		deleteButton.addEventListener("click", deleteGallery);
	});
};
    

    

    