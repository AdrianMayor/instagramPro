const jwt = require('jsonwebtoken');

const selectUserByIdQuery = require('../db/userQueries/selectUserByIdQuery')

const { generateError } = require('../helpers');

const authUser = async(req, res, next) => {
    try {
        
        // Obetenemos el token de la cabecera
        const { authorization } = req.headers;

        // Si no hay token lanzamos un error

        if(!authorization) {
            throw generateError(' Falta la cabecera de autorizacion', 401);
        }

        let payload;

    try{
        // intentamos obtener la informacion del token
        payload = jwt.verify(authorization, process.env.SECRET);
    }   catch{
            throw generateError('Token incorrecto', 401);
    }

    // Comprovamos que el usuario esté activado
    const user = await selectUserByIdQuery(payload.id);
    
    // Si el usuario no está activado, lanzamos un error
    if(!user.active) {
        throw generateError('El usuario no está activado', 401)
    }

        // Agregamos una nueva propiedad al objeto con la info del payload
        req.user = payload;

        
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authUser;