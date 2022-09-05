USE nodeprop;

CREATE TABLE cargos (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	cargo VARCHAR(100) NOT NULL,
	salario FLOAT NOT NULL DEFAULT 0,
	PRIMARY KEY(id)
);

SELECT * FROM cargos;
DESCRIBE cargos;