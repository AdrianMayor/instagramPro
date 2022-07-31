require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');

const { PORT, UPLOADS_DIR, MYSQL_HOST } = process.env;

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(fileUpload());

app.use(express.static(UPLOADS_DIR));

/**
 * ########################
 * ## Endpoints Usuarios ##
 * ########################
 */

const { newUser, validateUser, loginUser, editUser, getUser } = require('./controllers/users/index');
const authUser = require('./middlewares/authUser');


app.get('/users/:idUser', getUser); // -   Ver el perfil de un usuario y su galeria de fotos.

app.post('/users', newUser); // -   Registro. -   Extra: Validación por email.

app.put('/users/validate/:registrationCode', validateUser);   // validar un usuario

app.post('/users/login', loginUser); // -   Login

app.put('/users', authUser, editUser); // -  Editar usuario **TOKEN && ACTIVE**

/**
 * #######################
 * ## Endpoints entries ##
 * #######################
 */
app.get('/home'); //  -   Ver ultimas fotos (entries) publicadas por otros usuarios.

app.post('/entries'); // -   Publicar una foto (con resize) con una descripcion **TOKEN && ACTIVE**

app.get('/entries'); // -   Buscar fotos por texto descriptivo.

app.post('/entries/:idEntries/like'); // -   Dar / Quitar like a una foto (con autenticación y usuario activo). **TOKEN && ACTIVE**
app.post('/entries/:idEntries/comment'); // -   Comentar una foto (con autenticación y usuario activo). **TOKEN && ACTIVE**

/**
 * ######################
 * ## Middleware Error ##
 * ######################
 */

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});

/**
 * ##########################
 * ## Middleware Not Found ##
 * ##########################
 */

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found!',
    });
});

/**
 * ######################
 * ## Server listening ##
 * ######################
 */

app.listen(PORT, () => {
    console.log(`Server listening at http://${MYSQL_HOST}:${PORT}`);
});
