document.getElementById('talent-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const statusText = document.getElementById('form-status');
  statusText.style.color = '#2563eb';
  statusText.textContent = 'Enviando información...';

  // 1. Recopilar datos ingresados en el formulario
  const formData = {
    nombre: document.getElementById('nombre').value,
    dni: document.getElementById('dni').value,
    correo: document.getElementById('correo').value,
    celular: document.getElementById('celular').value,
    universidad: document.getElementById('universidad').value,
    carrera: document.getElementById('carrera').value,
    fechaRegistro: new Date().toISOString()
  };

  // 2. Reemplaza esta variable con el Webhook generado en Power Automate
  const POWER_AUTOMATE_WEBHOOK_URL = "TU_URL_DE_POWER_AUTOMATE_AQUI";

  try {
    if (POWER_AUTOMATE_WEBHOOK_URL === "TU_URL_DE_POWER_AUTOMATE_AQUI") {
      // Simulación local si aún no has puesto la URL
      setTimeout(() => {
        statusText.style.color = 'green';
        statusText.textContent = '¡Registro exitoso! (Modo demostración)';
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
      statusText.textContent = '¡Registro enviado con éxito! Nos pondremos en contacto.';
      document.getElementById('talent-form').reset();
    } else {
      throw new Error('Error al responder el servidor');
    }
  } catch (error) {
    statusText.style.color = 'red';
    statusText.textContent = 'Hubo un inconveniente al enviar tus datos. Inténtalo nuevamente.';
  }
});