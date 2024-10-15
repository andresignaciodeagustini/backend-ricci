const express = require("express");
const app = express();
const cors = require('cors');
const Mercado_Pago = require('./routes/Mercado_Pago.routes'); // Ruta correcta con capitalización correcta
const api_routes = require("./routes/index");

// Configuración de CORS
const allowedOrigins = [
    'http://localhost:5173',  // Origen local para desarrollo
    'http://localhost:5174',  // Otro origen local (si lo necesitas)
    'https://frontend-ricci-2.onrender.com'  // Origen de producción en Render
];

app.use(cors({
    origin: function (origin, callback) {
        // Permitir el origen si está en la lista de permitidos o si no hay origen (caso de ciertas solicitudes)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middleware para interpretar datos JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar la ruta de Mercado_Pago
app.use("/api", Mercado_Pago);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Usar las rutas definidas en index.js
app.use("/api", api_routes);

module.exports = app;
