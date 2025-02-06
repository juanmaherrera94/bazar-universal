// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Asegúrate de que tu db.json esté en la ruta correcta
const middlewares = jsonServer.defaults();

// Obtén el puerto de la variable de entorno, o usa 3000 como valor por defecto
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

// Escuchar en el puerto adecuado
server.listen(port, () => {
  console.log(`JSON Server está corriendo en el puerto ${port}`);
});
