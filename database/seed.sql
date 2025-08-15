-- Insert de las tablas

INSERT INTO Categories (Name) VALUES
('Work'),
('Study'),
('Personal'),
('Ideas'),
('Important');



INSERT INTO Notes (Title, Content, Filed)
VALUES 
('Comprar insumos', 'Comprar cafe, azucar y leche para la oficina.', FALSE),
('Revisar proyecto', 'Revisar el proyecto de challenge hirelens', FALSE),
('Recordatorio aniversario', 'preparar el regalo de viaje, fechas disponibles para viajar en noviembre.', FALSE),
('Idea para app', 'Un CRM para e-commerce ', FALSE),
('Tarea Archivada de solucionar bug', 'Tarea completada el mes pasado.', TRUE),
('Buy supplies', 'Buy coffee, sugar, and milk for the office.', FALSE),
('Review project', 'Review the challenge hirelens project.', FALSE),
('Anniversary reminder', 'Prepare a travel gift, available travel dates in November.', FALSE),
('App idea', 'A CRM for e-commerce.', FALSE),
('Archived bug fix task', 'Task completed last month.', TRUE);


INSERT INTO NotexCategory (NoteId, CategoryId) 
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


