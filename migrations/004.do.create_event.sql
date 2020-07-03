CREATE TABLE create_event (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    announcements TEXT,
    needed_items TEXT[],
    event_date TEXT NOT NULL,
    event_time TEXT NOT NULL,
    lesson_title TEXT NOT NULL,
    bible_passage TEXT NOT NULL,
    question TEXT[] NOT NULL,
    event_leader INTEGER REFERENCES one_another_users(id) ON DELETE CASCADE,
    group_event INTEGER REFERENCES one_another_groups(id) ON DELETE CASCADE,
    UNIQUE (id)
);