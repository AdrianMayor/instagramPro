# Proyecto Red Social

### Dependencias Comunes

-   express
-   express-fileupload
-   dotenv
-   mysql2
-   cors
-   bcrypt
-   jsonwebtoken
-   @sendgrid/mail
-   morgan
-   sharp
-   uuid
<!-- -   joi -->

### Dependencias de Desarrollo

-   eslint
-   nodemon
-   prettier

### BBBDD

-   Tabla de usuarios

    -   id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    -   username VARCHAR(30) UNIQUE NOT NULL,
    -   email VARCHAR(100) UNIQUE NOT NULL,
    -   password VARCHAR(100) NOT NULL,
    -   avatar VARCHAR(100),
    -   birthday DATE,
    -   Location VARCHAR(100),
    -   biography VARCHAR (250),
    -   role ENUM('admin', 'normal') DEFAULT 'normal',
    -   registrationCode VARCHAR(100),
    -   active BOOLEAN DEFAULT false,
    -   createdAt TIMESTAMP NOT NULL,
    -   modifiedAt TIMESTAMP

-   Tabla de entries

    -   id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    -   description VARCHAR(250),
    -   idUser INT UNSIGNED NOT NULL,
    -   FOREIGN KEY (idUser) REFERENCES users(id),
    -   idPhoto INT UNSIGNED NOT NULL,
    -   FOREIGN KEY (idPhoto) REFERENCES photos(id),
    -   edited BOOLEAN DEFAULT false,
    -   Location VARCHAR (100),
    -   createdAt TIMESTAMP NOT NULL,
    -   modifiedAt TIMESTAMP

-   Tabla de fotos

    -   id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    -   name VARCHAR (100),
    -   identry INT UNSIGNED NOT NULL,
    -   FOREIGN KEY (identry) REFERENCES entries(id),
    -   createdAt TIMESTAMP NOT NULL

-   Tabla comentarios

    -   id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    -   identry INT UNSIGNED NOT NULL,
    -   FOREIGN KEY (identry) REFERENCES entry(id),
    -   idUser INT UNSIGNED NOT NULL,
    -   FOREIGN KEY (idUser) REFERENCES users(id),
    -   comment VARCHAR (250) NOT NULL,
    -   createdAt TIMESTAMP NOT NULL

-   Tabla likes
    -   id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    -   value BOOLEAN DEFAULT true,
    -   idUser INT UNSIGNED NOT NULL,
    -   FOREIGN KEY (idUser) REFERENCES users(id),
    -   identry INT UNSIGNED NOT NULL,
    -   FOREIGN KEY (identry) REFERENCES entry(id),
    -   createdAt TIMESTAMP NOT NULL,
    -   modifiedAt TIMESTAMP

### ENDPOINTS

#### Endpoints Usuarios

-   Ver ultimas fotos publicadas por otros usuarios.
-   Ver el perfil de un usuario y su galeria de fotos.
-   Registro.
    -   Extra: Validación por email.
-   Login.
-   Editar usuario (con autenticación y usuario activo).

#### Endpoints Fotos

-   Publicar una foto (con resize) con una descripcion (con autenticación y usuario activo). ✅
-   Buscar fotos por texto descriptivo.✅
-   Dar / Quitar like a una foto (con autenticación y usuario activo).✅
-   Comentar una foto (con autenticación y usuario activo).✅

&nbsp;

        Lo especificado anteriormente se ciñe a lo necesario por requerimientos del proyecto, pudiendo tener un backup especifico con lo necesario y una version de testing donde continuar.

&nbsp;

### Modificaciones / Implementaciones

## Sistema de follow

### BBDD

-   Tabla de follows
    -   id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    -   idUser INT UNSIGNED NOT NULL,
    -   FOREIGN KEY (idUser) REFERENCES users(id),
    -   idFollower INT UNSIGNED NOT NULL,
    -   FOREIGN KEY (idFollower) REFERENCES users(id)

<!-- ## Sistema de grupos de interes / Categorias -->

### Sistema de paginacion

-   Paginacion en comentarios
-   Paginacion en el feed de posts

https://www.sqlshack.com/pagination-in-sql-server/

### Endpoints Usuarios

-   Edicion de contraseña con validacion por email.(con autenticacion y usuario activo.)
-   Ver el numero total de entries.
-   Buscar usuario mediante username.
-   Ver el perfil de un usuario y su galeria de fotos. Y SUS FOLLOWERS asi como SUS FOLLOWS.
-   Hacer follow sobre un usuario (con autenticación y usuario activo).

### Endpoint fotos

-   Subir más de una foto. Límite de ~ 4. (con autenticación y usuario activo)

### Validacion con joi

### Añadir emotes
