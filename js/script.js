import { inicializarBurbujas } from './habilidades.js';
import { proyectos } from './proyectos.js';
const links = document.querySelectorAll('.nav-link');
const secciones = document.querySelectorAll('.seccion');

// Función para eliminar la clase 'activo' de todas las secciones y enlaces
function borrarClaseActivo() {
    secciones.forEach(section => section.classList.remove('activo'));
    links.forEach(link => link.classList.remove('activo'));
}

// Función para manejar el clic en los enlaces de navegación
links.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        borrarClaseActivo();

        link.classList.add('activo');
        const id_diapositiva = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(id_diapositiva);
        targetSection.classList.add('activo');
    });
});

const habilidades = document.getElementById('habilidades-grid');

inicializarBurbujas(habilidades)

// Función para manejar el acordeón
function toggleAccordion(clickedTitle) {
    const allContents = document.querySelectorAll('.habilidades-contenido');
    const clickedContent = clickedTitle.nextElementSibling;
    
    // Si el contenido clickeado no está activo
    if (!clickedContent.classList.contains('activo')) {
        // Cerrar todos los contenidos abiertos
        allContents.forEach(content => {
            content.classList.remove('activo');
        });
        // Abrir el contenido clickeado
        clickedContent.classList.add('activo');
    } else {
        // Si está activo, cerrarlo
        clickedContent.classList.remove('activo');
    }
}

// Agregar event listeners a los títulos
const categoryTitles = document.querySelectorAll('.habilidades-categoria h2');
categoryTitles.forEach(title => {
    title.addEventListener('click', () => toggleAccordion(title));
});

// Código para agregar proyectos dinámicamente

const proyectosGrid = document.getElementById('proyectos-grid');

proyectos.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image">
        <div class="project-info">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer">Ver Proyecto</a>
        </div>
    `;
    proyectosGrid.appendChild(projectCard);
});


// Función para manejar el clic en los botones "Ver Proyecto"
const projectLinks = document.querySelectorAll('.project-link');

projectLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        borrarClaseActivo();

        const url = link.getAttribute('href');
        window.open(url, '_blank');
    });
});
