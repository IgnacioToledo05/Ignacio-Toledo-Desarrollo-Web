(function () {
  emailjs.init('QZGL7RsjWUx1h5aJS');
})();

const textoTypewriter = 'Desarrollador Web';
const elementoTypewriter = document.querySelector('.typewriter');
let indiceCaracter = 0;

function escribirCaracter() {
  if (indiceCaracter < textoTypewriter.length) {
    elementoTypewriter.textContent += textoTypewriter.charAt(indiceCaracter);
    indiceCaracter++;
    setTimeout(escribirCaracter, 100);
  }
}

escribirCaracter();

const botonHamburguesa = document.getElementById('nav-toggle');
const menuNavegacion = document.getElementById('nav-links');

botonHamburguesa.addEventListener('click', () => {
  const estaAbierto = menuNavegacion.classList.toggle('active');
  botonHamburguesa.classList.toggle('active');
  botonHamburguesa.setAttribute('aria-expanded', estaAbierto);
});

document.querySelectorAll('a[href^="#"]').forEach((enlace) => {
  enlace.addEventListener('click', (evento) => {
    evento.preventDefault();

    const destino = document.querySelector(enlace.getAttribute('href'));

    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    }

    menuNavegacion.classList.remove('active');
    botonHamburguesa.classList.remove('active');
    botonHamburguesa.setAttribute('aria-expanded', 'false');
  });
});

const barraNavegacion = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  barraNavegacion.style.background = window.scrollY > 50
    ? 'rgba(0, 0, 0, 0.9)'
    : 'rgba(0, 0, 0, 0.6)';
});

const elementosAnimados = document.querySelectorAll('.animate-on-scroll');

const observadorScroll = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observadorScroll.unobserve(entrada.target);
      }
    });
  },
  {
    threshold: 0.05, // Más sensible para móviles y pantallas pequeñas
    rootMargin: '0px 0px -20px 0px',
  }
);

// Función para verificar elementos visibles inmediatamente y observar los demás
function inicializarAnimaciones() {
  elementosAnimados.forEach((elemento) => {
    // Si el elemento ya está en el viewport (ej: hero), mostrarlo de inmediato
    const rect = elemento.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      elemento.classList.add('visible');
    } else {
      observadorScroll.observe(elemento);
    }
  });
}

inicializarAnimaciones();

const botonEnviar = document.getElementById('btn-enviar');
const formularioContacto = document.getElementById('contact-form');

botonEnviar.addEventListener('click', (evento) => {
  evento.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const servicio = document.getElementById('servicio').value;
  const mensaje = document.getElementById('mensaje').value.trim();

  if (nombre.length < 2) {
    alert('El nombre debe tener al menos 2 caracteres.');
    return;
  }

  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(nombre)) {
    alert('El nombre solo puede contener letras y espacios.');
    return;
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexEmail.test(email)) {
    alert('Por favor, ingresá un email válido (ej: tu@email.com).');
    return;
  }

  if (!servicio) {
    alert('Por favor, seleccioná un servicio.');
    return;
  }

  if (mensaje.length < 10) {
    alert('El mensaje debe tener al menos 10 caracteres.');
    return;
  }

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
