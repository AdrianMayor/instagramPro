const getConnection = require('../getConnection');

const updateUserQuery = async (username, email, avatar, birthday, Location, biography, idUser) => {

    let connection;

    try {
        connection = await getConnection();

        // Actualizamos el usuario.
        await connection.query(
            'UPDATE users SET username = ?, email = ?, avatar = ?, birthday = ?, location = ? , biography = ? WHERE id = ?',
            [username, email, avatar, birthday, Location, biography, idUser]
        )
    } finally {
        if(connection) connection.release();
    }
}


module.exports = updateUserQuery;