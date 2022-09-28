const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();


// Middlewares 
app.use(morgan('dev')); //Monitorear las peticiones
app.use(express.json()); // Peticiones en formato Json

// Routes
app.use("/api", require("./routes/movies"));
app.set("port", 4001); // Configuramos el puerto donde levantaremos el servidor
app.listen(app.get("port"), () => {
    console.log("Servidor corriendo en el puerto 4001"); 
})