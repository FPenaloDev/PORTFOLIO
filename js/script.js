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

// Inicializar burbujas de habilidades
const habilidades = document.getElementById('habilidades-grid');
inicializarBurbujas(habilidades);

// Agregar event listeners a los títulos de habilidades (acordeón)
const categoryTitles = document.querySelectorAll('.habilidades-categoria h2');
categoryTitles.forEach(title => {
    title.addEventListener('click', () => toggleAccordion(title));
});

// --------------------------
// Proyectos dinámicos
// --------------------------
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