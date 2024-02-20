// llamadas a librerias
const express = require('express'); //  Importa Express para creacion de aplicaciones web y API
const app = express(); // instancia de Express
const mysql = require('mysql'); // Importa el modulo mysql


// conexión a la BBDD Mysql
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'hacker2016',
	database: 'test_app'
});	
	// Manejo errores conexión
connection.connect((err) => {
	if (err) {
		console.error('Error conectando a la base de datos: ' + err.stack);
		return;
	}
	console.log('Conectando a la base de datos con el ID ' + connection.threadId);
});



// Recepción de la petición POST que contiene el usuario y la contraseña 
app.post('/api/login', (req, res) => {
	req.body;
	res.status(200).send({message: 'Inicio de sesión exitoso'});
	res.status(401).send({message: 'Credenciales incorrectas'});
};


