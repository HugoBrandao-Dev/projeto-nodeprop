USE nodeprop;

CREATE TABLE setores_cargos (
	setor_id INT UNSIGNED NOT NULL,
	cargo_id INT UNSIGNED NOT NULL,
	CONSTRAINT fk_setores FOREIGN KEY(setor_id) REFERENCES setores(id),
	CONSTRAINT fk_cargos FOREIGN KEY(cargo_id) REFERENCES cargos(id)
);