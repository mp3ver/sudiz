create table user
(
    id       int auto_increment
        primary key,
    login    mediumtext null,
    password mediumtext null,
    name     mediumtext null,
    role_id  int        null,
    note     mediumtext null
)
    charset = utf8mb4;

INSERT INTO sudiz.user (id, login, password, name, role_id, note) VALUES (1, 'dasem', '$2y$10$/i.tY0p0bkJ6Vm65MHRTlOGMYZAXjAHbRwRZkzS.d8sCvpXvqgBHy', 'Andrey', 1, 'kek');
INSERT INTO sudiz.user (id, login, password, name, role_id, note) VALUES (2, 'supply', '$2a$10$mN8OkEwG25F3kT/9x81DE.HoLjqqgiDIrKJrVG5uQkVWnD1REb4B.', 'supply', 2, 'supply');
INSERT INTO sudiz.user (id, login, password, name, role_id, note) VALUES (3, 'purchase', '$2a$10$nzVbPaHAfl/gIKdsOZrzve.SGo.smOPQ2wWyQ13U8hjqNFfgIvNoy', 'purchase', 3, 'purchase');
INSERT INTO sudiz.user (id, login, password, name, role_id, note) VALUES (4, 'admin', '$2a$10$K9BJAEHuZdfdngsqVdG48ug2iuRvLgGx39JNLQmezfFhowmr3VoFi', 'admin', 1, 'admin');
INSERT INTO sudiz.user (id, login, password, name, role_id, note) VALUES (6, 'DrakeTHPS', '2358Zed', null, 1, null);