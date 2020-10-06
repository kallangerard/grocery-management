INSERT INTO products(name, barcode)
VALUES(${productName}, ${productBarcode})
RETURNING *