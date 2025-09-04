export function inicializarBurbujas(contenedor) {
    const css = document.createElement('link');
    css.href = './css/burbujas.css';
    css.rel = 'stylesheet';
    document.head.appendChild(css);

    let burbujasInfo = [];
    let animacionActiva = true;
    let posicionesGrid = [];
    let dimensionesBurbuja = { width: 80, height: 80 };

    const lenguajes = [
        { id: 1, nombre: 'JavaScript', descripcion: 'Lenguaje de programación para desarrollo web y aplicaciones interactivas.', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png' },
        { id: 2, nombre: 'Python', descripcion: 'Lenguaje versátil y fácil de leer, usado en ciencia de datos, IA y desarrollo web.', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
        { id: 3, nombre: 'Java', descripcion: 'Lenguaje de propósito general, ampliamente usado en desarrollo empresarial y móvil.', logo: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg' },
        { id: 4, nombre: 'C++', descripcion: 'Lenguaje de alto rendimiento usado en sistemas embebidos, juegos y aplicaciones de alto nivel.', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg' },
        { id: 5, nombre: 'Ruby', descripcion: 'Lenguaje interpretado enfocado en simplicidad y productividad, usado en desarrollo web.', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Ruby_logo.svg' },
        { id: 6, nombre: 'Go', descripcion: 'Lenguaje moderno desarrollado por Google, eficiente y concurrente.', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg' },
        { id: 7, nombre: 'Swift', descripcion: 'Lenguaje de Apple para el desarrollo de aplicaciones iOS y macOS.', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Swift_logo.svg' },
        { id: 8, nombre: 'PHP', descripcion: 'Lenguaje de servidor popular en desarrollo web dinámico.', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg' }
    ];

    // Contenedor principal
    const divBurbujas = document.createElement('div');
    divBurbujas.className = 'divBurbujas';
    contenedor.appendChild(divBurbujas);

    // Panel de información
    const panelInfo = document.createElement('div');
    panelInfo.className = 'panelInfo';
    contenedor.appendChild(panelInfo);

    // Tabla para posiciones ordenadas
    const tablaBurbujas = document.createElement('div');
    tablaBurbujas.className = 'tablaBurbujas';
    contenedor.appendChild(tablaBurbujas);

    // Botón de animación
    const botonAnimar = document.createElement('button');
    botonAnimar.innerText = 'Animar';
    botonAnimar.className = 'botonAnimar';

    botonAnimar.onmouseover = () => {
        if (botonAnimar.style.opacity !== '0') {
            botonAnimar.style.transform = 'translateX(-50%) scale(1.05)';
            botonAnimar.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        }
    };
    botonAnimar.onmouseout = () => {
        if (botonAnimar.style.opacity !== '0') {
            botonAnimar.style.transform = 'translateX(-50%) scale(0.95)';
            botonAnimar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        }
    };
    contenedor.appendChild(botonAnimar);

    const anchoContenedor = divBurbujas.clientWidth;
    const altoContenedor = divBurbujas.clientHeight;

    // Dimensiones responsivas
    function calcularDimensionesResponsivas() {
        dimensionesBurbuja.width = Math.min(80, anchoContenedor * 0.15);
        dimensionesBurbuja.height = dimensionesBurbuja.width;

        return {
            esMobile: anchoContenedor < 500,
            columnas: anchoContenedor < 500 ? 2 : 3,
            espaciado: anchoContenedor < 500 ? 10 : 20
        };
    }

    // Posiciones en cuadrícula
    function calcularPosicionesGrid() {
        const { esMobile, columnas, espaciado } = calcularDimensionesResponsivas();
        const contenedorRect = divBurbujas.getBoundingClientRect();
        const filas = Math.ceil(lenguajes.length / columnas);

        const anchoDisponible = esMobile ?
            contenedorRect.width - espaciado * 3 :
            contenedorRect.width * 0.5;

        tablaBurbujas.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
        tablaBurbujas.style.width = esMobile ? '65%' : '60%';
        tablaBurbujas.style.right = esMobile ? '5%' : '20px';

        posicionesGrid = [];
        const anchoColumna = (anchoDisponible - (espaciado * (columnas + 1))) / columnas;

        for (let i = 0; i < lenguajes.length; i++) {
            const fila = Math.floor(i / columnas);
            const columna = i % columnas;

            posicionesGrid.push({
                x: contenedorRect.width - anchoDisponible + (columna * (anchoColumna + espaciado)) + espaciado + 70,
                y: (contenedorRect.height - (filas * (dimensionesBurbuja.height + espaciado))) / 2 +
                    (fila * (dimensionesBurbuja.height + espaciado))
            });
        }
    }

    // Crear burbujas
    function crearBurbuja(lenguaje, index) {
        const burbuja = document.createElement('div');
        burbuja.className = 'burbuja';
        burbuja.classList.add(`${lenguaje.nombre}`);
        burbuja.dataset.id = lenguaje.id;

        const posicionInicial = {
            x: Math.random() * (divBurbujas.clientWidth - dimensionesBurbuja.width),
            y: Math.random() * (divBurbujas.clientHeight - dimensionesBurbuja.height)
        };

        burbuja.style.width = `${dimensionesBurbuja.width}px`;
        burbuja.style.height = `${dimensionesBurbuja.height}px`;
        burbuja.style.left = `${posicionInicial.x}px`;
        burbuja.style.top = `${posicionInicial.y}px`;

        const img = document.createElement('img');
        img.src = lenguaje.logo;
        img.alt = lenguaje.nombre;
        img.style.cssText = `
            width: ${dimensionesBurbuja.width * 0.6}px;
            height: ${dimensionesBurbuja.height * 0.6}px;
            pointer-events: none;
            transition: transform 0.3s ease;
        `;
        burbuja.appendChild(img);
        divBurbujas.appendChild(burbuja);

        // Hover
        burbuja.addEventListener('mouseenter', () => {
            if (animacionActiva) {
                burbuja.style.transform = 'scale(1.1)';
                burbuja.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
                img.style.transform = 'scale(1.1)';
            }
        });

        burbuja.addEventListener('mouseleave', () => {
            if (animacionActiva) {
                burbuja.style.transform = 'scale(1)';
                burbuja.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                img.style.transform = 'scale(1)';
            }
        });

        // Click
        burbuja.addEventListener('click', () => {
            if (animacionActiva) {
                ordenarBurbujas(lenguaje, burbuja);
            }
            let burbujaActiva = document.querySelector('.burbuja-titulo');
            if (burbujaActiva) {
                burbujaActiva.classList.remove('burbuja-titulo');
                ordenarBurbujas(lenguaje, burbuja);
                burbuja.classList.add('burbuja-titulo');
            } else {
                burbuja.classList.add('burbuja-titulo');
            }
        });

        return {
            elemento: burbuja,
            x: posicionInicial.x,
            y: posicionInicial.y,
            velocidadX: (Math.random() - 0.5) * 5,
            velocidadY: (Math.random() - 0.5) * 5,
            posicionGrid: index
        };
    }

    // Ordenar burbujas
    function ordenarBurbujas(lenguaje, burbujaClickeada) {
        animacionActiva = false;

        botonAnimar.style.opacity = '0';
        botonAnimar.style.pointerEvents = 'none';
        panelInfo.style.opacity = '0';
        panelInfo.style.transform = 'translate(-50%, -50%) scale(0.9)';
        panelInfo.style.pointerEvents = 'none';

        burbujasInfo.forEach((info, index) => {
            info.elemento.classList.add(`burbuja-posicion-${index}`);
        });

        setTimeout(() => {
            panelInfo.innerHTML = `
                <h3 style="margin: 0 0 10px 0; color: #4682B4; font-size: 1.2em">${lenguaje.nombre}</h3>
                <p style="margin: auto; line-height: 1.6; color: #333">${lenguaje.descripcion}</p>
            `;
            panelInfo.style.opacity = '1';
            panelInfo.style.transform = 'translate(-50%, -50%) scale(1)';
            panelInfo.style.pointerEvents = 'auto';
        }, burbujasInfo.length * 50);

        setTimeout(() => {
            botonAnimar.style.opacity = '1';
            botonAnimar.style.pointerEvents = 'auto';
            botonAnimar.style.transform = 'translateX(-50%) scale(0.95)';
        }, 800 + (burbujasInfo.length * 50));
    }

    // Reiniciar animación
    botonAnimar.addEventListener('click', () => {
        animacionActiva = true;
        document.querySelectorAll('.burbuja-titulo').forEach(burbuja => {
            burbuja.classList.remove('burbuja-titulo');
        });

        panelInfo.style.opacity = '0';
        panelInfo.style.transform = 'translate(-50%, -50%) scale(0.9)';
        panelInfo.style.pointerEvents = 'none';
        botonAnimar.style.opacity = '0';
        botonAnimar.style.pointerEvents = 'none';

        burbujasInfo.forEach((info, index) => {
            info.elemento.classList.remove(`burbuja-posicion-${index}`);
        });

        burbujasInfo.forEach((info, index) => {
            setTimeout(() => {
                info.x = Math.random() * (divBurbujas.clientWidth - dimensionesBurbuja.width);
                info.y = Math.random() * (divBurbujas.clientHeight - dimensionesBurbuja.height);
                info.velocidadX = (Math.random() - 0.5) * 2;
                info.velocidadY = (Math.random() - 0.5) * 2;
                info.elemento.style.transition = 'all 0.3s ease-in';
                info.elemento.style.left = `${info.x}px`;
                info.elemento.style.top = `${info.y}px`;
            }, index * 50);
        });

        setTimeout(() => {
            iniciarAnimacion();
        }, burbujasInfo.length * 50);
    });

    // Crear burbujas
    lenguajes.forEach((lenguaje, index) => {
        const burbujaInfo = crearBurbuja(lenguaje, index);
        burbujasInfo.push(burbujaInfo);
    });

    // Animación
    function iniciarAnimacion() {
        let ultimoTiempo = 0;
        const VELOCIDAD_MAX = 8;

        function animar(tiempoActual) {
            if (!animacionActiva) return;

            const deltaTime = (tiempoActual - ultimoTiempo) / 16;
            ultimoTiempo = tiempoActual;

            burbujasInfo.forEach(info => {
                info.x += info.velocidadX * deltaTime;
                info.y += info.velocidadY * deltaTime;

                if (info.x <= 0) {
                    info.velocidadX *= -1;
                    info.x = 0;
                } else if (info.x >= divBurbujas.clientWidth - dimensionesBurbuja.width) {
                    info.velocidadX *= -1;
                    info.x = divBurbujas.clientWidth - dimensionesBurbuja.width;
                }

                if (info.y <= 0) {
                    info.velocidadY *= -1;
                    info.y = 0;
                } else if (info.y >= divBurbujas.clientHeight - dimensionesBurbuja.height) {
                    info.velocidadY *= -1;
                    info.y = divBurbujas.clientHeight - dimensionesBurbuja.height;
                }

                info.velocidadX = Math.max(Math.min(info.velocidadX, VELOCIDAD_MAX), -VELOCIDAD_MAX);
                info.velocidadY = Math.max(Math.min(info.velocidadY, VELOCIDAD_MAX), -VELOCIDAD_MAX);

                info.elemento.style.left = `${info.x}px`;
                info.elemento.style.top = `${info.y}px`;
            });

            requestAnimationFrame(animar);
        }

        requestAnimationFrame(animar);
    }

    iniciarAnimacion();

    // Resize
    let temporizadorResize;
    window.addEventListener('resize', () => {
        clearTimeout(temporizadorResize);
        temporizadorResize = setTimeout(() => {
            calcularDimensionesResponsivas();
            if (!animacionActiva) {
                calcularPosicionesGrid();
                burbujasInfo.forEach((info, index) => {
                    const posicion = posicionesGrid[index];
                    info.x = posicion.x;
                    info.y = posicion.y;
                    info.elemento.style.left = `${posicion.x}px`;
                    info.elemento.style.top = `${posicion.y}px`;
                });
            }
        }, 100);
    });

    calcularDimensionesResponsivas();
}
