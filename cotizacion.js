// Obtener referencia al elemento de la tabla
const quoteTable = document.getElementById('quote-table');

// Obtener el parámetro de la URL con los servicios seleccionados
const urlParams = new URLSearchParams(window.location.search);
const quoteData = urlParams.get('quote');
const selectedServices = JSON.parse(decodeURIComponent(quoteData));

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

