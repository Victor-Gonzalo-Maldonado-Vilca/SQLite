const path = require('path');
const express = require('express');
const mysql = require('mysql')
const app = express();

app.listen(3000, () => {
	console.log("Escuchando en: http://localhost:3000")

});

app.get('/', (request, response) => {
	response.sendFile(path.resolve(__dirname, 'index.html'));
});
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
  
  app.get('/basedata',(require, response) => {
    conexion.query('SELECT * FROM movie',(err,filas) => {
      if (err) {
        console.error('Error en la consulta')
        response.status(500).json({error: 'Error en la consulta'});
        return
      } else {
        console.log('Consulta realizada')
      }
    });
  });
  conexion.end();
});
