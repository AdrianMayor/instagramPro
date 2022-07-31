const getConnection = require('../getConnection');

const selectCommentsByIdEntry = async (idEntry) => {
    let connection;
    try {
        connection = getConnection();

        const [comments] = await connection.query(
            `
            SELECT 
                C.id AS commentId, 
                C.idUser AS commentUserId, 
                U.username,
                C.comment, 
                C.createdAt
            FROM comments C 
            LEFT JOIN users U ON U.id = C.idUser 
            WHERE idEntry = ?; 
        `,
            [idEntry]
        );

        return comments[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectCommentsByIdEntry;
