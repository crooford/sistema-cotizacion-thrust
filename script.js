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
    // crea un div para almacenar la info del servicio
    const serviceItem = document.createElement('div');
    serviceItem.classList.add('service-item');
    
    const serviceTitleBtn = document.createElement('div');
    serviceTitleBtn.classList.add('service-title-btn')

    // crea un h3 para agregar el titulo del servicio
    const serviceTitle = document.createElement('h3');
    serviceTitle.classList.add('service-title')
    serviceTitle.textContent = service.servicio;
    serviceTitleBtn.appendChild(serviceTitle);

    //crea el boton de eliminar el servicio seleccionado
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '&#x2716;'; // Código HTML para la "X"
    deleteBtn.classList.add('delete-btn'); // Agregar la clase "delete-btn" al botón
    deleteBtn.addEventListener('click', () => {
      selectedServices = selectedServices.filter(s => s.servicio !== service.servicio);
      servicesList.removeChild(serviceItem);
    });
    serviceTitleBtn.appendChild(deleteBtn);
    serviceItem.appendChild(serviceTitleBtn);
    //crea un parrafo para agregar detalles 
    const serviceDetalles = document.createElement('p');
    serviceDetalles.classList.add('service-details');
    serviceDetalles.textContent = 'Detalles:';
    serviceItem.appendChild(serviceDetalles);

    //crea la lista de detalles
    const detallesList = document.createElement('ul');
    detallesList.classList.add('list-details');
    service.detalles.forEach(detalle => {
        const detalleItem = document.createElement('li');
        detalleItem.textContent = detalle;
        detallesList.appendChild(detalleItem);
    });
    serviceItem.appendChild(detallesList);
    
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
