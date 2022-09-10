USE nodeprop;

CREATE TABLE status_contratacoes (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	status_contratacao VARCHAR(50) NOT NULL,
	PRIMARY KEY(id)
);

SELECT * FROM status_contratacoes;
DESCRIBE status_contratacoes;

INSERT INTO status_contratacoes VALUES
(default, "aberto"),
(default, "em andamento"),
(default, "finalizado");