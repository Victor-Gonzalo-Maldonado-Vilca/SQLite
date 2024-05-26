const path = require('path');
const express = require('express');
const bp = require('body-parser');
const mysql = require('mysql')
const app = express();

app.use(express.static('pub'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

//Abriendo un servidor
app.listen(3000, () => {
	console.log("Escuchando en: http://localhost:3000")

});

app.get('/', (request, response) => {
	response.sendFile(path.resolve(__dirname, 'index.html'));
});
//Conectar a la base de datos
const conexion = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'Victor',
  password: 'maldonado100204.',
  database: 'peliculas'
});

conexion.connect((err) => {
  if (err) {
    console.error('Error de conexion mysql ', err);
    return;
  } else {
    console.log('Conexion Establecida mysql')
  }
  
  app.post('/basedata',(request, response) => {
    const fecha = request.body.year;
    console.log(fecha);
    //consulta sql
    conexion.query('SELECT * FROM movie WHERE Year = ?',[fecha],(err,filas) => {
      if (err) {
        console.error('Error en la consulta')
        response.status(500).json({error: 'Error en la consulta'});
      } else {
        //Respuesta del servidor
        console.log('Consulta realizada')
        response.json(filas);
      }
    });
  });
});
