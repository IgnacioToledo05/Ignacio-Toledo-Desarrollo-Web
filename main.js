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
const formulario = document.getElementById('contact-form');
const boton = document.getElementById('btn-enviar');

boton.addEventListener('click', function(e) {
  e.preventDefault();
  
  boton.textContent = 'Enviando...';
  boton.disabled = true;

  const templateParams = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    servicio: document.getElementById('servicio').value,
    mensaje: document.getElementById('mensaje').value
  };

emailjs.send('service_ko0xcxe', 'template_tt50ff3', templateParams)
    .then(function(response) {
      alert('¡Mensaje enviado correctamente! Te contactaré pronto.');
      formulario.reset();
    }, function(error) {
      alert('Hubo un error. Por favor, intentá de nuevo.');
    })
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
