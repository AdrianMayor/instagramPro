const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectAllEntriesQuery = async (idUser, keyword = '') => {
    // Otorgamos un valor por defecto al parámetro 'keyword' en caso de que no recibamos ningun argumento.

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
                WHERE E.description LIKE ?
                GROUP BY E.id
                ORDER BY E.createdAt DESC
            `,
            [idUser, idUser, `%${keyword}%`]
        );

        // En caso e que el array que recibamos de la query sea menor que 1, significa que no existen entradas.
        if (entries.length < 1) throw generateError('No entries found', 404);
        return entries;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllEntriesQuery;
