function movies(fecha){
  const url = 'http://localhost:3000/basedata';
  const data = {
    year: parseInt(fecha)
  }
  console.log(data);
  //Enviando datos al servidor, uso de json
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
      //Verificando que los datos extraidos no esten vacios
      if (datos.length > 0) {
        
        const tabla = document.createElement('table');
        tabla.classList = 'tablePeliculas';
        const encabezado = tabla.createTHead();
        const filaE = tabla.insertRow();
        
        //Agregar el encabezado, extrayendolo de la base de datos
        for (const key in datos[0]){
          if(key != 'id' && key != 'Year'){
            const th = document.createElement('th');
            th.textContent = key.toUpperCase();
            filaE.appendChild(th);
          }
        }
        
        //Insertar filas donde se encontrarán los datos correspondientes
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
        //Caso contrario se genera un parrafo con un texto correspondiente
        const texto = document.createElement('p');
        texto.id = 'text';
        texto.textContent = 'No hay Películas que mostrar';
        contenedorTabla.appendChild(texto);
      }
    })
}

//Evento al cargar la página
document.addEventListener('DOMContentLoaded', function(){
  //Extraer parametro del formulario
  const fecha = document.querySelector('#year');
  //Realizar ciertas funciones al presionar el boton del formulario
  document.querySelector('#formulario').onsubmit = (event) => {
    //Evita que se cargue nuevamente la página
    event.preventDefault();
    //llamada al método movies()
    movies(fecha.value);
    return false;
  }
});