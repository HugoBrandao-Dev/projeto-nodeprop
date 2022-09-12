USE nodeprop;

CREATE TABLE newsletter (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(150) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

SELECT * FROM newsletter;
DESCRIBE newsletter;