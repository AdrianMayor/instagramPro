-- CREATE DATABASE instagramPro;

USE instagramPro;


DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS entries;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (    
	   id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
       username VARCHAR(30) UNIQUE NOT NULL,
       email VARCHAR(100) UNIQUE NOT NULL,
       password VARCHAR(100) NOT NULL,
       avatar VARCHAR(100),
       birthday DATE,
       Location VARCHAR(100),
       biography VARCHAR (250),
       role ENUM('admin', 'normal') DEFAULT 'normal',
       registrationCode VARCHAR(100),
       active BOOLEAN DEFAULT false,
       createdAt TIMESTAMP NOT NULL,
       modifiedAt TIMESTAMP
       );

	CREATE TABLE IF NOT EXISTS entries (    
       id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
       description VARCHAR(250),
       idUser INT UNSIGNED NOT NULL,
       FOREIGN KEY (idUser) REFERENCES users(id),
       Location VARCHAR (100),
       createdAt TIMESTAMP NOT NULL,
       modifiedAt TIMESTAMP
       );

	CREATE TABLE IF NOT EXISTS photos (    
       id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
       name VARCHAR (100),
       idEntry INT UNSIGNED NOT NULL,
       FOREIGN KEY (idEntry) REFERENCES entries(id),
       createdAt TIMESTAMP NOT NULL
       );
       
	CREATE TABLE IF NOT EXISTS comments (    
       id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
       idEntry INT UNSIGNED NOT NULL,
       FOREIGN KEY (idEntry) REFERENCES entries(id),
       idUser INT UNSIGNED NOT NULL,
       FOREIGN KEY (idUser) REFERENCES users(id),
       comment VARCHAR (250) NOT NULL,
       createdAt TIMESTAMP NOT NULL
       );
       
       	CREATE TABLE IF NOT EXISTS likes (    
       id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
       value BOOLEAN DEFAULT true,
       idUser INT UNSIGNED NOT NULL,
       FOREIGN KEY (idUser) REFERENCES users(id),
       idEntry INT UNSIGNED NOT NULL,
       FOREIGN KEY (idEntry) REFERENCES entries(id),
       createdAt TIMESTAMP NOT NULL,
       modifiedAt TIMESTAMP
       );
       
INSERT INTO comments (idEntry, idUser, comment, createdAt)
VALUES 	('1', '2', 'cremisima','2022-07-30 18:00:00'),
		('2', '2', 'Aguita papá', '2022-07-29 16:34:54'),
		('1','3','Pa la proxima te invito','2022-07-30 18:10:00'),
		('1','1','Orden en la sala','2022-07-30 18:20:00');
        
INSERT INTO likes (idUser, idEntry, createdAt)
VALUES 	('2', '1','2022-07-30 17:59:00');
		
                            
       
       SELECT E.*, 
       U.username,
       SUM(IFNULL(L.value = true, 0)) AS likes,
       E.idUser = 3 AS owner,
       BIT_OR(L.idUser = 3 AND L.value = 1) AS likedByMe
       FROM entries E
       LEFT JOIN users U ON E.idUser = U.id
       LEFT JOIN likes L ON L.idEntry = E.id;
       
	   SELECT E.*,U.*, P.*, C.*, L.*
       FROM entries E
       LEFT JOIN photos P ON P.idEntry = E.id
       LEFT JOIN comments C ON C.idEntry = E.id
       LEFT JOIN likes L ON L.idEntry = E.id
	   LEFT JOIN users U ON E.idUser = U.id;
       
       
       

       
       
       
       