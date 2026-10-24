/* ============================================================
   Proyecto de Aula 8° — sitio mejorado (HTML + CSS + JS puro)
   Contenido tomado del Google Site: sites.google.com/uptc.edu.co/proyectodeaula8
   ============================================================ */
(() => {
'use strict';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = {
  get(k, d) { try { const v = localStorage.getItem('pa8:' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('pa8:' + k, JSON.stringify(v)); } catch {} }
};
const TINKERCAD = 'https://www.tinkercad.com/circuits';

/* ---------- resaltado de sintaxis Arduino ---------- */
function hl(line) {
  const re = /(\/\/.*)|\b(int|void|if|else|for|const|bool|long)\b|\b(HIGH|LOW|INPUT|OUTPUT|A0|Servo)\b|\b(pinMode|digitalWrite|digitalRead|delay|delayMicroseconds|analogRead|map|Serial|begin|println|print|setup|loop|attach|write|pulseIn)\b|\b(\d+)\b/g;
  let out = '', last = 0, m;
  while ((m = re.exec(line))) {
    out += esc(line.slice(last, m.index));
    const cls = m[1] ? 'c' : m[2] ? 'k' : m[3] ? 't' : m[4] ? 'f' : 'n';
    out += `<span class="${cls}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(line.slice(last));
}
function codeBlock(lines, id = '') {
  const body = lines.map((l, i) => `<span class="ln" data-l="${i}">${hl(l) || ' '}</span>`).join('');
  return `<pre class="code" ${id ? `id="${id}"` : ''}><button class="copy" type="button" data-copy aria-label="Copiar código">Copiar</button><code>${body}</code></pre>`;
}
const setCodeLines = (el, lines) => { $('code', el).innerHTML = lines.map((l, i) => `<span class="ln" data-l="${i}">${hl(l) || ' '}</span>`).join(''); el.dataset.raw = lines.join('\n'); };
const hot = (el, ...idx) => $$('.ln', el).forEach(n => n.classList.toggle('is-hot', idx.includes(+n.dataset.l)));

/* ---------- multimedia (carga bajo demanda) ---------- */
const EMBED = {
  youtube: id => `https://www.youtube.com/embed/${id}?rel=0`,
  canva:   p  => `https://www.canva.com/design/${p}/view?embed`,
  slides:  id => `https://docs.google.com/presentation/d/${id}/embed`,
  drive:   id => `https://drive.google.com/file/d/${id}/preview`
};
function media(kind, ref, title, cls = '') {
  if (kind === 'youtube') {   // los videos se cargan al hacer clic, como en la primera versión
    return `<figure style="margin:0"><div class="media" data-embed="${esc(EMBED[kind](ref))}" data-title="${esc(title)}">
      <button class="media__play" type="button" aria-label="Reproducir: ${esc(title)}"><span class="media__tri"></span><span>${esc(title)}</span></button></div>
      <p class="media__alt"><a href="https://www.youtube.com/watch?v=${esc(ref)}" target="_blank" rel="noopener noreferrer">Ver en YouTube ↗</a></p></figure>`;
  }
  return `<figure style="margin:0"><div class="media ${cls}"><iframe src="${esc(EMBED[kind](ref))}" title="${esc(title)}" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div></figure>`;
}

/* ============================================================
   DATOS DE LAS SESIONES
   ============================================================ */
const RUTA = [
  { n: 1, icon: '⌘', t: 'Pensamiento lógico y programación', d: 'Algoritmos, diagramas de flujo, variable y circuito LED en Tinkercad.' },
  { n: 2, icon: '↔', t: 'Entradas y salidas digitales',      d: 'pinMode, digitalWrite, digitalRead y pulsador.' },
  { n: 3, icon: '⟳', t: 'Condicionales y ciclos',            d: 'if / else, for y while aplicados a sensores.' },
  { n: 4, icon: '◉', t: 'Entradas análogas, sensores y motores', d: 'analogRead, analogWrite y componentes del prototipo.' },
  { n: 5, icon: 'ƒ', t: 'Del diagrama al prototipo', d: 'Montaje de entradas y salidas con Arduino: servomotor, sensor ultrasónico y lectura de diagramas.' },
  { n: 6, icon: '✓', t: 'Integración final y depuración',    d: 'Corrección, explicación y evidencias finales.' }
];
const HECHAS = 5;

const SESIONES = {
  1: {
    fecha: 'SESIÓN 1 · 21 al 25 de septiembre de 2026', horas: '4H',
    titulo: 'Pensamiento lógico y programación',
    sub: 'De los pasos cotidianos a la primera variable en Arduino.',
    obj: ['Comprender algoritmos, diagramas de flujo y variables',
          'Al finalizar la sesión, podrás representar un algoritmo mediante un diagrama de flujo e identificar cómo una variable controla el comportamiento de un circuito simulado en Tinkercad Circuits.'],
    canva: 'DAHVhOwX0Es/hZByLyZBN6qFJ9wlEsO09g', drive: '1zcWppLyR71UWuFZengHMQssYxkzctlCx',
    slides: '1Z8MV0Zl9WngEOSbGgRW-WuROF_EfA76DsSK6CxKtZG8',
    videos: [['youtube', '41R38EeiWJs', 'Video de apoyo']],
    actividad: ['Mi primer circuito y variable en Tinkercad', 'Trabaja en equipos de 2 a 3 integrantes. Sigue la guía, registra tu predicción antes de simular y comprueba lo que ocurre al modificar la variable de tiempo.'],
    refuerzo: ['Variables, estructura del código y componentes (entradas / salidas)'],
    pred: ['Si aumentas el valor de la variable tiempo, ¿qué le pasará al parpadeo del LED?', 'Si cambias tiempo de 1000 a 2000, ¿cuánto dura ahora cada estado (encendido y apagado)?'],
    reto: ['Semáforo de Emergencia', 'Cuando termines el circuito básico, prueba este reto de la guía.',
      ['Haz que el LED parpadee muy rápido usando un valor cercano a 100 ms.', 'Agrega un segundo LED conectado al pin digital 12 con su resistencia.', 'Programa ambos LED para que se enciendan y apaguen de forma alternada.'], null]
  },
  2: {
    fecha: 'SESIÓN 2 · 28 de septiembre al 2 de octubre de 2026', horas: '4H',
    titulo: 'Entradas y salidas digitales',
    sub: 'Cómo Arduino "escucha" con un pulsador y "responde" con un LED.',
    obj: ['Usar pinMode, digitalWrite y digitalRead',
          'Diseñar y simular, en Tinkercad Circuits, un circuito con dos LED y dos pulsadores, utilizando las instrucciones pinMode(), digitalWrite() y digitalRead() para que cada pulsador controle únicamente su propio LED, de forma independiente.'],
    canva: 'DAHWclSAxLg/zQnQpsW5BVO1Tadw-tiGCg', drive: '1-BoDgqtSEsxvL25yNkuQjky_pLQeW819',
    slides: '1Y18Pq98oXBm1XemBLFB0yOL4_fzVyoojb75MPDc0u90',
    videos: [['youtube', 'BWhup75svIk', 'Video de apoyo']],
    actividad: ['Entradas y salidas con Arduino', 'Trabaja en equipos de 2 a 3 integrantes. Sigue la guía, registra tu predicción antes de simular y comprueba lo que ocurre.'],
    refuerzo: ['Entradas, salidas y el patrón pulsador–LED'],
    pred: ['Si presionas el pulsador "Encender" y luego lo sueltas, ¿qué crees que le pasará al LED correspondiente?', 'Si presionas los dos pulsadores al mismo tiempo, ¿los dos LED se comportarán de forma independiente, o se afectarán entre sí?'],
    reto: ['Tu propio interruptor', null,
      ['Agrega un tercer LED y un tercer pulsador, siguiendo exactamente el mismo patrón de los dos anteriores.', 'Ponle a ese pulsador un nombre relacionado con tu proyecto final (por ejemplo, si tu prototipo tendrá un sensor o una luz, usa ese nombre).', 'Verifica que los tres pares LED-pulsador funcionen de forma completamente independiente entre sí.'],
      'Revisa que cada componente nuevo use un pin digital distinto a los que ya usaste en los dos primeros pares.']
  },
  3: {
    fecha: 'SESIÓN 3 · 13 al 17 de octubre de 2026', horas: '2H',
    titulo: 'Condicionales y ciclos',
    sub: 'Cuando tu código empieza a decidir y repetir por sí mismo.',
    obj: ['Un ciclo for de ida y uno de vuelta, con 6 LED',
          'Diseñar y simular, en Tinkercad Circuits, un circuito con seis LED, utilizando dos ciclos for para automatizar una secuencia de encendido en orden ascendente y descendente, identificando los tres componentes del ciclo (inicialización, condición e incremento).'],
    canva: 'DAHXFo0CwR0/JZVXOYB8TIIjlJymbwh_Sw', drive: '1wVedP8EOnJ_Aqty2ksk1Pd4DCol0sdW6',
    slides: '1Hyc-Mr6HNDwn3oPbBOSG_kmhVGBP3z84Faabo_ELNwo',
    videos: [['youtube', 'TfeggtMu-8w', 'Condiciones IF-ELSE'], ['youtube', '07nuuiwQcCk', 'Ciclo FOR']],
    actividad: ['Condicionales y ciclos en Arduino', 'Trabaja en equipos de 2 a 3 integrantes. Sigue la guía, registra tu predicción antes de simular y comprueba.'],
    refuerzo: ['Condicionales if / else y el ciclo for'],
    pred: ['Si cambias la condición del primer ciclo de i <= 7 a i <= 5, ¿qué LED dejarán de encenderse?', '¿Qué pasaría si el valor de delay() fuera mucho más pequeño, por ejemplo 50 ms, en vez de 400 ms?'],
    reto: ['Cambia el patrón', null,
      ['Modifica el valor de delay() para que la secuencia se vea notablemente más rápida o más lenta.', 'Invierte el orden: haz que la secuencia empiece en el pin 7 y termine en el pin 2 (y de vuelta), en lugar de empezar en el 2.', 'Si te alcanza el tiempo, agrega un séptimo LED (pin 8) a la secuencia, ajustando la condición de los dos ciclos for.'],
      'Para invertir el sentido, solo necesitas cambiar los valores de inicialización, condición e incremento del ciclo; el resto del código no cambia.']
  },
  4: {
    fecha: 'SESIÓN 4 · 19 al 23 de octubre de 2026', horas: '3H',
    titulo: 'Entradas analógicas y la función map()',
    sub: 'Del mundo análogo a una respuesta física en tu prototipo.',
    obj: ['Usar analogRead y analogWrite en tu prototipo',
          'Diseñar y simular, en Tinkercad Circuits, un circuito de 12 LED controlado por un potenciómetro, utilizando analogRead() y la función map() para traducir la posición del potenciómetro en una "cortina de luces" que se abre y se cierra de forma proporcional.'],
    canva: 'DAHYIm3kKzc/KG57tL8CXC2-0HAK8L-uyA', drive: '1FnbWEZMErYntvt3YKDKqpuI729ccaaUU',
    slides: '1hDTbDsrvyfVTWhXVpv7Sk_VMG9k8gQm2oz_qHZQmII0',
    videos: [['youtube', '5eu9br86uwg', 'Diferencia entre Digital y Analógico']],
    actividad: ['Manos a la obra: paso a paso', 'Trabaja en equipos de 2 a 3 integrantes. Sigue la imagen de circuito y la guía, registra tu predicción antes de simular y comprueba.'],
    refuerzo: ['analogRead, Monitor Serie y map()'],
    pred: ['Si el potenciómetro está en su valor mínimo (0), ¿la cortina estará abierta o cerrada?', '¿Para qué sirve exactamente la línea que usa map() en este programa? ¿Qué pasaría si no existiera?'],
    reto: ['La Cortina Invertida', 'El profesor les explicó la cortina apagando parejas de LED desde el centro hacia afuera a medida que el potenciómetro aumenta. El reto es lograr el mismo resultado final —que la cortina empiece cerrada (0) y termine completamente abierta (máximo)— pero invirtiendo el orden en el que se apagan las parejas.',
      ['Modifica el programa para que las parejas de LED se vayan apagando desde los extremos (pines 2 y 13) hacia el centro, en lugar de desde el centro hacia afuera.', 'Verifica que, igual que antes, con el potenciómetro en 0 la cortina quede completamente cerrada (los 12 LED encendidos), y en su valor máximo quede completamente abierta (los 12 LED apagados).', 'Prueba con varios valores intermedios del potenciómetro y confirma que el número de parejas apagadas sigue siendo el correcto, solo que empezando por los bordes.'],
      'En el ciclo for que apaga las parejas, en vez de usar 7-i y 8+i (que arrancan desde el centro), piensa qué pines tendrías que usar para que la primera pareja apagada sea la de los extremos (2 y 13).']
  },
  5: {
    fecha: 'SESIÓN 5 · 27 al 31 de octubre de 2026', horas: '2H',
    titulo: 'Del diagrama al prototipo',
    sub: 'Armo y pruebo mis componentes: montaje de entradas y salidas con Arduino.',
    chips: ['Componentes físicos', 'Grupos de proyecto', '2 horas'],
    obj: ['Montar tu prototipo a partir de un diagrama de conexiones',
          'Montar un prototipo con Arduino a partir de un diagrama de conexiones, reconociendo la función de sus componentes de entrada y de salida, y traducir esas conexiones en variables y configuración de pines dentro del programa.'],
    canva: 'DAHYzNkW6dY/RxsXtWac0h4d-nldlHvrOg', drive: '1jN-Xsbiw6XZ7eFm7XHmJi4p0JwVkjCXf',
    slides: '1RBdGlkhYFpaB0oBHjgdnnoGwIhLfu8J2tmWRYtgc7ow',
    videos: [],
    kickerActividad: 'Actividad práctica',
    actividad: ['Armo y pruebo mis componentes', 'Trabaja con tu grupo de proyecto. Sigue el diagrama de conexiones, toma fotografías durante el armado y no energices el circuito hasta recibir el visto bueno del docente.'],
    refuerzo: ['Del diagrama al prototipo'],
    predTitulo: '💬 Preguntas detonantes', predSub: 'Piensa y responde antes de empezar el montaje.',
    pred: ['¿Qué diferencia hay entre un LED y un servo como dispositivo de salida?', '¿Cómo hace un murciélago para saber a qué distancia está un obstáculo sin tocarlo?', '¿Cómo podría Arduino medir una distancia de la misma manera?'],
    retoKicker: 'Montaje',
    reto: ['Lista de chequeo del montaje', 'Marca cada paso cuando lo completes. Recuerda: primero la alimentación, luego las entradas y por último las salidas.',
      ['Paso 1 · Cada integrante identifica en el diagrama un componente, dice a qué pin se conecta y si es de entrada o de salida.', 'Paso 2 · Monta primero la alimentación (5V y tierra) en la protoboard, luego los componentes de entrada y por último los de salida, siguiendo el diagrama.', 'Paso 3 · Toma fotografías durante el armado: los componentes antes de conectar, el proceso de conexión y el prototipo terminado.', 'Paso 4 · Revisa la conexión con la lista de chequeo del diagrama y presenta el prototipo al docente, sin energizarlo hasta recibir el visto bueno.', 'Paso 5 (si alcanza el tiempo) · Elabora la tabla de pines (componente, pin y nombre de la variable) y escribe al inicio del programa las variables y, en setup(), la configuración con pinMode().'],
      'Reglas de seguridad: arma siempre con el cable USB desconectado, respeta la polaridad de los componentes y no energices el circuito hasta recibir el visto bueno del docente.'],
    extra: true
  }
};

/* ============================================================
   PLANTILLAS DE CADA VISTA
   ============================================================ */
const heroHome = () => `
<section class="hero hero--home">
  <canvas data-circuit aria-hidden="true"></canvas>
  <div class="wrap hero__inner">
    <div>
      <p class="eyebrow">Práctica pedagógica · Licenciatura en Informática <b>UPTC</b></p>
      <h1><span class="grad" id="typed" data-text="Fortalecimiento de la lógica de programación mediante el diseño de prototipos con Arduino"></span><span class="caret" aria-hidden="true"></span></h1>
      <p class="hero__sub">Este sitio documenta la estrategia pedagógica desarrollada con los estudiantes de grado octavo de la I.E. Técnica José Cayetano Vásquez (Ciénega, Boyacá).</p>
      <div class="hero__cta">
        <a class="btn" href="#/sesion-1">Empezar por la Sesión 1 →</a>
        <a class="btn btn--ghost" href="#/sobre-el-proyecto">Sobre el proyecto</a>
      </div>
    </div>
    <div class="board3d">
      <model-viewer id="board3d" src="models/arduino-uno.glb" alt="Modelo 3D de una placa Arduino UNO que gira lentamente"
        auto-rotate rotation-per-second="18deg" camera-controls disable-zoom disable-pan touch-action="pan-y"
        camera-orbit="30deg 62deg 105%" min-camera-orbit="auto 5deg auto" max-camera-orbit="auto 120deg auto" field-of-view="30deg"
        interaction-prompt="none" shadow-intensity="1" shadow-softness=".8" exposure="1.05" environment-image="neutral" loading="eager" reveal="auto">
      </model-viewer>
    <div class="chip3d" id="chipFallback" aria-hidden="true">
      <div class="chip3d__board" id="chip">
        <div class="chip3d__pins chip3d__pins--t">${'<i></i>'.repeat(7)}</div>
        <div class="chip3d__pins chip3d__pins--b">${'<i></i>'.repeat(7)}</div>
        <div class="chip3d__face">
          <i class="chip3d__led chip3d__led--1"></i><i class="chip3d__led chip3d__led--2"></i>
          <svg class="chip3d__logo" viewBox="0 0 60 28" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"><path d="M30 14C26 7 20 4 14.5 4 8.5 4 4 8.4 4 14s4.500 10 10.500 10C20 24 26 21 30 14c4-7 10-10 15.500-10C51.500 4 56 8.400 56 14s-4.500 10-10.500 10C40 24 34 21 30 14Z"/><path d="M10 14h9M45.500 10v8M41.500 14h8" stroke-width="2.600"/></svg>
        </div>
      </div>
    </div>
    </div>
  </div>
</section>`;

function viewInicio() {
  const cards = RUTA.map((r, i) => {
    const done = r.n <= HECHAS;
    const inner = `<div class="card__icon" aria-hidden="true">${r.icon}</div><h3>Sesión ${r.n}</h3><h4>${esc(r.t)}</h4><p>${esc(r.d)}</p>${done ? '<span class="card__go">Ver sesión →</span>' : ''}`;
    return done
      ? `<a class="card card--link card--done reveal" style="--d:${i * .08}s" href="#/sesion-${r.n}">${inner}</a>`
      : `<div class="card card--soon reveal" style="--d:${i * .08}s">${inner}</div>`;
  }).join('');
  const steps = RUTA.map(r => `<a href="#/sesion-${r.n}" class="${r.n <= HECHAS ? 'is-done' : ''}" ${r.n > HECHAS ? 'tabindex="-1" aria-disabled="true"' : ''}><span>${r.n}</span>Sesión ${r.n}</a>`).join('');
  return `${heroHome()}
<section class="section">
  <div class="wrap">
    <div class="goal reveal">
      <p class="kicker">Objetivo de la estrategia</p>
      <h3>Comprender el código antes de aplicarlo en un proyecto físico</h3>
      <p class="lead" style="margin:0">Fortalecer la lógica de programación de los estudiantes de grado octavo mediante el diseño, simulación y programación de prototipos con Arduino, usando <strong>Tinkercad Circuits</strong> para comprender el código antes de aplicarlo en sus proyectos físicos.</p>
    </div>
  </div>
</section>
<section class="section section--mint">
  <div class="wrap">
    <p class="kicker reveal">Ruta de aprendizaje</p>
    <h2 class="h2 h2--ink reveal">Cada sesión conecta una idea de programación con un prototipo</h2>
    <h3 class="h3 reveal" style="color:var(--teal);margin-top:0">CRONOGRAMA ⤵️</h3>
    <div class="route reveal" style="--w:${Math.round((HECHAS - 1) / 5 * 90)}%"><div class="route__fill"></div>${steps}</div>
    <div class="grid grid--3">${cards}</div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="stats">
      <div class="stat reveal"><b data-count="6">0</b><span>sesiones planeadas</span></div>
      <div class="stat reveal" style="--d:.1s"><b data-count="${HECHAS}">0</b><span>sesiones realizadas</span></div>
      <div class="stat reveal" style="--d:.2s"><b data-count="25">0</b><span>estudiantes participantes</span></div>
      <div class="stat reveal" style="--d:.3s"><b data-count="11">0</b><span>prototipos en construcción</span></div>
    </div>
  </div>
</section>`;
}

function viewSobre() {
  const fechas = [
    ['Diagnóstico · 31 de agosto de 2026', 'Prueba inicial para identificar el punto de partida del grupo.'],
    ['Sesión 1 · 21 al 25 de septiembre', 'Algoritmos, diagramas de flujo y la primera variable.'],
    ['Sesión 2 · 28 de septiembre al 2 de octubre', 'Entradas y salidas digitales con pulsador y LED.'],
    ['Sesión 3 · 13 al 17 de octubre', 'Condicionales y ciclos for con seis LED.'],
    ['Sesión 4 · 19 al 23 de octubre', 'Entradas análogas y la función map().'],
    ['Sesión 5 · 27 al 31 de octubre', 'Del diagrama al prototipo: montaje de entradas y salidas.']
  ].map(([b, t]) => `<div class="timeline__item reveal"><b>${b}</b>${t}</div>`).join('');
  return `
<section class="hero hero--short hero--session">
  <canvas data-circuit data-still aria-hidden="true"></canvas>
  <div class="wrap hero__inner"><div>
    <p class="eyebrow">Contexto institucional</p>
    <h1><span class="grad">Sobre el proyecto</span></h1>
    <p class="hero__sub">Práctica pedagógica de la Licenciatura en Informática de la UPTC.</p>
  </div></div>
</section>
<section class="section">
  <div class="wrap">
    <div class="goal reveal">
      <p class="kicker">Objetivo de la estrategia</p>
      <p class="lead" style="margin:0">Fortalecer la lógica de programación de los estudiantes de grado octavo mediante el diseño, simulación y programación de prototipos con Arduino, usando Tinkercad Circuits para comprender el código antes de aplicarlo en sus proyectos físicos.</p>
    </div>
    <div class="split" style="margin-top:40px">
      <div class="reveal">
        <h2 class="h2">Quiénes y dónde</h2>
        <ul class="facts">
          <li><span><strong>Institución:</strong> I.E. Técnica José Cayetano Vásquez, Ciénega, Boyacá.</span></li>
          <li><span><strong>Grado:</strong> octavo, en el área de Tecnología e Informática.</span></li>
          <li><span><strong>Autor:</strong> Maicol Alexander Cruz Cruz, Licenciatura en Informática, UPTC.</span></li>
          <li><span><strong>Herramientas:</strong> Tinkercad Circuits para simular y Arduino para construir los prototipos.</span></li>
        </ul>
      </div>
      <div class="reveal">
        <h2 class="h2">Cronograma</h2>
        <div class="timeline">${fechas}</div>
      </div>
    </div>
  </div>
</section>`;
}

function viewSesion(n) {
  const s = SESIONES[n];
  const prev = n > 1 ? `<a class="btn btn--teal" href="#/sesion-${n - 1}">← Sesión ${n - 1}</a>` : `<a class="btn btn--teal" href="#/inicio">← Inicio</a>`;
  const next = n < 5 ?`<a class="btn" href="#/sesion-${n + 1}">Sesión ${n + 1} →</a>` : `<a class="btn" href="#/sobre-el-proyecto">Sobre el proyecto →</a>`;
  const videos = s.videos.map(v => `<div>${media(v[0], v[1], v[2])}<p class="media__cap reveal">${esc(v[2])}</p></div>`).join('');
  const reto = s.reto;
  const checks = reto[2].map((t, i) => `<li><label><input type="checkbox" data-check="${n}-${i}"><span>${esc(t)}</span></label></li>`).join('');
  const preds = s.pred.map((q, i) => `<div class="predict__q"><p>${esc(q)}</p><textarea data-pred="${n}-${i}" placeholder="Escribe tu predicción antes de simular…" aria-label="Predicción ${i + 1}"></textarea></div>`).join('');

  return `
<section class="hero hero--short hero--session">
  <canvas data-circuit data-still aria-hidden="true"></canvas>
  <div class="wrap hero__inner"><div>
    <p class="eyebrow">${esc(s.fecha)} <b>(${s.horas})</b></p>
    <h1><span class="grad">${esc(s.titulo)}</span></h1>
    <p class="hero__sub">${esc(s.sub)}</p>
    <ul class="chips">${(s.chips || ['Tinkercad Circuits', 'Equipos de 2 a 3', s.horas === '2H' ? '2 horas' : s.horas.replace('H', ' horas')]).map(c => `<li>${esc(c)}</li>`).join('')}</ul>
  </div></div>
</section>

<section class="section">
  <div class="wrap">
    <div class="goal reveal">
      <p class="kicker">Objetivo de la sesión</p>
      <h3>${esc(s.obj[0])}</h3>
      <p class="lead" style="margin:0">${esc(s.obj[1])}</p>
    </div>
  </div>
</section>

<section class="section section--mint">
  <div class="wrap">
    <p class="kicker reveal">Contenido</p>
    ${CONTENIDO[n](s)}
    ${s.videos.length ? `<h3 class="h3 reveal">${n === 3 ? 'Videos explicativos: condiciones y ciclos for' : n === 4 ? 'Video: diferencia entre digital y análogo' : 'Video de apoyo'}</h3><div class="grid ${s.videos.length > 1 ? 'grid--2' : ''}">${videos}</div>` : ''}
  </div>
</section>

<section class="section">
  <div class="wrap">
    <p class="kicker reveal">Actividad práctica</p>
    <h2 class="h2 reveal">${esc(s.actividad[0])}</h2>
    <p class="lead reveal">${esc(s.actividad[1])}</p>
    ${s.chips ? '<div style="margin-bottom:30px"></div>' : `<div class="hero__cta reveal" style="margin:18px 0 34px">
      <a class="btn" href="${TINKERCAD}" target="_blank" rel="noopener noreferrer">Abrir Tinkercad Circuits ↗</a>
    </div>`}
    <h3 class="h3 reveal" style="margin-top:0">Guía de la actividad</h3>
    ${media('drive', s.drive, 'Guía de la actividad · Sesión ' + n, 'media--guide')}
    <div class="split" style="margin-top:44px">
      <div class="reveal">
        <h3 class="h3" style="margin-top:0">${s.predTitulo || '✍ Fase de predicción'}</h3>
        <p>${s.predSub || 'Responde en tu cuaderno (o aquí) antes de simular.'}</p>
        <div class="predict">${preds}<small>Tus respuestas se guardan solo en este navegador.</small></div>
      </div>
      <div class="reveal">${SIM_HTML[n]()}</div>
    </div>
  </div>
</section>

<section class="section section--mint">
  <div class="wrap">
    <div class="challenge reveal">
      <p class="kicker" style="color:var(--cyan)">${s.retoKicker || 'Reto'}</p>
      <h3>${s.chips ? '🔧' : '⚡'} ${esc(reto[0])}</h3>
      ${reto[1] ? `<p>${esc(reto[1])}</p>` : '<p>Marca cada paso cuando lo completes.</p>'}
      <ul class="checks">${checks}</ul>
      <div class="meter" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i></div>
      <span class="meter__txt" data-meter>0 de ${reto[2].length} completados</span>
      ${reto[3] ? `<div class="hint"><strong>${s.chips ? 'Importante' : 'Pista'}:</strong> ${esc(reto[3])}</div>` : ''}
    </div>
    ${s.extra ? CIERRE5 : ''}
  </div>
</section>

<section class="section">
  <div class="wrap">
    <p class="kicker reveal">Presentación refuerzo</p>
    <h2 class="h2 reveal">${esc(s.refuerzo[0])}</h2>
    <p class="reveal">A continuación podrás observar una presentación de refuerzo de lo visto en clase.</p>
    ${media('slides', s.slides, 'Presentación de refuerzo · Sesión ' + n, 'media--wide')}
    <div class="pager reveal" style="margin-top:34px">${prev}${next}</div>
  </div>
</section>`;
}

/* ---------- contenido específico de cada sesión ---------- */
const termCard = (code, t, d, i = 0) => `<div class="card card--term reveal" style="--d:${i * .08}s"><h4><code>${esc(code)}</code></h4><p>${t ? `<strong>${esc(t)}</strong> ` : ''}${esc(d)}</p></div>`;
const CONTENIDO = {
  1: s => `
    <h2 class="h2 reveal">Pensar antes de programar</h2>
    <p class="lead reveal">Da clic en la diapositiva para repasar qué es un algoritmo, cómo se representa con un diagrama de flujo y por qué Arduino necesita instrucciones claras y ordenadas.</p>
    ${media('canva', s.canva, 'Presentación interactiva · Algoritmos y diagramas de flujo', 'media--wide')}
    <div class="grid grid--2" style="margin-top:28px">
      <div class="card reveal"><div class="card__icon">📦</div><h3>¿Qué es una variable?</h3><p>Una variable es como una caja etiquetada en la memoria: guarda un valor que puede cambiar. En esta práctica, la variable de tiempo controla cuánto espera el LED antes de cambiar de estado.</p></div>
      <div class="card reveal" style="--d:.1s"><div class="card__icon">⏱️</div><h3>¿Qué ocurre al cambiarla?</h3><p>Si aumentas el valor de tiempo, el LED permanece más tiempo encendido o apagado: el parpadeo se hace lento. Si lo reduces, el parpadeo se hace rápido.<br><strong>Ejemplo:</strong> pasar de 1000 ms a 2000 ms duplica el tiempo de espera.</p></div>
    </div>`,
  2: s => `
    <h2 class="h2 reveal">¿Cómo "escucha" y "responde" Arduino?</h2>
    <p class="lead reveal">La semana pasada le diste a Arduino una instrucción fija: encender y apagar un LED cada cierto tiempo, sin importar lo que pasara alrededor. Hoy das un paso más: Arduino va a <strong>escuchar</strong> el mundo exterior a través de un pulsador (una entrada digital) y va a <strong>responder</strong> encendiendo un LED (una salida digital).</p>
    ${media('canva', s.canva, 'Presentación interactiva · Entradas y salidas digitales', 'media--wide')}
    <div class="grid grid--3" style="margin-top:34px">
      ${termCard('pinMode()', '¿Qué hace?', 'Le dice a Arduino si un pin va a recibir información (INPUT) o a enviarla (OUTPUT), antes de usarlo con digitalRead o digitalWrite.', 0)}
      ${termCard('digitalRead() / digitalWrite()', '¿Qué hacen?', 'digitalRead revisa si un pin de entrada está en HIGH o LOW; digitalWrite envía ese mismo tipo de señal a un pin de salida, como un LED.', 1)}
      <div class="card card--term reveal" style="--d:.16s"><h4>Entrada vs. salida digital</h4><p><strong>Entrada:</strong> algo que Arduino lee, como un pulsador.<br><strong>Salida:</strong> algo que Arduino controla, como un LED.<br>Hoy conectas dos de cada una y las programas para que trabajen de forma independiente.</p></div>
    </div>
    <h3 class="h3 reveal">Patrón para un par pulsador–LED</h3>
    <p class="reveal">Este es el patrón de un solo par. Tú lo repites, con otros pines, para el segundo.</p>
    <div class="reveal">${codeBlock(CODE2_PATRON)}</div>`,
  3: s => `
    <h2 class="h2 reveal">Decisiones y repeticiones en el código</h2>
    <p class="lead reveal">Un programa no solo ejecuta instrucciones en orden: también puede decidir qué hacer y repetir acciones. Estas dos ideas son la base de casi cualquier proyecto con Arduino.</p>
    ${media('canva', s.canva, 'Presentación interactiva · Condicionales y ciclos', 'media--wide')}
    <div class="grid grid--2" style="margin-top:34px">
      <div class="card reveal"><div class="card__icon">🔀</div><h3>¿Qué hace if / else?</h3><p>Evalúa una condición y decide entre dos caminos: si se cumple, ejecuta un bloque de código; si no, ejecuta otro. Así tu prototipo "decide" a partir de lo que mide un sensor.</p></div>
      <div class="card reveal" style="--d:.1s"><div class="card__icon">🔁</div><h3>¿Qué hace un ciclo for?</h3><p>Repite un bloque de instrucciones un número determinado de veces, sin tener que escribirlas una por una. Aquí repite 5 veces un parpadeo.</p></div>
    </div>
    <div class="grid grid--3" style="margin-top:22px">
      <div class="card reveal"><div class="card__icon">🔄</div><h3>Ciclo for</h3><p>Una instrucción que repite un bloque de código un número determinado de veces, controlada por una variable.</p></div>
      <div class="card reveal" style="--d:.08s"><div class="card__icon">🧩</div><h3>3 partes del for</h3><p>Inicialización (dónde empieza), condición (hasta cuándo repite) e incremento (cómo avanza).</p></div>
      <div class="card reveal" style="--d:.16s"><div class="card__icon">🔢</div><h3>Variable de control</h3><p>Una variable (normalmente llamada <code>i</code>) que lleva la cuenta de en qué repetición va el ciclo.</p></div>
    </div>`,
  4: s => `
    <h2 class="h2 reveal">Señales que no son solo encendido o apagado</h2>
    <p class="lead reveal">Hasta ahora, Arduino solo te ha dicho "sí" o "no": un pulsador presionado o no, un LED encendido o apagado. Pero muchas cosas en el mundo real no son así: la cantidad de luz en un salón, la humedad de una planta o qué tanto giras una perilla cambian poco a poco, no de golpe. Para leer ese tipo de valores, Arduino usa <code>analogRead()</code>, que en vez de devolver solo 0 o 1, devuelve un número entre <strong>0 y 1023</strong>.</p>
    ${media('canva', s.canva, 'Presentación interactiva · Entradas analógicas y map()', 'media--wide')}
    <div class="grid grid--2" style="margin-top:34px">
      <div class="card reveal"><div class="card__icon">🎚️</div><h3>analogRead()</h3><p>Lee un valor entre 0 y 1023 desde un pin análogo (A0 a A5), representando qué tan fuerte es la señal del sensor —por ejemplo, cuánta luz o humedad detecta.</p></div>
      <div class="card reveal" style="--d:.08s"><div class="card__icon">📏</div><h3>map()</h3><p>Traduce un número de un rango (ej. 0-1023) a otro rango distinto (ej. 0-6), para que sea más fácil de usar.</p></div>
      <div class="card reveal"><div class="card__icon">🖥️</div><h3>Monitor Serie</h3><p>Una ventana que muestra, en tiempo real, los valores que Serial.print() va enviando desde el programa.</p></div>
      <div class="card reveal" style="--d:.08s"><div class="card__icon">🔄</div><h3>Digital vs. análogo</h3><p><strong>Digital:</strong> solo dos valores posibles, 0 o 1.<br><strong>Análogo:</strong> un rango de 0 a 1023 (la resolución de 10 bits de Arduino).</p></div>
    </div>
    <div class="split" style="margin-top:34px">
      <div class="reveal"><h3 class="h3" style="margin-top:0">Leer y ver el valor</h3><p>Con <code>Serial.begin()</code> abres la "ventana" del Monitor Serie, y con <code>Serial.println()</code> muestras lo que Arduino está leyendo.</p>${codeBlock(CODE4_SERIAL)}</div>
      <div class="reveal"><h3 class="h3" style="margin-top:0">💻 La función map(): sus cinco valores</h3><p>map() recibe cinco valores, en este orden. Tu tarea en el cuaderno será explicar con tus palabras qué hace cada uno.</p>
        <pre class="code"><code><span class="ln"><span class="f">map</span>(<span class="t">valor</span>, <span class="n">0</span>, <span class="n">1023</span>, <span class="n">0</span>, <span class="n">6</span>);</span></code></pre>
        <ol style="margin:14px 0 0;padding-left:20px;color:var(--muted)"><li>valor que se traduce</li><li>mínimo del rango de entrada</li><li>máximo del rango de entrada</li><li>mínimo del rango de salida</li><li>máximo del rango de salida</li></ol></div>
    </div>`
};

/* ---------- códigos de ejemplo ---------- */
CONTENIDO[5] = s => `
    <h2 class="h2 reveal">Del diagrama al prototipo</h2>
    <p class="lead reveal">Hoy dejas el simulador: vas a <strong>armar tu prototipo con componentes reales</strong>. Antes, repasa en la presentación interactiva cómo funcionan el servomotor y el sensor ultrasónico y cómo se lee un diagrama de conexiones.</p>
    ${media('canva', s.canva, 'Presentación interactiva · Del diagrama al prototipo', 'media--square')}
    <div class="grid grid--2" style="margin-top:34px">
      <div class="card reveal"><div class="card__icon">⚙️</div><h3>El servomotor: una salida</h3><p>Se mueve a un ángulo entre 0° y 180°. Tiene tres cables: <strong>señal</strong>, <strong>alimentación</strong> y <strong>tierra</strong>. Con la librería <code>Servo</code> lo declaras, le asignas un pin con <code>attach</code> y lo mueves con <code>write</code>.</p></div>
      <div class="card reveal" style="--d:.1s"><div class="card__icon">📡</div><h3>El sensor ultrasónico: una entrada</h3><p>Emite un pulso (<code>trig</code>), espera su eco (<code>echo</code>) y, con el tiempo que tarda en volver, calcula la <strong>distancia</strong>.</p></div>
      <div class="card reveal"><div class="card__icon">🔌</div><h3>Entrada o salida</h3><p>Una <strong>entrada</strong> es algo que Arduino lee (sensor de movimiento, humedad o nivel de agua, joystick). Una <strong>salida</strong> es algo que Arduino controla (LED, servo, buzzer, matriz LED). Clasifica cada componente de tu proyecto.</p></div>
      <div class="card reveal" style="--d:.1s"><div class="card__icon">🗺️</div><h3>Cómo leer un diagrama</h3><p>Identifica cada componente, el color de los cables (alimentación, tierra, señal) y el pin al que va cada uno. Arma en este orden: alimentación, entradas y por último salidas.</p></div>
    </div>
    <div class="split" style="margin-top:38px">
      <div class="reveal">
        <h3 class="h3" style="margin-top:0">De los pines del diagrama a las variables</h3>
        <p>De tu diagrama sale una tabla con tres columnas. Esas variables se escriben al inicio del programa.</p>
        <div class="table-wrap"><table class="pins"><thead><tr><th>Componente</th><th>Pin</th><th>Variable</th></tr></thead><tbody>
          <tr><td>Servo (señal)</td><td>9</td><td><code>pinServo</code></td></tr>
          <tr><td>Ultrasónico · trig</td><td>7</td><td><code>pinTrig</code></td></tr>
          <tr><td>Ultrasónico · echo</td><td>6</td><td><code>pinEcho</code></td></tr>
        </tbody></table></div>
        <small style="color:var(--muted)">Ejemplo: los pines de tu proyecto pueden ser otros; usa los de tu diagrama.</small>
      </div>
      <div class="reveal">${codeBlock(CODE5)}</div>
    </div>`;

const CIERRE5 = `
    <div class="grid grid--2" style="margin-top:28px">
      <div class="card reveal"><div class="card__icon">📸</div><h3>Evidencia del armado</h3><p>Cada grupo entrega las fotografías tomadas durante el montaje (componentes antes de conectar, proceso y prototipo terminado) para la página de evidencias del proyecto.</p></div>
      <div class="card reveal" style="--d:.1s"><div class="card__icon">🏠</div><h3>Tarea para la casa</h3><p>Avanza en el código de tu proyecto: variables, <code>setup()</code> y las primeras líneas de <code>loop()</code>. Se verificará en la Sesión 6, junto con el funcionamiento del prototipo.</p></div>
    </div>`;

const CODE5 = ['#include <Servo.h>', '', 'const int pinServo = 9;', 'const int pinTrig = 7;', 'const int pinEcho = 6;', '', 'Servo miServo;', '',
  'void setup() {', '  miServo.attach(pinServo);', '  pinMode(pinTrig, OUTPUT);', '  pinMode(pinEcho, INPUT);', '}'];

const CODE2_PATRON = [
  'void setup() {', '  pinMode(2, INPUT);   // pulsador', '  pinMode(8, OUTPUT);  // LED', '}', '',
  'void loop() {', '  if (digitalRead(2) == HIGH) {', '    digitalWrite(8, HIGH);', '  } else {', '    digitalWrite(8, LOW);', '  }', '}'
];
const CODE4_SERIAL = ['void setup() {', '  Serial.begin(9600);', '}', '', 'void loop() {', '  int valor = analogRead(A0);', '  Serial.println(valor);', '  delay(100);', '}'];
const code1 = t => ['int tiempo = ' + t + ';', '', 'void setup() {', '  pinMode(13, OUTPUT);', '}', '', 'void loop() {', '  digitalWrite(13, HIGH);', '  delay(tiempo);', '  digitalWrite(13, LOW);', '  delay(tiempo);', '}'];
const code3 = (lim, d) => [
  'void setup() {', '  for (int i = 2; i <= 7; i++) {', '    pinMode(i, OUTPUT);', '  }', '}', '', 'void loop() {',
  `  for (int i = 2; i <= ${lim}; i++) {`, '    digitalWrite(i, HIGH);', `    delay(${d});`, '    digitalWrite(i, LOW);', '  }',
  '  for (int i = 7; i >= 2; i--) {', '    digitalWrite(i, HIGH);', `    delay(${d});`, '    digitalWrite(i, LOW);', '  }', '}'
];
const code4 = inv => ['void setup() {', '  Serial.begin(9600);', '  for (int i = 2; i <= 13; i++) pinMode(i, OUTPUT);', '}', '',
  'void loop() {', '  int valor = analogRead(A0);', '  int parejas = map(valor, 0, 1023, 0, 6);', '  Serial.println(valor);',
  '  for (int i = 2; i <= 13; i++) digitalWrite(i, HIGH);', '  for (int i = 0; i < parejas; i++) {',
  inv ? '    digitalWrite(2 + i, LOW);' : '    digitalWrite(7 - i, LOW);', inv ? '    digitalWrite(13 - i, LOW);' : '    digitalWrite(8 + i, LOW);', '  }', '  delay(50);', '}'];

/* ============================================================
   SIMULADORES
   ============================================================ */
const SIM_HTML = {
  1: () => `<span class="label">Simulador · variable tiempo</span>
    <div class="sim">
      <div class="sim__stage"><div class="led" id="s1led" role="img" aria-label="LED"></div><p class="readout" id="s1out"></p></div>
      <div class="ctrl"><label for="s1range"><span>Variable <code>tiempo</code></span> <output id="s1val">1000 ms</output></label><input type="range" id="s1range" min="100" max="3000" step="100" value="1000"></div>
      <div class="sim__row"><button class="btn btn-sm btn--teal" type="button" data-s1="100">Rápido 100</button><button class="btn btn-sm btn--teal" type="button" data-s1="1000">1000</button><button class="btn btn-sm btn--teal" type="button" data-s1="2000">2000</button></div>
      ${codeBlock(code1(1000), 's1code')}
    </div>`,
  2: () => `<span class="label">Simulador · dos pares pulsador–LED</span>
    <div class="sim">
      <div class="sim__stage"><div class="pairs">
        <div class="pair"><div class="led" id="s2l1"></div><button class="pushbtn" id="s2b1" type="button" aria-label="Pulsador Encender">PIN 2</button><span class="readout" id="s2r1"></span></div>
        <div class="pair"><div class="led led--blue" id="s2l2"></div><button class="pushbtn pushbtn--b" id="s2b2" type="button" aria-label="Pulsador Apagar">PIN 3</button><span class="readout" id="s2r2"></span></div>
      </div></div>
      <p style="margin:0;color:var(--muted);font-size:.95rem">Mantén presionado cada pulsador (también puedes usar la barra espaciadora o Enter). Prueba los dos a la vez.</p>
      ${codeBlock(CODE2_PATRON, 's2code')}
    </div>`,
  3: () => `<span class="label">Simulador · ciclos for con 6 LED</span>
    <div class="sim">
      <div class="sim__stage"><div class="ledrow" id="s3leds">${[2,3,4,5,6,7].map(p => `<div class="ledcol"><div class="led led--sm" data-pin="${p}"></div>${p}</div>`).join('')}</div><p class="readout" id="s3out"></p></div>
      <div class="ctrl"><label for="s3d">delay() <output id="s3dv">400 ms</output></label><input type="range" id="s3d" min="50" max="900" step="50" value="400"></div>
      <div class="ctrl"><label for="s3l"><span>Condición del primer for: i &lt;= <span id="s3lv">7</span></span></label><input type="range" id="s3l" min="3" max="7" step="1" value="7"></div>
      ${codeBlock(code3(7, 400), 's3code')}
    </div>`,
  4: () => `<span class="label">Simulador · cortina de 12 LED</span>
    <div class="sim">
      <div class="sim__stage"><div class="ledrow" id="s4leds">${Array.from({length: 12}, (_, i) => `<div class="ledcol"><div class="led led--sm" data-pin="${i + 2}"></div>${i + 2}</div>`).join('')}</div>
        <p class="readout" id="s4out"></p></div>
      <div class="ctrl"><label for="s4pot"><span>Potenciómetro · <code>analogRead(A0)</code></span> <output id="s4val">0</output></label><input type="range" id="s4pot" min="0" max="1023" step="1" value="0"></div>
      <div class="sim__row"><button class="btn btn-sm btn--teal" type="button" id="s4inv" aria-pressed="false">Modo: desde el centro</button><button class="btn btn-sm" type="button" id="s4auto">▶ Barrido automático</button></div>
      ${codeBlock(code4(false), 's4code')}
    </div>`
};

const SIM_INIT = {
  1(root) {
    const led = $('#s1led', root), out = $('#s1out', root), rng = $('#s1range', root), val = $('#s1val', root), code = $('#s1code', root);
    let t = 1000, on = false, timer;
    const paint = () => { led.classList.toggle('on', on); out.innerHTML = `digitalWrite(13, <b>${on ? 'HIGH' : 'LOW'}</b>)`; hot(code, on ? 7 : 9); };
    const loop = () => { on = !on; paint(); timer = setTimeout(loop, t); };
    const set = v => { t = +v; rng.value = v; val.textContent = v + ' ms'; setCodeLines(code, code1(v)); };
    setCodeLines(code, code1(t));
    rng.addEventListener('input', () => set(rng.value));
    $$('[data-s1]', root).forEach(b => b.addEventListener('click', () => set(b.dataset.s1)));
    loop();
    return () => clearTimeout(timer);
  },
  2(root) {
    const code = $('#s2code', root);
    const pairs = [[$('#s2b1', root), $('#s2l1', root), $('#s2r1', root), 2, 8], [$('#s2b2', root), $('#s2l2', root), $('#s2r2', root), 3, 9]];
    pairs.forEach(([b, l, r, pin, ledPin]) => {
      const set = down => { b.classList.toggle('down', down); l.classList.toggle('on', down); r.innerHTML = `digitalRead(${pin}) = <b>${down ? 'HIGH' : 'LOW'}</b>`; hot(code, down ? 7 : 9); };
      set(false);
      b.addEventListener('pointerdown', e => { e.preventDefault(); b.setPointerCapture(e.pointerId); set(true); });
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => b.addEventListener(ev, () => set(false)));
      b.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); set(true); } });
      b.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') set(false); });
    });
  },
  3(root) {
    const leds = Object.fromEntries($$('.led', root).map(l => [l.dataset.pin, l]));
    const out = $('#s3out', root), dr = $('#s3d', root), lr = $('#s3l', root), code = $('#s3code', root);
    let d = 400, lim = 7, idx = 0, timer;
    const upd = () => { $('#s3dv', root).textContent = d + ' ms'; $('#s3lv', root).textContent = lim; setCodeLines(code, code3(lim, d)); };
    const seq = () => [...Array.from({length: lim - 1}, (_, k) => [2 + k, 1]), ...[7, 6, 5, 4, 3, 2].map(p => [p, 2])];
    const step = () => {
      const s = seq(); if (idx >= s.length) idx = 0;
      const [pin, dir] = s[idx++];
      Object.values(leds).forEach(l => l.classList.remove('on'));
      leds[pin].classList.add('on');
      out.innerHTML = `i = <b>${pin}</b> · ${dir === 1 ? 'ciclo de ida' : 'ciclo de vuelta'}`;
      hot(code, dir === 1 ? 8 : 13);
      timer = setTimeout(step, d);
    };
    dr.addEventListener('input', () => { d = +dr.value; upd(); });
    lr.addEventListener('input', () => { lim = +lr.value; idx = 0; upd(); });
    upd(); step();
    return () => clearTimeout(timer);
  },
  4(root) {
    const leds = Object.fromEntries($$('.led', root).map(l => [l.dataset.pin, l]));
    const pot = $('#s4pot', root), val = $('#s4val', root), out = $('#s4out', root), code = $('#s4code', root), invBtn = $('#s4inv', root), auto = $('#s4auto', root);
    let inv = false, raf = 0, t0 = 0;
    const draw = () => {
      const v = +pot.value, n = Math.round(v / 1023 * 6);
      Object.values(leds).forEach(l => l.classList.add('on'));
      for (let i = 0; i < n; i++) { const a = inv ? 2 + i : 7 - i, b = inv ? 13 - i : 8 + i; leds[a].classList.remove('on'); leds[b].classList.remove('on'); }
      val.textContent = v;
      out.innerHTML = `valor = <b>${v}</b> → parejas apagadas = map(${v}, 0, 1023, 0, 6) = <b>${n}</b>`;
    };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; auto.textContent = '▶ Barrido automático'; };
    const sweep = ts => { if (!t0) t0 = ts; pot.value = Math.round((Math.sin((ts - t0) / 900 - Math.PI / 2) + 1) / 2 * 1023); draw(); raf = requestAnimationFrame(sweep); };
    pot.addEventListener('input', () => { stop(); draw(); });
    invBtn.addEventListener('click', () => { inv = !inv; invBtn.setAttribute('aria-pressed', inv); invBtn.textContent = inv ? 'Modo: Cortina Invertida (reto)' : 'Modo: desde el centro'; setCodeLines(code, code4(inv)); draw(); });
    auto.addEventListener('click', () => { if (raf) stop(); else { t0 = 0; auto.textContent = '⏸ Detener'; raf = requestAnimationFrame(sweep); } });
    setCodeLines(code, code4(false)); draw();
    return stop;
  }
};

