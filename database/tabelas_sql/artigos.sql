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