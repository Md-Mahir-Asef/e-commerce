-- Plain SQL query for case-insensitive product search
-- This query searches for products where the name contains the search term
-- in a case-insensitive manner using ILIKE (PostgreSQL specific)

-- Basic case-insensitive search
SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.rating,
    p.discountprice,
    p.images,
    p.createdat,
    p.updatedat
FROM "Product" p
WHERE p.name ILIKE '%shirt%'
ORDER BY p.createdat DESC
LIMIT 10 OFFSET 0;

-- Search with pagination
SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.rating,
    p.discountprice,
    p.images,
    p.createdat,
    p.updatedat,
    COUNT(*) OVER() as total_count
FROM "Product" p
WHERE p.name ILIKE '%shirt%'
ORDER BY p.createdat DESC
LIMIT 10 OFFSET 0;

-- Search with categories included
SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.rating,
    p.discountprice,
    p.images,
    p.createdat,
    p.updatedat,
    json_agg(
        json_build_object(
            'id', c.id,
            'name', c.name
        )
    ) as categories
FROM "Product" p
LEFT JOIN "_ProductCategories" pc ON p.id = pc."productId"
LEFT JOIN "Category" c ON pc."categoryId" = c.id
WHERE p.name ILIKE '%shirt%'
GROUP BY p.id, p.name, p.description, p.price, p.rating, p.discountprice, p.images, p.createdat, p.updatedat
ORDER BY p.createdat DESC
LIMIT 10 OFFSET 0;

-- Alternative using LOWER() function (works across databases)
SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.rating,
    p.discountprice,
    p.images,
    p.createdat,
    p.updatedat
FROM "Product" p
WHERE LOWER(p.name) LIKE LOWER('%shirt%')
ORDER BY p.createdat DESC
LIMIT 10 OFFSET 0;

-- Search with multiple terms (shirt OR shirts)
SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.rating,
    p.discountprice,
    p.images,
    p.createdat,
    p.updatedat
FROM "Product" p
WHERE p.name ILIKE '%shirt%' OR p.name ILIKE '%shirts%'
ORDER BY p.createdat DESC
LIMIT 10 OFFSET 0;

-- Count query for pagination
SELECT COUNT(*) as total_items
FROM "Product" p
WHERE p.name ILIKE '%shirt%';
