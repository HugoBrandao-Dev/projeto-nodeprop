USE nodeprop;

CREATE TABLE setores (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	setor VARCHAR(100) NOT NULL,
	PRIMARY KEY(id)
);

SELECT * FROM setores;
DESCRIBE setores;