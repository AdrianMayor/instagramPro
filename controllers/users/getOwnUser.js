const selectUserByIdQuery = require('../../db/userQueries/selectUserByIdQuery');
const selectEntryByIdUserQuery = require('../../db/entriesQueries/selectEntriesByIdUserQuery');

const getOwnUser = async (req, res, next) => {
    try {
        const user = await selectUserByIdQuery(req.user.id);

        let entries = await selectEntryByIdUserQuery(req.user.id);

        res.send({
            status: 'ok',
            data: {
                user,
                entries,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getOwnUser;
