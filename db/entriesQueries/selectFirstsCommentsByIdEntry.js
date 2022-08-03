const getConnection = require('../getConnection');

const selectFirstsCommentsByIdEntry = async (idEntry, idUser) => {
    let connection;
    try {
        connection = await getConnection();

        const [comments] = await connection.query(
            `
            SELECT 
                C.id AS commentId, 
                C.idUser AS commentUserId, 
                U.username,
                C.idUser = ? AS ownerComment,
                C.comment, 
                C.createdAt
            FROM comments C 
            LEFT JOIN users U ON U.id = C.idUser 
            WHERE idEntry = ?
            ORDER BY C.createdAt DESC;

        `,
            [idUser, idEntry]
        );

        return comments;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectFirstsCommentsByIdEntry;
