# API RESTful - Panificadora

Prototipo a una panificadora (Panadería al por mayor).

CRUD completo a diferentes endopoints, de Usuarios, Categorías, Productos y un sistema de búsquedas a través de la url. 

Se puede consultar la documentación para el manejo de la API [Ver documentación](https://documenter.getpostman.com/view/15121639/U16dSocA)

## Descripción 
Contiene un Frontend para la creación y el login de usuarios, haciendo uso de las rutas de autentificación. También incorpora el ingreso con Google, adaptándose correctamente en el control de datos en el lado del servidor. Incorpora una carga de archivos, en donde las imágenes seran guardadas en Cloudinary. [Ir al sitio](https://rest-server-panificadora.herokuapp.com/) (El servidor esta alojado en Heroku, y se encuentra en modo suspensión, esperar 5 -10 seg si entra por primera vez)

Una vez registrado y logueado el usuario, se le enviara un JWT (Json Web Token) al cliente para hacer uso de los diferentes métodos CRUD que se necesiten sobre las diferentes rutas. Los JWT tienen tiempo de caducidad, se renueva una vez vuelto a loguearse. Para continuar su uso se puede usar Postman, Insomnia, etc.

Usa una Base de datos de MongoDB en la nube.

Se hace manejo de errores y verificación del lado del servidor para validar los datos enviados desde el cliente.

Tiene un sistema de búsquedas a través de la url para consultar las diferentes categorías y productos

## Instalación y uso

Para comenzar a usar esta estructura basica de una Api-REST:

1 - ``` npm install ``` 

2 - Crear el archivo .env en la raiz del directorio