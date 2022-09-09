USE nodeprop;

CREATE TABLE contratacoes (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  cliente_id INT UNSIGNED NOT NULL,
  servico_id INT UNSIGNED NOT NULL,
  data DATE NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_clientes FOREIGN KEY(cliente_id) REFERENCES clientes(id),
  CONSTRAINT fk_servicos FOREIGN KEY(servico_id) REFERENCES servicos(id)
);

SELECT * FROM contratacoes;
DESCRIBE contratacoes;