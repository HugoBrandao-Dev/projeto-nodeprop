USE nodeprop;

CREATE TABLE cargos (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	cargo VARCHAR(100) NOT NULL,
	setor_id INT UNSIGNED NOT NULL,
	salario FLOAT NOT NULL DEFAULT 0,
	PRIMARY KEY(id),
	CONSTRAINT fk_setores FOREIGN KEY(setor_id) REFERENCES setores(id)
);