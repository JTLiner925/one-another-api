CREATE TABLE group_event (
  user_id INTEGER REFERENCES one_another_users(id),
  group_id INTEGER REFERENCES one_another_groups(id),
  event_id INTEGER REFERENCES create_event(id),
  event_created TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (user_id, group_id, event_id)
);