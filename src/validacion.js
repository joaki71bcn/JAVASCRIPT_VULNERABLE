// llamadas a librerias
const express = require('express'); //  Importa Express para creacion de aplicaciones web y API
const app = express(); // instancia de Express
const mysql = require('mysql'); // Importa el modulo mysql
const morgan =  require('morgan'); // Para manejo de logs
const logger = require('../winstonConfig'); // fichero configuracion de winston, manejo de morgan
const path = require('path'); // para acceder a logs desde el frontend
// Servir los archivos de log solo en modo desarrollo
logger.info('Aplicación iniciada');
if (process.env.NODE_ENV === 'development') {
	app.use('logs', express.static(path.join(__dirname, 'logs')));
};


// Configuracion de morgan para usar winston
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim())}}));

// Rutas middleware-backend
app.listen(3000, () => {
	console.log('Servidor corriendo en el puerto 3000');
});

// analiza express.json para analizar el cuerpo de las solicitudes POST como JSON
app.use(express.json());

// Agregar estado 200 y encabezados adecuados a solicitudes OPTIONS
app.options('*', (req, res) => {
	const origin = req.headers.origin || null;
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Agregar las cabeceras CORS para permitir solo las direcciones IP especificadas
app.use((req, res, next) => {
    const allowedOrigins = ['http://192.168.15.134', 'http://192.168.15.150','http://127.0.0.1'];
    const origin = req.headers.origin || null;

    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
    }

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();

});


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

// analiza express.json para analizar el cuerpo de las solicitudes POST como JSON
app.use(express.json())

// Recepción de la petición POST que contiene el usuario y la contraseña 
app.post('/api/login', async (req, res) => {
	const { username, password} = req.body;

	try {
    const result = await new Promise((resolve, reject) => {
      connection.query('SELECT username, password FROM usuarios WHERE username= ? AND password= ?', [username, password], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (result.length > 0) {
      res.status(200).send({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).send({ message: 'Credenciales incorrectas' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error interno del servidor' });
  }	
});

