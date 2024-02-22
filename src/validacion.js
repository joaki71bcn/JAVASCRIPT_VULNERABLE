// llamadas a librerias
const express = require('express'); //  Importa Express para creacion de aplicaciones web y API
const app = express(); // instancia de Express
const mysql = require('mysql'); // Importa el modulo mysql

// analiza express.json para analizar el cuerpo de las solicitudes POST como JSON
app.use(express.json()) 


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
	const { username, password} = req.body;

	connection.query('SELECT username, password FROM usuarios WHERE username= ? AND password= ?', [username, password],(err, result) => {
		// Manejo del error
		if (err) {
			res.status(500).send({message: 'Error interno del servidor'})
		} else if (result.length > 0) {
			res.status(200).send({message: 'Inicio de sesión exitoso'});	
		} else {
			res.status(401).send({message: 'Credenciales incorrectas'});
        }
	});
		
});

