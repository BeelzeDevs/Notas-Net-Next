CREATE TABLE Notas (
    Id SERIAL PRIMARY KEY,
    Titulo VARCHAR(200) NOT NULL,
    Contenido TEXT,
    Archivada BOOLEAN DEFAULT FALSE,
    FechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FechaModificacion TIMESTAMP
);


CREATE TABLE Categorias (
    Id SERIAL PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL UNIQUE
);

-- NotaXCategorias
CREATE TABLE NotaCategorias (
    NotaId INT NOT NULL,
    CategoriaId INT NOT NULL,
    PRIMARY KEY (NotaId, CategoriaId),
    FOREIGN KEY (NotaId) REFERENCES Notas(Id) ON DELETE CASCADE,
    FOREIGN KEY (CategoriaId) REFERENCES Categorias(Id) ON DELETE CASCADE
);

-- Insert de las tablas

INSERT INTO Categorias (Nombre) VALUES
('Work'),
('Study'),
('Personal'),
('Ideas'),
('Important');



INSERT INTO Notas (Titulo, Contenido, Archivada)
VALUES 
('Comprar insumos', 'Comprar café, azúcar y leche para la oficina.', FALSE),
('Revisar proyecto', 'Revisar el proyecto de challenge hirelens', FALSE),
('Recordatorio aniversario', 'preparar el regalo de viaje, fechas disponibles para viajar en noviembre.', FALSE),
('Idea para app', 'Un CRM para e-commerce ', FALSE),
('Tarea Archivada de solucionar bug', 'Tarea completada el mes pasado.', TRUE),
('Buy supplies', 'Buy coffee, sugar, and milk for the office.', FALSE),
('Review project', 'Review the challenge hirelens project.', FALSE),
('Anniversary reminder', 'Prepare a travel gift, available travel dates in November.', FALSE),
('App idea', 'A CRM for e-commerce.', FALSE),
('Archived bug fix task', 'Task completed last month.', TRUE);


INSERT INTO NotaCategorias (NotaId, CategoriaId) 
VALUES (1, 1),
(4, 4),
(2, 1),
(2, 5),
(3, 3),
(5, 1),
(6, 1),
(9, 4),
(7, 1),
(7, 5),
(8, 3),
(10, 1);


