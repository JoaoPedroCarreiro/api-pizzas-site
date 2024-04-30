USE lua;

CREATE TABLE ratings (
    id_user INT UNSIGNED,
    id_pizza INT UNSIGNED NOT NULL,
    rating FLOAT,
    UNIQUE (id_user, id_pizza),
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (id_pizza) REFERENCES pizzas(id) ON DELETE CASCADE
);

CREATE TRIGGER rateAfterInsert AFTER INSERT ON ratings FOR EACH ROW
BEGIN
    UPDATE pizzas
    SET rating = (SELECT FORMAT(AVG(rating), 1) as avg FROM ratings WHERE id_pizza = NEW.id_pizza)
    WHERE id = NEW.id_pizza;
END;

CREATE TRIGGER rateAfterUpdate AFTER UPDATE ON ratings FOR EACH ROW
BEGIN
    UPDATE pizzas
    SET rating = (SELECT FORMAT(AVG(rating), 1) as avg FROM ratings WHERE id_pizza = NEW.id_pizza)
    WHERE id = NEW.id_pizza;
END;

SELECT * FROM ratings;