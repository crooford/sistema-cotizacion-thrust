const descargaBtn = document.getElementById("btn__descargar");

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const quoteData = urlParams.get("data");
  const quote = JSON.parse(decodeURIComponent(quoteData));
  const quoteTable = document.getElementById("quote-table");
  let servicesSelected = quote.selectedServices;
  if (quote) {
    document.getElementById("ncot-recive").value = quote.informacionCot[0];
    document.getElementById("cliente-recive").value = quote.informacionCot[1];
    document.getElementById("firma-representante").value = quote.informacionCot[2];
    document.getElementById("fecha-recive").value = quote.informacionCot[3];
    document.getElementById("fechav-recive").value = quote.informacionCot[4];
    document.getElementById("firma-client").value = quote.informacionCot[1];

    // Obtener referencia al elemento de la tabla

    // Generar la tabla con los servicios seleccionados
    const selectedItem = document.createElement("div");
    selectedItem.classList.add("selected-item-group");
    for(let i=0; i < servicesSelected.length; i++){
        
        let service = servicesSelected[i];
        console.log(service)
      
        // primera linea de la cotizacion
        const serviceSelect = document.createElement("div");
        serviceSelect.classList.add("service-select");

        // elementos agregados en la primera linea
        const serviceTitle = document.createElement("h3");
        serviceTitle.classList.add("service-title");
        serviceTitle.textContent = service.servicio;
        serviceSelect.appendChild(serviceTitle);

        const servicePrice = document.createElement("h3");
        servicePrice.classList.add("service-price");
        servicePrice.textContent = `$${service.precio} MXN`;
        serviceSelect.appendChild(servicePrice);

        selectedItem.appendChild(serviceSelect);

        const serviceDetails = document.createElement("div");
        serviceDetails.classList.add("service-details");

        const detailTitle = document.createElement("p");
        detailTitle.classList.add("detail-title");
        detailTitle.textContent = "Detalles:";
        serviceDetails.appendChild(detailTitle);

        const timeItem = document.createElement("h4");
        timeItem.classList.add("time-item");
        timeItem.textContent = `${service.tiempo}`;
        serviceDetails.appendChild(timeItem);

        selectedItem.appendChild(serviceDetails);

        const detallesList = document.createElement("ul");
        detallesList.classList.add("list-details");
        service.detalles.forEach((detalle) => {
          const detalleItem = document.createElement("li");
          detalleItem.textContent = detalle;
          detallesList.appendChild(detalleItem);
        });
        selectedItem.appendChild(detallesList);

        const serviceEntregable = document.createElement("div");
        serviceEntregable.classList.add("service-entregable");

        const entregableTitle = document.createElement("p");
        entregableTitle.classList.add("entregable-title");
        entregableTitle.textContent = "Entregable: ";
        serviceEntregable.appendChild(entregableTitle);

        selectedItem.appendChild(serviceEntregable);

        const entregableList = document.createElement("ul");
        entregableList.classList.add("list-entregable");
        service.entregable.forEach((entregable) => {
          const entregableItem = document.createElement("li");
          entregableItem.textContent = entregable;
          entregableList.appendChild(entregableItem);
        });

        // primera linea de la cotizacion
        const serviceTotalSelect = document.createElement("div");
        serviceTotalSelect.classList.add("service-total-select");

        // elementos agregados en la primera linea
        const serviceTotalTitle = document.createElement("h3");
        serviceTotalTitle.classList.add("service-total-title");
        serviceTotalTitle.textContent = "Total";
        serviceTotalSelect.appendChild(serviceTotalTitle);

        selectedItem.appendChild(entregableList);
      };
      quoteTable.appendChild(selectedItem);
    }
});

document.addEventListener("DOMContentLoaded", () => {
  descargaBtn.addEventListener("click", () => {
    var element = document.getElementById('section-cot');
    html2pdf()
      .set({
        margin: [10, 0, 0, 0],
        filename: "cotizacion.pdf",
        image: {
          type: "jpeg",
          quality: 0.98,
        },
        html2canvas: {
          scale: 5,
          letterRendering: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a3",
        },
      })
      .from(element)
      .save()
      .catch((err) => console.log(err));
  });
});
