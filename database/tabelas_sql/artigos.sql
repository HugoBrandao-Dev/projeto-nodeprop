USE nodeprop;

CREATE TABLE artigos (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	data_publicacao DATE NOT NULL,
	titulo VARCHAR(100) NOT NULL,
	categoria_id INT UNSIGNED NOT NULL,
	autor_id INT UNSIGNED NOT NULL,
	texto TEXT NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT fk_categorias FOREIGN KEY(categoria_id) REFERENCES categorias(id),
	CONSTRAINT fk_funcionarios FOREIGN KEY(autor_id) REFERENCES funcionarios(id)
);

ALTER TABLE artigos ADD COLUMN status_id INT NOT NULL DEFAULT 0 AFTER texto;
ALTER TABLE artigos ADD CONSTRAINT fk_status FOREIGN KEY(status_id) REFERENCES status_artigos(id);
ALTER TABLE artigos MODIFY COLUMN status_id INT UNSIGNED NOT NULL DEFAULT 0 AFTER texto;

SELECT * FROM artigos;
DESCRIBE artigos;