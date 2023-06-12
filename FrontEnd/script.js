fetch(`http://localhost:5678/api/works`)
.then(response => response.json())
.then(data => {
    const gallery = document.querySelector(`.gallery`);

    data.forEach(project => {
        const figure = document.createElement(`figure`);
        
        const img = document.createElement(`img`);
        img.src = project.imageUrl;
        img.alt = project.title;

        const figcaption = document.createElement(`figcaption`);
        figcaption.textContent = project.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);

        gallery.appendChild(figure);
    });
});