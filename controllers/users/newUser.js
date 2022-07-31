const { generateError, verifyEmail } = require("../../helpers");
const insertUserQuery = require("../../db/userQueries/insertUserQuery");
const { v4: uuid } = require('uuid');

const newUser = async (req, res, next) => {

    try {
        
        const { username, password, email} = req.body;
        
        if(!username || !password || !email) throw generateError ('faltan campos', 400);

        // Generamos un código de registro
        const registrationCode = uuid();

        // Enviamos un email de verificación
        await verifyEmail(email, registrationCode);

        // Insertamos el usuario
        await insertUserQuery(username, password, email, registrationCode);

        res.send({
            status: 'ok',
            message: 'Usuario creado',
        });

    } catch (err) {
        next(err);
    }
}


module.exports = newUser;

