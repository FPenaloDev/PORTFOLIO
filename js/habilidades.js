// Archivo: burbujas.js
// Versión ajustada para que al hacer click en una burbuja se llamen
// calcularDimensionesResponsivas() y se reorganicen/ajusten en cuadrícula responsiva.

export function inicializarBurbujas(contenedor) {
    // ===== Carga de estilos =====
    const css = document.createElement('link');
    css.href = './css/burbujas.css';
    css.rel = 'stylesheet';
    document.head.appendChild(css);

    // ===== Estado =====
    let burbujasInfo = [];
    let animacionActiva = true;
    let posicionesGrid = [];
    const dimensionesBurbuja = { width: 80, height: 80 };

    // ===== Datos =====
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

    // ===== DOM base =====
    // Contenedor principal (zona de movimiento de burbujas)
    const divBurbujas = document.createElement('div');
    divBurbujas.className = 'divBurbujas';
    divBurbujas.style.position = 'relative';
    divBurbujas.style.overflow = 'hidden';
    contenedor.appendChild(divBurbujas);

    // Panel de información (centro)
    const panelInfo = document.createElement('div');
    panelInfo.className = 'panelInfo';
    panelInfo.style.transition = 'all 0.3s ease';
    panelInfo.style.opacity = '0';
    panelInfo.style.pointerEvents = 'none';
    contenedor.appendChild(panelInfo);

    // (Opcional) “Tabla” virtual para calcular columnas/anchos
    const tablaBurbujas = document.createElement('div');
    tablaBurbujas.className = 'tablaBurbujas';
    contenedor.appendChild(tablaBurbujas);

    // Botón para reanudar animación
    const botonAnimar = document.createElement('button');
    botonAnimar.innerText = 'Animar';
    botonAnimar.className = 'botonAnimar';
    botonAnimar.style.transition = 'all 0.3s ease';
    botonAnimar.style.opacity = '0';
    botonAnimar.style.pointerEvents = 'none';

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

    // ===== Helpers =====
    function slugClase(nombre) {
        return String(nombre).toLowerCase().replace(/\W+/g, '-'); // evita clases inválidas (C++)
    }

    // Dimensiones responsivas (se recalculan SIEMPRE con medidas actuales)
    function calcularDimensionesResponsivas() {
        const ancho = divBurbujas.clientWidth || 0;
        const alto = divBurbujas.clientHeight || 0;

        const w = Math.min(80, ancho * 0.15);
        dimensionesBurbuja.width = Math.max(40, w); // límites razonables
        dimensionesBurbuja.height = dimensionesBurbuja.width;

        const esMobile = ancho < 500;
        const columnas = esMobile ? 2 : 3;
        const espaciado = esMobile ? 10 : 20;

        return { ancho, alto, esMobile, columnas, espaciado };
    }

    function aplicarDimensionesABurbujas() {
        burbujasInfo.forEach(info => {
            const el = info.elemento;
            el.style.width = `${dimensionesBurbuja.width}px`;
            el.style.height = `${dimensionesBurbuja.height}px`;
            const img = el.querySelector('img');
            if (img) {
                img.style.width = `${dimensionesBurbuja.width * 0.6}px`;
                img.style.height = `${dimensionesBurbuja.height * 0.6}px`;
            }
        });
    }

    // Calcula/guarda posiciones de cuadrícula en posicionesGrid
    function calcularPosicionesGrid() {
        const { esMobile, columnas, espaciado } = calcularDimensionesResponsivas();
        const contenedorRect = divBurbujas.getBoundingClientRect();
        const filas = Math.ceil(lenguajes.length / columnas);

        // Zona "derecha" o “mitad” donde colocaremos la grilla
        const anchoDisponible = esMobile
            ? contenedorRect.width - espaciado * 3
            : contenedorRect.width * 0.5;

        // Ajustes visuales (opcionales)
        tablaBurbujas.style.display = 'grid';
        tablaBurbujas.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
        tablaBurbujas.style.width = esMobile ? '65%' : '60%';
        tablaBurbujas.style.position = 'absolute';
        tablaBurbujas.style.right = esMobile ? '5%' : '20px';

        posicionesGrid = [];
        const anchoColumna = (anchoDisponible - (espaciado * (columnas + 1))) / columnas;

        for (let i = 0; i < lenguajes.length; i++) {
            const fila = Math.floor(i / columnas);
            const columna = i % columnas;
            const xBase = contenedorRect.width - anchoDisponible + (columna * (anchoColumna + espaciado)) + espaciado + 70;
            const altoTotal = filas * (dimensionesBurbuja.height + espaciado);
            const yBase = (contenedorRect.height - altoTotal) / 2 + (fila * (dimensionesBurbuja.height + espaciado));

            posicionesGrid.push({ x: xBase, y: Math.max(0, yBase) });
        }
    }

    function moverBurbujasAPosicionesGrid(conTransicion = true) {
        burbujasInfo.forEach((info, index) => {
            const pos = posicionesGrid[index];
            if (!pos) return;
            const el = info.elemento;
            if (conTransicion) el.style.transition = 'left 0.35s ease, top 0.35s ease, transform 0.2s ease, box-shadow 0.2s ease';
            info.x = pos.x;
            info.y = pos.y;
            el.style.left = `${pos.x}px`;
            el.style.top = `${pos.y}px`;
        });
    }

    // ===== Crear burbujas =====
    function crearBurbuja(lenguaje, index) {
        const burbuja = document.createElement('div');
        burbuja.className = `burbuja ${slugClase(lenguaje.nombre)}`;
        burbuja.dataset.id = lenguaje.id;
        burbuja.style.position = 'absolute';
        burbuja.style.borderRadius = '50%';
        burbuja.style.display = 'flex';
        burbuja.style.alignItems = 'center';
        burbuja.style.justifyContent = 'center';
        burbuja.style.cursor = 'pointer';
        burbuja.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        burbuja.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';

        // Dimensiones y posición inicial
        const { ancho, alto } = calcularDimensionesResponsivas();
        aplicarDimensionesABurbujas(); // si ya hay otras, asegura consistencia

        const posicionInicial = {
            x: Math.random() * Math.max(1, (ancho - dimensionesBurbuja.width)),
            y: Math.random() * Math.max(1, (alto - dimensionesBurbuja.height))
        };

        burbuja.style.width = `${dimensionesBurbuja.width}px`;
        burbuja.style.height = `${dimensionesBurbuja.height}px`;
        burbuja.style.left = `${posicionInicial.x}px`;
        burbuja.style.top = `${posicionInicial.y}px`;
        burbuja.style.background = '#fff';

        const img = document.createElement('img');
        img.src = lenguaje.logo;
        img.alt = lenguaje.nombre;
        img.style.width = `${dimensionesBurbuja.width * 0.6}px`;
        img.style.height = `${dimensionesBurbuja.height * 0.6}px`;
        img.style.pointerEvents = 'none';
        img.style.transition = 'transform 0.3s ease';
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

        // Click -> ordenar en cuadrícula + panel + recalcular dimensiones
        burbuja.addEventListener('click', () => {
            // Marcar activa
            document.querySelectorAll('.burbuja-titulo').forEach(b => b.classList.remove('burbuja-titulo'));
            burbuja.classList.add('burbuja-titulo');
            ordenarBurbujas(lenguaje, burbuja);
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

    // ===== Ordenar/mostrar info =====
    function ordenarBurbujas(lenguaje, burbujaClickeada) {
        animacionActiva = false; // detiene el loop en el próximo frame

        // Ocultar UI mientras ordenamos
        botonAnimar.style.opacity = '0';
        botonAnimar.style.pointerEvents = 'none';
        panelInfo.style.opacity = '0';
        panelInfo.style.transform = 'translate(-50%, -50%) scale(0.9)';
        panelInfo.style.pointerEvents = 'none';

        // 1) Recalcular dimensiones y posiciones responsivas
        calcularDimensionesResponsivas();
        aplicarDimensionesABurbujas();
        calcularPosicionesGrid();

        // 2) Mover todas a la cuadrícula
        moverBurbujasAPosicionesGrid(true);

        // 3) Mostrar info con leve retardo
        setTimeout(() => {
            panelInfo.innerHTML = `
                <h3 style="margin: 0 0 10px 0; color: #4682B4; font-size: 1.2em">${lenguaje.nombre}</h3>
                <p style="margin: auto; line-height: 1.6; color: #333">${lenguaje.descripcion}</p>
            `;
            panelInfo.style.opacity = '1';
            panelInfo.style.transform = 'translate(-50%, -50%) scale(1)';
            panelInfo.style.pointerEvents = 'auto';
        }, 150);

        // 4) Mostrar botón para reanudar animación
        setTimeout(() => {
            botonAnimar.style.opacity = '1';
            botonAnimar.style.pointerEvents = 'auto';
            botonAnimar.style.transform = 'translateX(-50%) scale(0.95)';
        }, 350);
    }

    // ===== Reiniciar animación =====
    botonAnimar.addEventListener('click', () => {
        animacionActiva = true;
        document.querySelectorAll('.burbuja-titulo').forEach(b => b.classList.remove('burbuja-titulo'));

        panelInfo.style.opacity = '0';
        panelInfo.style.transform = 'translate(-50%, -50%) scale(0.9)';
        panelInfo.style.pointerEvents = 'none';
        botonAnimar.style.opacity = '0';
        botonAnimar.style.pointerEvents = 'none';

        // Recolocar de forma aleatoria y luego reanudar
        const { ancho, alto } = calcularDimensionesResponsivas();
        aplicarDimensionesABurbujas();

        burbujasInfo.forEach((info, index) => {
            setTimeout(() => {
                info.x = Math.random() * Math.max(1, (ancho - dimensionesBurbuja.width));
                info.y = Math.random() * Math.max(1, (alto - dimensionesBurbuja.height));
                info.velocidadX = (Math.random() - 0.5) * 2;
                info.velocidadY = (Math.random() - 0.5) * 2;
                info.elemento.style.transition = 'left 0.3s ease, top 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease';
                info.elemento.style.left = `${info.x}px`;
                info.elemento.style.top = `${info.y}px`;
            }, index * 40);
        });

        setTimeout(() => {
            iniciarAnimacion(); // reanuda el bucle
        }, burbujasInfo.length * 40 + 80);
    });

    // ===== Instanciar burbujas =====
    lenguajes.forEach((lenguaje, index) => {
        const info = crearBurbuja(lenguaje, index);
        burbujasInfo.push(info);
    });

    // ===== Animación =====
    function iniciarAnimacion() {
        let ultimoTiempo = 0;
        const VELOCIDAD_MAX = 1;

        function animar(tiempoActual) {
            if (!animacionActiva) return; // cortar el bucle

            if (ultimoTiempo === 0) {
                ultimoTiempo = tiempoActual;
            }
            const deltaTime = Math.max(0.5, Math.min(2, (tiempoActual - ultimoTiempo) / 16));
            ultimoTiempo = tiempoActual;

            burbujasInfo.forEach(info => {
                info.x += info.velocidadX * deltaTime;
                info.y += info.velocidadY * deltaTime;

                // Colisiones con bordes
                const maxX = Math.max(0, divBurbujas.clientWidth - dimensionesBurbuja.width);
                const maxY = Math.max(0, divBurbujas.clientHeight - dimensionesBurbuja.height);

                if (info.x <= 0) {
                    info.velocidadX *= -1;
                    info.x = 0;
                } else if (info.x >= maxX) {
                    info.velocidadX *= -1;
                    info.x = maxX;
                }

                if (info.y <= 0) {
                    info.velocidadY *= -1;
                    info.y = 0;
                } else if (info.y >= maxY) {
                    info.velocidadY *= -1;
                    info.y = maxY;
                }

                // Limitar velocidad
                info.velocidadX = Math.max(Math.min(info.velocidadX, VELOCIDAD_MAX), -VELOCIDAD_MAX);
                info.velocidadY = Math.max(Math.min(info.velocidadY, VELOCIDAD_MAX), -VELOCIDAD_MAX);

                // Pintar
                info.elemento.style.left = `${info.x}px`;
                info.elemento.style.top = `${info.y}px`;
            });

            requestAnimationFrame(animar);
        }

        requestAnimationFrame(animar);
    }

    iniciarAnimacion();

    // ===== Resize =====
    let temporizadorResize;
    window.addEventListener('resize', () => {
        clearTimeout(temporizadorResize);
        temporizadorResize = setTimeout(() => {
            // Recalcular tamaños SIEMPRE
            calcularDimensionesResponsivas();
            aplicarDimensionesABurbujas();

            // Si estamos en cuadrícula (animación parada), recalcular y aplicar posiciones
            if (!animacionActiva) {
                calcularPosicionesGrid();
                moverBurbujasAPosicionesGrid(false);
            }
        }, 100);
    });

    // Inicial
    calcularDimensionesResponsivas();
    aplicarDimensionesABurbujas();
}
