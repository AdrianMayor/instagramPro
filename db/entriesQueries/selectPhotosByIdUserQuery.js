const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectPhotosByIdUserQuery = async (idUser) => {
    let connection;

    try {
        connection = await getConnection();

        const [entries] = await connection.query(
            `
            SELECT P.name, E.id
            from photos P
            LEFT JOIN entries E ON P.idEntry = E.id
            LEFT JOIN users U On E.idUser = U.id
            Where u.id = ?
            `, [idUser]
        );

        

        return entries;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectPhotosByIdUserQuery;