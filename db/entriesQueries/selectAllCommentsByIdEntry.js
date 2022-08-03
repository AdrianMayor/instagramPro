const getConnection = require('../getConnection');

const selectAllCommentsByIdEntry = async (idEntry) => {
    let connection;
    try {
        connection = await getConnection();

        const [comments] = await connection.query(
            `
            SELECT 
                C.id, 
                C.idUser AS commentUserId, 
                U.username,
                C.comment, 
                C.createdAt
            FROM comments C 
            LEFT JOIN users U ON U.id = C.idUser 
            WHERE idEntry = ?
            GROUP BY C.id
            ORDER BY C.createdAt DESC; 
 
        `,
            [idEntry]
        );

        return comments;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllCommentsByIdEntry;
