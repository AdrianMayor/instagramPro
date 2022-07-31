const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectEntryByIdQuery = async (idEntry, idUser) => {
    let connection;
    try {
        connection = await getConnection();

        const [entry] = await connection.query(
            `
                SELECT 
                    E.*, 
                    U.username,
                    SUM(IFNULL(L.value = true, 0)) AS likes,
                    E.idUser = ? AS owner,
                    BIT_OR(L.idUser = ? AND L.value = 1) AS likedByMe
                FROM entries E
                LEFT JOIN users U ON E.idUser = U.id
                LEFT JOIN likes L ON L.idEntry = E.id
                WHERE E.id = ?
                GROUP BY E.id;
            `,
            [idUser, idUser, idEntry]
        );

        if (entry.length < 1) throw generateError('No entry found', 404);

        const [photos] = await connection.query(
            `
                SELECT 
                    id AS imageId, 
                    name AS imageName, 
                    createdAt AS imageAddingDate 
                FROM photos 
                WHERE idEntry = ?;
            `,
            [idEntry]
        );

        const fullEntry = {
            ...entry[0],
            photos,
        };

        return fullEntry;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectEntryByIdQuery;
