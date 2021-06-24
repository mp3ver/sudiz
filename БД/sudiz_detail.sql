create table detail
(
    id          int auto_increment
        primary key,
    vendor_code varchar(20) not null,
    name        mediumtext  null,
    note        mediumtext  null,
    constraint detail_vendor_code_uindex
        unique (vendor_code)
)
    collate = utf8_unicode_ci;

INSERT INTO sudiz.detail (id, vendor_code, name, note) VALUES (2, 'ЛО152', 'Стул', 'Хороший Стул');
INSERT INTO sudiz.detail (id, vendor_code, name, note) VALUES (3, 'AE342', 'Подвеска', 'Висит');
INSERT INTO sudiz.detail (id, vendor_code, name, note) VALUES (4, 'DR324', 'Шина', 'Вертится');
INSERT INTO sudiz.detail (id, vendor_code, name, note) VALUES (5, 'FT213', 'Колесо', 'Крутится');
INSERT INTO sudiz.detail (id, vendor_code, name, note) VALUES (6, 'GM231', 'Дверь', 'Закрывается');