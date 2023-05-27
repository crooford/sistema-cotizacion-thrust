// Obtener referencia al elemento de la tabla
const quoteTable = document.getElementById('quote-table');

// Obtener el parámetro de la URL con los servicios seleccionados
const urlParams = new URLSearchParams(window.location.search);
const quoteData = urlParams.get('quote');
const selectedServices = JSON.parse(decodeURIComponent(quoteData));

// Generar la tabla con los servicios seleccionados
const table = document.createElement('table');
table.innerHTML = `
  <tr>
    <th>Servicio</th>
    <th>Objetivo</th>
    <th>Detalles</th>
    <th>Entregables</th>
    <th>Tiempo</th>
    <th>Precio</th>
  </tr>
`;

selectedServices.forEach(service => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${service.servicio}</td>
    <td>${service.objetivo}</td>
    <td>${service.detalles}</td>
    <td>${service.entregable}</td>
    <td>${service.tiempo}</td>
    <td>${service.precio}</td>
  `;
  table.appendChild(row);
});

quoteTable.appendChild(table);
