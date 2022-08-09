const express = require('express');
const app = express();

// Configuraciones 
app.set('port', process.env.PORT || 8000);

// Middleawares
app.use(express.json());

//Routes
app.use(require('./routes/empleados'));

// Start a Sever 


app.listen(app.get('port'), () => {
    console.log('Esto esta corriendo en el puerto', app.get('port'));
});

//autor: Edgar Zelaya