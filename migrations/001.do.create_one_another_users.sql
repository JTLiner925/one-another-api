CREATE TABLE one_another_users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT,
    user_address TEXT,
    user_bio TEXT,
    UNIQUE (id)
);