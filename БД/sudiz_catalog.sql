create table catalog
(
    id            int auto_increment
        primary key,
    dealer_id     int            null,
    detail_id     int            null,
    vendor_code   mediumtext     null,
    current_price decimal(20, 2) null
)
    charset = utf8mb4;

INSERT INTO sudiz.catalog (id, dealer_id, detail_id, vendor_code, current_price) VALUES (1, 5, 2, 'ЛО152', 23.00);
INSERT INTO sudiz.catalog (id, dealer_id, detail_id, vendor_code, current_price) VALUES (2, 8, 3, 'AE342', 43.00);
INSERT INTO sudiz.catalog (id, dealer_id, detail_id, vendor_code, current_price) VALUES (3, 9, 4, 'DR324', 231.00);
INSERT INTO sudiz.catalog (id, dealer_id, detail_id, vendor_code, current_price) VALUES (4, 10, 5, 'FT213', 23.00);
INSERT INTO sudiz.catalog (id, dealer_id, detail_id, vendor_code, current_price) VALUES (5, 11, 6, 'GM231', 435.00);
INSERT INTO sudiz.catalog (id, dealer_id, detail_id, vendor_code, current_price) VALUES (6, 8, null, null, 123.00);