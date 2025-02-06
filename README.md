Bazar Web App
Este es el repositorio de la primera versión de la aplicación web de nuestro bazar. La aplicación está diseñada principalmente para dispositivos móviles y permite a los usuarios buscar productos, ver una lista de resultados y acceder a los detalles de cada producto.

Contexto
Somos un bazar con una variedad de productos y estamos desarrollando nuestra aplicación web. La aplicación permite a los usuarios buscar productos por nombre y visualizar detalles de los mismos.

Esta versión inicial está enfocada en la simplicidad y el rendimiento. Buscamos que la aplicación sea fácil de usar, visualmente atractiva, y optimizada para motores de búsqueda como Google (SEO).

Características clave:

Búsqueda de productos por nombre.
Visualización de productos con detalles como precio, descripción y categoría.
Páginas de detalles de producto con información detallada.
Capacidad para compartir productos en redes sociales.
SEO optimizado para asegurar un buen posicionamiento.
Funcionalidades
1. Página de Inicio
Ruta: /
Descripción: La página principal contiene una caja de búsqueda para que el usuario ingrese el nombre del producto. Al realizar la búsqueda, el usuario será redirigido a la página de resultados.
2. Resultados de Búsqueda
Ruta: /items?search=
Descripción: Esta página muestra los productos relacionados con la búsqueda realizada. Cada tarjeta de producto contiene el título, descripción, precio, categoría, imagen y puntuación. Además, se muestra el número total de resultados.
3. Detalle del Producto
Ruta: /items/:id
Descripción: Esta página muestra los detalles completos de un producto específico. Incluye información detallada como el precio, descripción, marca, stock, categoría, imágenes y un botón para comprar (aunque aún no funcional).
API
Se han implementado dos endpoints para interactuar con la aplicación:

GET /api/items?q=:query
Devuelve una lista de productos que coinciden con la búsqueda realizada.

GET /api/items/:id
Devuelve los detalles completos de un producto específico, usando su id.

Requisitos
Lenguaje: TypeScript
SEO: La aplicación está optimizada para que Google y otros motores de búsqueda puedan indexarla correctamente.
Diseño: La interfaz debe ser sencilla, atractiva y fácil de usar. Se puede usar un catálogo de componentes o realizar un diseño propio.
Instalación
Para correr la aplicación en tu máquina local, sigue estos pasos:

1. Clonar el repositorio
bash
Copiar
Editar
git clone https://github.com/tu-usuario/bazar-web-app.git
2. Instalar dependencias
Dentro de la carpeta del proyecto, instala las dependencias necesarias:

bash
Copiar
Editar
cd bazar-web-app
npm install
3. Ejecutar la aplicación
Para ejecutar la aplicación en desarrollo, usa el siguiente comando:

bash
Copiar
Editar
npm run dev
Esto iniciará el servidor de desarrollo y podrás acceder a la aplicación en tu navegador en http://localhost:3000.



Una vez desplegada, la URL pública de la aplicación estará disponible para acceder a través del navegador.

Pruebas
La aplicación incluye al menos un test básico. Puedes ejecutar las pruebas utilizando:

bash
Copiar
Editar
npm run test
Contribuciones
Si deseas contribuir a este proyecto, sigue estos pasos:

Haz un fork del repositorio.
Crea una rama nueva (git checkout -b mi-nueva-funcionalidad).
Realiza los cambios que desees y haz un commit (git commit -am 'Agregué una nueva funcionalidad').
Sube tus cambios a tu fork (git push origin mi-nueva-funcionalidad).
Abre un Pull Request para que podamos revisar tus cambios.
Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

¡Gracias por visitar el repositorio de Bazar Web App!