USE frequencia_unifor;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  usuario VARCHAR(50) UNIQUE,
  senha VARCHAR(50) 
);

select * from usuarios;