/* ---------- Sesión 5: servo y sensor ultrasónico ---------- */
SIM_HTML[5] = () => `<span class="label">Simulador · servomotor</span>
  <div class="sim">
    <div class="sim__stage">
      <svg viewBox="0 0 220 130" width="260" role="img" aria-label="Servomotor con su brazo en el ángulo elegido">
        <path d="M30 110A80 80 0 0 1 190 110" fill="none" stroke="#243153" stroke-width="12" stroke-linecap="round"/>
        <path id="s5arc" d="M30 110A80 80 0 0 1 190 110" fill="none" stroke="#00D9FF" stroke-width="12" stroke-linecap="round" stroke-dasharray="251.3" stroke-dashoffset="251.3"/>
        <text x="22" y="126" fill="#7e8fb2" font-size="11" font-family="monospace">0°</text><text x="100" y="22" fill="#7e8fb2" font-size="11" font-family="monospace">90°</text><text x="178" y="126" fill="#7e8fb2" font-size="11" font-family="monospace">180°</text>
        <line id="s5arm" x1="110" y1="110" x2="40" y2="110" stroke="#E4712B" stroke-width="7" stroke-linecap="round"/>
        <circle cx="110" cy="110" r="10" fill="#E4712B" stroke="#fff" stroke-width="3"/>
      </svg>
      <p class="readout" id="s5out"></p>
    </div>
    <div class="ctrl"><label for="s5ang"><span>Ángulo del servo</span> <output id="s5angv">90°</output></label><input type="range" id="s5ang" min="0" max="180" step="1" value="90"></div>
    <div class="sim__row"><button class="btn btn-sm btn--teal" type="button" data-s5="0">0°</button><button class="btn btn-sm btn--teal" type="button" data-s5="90">90°</button><button class="btn btn-sm btn--teal" type="button" data-s5="180">180°</button></div>

    <span class="label" style="margin-top:14px">Simulador · sensor ultrasónico</span>
    <div class="sim__stage">
      <svg viewBox="0 0 320 110" width="100%" style="max-width:380px" role="img" aria-label="Sensor ultrasónico que envía un pulso y recibe el eco de un obstáculo">
        <rect x="6" y="30" width="38" height="50" rx="6" fill="#005c83" stroke="#00D9FF"/><circle cx="19" cy="55" r="9" fill="#0c1220" stroke="#00D9FF"/><circle cx="33" cy="55" r="0.1"/><circle cx="19" cy="55" r="3" fill="#00D9FF"/>
        <line x1="6" y1="96" x2="314" y2="96" stroke="#243153" stroke-width="2"/>
        <rect id="s5obs" x="200" y="25" width="14" height="66" rx="3" fill="#E4712B"/>
        <circle id="s5wave" cx="48" cy="55" r="6" fill="#00D9FF"/>
      </svg>
      <p class="readout" id="s5uout"></p>
    </div>
    <div class="ctrl"><label for="s5dist"><span>Distancia al obstáculo</span> <output id="s5distv">100 cm</output></label><input type="range" id="s5dist" min="5" max="200" step="1" value="100"></div>
  </div>`;

