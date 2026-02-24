// Proyectos (datos)
const proyectos = [
  {
    titulo: 'Sitios Web Personalizados',
    descripcion: 'Landing pages y webs corporativas diseñadas desde cero.',
    icono: '🌐'
  },
  {
    titulo: 'Menús Virtuales',
    descripcion: 'Menús autogestionables mediante código QR.',
    icono: '🍽️'
  }
];

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
  enlace.addEventListener('click', e => {
    e.preventDefault();
    const destino = document.querySelector(enlace.getAttribute('href'));
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// === INICIALIZAR EMAILJS ===
(function() {
  emailjs.init("QZGL7RsjWUx1h5aJS");
})();

// === FORMULARIO DE CONTACTO ===
const boton = document.getElementById('btn-enviar');
const formulario = document.getElementById('contact-form');

boton.addEventListener('click', function(e) {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const servicio = document.getElementById('servicio').value;
  const mensaje = document.getElementById('mensaje').value;
  
  // Validar nombre (mínimo 2 caracteres, solo letras y espacios)
 if (nombre.length < 2) {
   alert('El nombre debe tener al menos 2 caracteres.');
   return;
 }
 if (!/^[a-zA-Z\s]+$/.test(nombre)) {
   alert('El nombre solo puede contener letras y espacios.');
   return;
 }

 // Validar email (formato válido)
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!emailRegex.test(email)) {
   alert('Por favor, ingresá un email válido (ej: tu@email.com).');
   return;
 }

 // Validar que haya seleccionado servicio
 if (!servicio) {
   alert('Por favor, seleccioná un servicio.');
   return;
 }

 // Validar mensaje (mínimo 10 caracteres)
 if (mensaje.length < 10) {
   alert('El mensaje debe tener al menos 10 caracteres.');
   return;
 }


  
  boton.textContent = 'Enviando...';
  boton.disabled = true;

  const templateParams = {
    nombre: nombre,
    email: email,
    servicio: servicio,
    mensaje: mensaje
  };

  emailjs.send('service_ko0xcxe', 'template_tt50ff3', templateParams)
    .then(function(response) {
      alert('¡Mensaje enviado correctamente! Te contactaré pronto.');
      formulario.reset();
    }, function(error) {
      alert('Hubo un error. Por favor, intentá de nuevo.');
    })
    .finally(() => {
      boton.textContent = 'Enviar Mensaje';
      boton.disabled = false;
    });
});

// Scroll indicator
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(0,0,0,0.9)';
  } else {
    nav.style.background = 'rgba(0,0,0,0.6)';
  }
});
