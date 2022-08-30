USE nodeprop;

CREATE TABLE clientes (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	telefone VARCHAR(100),
	celular VARCHAR(100) NOT NULL,
	localizacao VARCHAR(100) NOT NULL,
	endereco TINYTEXT NOT NULL,
	informacoes_adicionais TEXT,
	identificacao VARCHAR(100), /* CPF, CNPJ, novo RG */ 
	PRIMARY KEY(id)
);