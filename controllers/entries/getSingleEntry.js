const selectEntryByIdEntryQuery = require('../../db/entriesQueries/selectEntryByIdEntryQuery');
const { generateError } = require('../../helpers');

const getSingleEntry = async (req, res, next) => {
    try {
        const { idEntry } = req.params;

        const entry = await selectEntryByIdEntryQuery(idEntry, req.user?.id);

        if (entry.length < 1) throw generateError('No entry found', 404);

        res.send({
            status: 'ok',
            data: {
                entry,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getSingleEntry;
