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

/* 
app.get('/users/:idUser'); // -   Ver el perfil de un usuario y su galeria de fotos.

app.entry('/users'); // -   Registro. -   Extra: Validación por email.

app.entry('/users/login'); // -   Login

app.put('/users'); // -  Editar usuario **TOKEN && ACTIVE** */

/**
 * #######################
 * ## Endpoints entries ##
 * #######################
 */
const {
    newEntry,
    insertCommentToEntry,
    likeEntry,
    listEntries,
} = require('./controllers/entries');
const selectEntryByIdEntryQuery = require('./db/entriesQueries/selectEntriesByIdUserQuery');

app.post('/entries', newEntry); // -   Publicar una foto (con resize) con una descripcion **TOKEN && ACTIVE**

app.get('/entries', listEntries); //  -   Ver ultimas fotos (entries) publicadas por otros usuarios. // -   Buscar fotos por texto descriptivo.

app.post('/entries/:idEntry/like', likeEntry); // -   Dar / Quitar like a una foto (con autenticación y usuario activo). **TOKEN && ACTIVE**

app.post('/entries/:idEntry/comment', insertCommentToEntry); // -   Comentar una foto (con autenticación y usuario activo). **TOKEN && ACTIVE**

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
