USE nodeprop;

CREATE TABLE clientes_servicos (
	cliente_id INT UNSIGNED NOT NULL,
	servico_id INT UNSIGNED NOT NULL,
	CONSTRAINT fk_clientes FOREIGN KEY(cliente_id) REFERENCES clientes(id),
	CONSTRAINT fk_servicos FOREIGN KEY(servico_id) REFERENCES servicos(id)
);