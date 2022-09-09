USE nodeprop;

CREATE TABLE contratacoes (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	cliente_id INT UNSIGNED NOT NULL,
	servico_id INT UNSIGNED NOT NULL,
	data_contratacao DATE NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT fk_clientes FOREIGN KEY(cliente_id) REFERENCES clientes(id),
	CONSTRAINT fk_servicos FOREIGN KEY(servico_id) REFERENCES servicos(id)
);

ALTER TABLE contratacoes ADD COLUMN status_id INT NOT NULL DEFAULT 1 AFTER servico_id;
ALTER TABLE contratacoes ADD CONSTRAINT fk_status FOREIGN KEY(status_id) REFERENCES status_contratacoes(id);

SELECT * FROM contratacoes;
DESCRIBE contratacoes;