SIM_INIT[5] = root => {
  const ang = $('#s5ang', root), arm = $('#s5arm', root), arc = $('#s5arc', root), out = $('#s5out', root);
  const setAng = a => {
    a = +a; ang.value = a;
    const r = 70, rad = a * Math.PI / 180;
    arm.setAttribute('x2', 110 - r * Math.cos(rad)); arm.setAttribute('y2', 110 - r * Math.sin(rad));
    arc.setAttribute('stroke-dashoffset', 251.3 * (1 - a / 180));
    $('#s5angv', root).textContent = a + '°';
    out.innerHTML = `miServo.write(<b>${a}</b>)`;
  };
  ang.addEventListener('input', () => setAng(ang.value));
  $$('[data-s5]', root).forEach(b => b.addEventListener('click', () => setAng(b.dataset.s5)));
  setAng(90);

  const dist = $('#s5dist', root), obs = $('#s5obs', root), wave = $('#s5wave', root), uout = $('#s5uout', root);
  let d = 100, raf = 0, t0 = 0;
  const obsX = () => 60 + (d - 5) / 195 * 240;
  const setDist = v => {
    d = +v; obs.setAttribute('x', obsX());
    $('#s5distv', root).textContent = d + ' cm';
    uout.innerHTML = `echo = <b>${d * 58} µs</b> → distancia = ${d * 58} / 58 = <b>${d} cm</b>`;
  };
  const tick = ts => {
    if (!t0) t0 = ts;
    const period = 900 + d * 6, ph = ((ts - t0) % period) / period, x0 = 50, x1 = obsX() - 2;
    const k = ph < .5 ? ph * 2 : 1 - (ph - .5) * 2;
    wave.setAttribute('cx', x0 + (x1 - x0) * k);
    wave.setAttribute('fill', ph < .5 ? '#00D9FF' : '#E4712B');
    raf = requestAnimationFrame(tick);
  };
  dist.addEventListener('input', () => setDist(dist.value));
  setDist(100);
  if (!reduced) raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
};

/* ============================================================
   FONDO DE CIRCUITOS (canvas animado)
   ============================================================ */
function circuit(canvas) {
  const ctx = canvas.getContext('2d');
  const still = reduced || 'still' in canvas.dataset;   // fondo fijo, sin pulsos de luz
  const G = 44; let w, h, paths, running = false, raf, dpr;
  const build = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect(); w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cols = Math.floor(w / G), rows = Math.floor(h / G), count = Math.max(8, Math.round(w * h / 52000));
    paths = Array.from({length: count}, () => {
      let x = Math.floor(Math.random() * cols), y = Math.floor(Math.random() * rows), horiz = Math.random() < .5;
      const pts = [[x * G, y * G]];
      for (let s = 0; s < 3 + Math.floor(Math.random() * 4); s++) {
        const len = (1 + Math.floor(Math.random() * 4)) * (Math.random() < .5 ? -1 : 1);
        if (horiz) x = Math.max(0, Math.min(cols, x + len)); else y = Math.max(0, Math.min(rows, y + len));
        pts.push([x * G, y * G]); horiz = !horiz;
      }
      let L = 0; const segs = pts.slice(1).map((p, i) => { const l = Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]); L += l; return l; });
      return { pts, segs, L: L || 1, t: Math.random(), v: .0015 + Math.random() * .003, c: Math.random() < .2 ? '#E4712B' : '#00D9FF', dot: Math.random() < .35, pulse: Math.random() < .5 };
    });
  };
  const at = (p, d) => { let i = 0; while (i < p.segs.length - 1 && d > p.segs[i]) { d -= p.segs[i]; i++; } const a = p.pts[i], b = p.pts[i + 1], k = p.segs[i] ? d / p.segs[i] : 0; return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]; };
  const frame = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1.5; ctx.lineJoin = 'round';
    for (const p of paths) {
      ctx.strokeStyle = 'rgba(0,217,255,.2)'; ctx.beginPath(); p.pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke();
      if (p.dot) { ctx.fillStyle = 'rgba(0,217,255,.3)'; const q = p.pts[0]; ctx.beginPath(); ctx.arc(q[0], q[1], 2.5, 0, 7); ctx.fill(); }
      if (still || !p.pulse) continue;
      p.t = (p.t + p.v) % 1;
      const [x, y] = at(p, p.t * p.L);
      const g = ctx.createRadialGradient(x, y, 0, x, y, 10); g.addColorStop(0, p.c); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 10, 0, 7); ctx.fill();
    }
    if (running && !still) raf = requestAnimationFrame(frame);
  };
  const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; cancelAnimationFrame(raf); if (running) frame(); }, {threshold: 0});
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { build(); frame(); }, 200); });
  build(); frame(); io.observe(canvas);
}

/* ============================================================
   INTERACCIONES GENERALES DE CADA VISTA
   ============================================================ */
const revealIO = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('is-in'); revealIO.unobserve(e.target);
  const c = $('[data-count]', e.target) || (e.target.matches('[data-count]') ? e.target : null);
  if (c) countUp(c);
}), {threshold: .12, rootMargin: '0px 0px -40px 0px'});

function countUp(el) {
  const to = +el.dataset.count; if (reduced) { el.textContent = to; return; }
  const t0 = performance.now(), dur = 1400;
  const f = t => { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); };
  requestAnimationFrame(f);
}

function typewriter(el) {
  const txt = el.dataset.text; if (reduced) { el.textContent = txt; return; }
  let i = 0; const tick = () => { el.textContent = txt.slice(0, ++i); if (i < txt.length) setTimeout(tick, 28); }; tick();
}

function wireView(root, n) {
  $$('.reveal', root).forEach(el => revealIO.observe(el));
  $$('[data-circuit]', root).forEach(circuit);
  const typed = $('#typed', root); if (typed) typewriter(typed);

  // placa 3D que sigue el cursor
  const mv = $('#board3d', root);
  if (mv) {   // el modelo 3D reemplaza a la placa dibujada con CSS cuando termina de cargar
    const ready = () => mv.closest('.board3d').classList.add('is-ready');
    if (mv.loaded) ready(); else mv.addEventListener('load', ready, {once: true});
  }
  const chip = $('#chip', root);
  if (chip && matchMedia('(pointer:fine)').matches && !reduced) {
    const hero = chip.closest('.hero');
    hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; chip.style.transform = `rotateY(${x * 34}deg) rotateX(${-y * 28}deg)`; });
    hero.addEventListener('pointerleave', () => { chip.style.transform = ''; });
  }
  // inclinación suave de tarjetas
  if (matchMedia('(pointer:fine)').matches && !reduced) $$('.card--link', root).forEach(c => {
    c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); c.style.transform = `perspective(700px) rotateY(${((e.clientX - r.left) / r.width - .5) * 10}deg) rotateX(${-((e.clientY - r.top) / r.height - .5) * 10}deg) translateY(-4px)`; });
    c.addEventListener('pointerleave', () => { c.style.transform = ''; });
  });
  // videos: se cargan al hacer clic
  $$('.media[data-embed]', root).forEach(m => $('.media__play', m).addEventListener('click', () => {
    m.innerHTML = `<iframe src="${m.dataset.embed}" title="${m.dataset.title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  }));
  // predicciones y retos guardados
  $$('[data-pred]', root).forEach(t => { t.value = store.get('pred' + t.dataset.pred, ''); t.addEventListener('input', () => store.set('pred' + t.dataset.pred, t.value)); });
  const checks = $$('[data-check]', root);
  const meter = () => {
    if (!checks.length) return; const d = checks.filter(c => c.checked).length, p = d / checks.length * 100;
    $('.meter i', root).style.width = p + '%'; $('.meter', root).setAttribute('aria-valuenow', Math.round(p));
    $('[data-meter]', root).textContent = d === checks.length ? `¡Reto completado! ${d} de ${checks.length} 🎉` : `${d} de ${checks.length} completados`;
  };
  checks.forEach(c => { c.checked = store.get('chk' + c.dataset.check, false); c.addEventListener('change', () => { store.set('chk' + c.dataset.check, c.checked); meter(); if (checks.every(x => x.checked)) toast('¡Reto completado! 🎉'); }); });
  meter();
  // copiar código
  $$('[data-copy]', root).forEach(b => b.addEventListener('click', () => {
    const pre = b.closest('pre'); const txt = pre.dataset.raw || $('code', pre).innerText;
    navigator.clipboard?.writeText(txt).then(() => toast('Código copiado'), () => toast('No se pudo copiar'));
  }));
  return n && SIM_INIT[n] ? SIM_INIT[n](root) : null;
}

/* ---------- aviso emergente ---------- */
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('is-on'), 2200); }

/* ============================================================
   ENRUTADOR (#/inicio, #/sesion-1 … #/sobre-el-proyecto)
   ============================================================ */
const main = $('#main');
const TITLES = { inicio: 'Inicio', 'sobre-el-proyecto': 'Sobre el proyecto' };
const VIEWS = { inicio: () => viewInicio(), 'sobre-el-proyecto': () => viewSobre() };
[1, 2, 3, 4, 5].forEach(n => { VIEWS['sesion-' + n] = () => viewSesion(n); TITLES['sesion-' + n] = 'Sesión ' + n; });
let cleanup = null;

function route() {
  const key = (location.hash.replace(/^#\/?/, '') || 'inicio').split('?')[0];
  const name = VIEWS[key] ? key : 'inicio';
  if (typeof cleanup === 'function') cleanup();
  const sec = document.createElement('div');
  sec.className = 'view is-on';
  sec.innerHTML = VIEWS[name]();
  main.replaceChildren(sec);
  cleanup = wireView(sec, name.startsWith('sesion-') ? +name.slice(7) : 0);
  document.title = `${TITLES[name]} · Proyecto de Aula 8°`;
  $$('[data-route]').forEach(a => a.classList.toggle('is-active', a.dataset.route === name));
  $('#navMenu').classList.remove('is-open'); $('#navToggle').setAttribute('aria-expanded', 'false');
  scrollTo({top: 0, behavior: 'instant'});
}
addEventListener('hashchange', route);

/* ---------- barra superior, progreso y volver arriba ---------- */
const nav = $('#nav'), bar = $('#progress'), up = $('#toTop');
const onScroll = () => {
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  nav.classList.toggle('is-solid', y > 30); up.classList.toggle('is-on', y > 500);
  bar.style.width = (max > 0 ? y / max * 100 : 0) + '%';
};
addEventListener('scroll', onScroll, {passive: true});
up.addEventListener('click', () => scrollTo({top: 0, behavior: reduced ? 'auto' : 'smooth'}));
$('#navToggle').addEventListener('click', e => {
  const open = $('#navMenu').classList.toggle('is-open');
  e.currentTarget.setAttribute('aria-expanded', open); e.currentTarget.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
$('#footerCircuit').dataset.still = '';
circuit($('#footerCircuit'));

route(); onScroll();
setTimeout(() => $('#loader').classList.add('is-done'), 500);   // no esperar a los iframes de Canva / YouTube
})();
