// index.js
// where your node app starts

// init project
var express = require('express');
var cors = require('cors');

var app = express();

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Static files
app.use(express.static('public'));

// Root route
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Ruta sin parámetros: devuelve la fecha actual
app.get('/api/', (req, res) => {
  const now = new Date();
  res.json({ unix: now.getTime(), utc: now.toUTCString() });
});

// Ruta con parámetro de fecha
app.get('/api/:date', (req, res) => {
  let { date } = req.params;

  // Si el parámetro es un número (timestamp en milisegundos)
  if (!isNaN(date)) {
    date = parseInt(date); // Convertir a número
  }

  // Crear la fecha
  const parsedDate = new Date(date);

  // Verificar si la fecha es válida
  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Responder con formato requerido
  res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
