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
       createdAt TIMESTAMP NOT NULL
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
       
		
                            


       

       
       
       
       