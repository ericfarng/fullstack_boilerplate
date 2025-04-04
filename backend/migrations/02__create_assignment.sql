CREATE TABLE assignment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE question (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assignment_id INTEGER NOT NULL REFERENCES assignment (id),
    question_content TEXT NOT NULL,
    question_value INTEGER NOT NULL DEFAULT 1,
    question_type INTEGER NOT NULL DEFAULT 1,  -- consider enum here for type safety
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE answer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL REFERENCES question (id),
    answer_content TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE user_answer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES user (id),
    answer_id INTEGER REFERENCES answer (id),
    answer_text TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );