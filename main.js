/**
 * ============================================================
 * MAIN.JS — Script principal del portfolio de Ignacio Toledo
 * ============================================================
 *
 * Contiene toda la lógica interactiva del sitio:
 * - Efecto typewriter en el título hero
 * - Menú hamburguesa para dispositivos móviles
 * - Navegación suave entre secciones (smooth scroll)
 * - Cambio de fondo de la barra de navegación al hacer scroll
 * - Animaciones de entrada al hacer scroll (IntersectionObserver)
 * - Validación y envío del formulario de contacto con EmailJS
 */

// ============================================================
// INICIALIZACIÓN DE EMAILJS
// Servicio externo para enviar los datos del formulario por email.
// ============================================================
(function () {
  emailjs.init('QZGL7RsjWUx1h5aJS');
})();

// ============================================================
// EFECTO TYPEWRITER (Máquina de escribir)
// Escribe el texto del título letra por letra con un retardo.
// ============================================================
const textoTypewriter = 'Desarrollador Web';
const elementoTypewriter = document.querySelector('.typewriter');
let indiceCaracter = 0;

/**
 * Escribe el siguiente carácter del texto en el elemento.
 * Se llama a sí misma recursivamente con setTimeout.
 */
function escribirCaracter() {
  if (indiceCaracter < textoTypewriter.length) {
    elementoTypewriter.textContent += textoTypewriter.charAt(indiceCaracter);
    indiceCaracter++;
    setTimeout(escribirCaracter, 100);
  }
}

// Iniciar el efecto typewriter
escribirCaracter();

// ============================================================
// MENÚ HAMBURGUESA (Navegación móvil)
// Abre y cierra el menú en dispositivos pequeños.
// ============================================================
const botonHamburguesa = document.getElementById('nav-toggle');
const menuNavegacion = document.getElementById('nav-links');

/**
 * Alterna la visibilidad del menú móvil y actualiza
 * el atributo aria-expanded para accesibilidad.
 */
botonHamburguesa.addEventListener('click', () => {
  const estaAbierto = menuNavegacion.classList.toggle('active');
  botonHamburguesa.classList.toggle('active');
  botonHamburguesa.setAttribute('aria-expanded', estaAbierto);
});

// ============================================================
// NAVEGACIÓN SUAVE (Smooth Scroll)
// Al hacer clic en un enlace interno (#seccion), se desplaza
// suavemente hasta esa sección. También cierra el menú móvil.
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach((enlace) => {
  enlace.addEventListener('click', (evento) => {
    evento.preventDefault();

    const destino = document.querySelector(enlace.getAttribute('href'));

    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    }

    // Cerrar el menú hamburguesa si está abierto (vista móvil)
    menuNavegacion.classList.remove('active');
    botonHamburguesa.classList.remove('active');
    botonHamburguesa.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// EFECTO DE SCROLL EN LA BARRA DE NAVEGACIÓN
// Oscurece el fondo del nav al bajar más de 50px.
// ============================================================
const barraNavegacion = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    barraNavegacion.style.background = 'rgba(0, 0, 0, 0.9)';
  } else {
    barraNavegacion.style.background = 'rgba(0, 0, 0, 0.6)';
  }
});

// ============================================================
// ANIMACIONES DE ENTRADA CON SCROLL (IntersectionObserver)
// Los elementos con clase .animate-on-scroll se hacen visibles
// al entrar en el viewport del usuario.
// ============================================================
const elementosAnimados = document.querySelectorAll('.animate-on-scroll');

const observadorScroll = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        // Dejar de observar una vez visible (solo se anima una vez)
        observadorScroll.unobserve(entrada.target);
      }
    });
  },
  {
    threshold: 0.1, // Se activa cuando el 10% del elemento es visible
    rootMargin: '0px 0px -50px 0px', // Margen inferior para activar un poco antes
  }
);

// Registrar cada elemento animable en el observador
elementosAnimados.forEach((elemento) => {
  observadorScroll.observe(elemento);
});

// ============================================================
// FORMULARIO DE CONTACTO
// Validación de campos y envío mediante EmailJS.
// ============================================================
const botonEnviar = document.getElementById('btn-enviar');
const formularioContacto = document.getElementById('contact-form');

botonEnviar.addEventListener('click', (evento) => {
  evento.preventDefault();

  // Obtener valores de los campos
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const servicio = document.getElementById('servicio').value;
  const mensaje = document.getElementById('mensaje').value.trim();

  // --- Validación del nombre ---
  // Mínimo 2 caracteres, acepta letras latinas, acentos, ñ y espacios
  if (nombre.length < 2) {
    alert('El nombre debe tener al menos 2 caracteres.');
    return;
  }

  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(nombre)) {
    alert('El nombre solo puede contener letras y espacios.');
    return;
  }

  // --- Validación del email ---
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexEmail.test(email)) {
    alert('Por favor, ingresá un email válido (ej: tu@email.com).');
    return;
  }

  // --- Validación del servicio ---
  if (!servicio) {
    alert('Por favor, seleccioná un servicio.');
    return;
  }

  // --- Validación del mensaje ---
  if (mensaje.length < 10) {
    alert('El mensaje debe tener al menos 10 caracteres.');
    return;
  }

  // --- Envío del formulario ---
  // Deshabilitar botón mientras se envía
  botonEnviar.textContent = 'Enviando...';
  botonEnviar.disabled = true;

  const parametrosEmail = {
    nombre: nombre,
    email: email,
    servicio: servicio,
    mensaje: mensaje,
  };

  emailjs
    .send('service_ko0xcxe', 'template_tt50ff3', parametrosEmail)
    .then(
      () => {
        alert('¡Mensaje enviado correctamente! Te contactaré pronto.');
        formularioContacto.reset();
      },
      () => {
        alert('Hubo un error. Por favor, intentá de nuevo.');
      }
    )
    .finally(() => {
      botonEnviar.textContent = 'Enviar Mensaje';
      botonEnviar.disabled = false;
    });
});
