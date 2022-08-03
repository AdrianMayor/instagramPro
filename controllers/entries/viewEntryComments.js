const selectAllCommentsByIdEntry = require('../../db/entriesQueries/selectFirstsCommentsByIdEntry');
const { indexPagination, generateError } = require('../../helpers');

const viewEntryComments = async (req, res, next) => {
    try {
        const { idEntry } = req.params;

        // Recogemos la pagina por la que se hara la query
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);

        // En caso de no recibir datos del cliente introducimos por defecto la primera pagina con 10 posts a mostrar
        if (!page) page = 1;
        if (!limit) limit = 10;

        const startIndex = (page - 1) * limit;

        const entryComments = await selectAllCommentsByIdEntry(
            idEntry,
            req.user?.id,
            startIndex,
            limit
        );

        if (entryComments.length < 1) throw generateError('No comments', 400);

        const index = indexPagination(entryComments, startIndex, page, limit);

        res.send({
            status: 'ok',
            data: {
                index,
                entryComments,
            },
        });

        if (!page) page = 1;
    } catch (err) {
        next(err);
    }
};

module.exports = viewEntryComments;
