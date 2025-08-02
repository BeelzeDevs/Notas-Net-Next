
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