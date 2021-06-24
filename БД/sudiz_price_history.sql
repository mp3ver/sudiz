create table price_history
(
    id         int auto_increment
        primary key,
    catalog_id int            null,
    date       timestamp      null,
    old_price  decimal(20, 2) null,
    new_price  decimal(20, 2) null
)
    charset = utf8mb4;

