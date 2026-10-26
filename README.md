# Proyecto de Aula 8° · Lógica de programación con Arduino

Versión mejorada del sitio **"Fortalecimiento de la lógica de programación mediante el diseño de prototipos con Arduino"**, desarrollado con estudiantes de grado octavo de la I.E. Técnica José Cayetano Vásquez (Ciénega, Boyacá), como parte de la práctica pedagógica de la Licenciatura en Informática de la UPTC.

| | |
|---|---|
| **Sitio mejorado (publicado)** | https://maikol309.github.io/proyecto-aula-8/ |
| **Sitio original en Google Sites** | https://sites.google.com/uptc.edu.co/proyectodeaula8/ |
| **Repositorio** | https://github.com/maikol309/proyecto-aula-8 |

---

## ¿Qué es este proyecto?

El sitio original fue construido en Google Sites, una herramienta práctica pero limitada en diseño, interacción y animación. Este proyecto **reconstruye ese mismo sitio con HTML, CSS y JavaScript puros**, conservando su estructura y su contenido pedagógico, y mejorando la estética, la experiencia de uso y la interactividad.

**El contenido pedagógico no cambia:** objetivos, explicaciones, actividades, preguntas de predicción, retos, videos, guías y presentaciones son los del sitio original. Lo que cambia es la forma de presentarlos.

### Objetivo de la estrategia

Fortalecer la lógica de programación de los estudiantes de grado octavo mediante el diseño, simulación y programación de prototipos con Arduino, usando Tinkercad Circuits para comprender el código antes de aplicarlo en sus proyectos físicos.

---

## Estructura del sitio

El sitio replica las páginas del Google Sites y las organiza en una sola aplicación web con navegación por secciones:

| Página | Contenido |
|---|---|
| **Inicio** | Presentación del proyecto, objetivo de la estrategia, ruta de aprendizaje (cronograma de seis sesiones) y cifras generales. |
| **Sesión 1** · Pensamiento lógico y programación | Algoritmos, diagramas de flujo y la primera variable en Arduino. |
| **Sesión 2** · Entradas y salidas digitales | `pinMode`, `digitalWrite` y `digitalRead` con pulsador y LED. |
| **Sesión 3** · Condicionales y ciclos | `if / else` y ciclo `for` con seis LED. |
| **Sesión 4** · Entradas analógicas y `map()` | `analogRead`, Monitor Serie y una cortina de 12 LED. |
| **Sesión 5** · Del diagrama al prototipo | Montaje de entradas y salidas: servomotor, sensor ultrasónico y lectura de diagramas de conexiones. |
| **Sobre el proyecto** | Contexto institucional, ficha del proyecto, cronograma y logotipos. |

Cada página de sesión sigue el mismo recorrido que el sitio original:

1. Encabezado con fecha, duración y título.
2. **Objetivo de la sesión.**
3. **Contenido**, con la presentación interactiva de Canva al inicio y los videos al final.
4. **Actividad práctica**, con la guía incrustada directamente en la página.
5. **Fase de predicción** y simulador interactivo.
6. **Reto** con lista de verificación.
7. **Presentación de refuerzo** y navegación entre sesiones.

---

## Qué se mejoró

### Estética
- Diseño moderno y consistente, con la misma identidad visual del sitio original.
- Encabezados con fondo de circuitos, tipografías propias y tarjetas con relieve y efectos al pasar el cursor.
- Modelo 3D de una placa Arduino UNO en la página de inicio, que gira y se puede arrastrar.
- Pie de página con el logo de la Licenciatura en Informática.

### Contenido y organización
- Presentaciones de Canva, diapositivas de refuerzo y guías en PDF **incrustadas directamente**, con tamaño amplio, sin salir de la página.
- Videos que se cargan al hacer clic, con enlace alterno a YouTube.
- Cronograma visual de seis sesiones, con las sesiones realizadas y las pendientes.
- Página **Sobre el proyecto** con ficha de participantes, línea de tiempo y logotipos institucionales.

### Interactividad
- **Simuladores por sesión**, que permiten experimentar antes de armar el circuito:
  - Sesión 1: LED que parpadea según la variable `tiempo`.
  - Sesión 2: dos pares pulsador–LED independientes.
  - Sesión 3: secuencia de seis LED con ciclos `for`, con `delay` y condición ajustables.
  - Sesión 4: cortina de 12 LED controlada por un potenciómetro, con modo "Cortina Invertida".
  - Sesión 5: servomotor (0° a 180°) y sensor ultrasónico (distancia y tiempo de eco).
