USE nodeprop;

CREATE TABLE funcionarios (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	nascimento DATE NOT NULL,
	email VARCHAR(150) NOT NULL,
	setor INT UNSIGNED NOT NULL,
	cargo INT UNSIGNED NOT NULL,
	telefone VARCHAR(13),
	celulares VARCHAR(13) NOT NULL,
	localizacao VARCHAR(100) NOT NULL,
	endereco TINYTEXT NOT NULL,
	informacoes_adicionais TEXT,
	cpf VARCHAR(100) NOT NULL,
	PRIMARY KEY(id)
);