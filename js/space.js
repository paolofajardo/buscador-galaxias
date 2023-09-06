document.addEventListener("DOMContentLoaded", function () {
    const inputBuscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");
    const contenedor = document.getElementById("contenedor");
  
    btnBuscar.addEventListener("click", function () {
      const buscarTerm = inputBuscar.value.trim();
  
      if (buscarTerm !== "") {
        const apiUrl = `https://images-api.nasa.gov/search?q=${buscarTerm}`;
  
        // Realiza la solicitud al servidor de la NASA
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            // Limpia el contenido anterior en el contenedor
            contenedor.innerHTML = "";
  
            // Procesa los resultados de la búsqueda
            const items = data.collection.items;
  
            if (items.length === 0) {
              contenedor.innerHTML = "<p>No se encontraron imágenes.</p>";
            } else {
              items.forEach((item) => {
                const title = item.data[0].title;
                const description = item.data[0].description;
                const imageUrl = item.links[0].href;
                const dateCreated = item.data[0].date_created;
  
                // Crea una tarjeta para mostrar la imagen y la información
                const cardElement = document.createElement("div");
                cardElement.className = "col-lg-4 col-md-6 mb-4";
                cardElement.innerHTML = `
                  <div class="card">
                    <img src="${imageUrl}" class="card-img-top" alt="${title}">
                    <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <p class="card-text">${description}</p>
                      <p class="card-text">Fecha de Creación: ${dateCreated}</p>
                    </div>
                  </div>
                `;
  
                // Agrega la tarjeta al contenedor
                contenedor.appendChild(cardElement);
              });
            }
          })
          .catch((error) => {
            console.error("Error al buscar imágenes:", error);
          });
      }
    });
  });
  