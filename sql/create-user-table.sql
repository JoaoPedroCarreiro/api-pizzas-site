USE lua;

CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(32),
    email VARCHAR(64),
    pass VARCHAR(60),
    PRIMARY KEY (id)
);

ALTER TABLE users ADD (img VARCHAR(48) DEFAULT "default-user.jpg", is_admin BOOLEAN DEFAULT 0);

INSERT INTO users(username, email, pass) VALUES ("tiredblxxd", "joaobw10@gmail.com", "$2b$13$bHicnc9zO5u/12cARs2WG.aLcS9gLU7MUDgwOeKcCA2j5LF1xpRAS");

SELECT * FROM users;