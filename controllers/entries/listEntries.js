const selectAllEntriesQuery = require('../../db/entriesQueries/selectAllEntriesQuery');

const listEntries = async (req, res, next) => {
    try {
        // Recogemos la keyword
        const { keyword } = req.query;

        // Listamos todas las entries , filtrando por keyword
        const entries = await selectAllEntriesQuery(req.user?.id, keyword);

        res.send({
            status: 'ok',
            data: {
                entries,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listEntries;
