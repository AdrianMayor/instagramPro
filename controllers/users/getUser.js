const selectUserByIdQuery = require('../../db/userQueries/selectUserByIdQuery');
const selectPhotosByIdUserQuery = require('../../db/entriesQueries/selectPhotosByIdUserQuery');

const getUser = async (req, res, next) => {
    try {
        const { idUser } = req.params;

        // Recogemos los datos del usuario
        const user = await selectUserByIdQuery(idUser);

        // regogemos todas las fotos del usuario
        let photos = await selectPhotosByIdUserQuery(idUser);

        if (photos.length < 1) photos = 'Photos not found';

        res.send({
            status: 'ok',
            data: {
                user,
                photos,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getUser;
