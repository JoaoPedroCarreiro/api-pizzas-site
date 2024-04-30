USE lua;

CREATE TABLE pizzas (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    topping VARCHAR(48),
    price DECIMAL(5, 2),
    ingredients VARCHAR(128),
    img VARCHAR(48),
    rating FLOAT DEFAULT 0,
    PRIMARY KEY (id)
);

INSERT INTO pizzas (topping, price, ingredients, img) VALUES
    (
        "Mozzarella",
        9.99,
        "Mozzarella",
        "cheese.jpg"
    ),
    (
        "Pepperoni",
        11.99,
        "Pepperoni and Mozzarella",
        "pepperoni.jpg"
    ),
    (
        "Chicken with Catupiry",
        14.99,
        "Mozzarella, Chicken and Catupiry",
        "catupiry.jpg"
    ),
    (
        "Portuguese",
        11.99,
        "Mozzarella, Ham, Eggs, Onions, Peas",
        "portuguese.jpg"
    ),
    (
        "Chocolate",
        10.99,
        "Chocolate and Mozzarella",
        "chocolate.jpg"
    )
;

SELECT * FROM pizzas;