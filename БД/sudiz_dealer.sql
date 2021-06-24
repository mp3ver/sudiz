create table dealer
(
    id           int auto_increment
        primary key,
    name         mediumtext null,
    address      mediumtext null,
    phone_number mediumtext null
)
    charset = utf8mb4;

INSERT INTO sudiz.dealer (id, name, address, phone_number) VALUES (5, 'Завод "Машиностроитель"', 'Куйбышева, 23', '8-800-555-35-35');
INSERT INTO sudiz.dealer (id, name, address, phone_number) VALUES (8, 'Автосервис "Починка"', 'Гашкова, 75', '8-123-456-76-83');
INSERT INTO sudiz.dealer (id, name, address, phone_number) VALUES (9, 'Магазин "Детали"', 'Сибирская, 2', '8-345-231-42-23');
INSERT INTO sudiz.dealer (id, name, address, phone_number) VALUES (10, 'Магазин "Машины"', 'Усьвинская, 153', '8-523-213-23-43');
INSERT INTO sudiz.dealer (id, name, address, phone_number) VALUES (11, 'Автосервис "Восток"', 'Ленина, 53', '8-213-234-23-21');