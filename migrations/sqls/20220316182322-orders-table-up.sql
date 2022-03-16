CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    userId INTEGER REFERENCES users(id)
);
