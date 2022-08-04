const selectPhotosByIdUserQuery = require('../../db/entriesQueries/selectPhotosByIdUserQuery');
const { indexPagination } = require('../../helpers');

const getOwnPhotos = async (req, res, next) => {
    try {

        // Recogemos la pagina por la que se hara la query
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
  
        // En caso de no recibir datos del cliente introducimos por defecto la primera pagina con 10 posts a mostrar
        if (!page) page = 1;
        if (!limit) limit = 10;
  
        const startIndex = (page - 1) * limit;

        const photos = await selectPhotosByIdUserQuery(req.user.id, startIndex, limit);

        const index = await indexPagination(photos, startIndex, page, limit);
  

        res.send({
            status: 'ok',
            data: {
                photos,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getOwnPhotos;
