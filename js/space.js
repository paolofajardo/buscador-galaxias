document.addEventListener("DOMContentLoaded", function () {
    const inputBuscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");
    const contenedor = document.getElementById("contenedor");
  
    btnBuscar.addEventListener("click", function () {
      const buscarTermino = inputBuscar.value.trim();
  
      if (buscarTermino !== "") {
        const apiUrl = `https://images-api.nasa.gov/search?q=${buscarTermino}`;
  
        // solicitud
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
  
                // Crea un elemento para mostrar la imagen y la información
                const imageElement = document.createElement("div");
                imageElement.className = "image-item";
                imageElement.innerHTML = `
                  <img src="${imageUrl}" alt="${title}">
                  <h2>${title}</h2>
                  <p>${description}</p>
                  <p>Fecha de Creación: ${dateCreated}</p>
                `;
  
                // Agrega el elemento al contenedor
                contenedor.appendChild(imageElement);
              });
            }
          })
          .catch((error) => {
            console.error("Error al buscar imágenes:", error);
          });
      }
    });
  });