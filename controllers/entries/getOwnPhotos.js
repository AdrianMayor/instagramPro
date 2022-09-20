const selectPhotosByIdUserQuery = require('../../db/entriesQueries/selectPhotosByIdUserQuery');
const { indexPagination } = require('../../helpers');
const totalResultsQuery = require('../../db/entriesQueries/totalResultsQuery');

const getOwnPhotos = async (req, res, next) => {
    try {
        // Recogemos la pagina por la que se hara la query
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        const idUser = req.user.id;

        // En caso de no recibir datos del cliente introducimos por defecto la primera pagina con 10 posts a mostrar
        if (!page) page = 1;
        if (!limit) limit = 10;

        const startIndex = (page - 1) * limit;

        const totalResults = await totalResultsQuery({
            option: 'getUser',
            idUser,
        });

        const photos = await selectPhotosByIdUserQuery(
            idUser,
            startIndex,
            limit
        );

        const index = await indexPagination(
            totalResults.totalResults,
            startIndex,
            page,
            limit
        );

        res.send({
            status: 'ok',
            data: {
                index,
                photos,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getOwnPhotos;
