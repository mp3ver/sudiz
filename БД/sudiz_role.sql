create table role
(
    id   int auto_increment
        primary key,
    role mediumtext null,
    note mediumtext null
)
    charset = utf8mb4;

INSERT INTO sudiz.role (id, role, note) VALUES (1, 'ROLE_ADMIN', 'Администратор');
INSERT INTO sudiz.role (id, role, note) VALUES (2, 'ROLE_SUPPLY', 'Специалист по снабжению');
INSERT INTO sudiz.role (id, role, note) VALUES (3, 'ROLE_PURCHASE', 'Специалист по закупкам');