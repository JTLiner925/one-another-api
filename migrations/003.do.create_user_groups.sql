CREATE TABLE user_groups (
  user_id INTEGER REFERENCES one_another_users(id),
  group_id INTEGER REFERENCES one_another_groups(id),
  group_created TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (user_id, group_id)
);