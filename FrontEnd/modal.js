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

    // Créer la div d'ajout de photo
    const modalPicture = document.createElement("div");
    modalPicture.classList.add("modal-picture");
    modalContent.insertBefore(modalPicture, document.querySelector("h3").nextSibling)

    // Ajouter l'élément <i> avec les classes 'fa-regular' et 'fa-image' à la div 'modal-picture'
    const imageAddPhoto = document.createElement("i");
    imageAddPhoto.classList.add("fa-regular", "fa-image");
    modalPicture.appendChild(imageAddPhoto);

    // Ajouter le bouton d'ajout de photo
    const addBtnPhoto = document.createElement("button");
    addBtnPhoto.textContent = "+ Ajouter photo";
    addBtnPhoto.classList.add("btn-add-photo");
    modalPicture.appendChild(addBtnPhoto);

    // Ajouter les conditions d'ajout de photo
    const addCondition = document.createElement("p");
    addCondition.textContent = "jpg, png : 4mo max";
    addCondition.classList.add("add-photo-condition");
    modalPicture.appendChild(addCondition);

    // Ajouter un input de type file invisible
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/png, image/jpeg";
    fileInput.style.display = "none";
    fileInput.setAttribute('id', 'inputPhoto');
    modalPicture.appendChild(fileInput);

    // Ajouter un message d'erreur
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("add-photo-error");
    errorMessage.textContent = "Cette image ne respecte pas les conditions";
    addCondition.parentNode.insertBefore(errorMessage, addCondition.nextSibling);

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

    // Créer le formulaire pour le titre de la photo
    const modalForm = document.createElement("form");
    modalForm.classList.add("modal-form");
    modalForm.setAttribute('method', "post");
    modalForm.setAttribute('action', "#");  // Remplacez "#" par l'URL de soumission du formulaire si nécessaire

    // Créer un label pour le champ du titre
    const labelElement = document.createElement("label");
    labelElement.setAttribute('for', "photoTitle");
    labelElement.textContent = "Titre";

    // Créer le champ de saisie pour le titre de la photo
    const inputElement = document.createElement("input");
    inputElement.setAttribute('type', "text");
    inputElement.setAttribute('name', "photoTitle");
    inputElement.setAttribute('id', "photoTitle");
    inputElement.setAttribute('required', true);

    // Ajouter le label et le champ de saisie au formulaire
    modalForm.appendChild(labelElement);
    modalForm.appendChild(inputElement);

    // Créer un label pour le champ de la catégorie
    const labelCategory = document.createElement("label");
    labelCategory.setAttribute('for', "photoCategory");
    labelCategory.textContent = "Catégorie";

    // Créer le menu déroulant pour la catégorie de la photo
    const selectCategory = document.createElement("select");
    selectCategory.setAttribute('name', "photoCategory");
    selectCategory.setAttribute('id', "photoCategory");

    // Créer les options pour le menu déroulant
    const categories = [null, "Objets", "Appartements", "Hotels & restaurants"];
    for (let category of categories) {
        const optionElement = document.createElement("option");
        optionElement.setAttribute('value', category);
        optionElement.textContent = category;
        selectCategory.appendChild(optionElement);
    }

    // Ajouter le label et le menu déroulant au formulaire
    modalForm.appendChild(labelCategory);
    modalForm.appendChild(selectCategory);

    // Insérer le formulaire après la div 'modal-picture'
    modalContent.insertBefore(modalForm, modalPicture.nextSibling);


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

    let isImageSelected = false;
    let isTitleEntered = false;
    let isCategorySelected = false;
    const titleInput = document.getElementById('photoTitle');
    const categorySelect = document.getElementById('photoCategory');

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

    closeModalElement.onclick = function() {
    isImageSelected = false;
    isTitleEntered = false;
    isCategorySelected = false;
    titleInput.value = '';
    categorySelect.value = 'null';
    checkConditions();
    }

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
            addBtnPhoto.style.display = "inline-block";  // or "block" depending on your styling needs
            addCondition.style.display = "block";
            
            // Réinitialiser la valeur de fileInput
            fileInput.value = '';
            
            // Mettre à jour l'état
            isImageSelected = false;
            isTitleEntered = false;
            isCategorySelected = false;
            checkConditions();
        }
        
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
    
    
    function displayProjectsInModal(projects, gallery) {
        gallery.innerHTML = '';
    
        projects.forEach((project, index) => {
            const figure = document.createElement('figure');
            figure.draggable = true;
            figure.dataset.id = project.id;
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
    
        const deleteIcons = gallery.querySelectorAll(".trash-can");
        deleteIcons.forEach(trashCan => {
            const figure = trashCan.parentNode;
            const photoId = figure.dataset.id;
            trashCan.value = photoId;
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

    function getCategoryId(categoryName) {
        const categories = [
            {
                "id": 1,
                "name": "Objets"
            },
            {
                "id": 2,
                "name": "Appartements"
            },
            {
                "id": 3,
                "name": "Hotels & restaurants"
            }
        ];
    
        const category = categories.find(cat => cat.name === categoryName);
        return category ? category.id : null;
    }
    
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
        })
            .then(response => {
                if (response.status === 201) {
                    return response.json();
                } else if (response.status === 400) {
                    throw new Error("Requête incorrecte");
                } else if (response.status === 401) {
                    throw new Error("Non autorisé");
                } else {
                    throw new Error("Erreur inattendue");
                }
            })
            .then(data => {
                console.log(data);
                switchToGalleryMode();
                fetch('http://localhost:5678/api/works')
                    .then(response => response.json())
                    .then(data => {
                        displayProjectsInModal(data, modalGallery);
                    });
                alert("Photo ajoutée avec succès !");
            })
            .catch(error => {
                alert("Une erreur est survenue lors de l'ajout de la photo : " + error.message);
                console.error(error);
            });
    }
});