- Código de ejemplo con resaltado de sintaxis, línea activa durante la simulación y botón para copiar.
- Predicciones y retos que se guardan en el navegador de cada estudiante.

### Experiencia de uso
- Diseño **responsive**: se adapta a celulares, tabletas y computadores.
- Menú de navegación que se convierte en menú desplegable en pantallas pequeñas.
- Barra de progreso de lectura, botón para volver arriba y animaciones de aparición suaves.
- Animaciones moderadas: los encabezados de las sesiones son sobrios para no distraer del contenido.

### Accesibilidad
- Enlace para saltar al contenido, textos alternativos en las imágenes y etiquetas en los controles.
- Foco visible al navegar con teclado.
- Respeta la preferencia del sistema de reducir el movimiento (`prefers-reduced-motion`).

---

## Identidad visual

La paleta se tomó del sitio original y se amplió con tonos de apoyo.

| Color | Código | Uso |
|---|---|---|
| Verde azulado | `#00979C` | Títulos, enlaces y elementos principales |
| Naranja | `#E4712B` | Botones, página activa del menú y llamados a la acción |
| Gris casi negro | `#1C1C1C` | Barra de navegación y texto |
| Azul marino | `#1A1A2E` · `#16213E` | Encabezados y pie de página |
| Cian | `#00D9FF` | Brillos, circuitos y detalles tecnológicos |
| Blanco hueso | `#F9F9F9` | Fondo general |
| Menta suave | `#E6F7F8` | Fondos de secciones alternas |

**Tipografías** (Google Fonts):
- **Rajdhani** para títulos, con carácter técnico.
- **Roboto** para el texto, de lectura cómoda.
- **JetBrains Mono** para el código.

---

## Tecnologías

- **HTML5**, **CSS3** y **JavaScript** sin frameworks ni dependencias de instalación.
- [`<model-viewer>`](https://modelviewer.dev/) para mostrar el modelo 3D de la placa Arduino.
- Contenido incrustado de Canva, Google Slides, Google Drive y YouTube.
- Publicado con **GitHub Pages**.

---

## Estructura de archivos

```
sitio-mejorado/
├── index.html          Estructura base: menú, pie de página y pantalla de carga
├── css/
│   └── style.css       Colores, tipografías, diseño responsive y animaciones
├── js/
│   └── app.js          Contenido de las sesiones, navegación y simuladores
├── img/                Logotipos (Licenciatura en Informática, UPTC y proyecto)
├── models/
│   └── arduino-uno.glb Modelo 3D de la placa Arduino UNO
├── .nojekyll           Indica a GitHub Pages que sirva los archivos tal cual
└── README.md
```

---

## Cómo ejecutarlo en local

No requiere instalación. Descarga o clona el repositorio y abre `index.html` en el navegador.

Para ver el modelo 3D y los contenidos incrustados se necesita conexión a internet.

---

## Cómo actualizar el contenido

Todo el contenido de las sesiones está en `js/app.js`:

- `SESIONES`: fechas, títulos, objetivos, enlaces de Canva, guía, diapositivas y videos, preguntas de predicción y retos.
- `RUTA` y `HECHAS`: cronograma y número de sesiones realizadas.
- `CONTENIDO`, `SIM_HTML` y `SIM_INIT`: texto explicativo y simulador de cada sesión.

Para añadir una sesión nueva, se duplica una entrada existente, se cambian sus datos y se agrega su enlace en el menú de `index.html`.

---

## Créditos

- **Autor:** Maicol Alexander Cruz Cruz · Código UPTC 202220426
- **Asesora:** Adriana Sandoval Espitia
- **Docente titular:** Óscar Mauricio Hernández Yomayuza
- **Institución:** I.E. Técnica José Cayetano Vásquez, Ciénega, Boyacá
- **Programa:** Licenciatura en Informática, Universidad Pedagógica y Tecnológica de Colombia (UPTC)
- **Contacto:** Maicol.cruz01@uptc.edu.co

Práctica pedagógica investigativa · UPTC · 2026
