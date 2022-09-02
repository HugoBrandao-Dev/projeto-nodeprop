USE nodeprop;

CREATE TABLE clientes (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	nascimento DATE NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	telefone VARCHAR(100),
	celular VARCHAR(100) NOT NULL,
	cep VARCHAR(8) NOT NULL,
	uf TINYINT UNSIGNED NOT NULL,
	localizacao VARCHAR(100) NOT NULL,
	endereco TINYTEXT NOT NULL,
	numero INT NOT NULL,
	informacoes_adicionais TEXT,
	identificacao VARCHAR(100) UNIQUE, /* CPF, CNPJ, novo RG */ 
	PRIMARY KEY(id)
);

SELECT * FROM clientes;
DESCRIBE clientes;