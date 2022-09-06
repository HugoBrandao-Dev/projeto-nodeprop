USE nodeprop;

CREATE TABLE funcionarios_servicos (
	funcionario_id INT UNSIGNED NOT NULL,
	servico_id INT UNSIGNED NOT NULL,
	CONSTRAINT fk_funcionarios FOREIGN KEY(funcionario_id) REFERENCES funcionarios(id),
	CONSTRAINT fk_servicos FOREIGN KEY(servico_id) REFERENCES servicos(id)
);

SELECT * FROM funcionarios_servicos;
DESCRIBE funcionarios_servicos;