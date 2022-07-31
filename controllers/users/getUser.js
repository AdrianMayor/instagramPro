const selectUserByIdQuery = require("../../db/userQueries/selectUserByIdQuery");
const selectEntryByIdUserQuery = require("../../db/entryQueries/selectEntryByIdUserQuery");

const getUser = async (req,res,next) => {

    try {

        const { idUser } = req.params;
        
        // Recogemos los datos del usuario
        const user = await selectUserByIdQuery(idUser);

        // regogemos todas las fotos del usuario
        const photos = await selectEntryByIdUserQuery(idUser);

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

}

module.exports = getUser;
