USE nodeprop;

CREATE TABLE servicos (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	servico VARCHAR(100) NOT NULL UNIQUE,
	informacoes_adicionais TEXT NOT NULL, 
	PRIMARY KEY(id)
);

SELECT * FROM servicos;
DESCRIBE servicos;