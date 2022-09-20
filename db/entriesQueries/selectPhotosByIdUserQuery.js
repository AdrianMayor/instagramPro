const getConnection = require('../getConnection');

const selectPhotosByIdUserQuery = async (idUser) => {
    let connection;

    try {
        connection = await getConnection();

        const [photos] = await connection.query(
            `
            SELECT P.name, E.id AS entryId
            FROM photos P
            LEFT JOIN entries E ON P.idEntry = E.id
            LEFT JOIN users U On E.idUser = U.id
            Where u.id = ?
            GROUP BY P.id
            ORDER BY E.createdAt DESC
            `,
            [idUser]
        );

        return photos;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectPhotosByIdUserQuery;
