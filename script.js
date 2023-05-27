// Obtener referencia a los elementos del DOM
const servicesSelect = document.getElementById('services');
const addServiceBtn = document.getElementById('add-service-btn');
const servicesList = document.getElementById('services-list');
const generateQuoteBtn = document.getElementById('generate-quote-btn');

let availableServices = []; // Array para almacenar los servicios disponibles
let selectedServices = []; // Array para almacenar los servicios seleccionados

// Cargar los datos del archivo JSON
fetch('informacion.json')
  .then(response => response.json())
  .then(data => {
    // Asignar los servicios cargados desde el JSON
    availableServices = data;

    // Generar las opciones del menú de selección
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione un servicio';
    servicesSelect.appendChild(defaultOption);

    data.forEach(service => {
      const option = document.createElement('option');
      option.value = service.servicio;
      option.textContent = service.servicio;
      servicesSelect.appendChild(option);
    });
  });

// Evento al hacer clic en el botón "Agregar"
addServiceBtn.addEventListener('click', () => {
  const selectedService = servicesSelect.value;

  if (selectedService === '') {
    alert('Por favor, seleccione un servicio válido.');
    return;
  }

  const serviceExists = selectedServices.some(service => service.servicio === selectedService);
  if (serviceExists) {
    alert('El servicio seleccionado ya ha sido agregado.');
    return;
  }

  const service = availableServices.find(s => s.servicio === selectedService);
  if (service) {
    selectedServices.push(service);
    const serviceItem = document.createElement('div');
    serviceItem.classList.add('service-item');
    serviceItem.innerHTML = `
      <h3>${service.servicio}</h3>
      <p>Objetivo: ${service.objetivo}</p>
      <p>Detalles: ${service.detalles}</p>
      <p>Entregables: ${service.entregable}</p>
      <p>Tiempo: ${service.tiempo}</p>
      <p>Precio: ${service.precio}</p>
    `;
    servicesList.appendChild(serviceItem);
  }
});

// Evento al hacer clic en el botón "Generar cotización"
generateQuoteBtn.addEventListener('click', () => {
  if (selectedServices.length > 0) {
    const quoteData = encodeURIComponent(JSON.stringify(selectedServices));
    window.location.href = `cotizacion.html?quote=${quoteData}`;
  } else {
    alert('No se han seleccionado servicios. Por favor, agregue al menos uno.');
  }
});
