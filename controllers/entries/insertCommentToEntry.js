const insertCommentToEntryQuery = require('../../db/entriesQueries/insertCommentToEntryQuery');
const selectEntryByIdQuery = require('../../db/entriesQueries/selectEntryByIdEntryQuery');
const { generateError } = require('../../helpers');

const insertCommentToEntry = async (req, res, next) => {
    try {
        // Recogemos los datos necesarios del front
        const { comment } = req.body;
        const { idEntry } = req.params;

        if (!comment) throw generateError('Not comment to add', 400);

        // Realizamos el registro del comentario en la BBDD
        await insertCommentToEntryQuery(idEntry, comment, req.user.id);

        res.send({
            status: 'ok',
            message: 'Comment sent!',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = insertCommentToEntry;
