function movies(fecha){
  const url = 'http://localhost:3000/basedata';
  const data = {
    year: parseInt(fecha)
  }
  console.log(data);
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  
  fetch(url, request)
    .then(response => response.json())
    .then(datos => {
      console.log(datos);
      const contenedorTabla = document.querySelector('#table');
      contenedorTabla.innerHTML = '';
      
      if (datos.length > 0) {
        const tabla = document.createElement('table');
        tabla.classList = 'tablePeliculas';
        const encabezado = tabla.createTHead();
        const filaE = tabla.insertRow();
      
        for (const key in datos[0]){
          if(key != 'id' && key != 'Year'){
            const th = document.createElement('th');
            th.textContent = key.toUpperCase();
            filaE.appendChild(th);
          }
        }
        
        const cuerpoTabla = tabla.createTBody();
        datos.forEach(dato => {
          const fila = cuerpoTabla.insertRow();
          for (const key in dato){
            if(key != 'id' && key != 'Year'){
              const td = fila.insertCell();
              td.textContent = dato[key];
            }
          }
        })
        contenedorTabla.appendChild(tabla);
      } else {
        const texto = document.createElement('p');
        texto.id = 'text';
        texto.textContent = 'No hay Películas que mostrar';
        contenedorTabla.appendChild(texto);
      }
    })
}

document.addEventListener('DOMContentLoaded', function(){
  const fecha = document.querySelector('#year');
  document.querySelector('#formulario').onsubmit = (event) => {
    event.preventDefault();
    movies(fecha.value);
    return false;
  }
});