CREATE DATABASE perntodo;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE lists(
    list_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL
);

CREATE TABLE todo(
    todo_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    list_id VARCHAR(255) NOT NULL,
    text VARCHAR(255) NOT NULL,
    isComplete BOOLEAN DEFAULT FALSE NOT NULL,
    created TIMESTAMP NOT NULL
);