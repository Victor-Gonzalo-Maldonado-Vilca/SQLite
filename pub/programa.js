function movies(fecha){
  const url = 'http://localhost:3000/basedata';
  const data = {
    year: parseInt(fecha)
  }
  console.log(data);
  fech(url)
    .then(response => response.json())
    .the(data => {
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