USE nodeprop;

CREATE TABLE status_artigos(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	status_artigo VARCHAR(50) NOT NULL,
	PRIMARY KEY(id)
);

INSERT INTO status_artigos VALUES
(default, "em desenvolvimento"),
(default, "publicado");

SELECT * FROM status_artigos;
DESCRIBE status_artigos;