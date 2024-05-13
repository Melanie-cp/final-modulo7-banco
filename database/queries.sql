DROP TABLE IF EXISTS transferencias;
DROP TABLE IF EXISTS usuarios;


CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY, 
	nombre VARCHAR(50),
	balance FLOAT CHECK (balance >= 0)
);

CREATE TABLE transferencias (
	id SERIAL PRIMARY KEY, 
	emisor INT, 
	receptor INT, 
	monto FLOAT, 
	fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
	FOREIGN KEY (emisor) REFERENCES usuarios(id) ON DELETE CASCADE, 
	FOREIGN KEY (receptor) REFERENCES usuarios(id) ON DELETE CASCADE
);

INSERT INTO usuarios (nombre, balance)
VALUES
('Juanita Pérez', 3000),
('Gonzalo Gonzáles', 2000);

SELECT * FROM USUARIOS;
SELECT * FROM TRANSFERENCIAS;