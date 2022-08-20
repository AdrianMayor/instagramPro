const insertEntryQuery = require('../../db/entriesQueries/insertEntryQuery');
const { generateError, savePhoto } = require('../../helpers');
const insertPhotoQuery = require('../../db/entriesQueries/insertPhotoQuery');

const newEntry = async (req, res, next) => {
    try {
        console.log(req.user.id);
        // Recojemos los datos que nos llegan desde body
        const { description } = req.body;

        // Comprobamos que la foto nos llega desde el body
        if (!req.files)
            throw generateError('The photo is missing from your post.', 400);

        //Guardamos la foto
        const photoName = await savePhoto(req.files.image);

        //Introducimos el post en la BBDD
        const entryId = await insertEntryQuery(
            description,
            req.user.id
        );

        //Guardamos el nombre de la foto en BBDD
        await insertPhotoQuery(photoName, entryId);

        res.send({
            status: 'ok',
            message: 'Post created!',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newEntry;
