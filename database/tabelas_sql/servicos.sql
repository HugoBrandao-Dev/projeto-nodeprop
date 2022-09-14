USE nodeprop;

CREATE TABLE servicos (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	servico VARCHAR(100) NOT NULL UNIQUE,
	informacoes_adicionais TEXT NOT NULL, 
	PRIMARY KEY(id)
);

ALTER TABLE servicos ADD COLUMN breve_descricao VARCHAR(50) NOT NULL AFTER servico;
ALTER TABLE servicos ADD COLUMN slug VARCHAR(100) NOT NULL AFTER servico;

SELECT * FROM servicos;
DESCRIBE servicos;