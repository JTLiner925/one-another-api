CREATE TABLE one_another_groups (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    group_name TEXT NOT NULL UNIQUE,
    pitch TEXT,
    group_leader INTEGER REFERENCES one_another_users(id) ON DELETE CASCADE,
    leader_phone NUMERIC NOT NULL,
    group_location TEXT NOT NULL,
    time_date TEXT NOT NULL,
    more_info TEXT,
    user_ids TEXT[],
    UNIQUE (id)
)