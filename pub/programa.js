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
      const tabla = document.createElement('table');
      const encabezado = tabla.createTHead();
      const filaE = tabla.insertRow();
      
      for (const key in datos[0]){
        const th = document.createElement('th');
        th.textContent = key.toUpperCase();
        filaE.appendChild(th);
      }
      contenedorTabla.appendChild(tabla);
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