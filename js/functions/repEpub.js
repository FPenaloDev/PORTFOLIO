export function repEpub(){
    fetch('./proyectos/repEpub.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('rep_epub').innerHTML = html;
        })
        .catch(error => console.error('Error al cargar el archivo HTML:', error));
}