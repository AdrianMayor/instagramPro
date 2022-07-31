
const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectAllEntriesQuery = async (idUser) => {
    let connection;

    try {
        connection = await getConnection();

        const [entries] = await connection.query(
            `
            SELECT P.name
            from photos P
            LEFT JOIN entries E ON P.idEntry = E.id
            LEFT JOIN users U On E.idUser = U.id
            Where u.id = ?
            `, [idUser]
        );

        if (entries.length < 1) {
            throw generateError('No se ha encontrado ninguna entrada', 404);
        }

        return entries;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllEntriesQuery;
/* 
const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectEntryByIdUserQuery = async (idUser) => {
    let connection;
    try {
        connection = await getConnection();

        const [entries] = await connection.query(
            `
                SELECT 
                    E.*,
                    U.username,
                    E.idUser = ? AS owner,
                    COUNT(C.id) AS totalComments,
                    SUM(IFNULL(L.value = true, 0)) AS likes,
                    BIT_OR(L.idUser = ? AND L.value = 1) AS likedByMe,
                    P.id AS imageId, 
                    P.name AS imageName, 
                    P.createdAt AS imageAddingDate 
                FROM entries E
                LEFT JOIN users U ON E.idUser = U.id
                LEFT JOIN likes L ON L.idEntry = E.id
                LEFT JOIN photos P ON P.idEntry = E.id
                LEFT JOIN comments C ON C.idEntry = E.id
                WHERE U.id = ?
                GROUP BY E.id
                ORDER BY E.createdAt DESC
            `,
            [idUser, idUser, idUser]
        );

        if (entries.length < 1) throw generateError('No entry found', 404);

        return entries;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectEntryByIdUserQuery;

 */