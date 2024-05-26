function (fecha){
  const url = 'http://localhost:3000/basedata';
  const data = {
    year: fecha
  }
  console.log(data);
}

document.addEventListener('DOMContentLoaded', function(){
  const fecha = document.querySelector('#year');
  document.querySelector('#formulario').onsubmit = (event) => {
    event.preventDefault();
    movies(fecha);
    return false;
  }
});