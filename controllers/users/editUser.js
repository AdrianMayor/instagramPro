const { generateError, savePhoto, deletePhoto } = require("../../helpers");
const selectUserByIdQuery = require('../../db/userQueries/selectUserByIdQuery')
const updateUserQuery = require('../../db/userQueries/updateUserQuery');

const editUser = async (req, res, next) => {
    try {
        // Obtenemos los campos del body.
        let { username, email, birthday, Location, biography } = req.body;

        // Si falta todos  los campos damos un error
        if (!username && !email && !birthday && !Location && !biography && !req.files?.avatar) {
            throw generateError('Faltan campos', 400);
        }

        // obtenemos la info del usuario
        const user = await selectUserByIdQuery(req.user.id);

        // Variable donde almacenamos el nombre de la imagen
        let avatar;

        // Si existe avatar
        if(req.files?.avatar) {

            // Si el usuario tiene un avatar asignado lo borramos del dico duro
            if (user.avatar){
                await deletePhoto(user.avatar);
            }
            
            // Guardamos la imagejn en el disco duro y obtenemos el nombre
            avatar = await savePhoto(req.files.avatar); 
        }

        // Establecemos el valor final para las variables.
        username = username || user.username;
        email = email || user.email;
        avatar = avatar || user.avatar;
        birthday = birthday || user.birthday;
        Location = Location || user.Location;
        biography = biography || user.biography;

        // Actualizamos los datos del usuario
        await updateUserQuery(username, email, avatar, birthday, Location, biography, req.user.id);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUser;