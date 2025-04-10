USE frequencia_unifor;


DROP TABLE IF EXISTS usuarios;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    tipo ENUM('coordenadora', 'treinador') NOT NULL DEFAULT 'treinador'
);
INSERT INTO usuarios (usuario, email, senha, tipo)
VALUES ('coordenadora', 'coordenadora@unifor.br', '1234', 'coordenadora');



select * from usuarios;