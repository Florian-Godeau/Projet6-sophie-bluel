let allProjects = [];

fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        allProjects = data;
        displayProjects(data);
    });

function displayProjects(projects) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; // Clear the gallery

    projects.forEach(project => {
        const figure = document.createElement('figure');

        const img = document.createElement('img');
        img.src = project.imageUrl;
        img.alt = project.title;

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = project.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);

        gallery.appendChild(figure);
    });

    if (window.location.hash === '#contact') {
        setTimeout(function() {
            // Faire défiler jusqu'à l'élément après que le contenu ait été généré.
            const contactElement = document.getElementById('contact');
            contactElement.scrollIntoView();
        }, 100); // Définissez le délai en fonction de votre besoin
    }
}

fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(categories => {
        const filterButtons = document.querySelector('.filter-buttons');

        const allButton = document.createElement('button');
        allButton.textContent = "Tous";
        allButton.classList.add('filter-selected'); // Ajouter 'filter-selected' à 'Tous' par défaut
        allButton.classList.add('filter');
        allButton.addEventListener('click', () => filterProjects(null, allButton));
        filterButtons.appendChild(allButton);

        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category.name;
            button.classList.add('filter');
            button.addEventListener('click', () => filterProjects(category.id, button));
            filterButtons.appendChild(button);
        });
    });

function filterProjects(categoryId, selectedButton) {
    const filteredProjects = !categoryId ? allProjects : allProjects.filter(project => project.categoryId === categoryId);
    displayProjects(filteredProjects);
    setSelectedFilter(selectedButton); // Ajoutez cette ligne
}

function setSelectedFilter(selectedButton) {
    const buttons = document.querySelectorAll('.filter-buttons button');
    buttons.forEach(button => {
        button.classList.remove('filter-selected');
    });
    selectedButton.classList.add('filter-selected');
}