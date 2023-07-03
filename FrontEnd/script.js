let allProjects = [];

fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        allProjects = data;
        displayProjects(data);
    });

function displayProjects(projects) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

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
            const contactElement = document.getElementById('contact');
            contactElement.scrollIntoView();
        }, 100);
    }
}

fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(categories => {
        const filterButtons = document.querySelector('.filter-buttons');

        const allButton = document.createElement('button');
        allButton.textContent = "Tous";
        allButton.classList.add('filter-selected');
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
    setSelectedFilter(selectedButton);
}

function setSelectedFilter(selectedButton) {
    const buttons = document.querySelectorAll('.filter-buttons button');
    buttons.forEach(button => {
        button.classList.remove('filter-selected');
    });
    selectedButton.classList.add('filter-selected');
}

function logged() {
    const edit = document.querySelector(".edit");
    const filterButtons = document.querySelector('.filter-buttons');
    const header = document.querySelector("header");
    const editButtons = document.querySelectorAll(".edit-button");

    if (localStorage.getItem("token")) {
        filterButtons.style.display = "none";
        edit.style.display = "flex";
        header.style.margin = "97px 0";
        editButtons.forEach(button => {
            button.style.display = "flex";
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    logged();
});