// Obtener referencia a los elementos del DOM
const servicesSelect = document.getElementById('services');
const addServiceBtn = document.getElementById('add-service-btn');
const servicesList = document.getElementById('services-list');
const generateQuoteBtn = document.getElementById('generate-quote-btn');
const containerDiv = document.getElementById('container')
const addInfo = document.getElementById('add-info-service');
const descargaBtn = document.getElementById('btn__descargar');
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
    serviceTitleBtn.classList.add('service-title-btn');

    // crea un h3 para agregar el titulo del servicio
    const serviceTitle = document.createElement('h3');
    serviceTitle.classList.add('service-title');
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
    // Obtener referencia al elemento de la tabla
    const clienteInfo = document.getElementById('cliente').value;
    document.getElementById('cliente-recive').value = clienteInfo;
    const representanteInfo = document.getElementById('representante').value;
    document.getElementById('firma-representante').value = representanteInfo;
    const vigenciaInfo= document.getElementById('fechav').value;
    document.getElementById('fechav-recive').value = vigenciaInfo;
    const ncotizacion = document.getElementById('ncot').value;
    document.getElementById('ncot-recive').value = ncotizacion;
    const fechaInfo = document.getElementById('fecha').value;
    document.getElementById('fecha-recive').value = fechaInfo;
    document.getElementById('firma-client').value =clienteInfo;
    const quoteTable = document.getElementById('quote-table');
    containerDiv.classList.add('ocult');
    const sectionCost = document.getElementById('section-cot');
    sectionCost.classList.remove('ocult');
    const containerImg = document.getElementById('img-container');
    containerImg.classList.add('ocult');
    // containerImg.classList.remove('row-1');
    // containerImg.classList.add('row-2');
    // containerDiv.classList.remove('row-2');
    // containerDiv.classList.add('row-3');
    // sectionCost.classList.remove('row-3');
    // sectionCost.classList.add('row-1');
    const containerDescarga = document.getElementById('container-btn-descarga');
    containerDescarga.classList.remove('ocult');


    // Generar la tabla con los servicios seleccionados
    const selectedItem = document.createElement('div');
    selectedItem.classList.add('selected-item-group');

    selectedServices.forEach(service => {
    // primera linea de la cotizacion
      const serviceSelect = document.createElement('div');
      serviceSelect.classList.add('service-select');

      // elementos agregados en la primera linea
      const serviceTitle = document.createElement('h3');
      serviceTitle.classList.add('service-title');
      serviceTitle.textContent = service.servicio;
      serviceSelect.appendChild(serviceTitle);

      const servicePrice = document.createElement('h3');
      servicePrice.classList.add('service-price');
      servicePrice.textContent = `$${service.precio} MXN`;
      serviceSelect.appendChild(servicePrice);

      selectedItem.appendChild(serviceSelect);


      const serviceDetails = document.createElement('div');
      serviceDetails.classList.add('service-details');

      const detailTitle = document.createElement('p');
      detailTitle.classList.add('detail-title');
      detailTitle.textContent = 'Detalles:';
      serviceDetails.appendChild(detailTitle);

      const timeItem = document.createElement('h4');
      timeItem.classList.add('time-item');
      timeItem.textContent = `${service.tiempo}`;
      serviceDetails.appendChild(timeItem);

      selectedItem.appendChild(serviceDetails);

      const detallesList = document.createElement('ul');
      detallesList.classList.add('list-details');
      service.detalles.forEach(detalle => {
          const detalleItem = document.createElement('li');
          detalleItem.textContent = detalle;
          detallesList.appendChild(detalleItem);
        });
      selectedItem.appendChild(detallesList);

      const serviceEntregable = document.createElement('div');
      serviceEntregable.classList.add('service-entregable');

      const entregableTitle = document.createElement('p');
      entregableTitle.classList.add('entregable-title');
      entregableTitle.textContent = 'Entregable: ';
      serviceEntregable.appendChild(entregableTitle);

      selectedItem.appendChild(serviceEntregable)

      const entregableList = document.createElement('ul');
      entregableList.classList.add('list-entregable');
      service.entregable.forEach(entregable => {
        const entregableItem = document.createElement('li');
        entregableItem.textContent = entregable;
        entregableList.appendChild(entregableItem);
      });
      

      // primera linea de la cotizacion
      const serviceTotalSelect = document.createElement('div');
      serviceTotalSelect.classList.add('service-total-select');
      
      // elementos agregados en la primera linea
      const serviceTotalTitle = document.createElement('h3');
      serviceTotalTitle.classList.add('service-total-title');
      serviceTotalTitle.textContent = 'Total';
      serviceTotalSelect.appendChild(serviceTotalTitle);
      
      selectedItem.appendChild(entregableList);
    });

    quoteTable.appendChild(selectedItem);
    
  } else {
    alert('No se han seleccionado servicios. Por favor, agregue al menos uno.');
  }
});

document.addEventListener("DOMContentLoaded",() =>{
  descargaBtn.addEventListener("click",() =>{
    var element = document.getElementById('section-cot')
    html2pdf().set({
      margin: [-180,7,-400,0],
      filename: 'cotizacion.pdf',
      image:{
        type: 'jpeg',
        quality: 0.98
      },
      html2canvas:{
        scale: 5,
        letterRendering: true,
      },
      jsPDF:{
        unit: "mm",
        format: "a3",
      }
      
    }).from(element).save().catch(err => console.log(err));
    
  });

  





});


