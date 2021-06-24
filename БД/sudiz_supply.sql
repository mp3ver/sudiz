create table supply
(
    id          int auto_increment
        primary key,
    catalog_id  int            null,
    date        timestamp      null,
    amount      int            null,
    user_id     int            null,
    total_price decimal(20, 2) null
)
    charset = utf8mb4;

INSERT INTO sudiz.supply (id, catalog_id, date, amount, user_id, total_price) VALUES (1, 3, '2021-06-18 12:18:19', 5, 4, 1155.00);
INSERT INTO sudiz.supply (id, catalog_id, date, amount, user_id, total_price) VALUES (2, 2, '2021-06-18 12:19:01', 15, 4, 645.00);
INSERT INTO sudiz.supply (id, catalog_id, date, amount, user_id, total_price) VALUES (3, 5, '2021-06-18 12:19:12', 5, 4, 2175.00);
INSERT INTO sudiz.supply (id, catalog_id, date, amount, user_id, total_price) VALUES (4, 2, '2021-06-18 13:57:23', 3, 4, 129.00);
INSERT INTO sudiz.supply (id, catalog_id, date, amount, user_id, total_price) VALUES (5, 3, '2021-06-18 14:03:42', 4, 2, 924.00);