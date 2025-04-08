const container = document.getElementById("github-projects");

fetch("https://api.github.com/users/JuanGonzalezJara/repos")
  .then((res) => res.json())
  .then((repos) => {
    container.innerHTML = ""; // Limpia el texto de "Cargando..."
    repos.slice(0, 6).forEach((repo) => {
      const project = document.createElement("div");
      project.className = "project";
      project.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
        <p>${repo.description || "Sin descripción"}</p>
        <p><strong>Lenguaje:</strong> ${repo.language || "N/A"}</p>
      `;
      container.appendChild(project);
    });
  })
  .catch((err) => {
    container.innerHTML = "Error al cargar proyectos.";
    console.error(err);
  });

// Obtener el valor inicial de clickCount desde localStorage
let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
document.getElementById('clickCount').textContent = clickCount;

// Añadir el evento al botón de clic
document.getElementById('clickBtn').addEventListener('click', function() {
  clickCount++;
  localStorage.setItem('clickCount', clickCount);
  document.getElementById('clickCount').textContent = clickCount;

  // Verificar si se alcanzaron los 10 clics
  if (clickCount === 10) {
    // Cambiar el fondo y tamaño del botón cuando se llega a 10 clics
    const clickButton = document.getElementById('clickBtn');
    
    // Alerta divertida
    alert('¡Felicidades! Has alcanzado 10 clics, eres increíble!');
    
    // Cambiar estilo del botón
    clickButton.style.backgroundColor = '#28a745';  // Color verde
    clickButton.style.transform = 'scale(1.5)';     // Aumentar tamaño
    clickButton.style.transition = 'transform 0.2s, background-color 0.3s'; // Transición suave

    // Volver al estilo original después de 2 segundos
    setTimeout(() => {
      clickButton.style.backgroundColor = '#ffc107'; // Color original
      clickButton.style.transform = 'scale(1)';      // Volver al tamaño original
    }, 2000);
  }
});

// Configuración de la Intersección de los elementos de la línea de tiempo
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2 // Ajusta el porcentaje de visibilidad necesario
  });

document.querySelectorAll('.timeline-content').forEach(elem => {
  observer.observe(elem);
});

// Configuración de las barras de progreso para las habilidades
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progress = entry.target;
      const value = progress.getAttribute('data-value');
      progress.style.width = value;
      skillObserver.unobserve(progress); // Para animarlo solo una vez
    }
  });
}, {
  threshold: 0.3
});

document.querySelectorAll('.progress').forEach(bar => {
  skillObserver.observe(bar);
});

// Configuración de modo oscuro
const darkModeToggle = document.getElementById('darkModeToggle');

// Verificar si el modo oscuro está activado previamente
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkModeToggle.textContent = '🌞'; // Cambiar ícono a sol
}

darkModeToggle.addEventListener('click', () => {
  // Alternar el modo oscuro
  document.body.classList.toggle('dark-mode');

  // Guardar preferencia en localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
    darkModeToggle.textContent = '🌞'; // Cambiar ícono a sol
  } else {
    localStorage.removeItem('darkMode');
    darkModeToggle.textContent = '🌙'; // Cambiar ícono a luna
  }
});
