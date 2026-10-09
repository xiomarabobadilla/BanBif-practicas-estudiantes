// CONTROL DE LA VENTANA MODAL DE LA LEY N° 29733
const modal = document.getElementById("lawModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const acceptLawBtn = document.getElementById("acceptLaw");

openModalBtn.addEventListener("click", function(e) {
  e.preventDefault();
  modal.style.display = "block";
});

closeModalBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

acceptLawBtn.addEventListener("click", function() {
  modal.style.display = "none";
  document.getElementById("leyData").checked = true;
});

window.addEventListener("click", function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// CONTROL DEL FORMULARIO Y POWER AUTOMATE
document.getElementById('talent-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const statusText = document.getElementById('form-status');
  statusText.style.color = '#5340eb';
  statusText.textContent = 'Enviando postulación...';

  const formData = {
    nombre: document.getElementById('nombre').value,
    dni: document.getElementById('dni').value,
    universidad: document.getElementById('universidad').value,
    carrera: document.getElementById('carrera').value,
    ciclo: document.getElementById('ciclo').value,
    area: document.getElementById('area').value,
    correo: document.getElementById('correo').value,
    celular: document.getElementById('celular').value,
    disponibilidad: document.getElementById('disponibilidad').value,
    fechaRegistro: new Date().toISOString()
  };

  const POWER_AUTOMATE_WEBHOOK_URL = "TU_URL_DE_POWER_AUTOMATE_AQUI";

  try {
    if (POWER_AUTOMATE_WEBHOOK_URL === "TU_URL_DE_POWER_AUTOMATE_AQUI") {
      setTimeout(() => {
        statusText.style.color = 'green';
        statusText.textContent = '¡Registro exitoso! Tus datos han sido registrados.';
        document.getElementById('talent-form').reset();
      }, 1000);
      return;
    }

    const response = await fetch(POWER_AUTOMATE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      statusText.style.color = 'green';
      statusText.textContent = '¡Registro exitoso! Nos pondremos en contacto.';
      document.getElementById('talent-form').reset();
    } else {
      throw new Error('Error al enviar los datos');
    }
  } catch (error) {
    statusText.style.color = 'red';
    statusText.textContent = 'Hubo un error al enviar. Por favor vuelve a intentarlo.';
  }
});