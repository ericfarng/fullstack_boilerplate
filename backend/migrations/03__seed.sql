-- Create some test users
INSERT INTO user (name, email) VALUES
  ('John Doe', 'john@example.com'),
  ('Jane Smith', 'jane@example.com'),
  ('Alice Johnson', 'alice@example.com'),
  ('Bob Brown', 'bob@example.com');

-- Create test assignments
INSERT INTO assignment (title) VALUES
  ('Basic Skeletal System Quiz'),
  ('Cardiovascular System Basics'),
  ('Digestive System Overview');

-- Create questions for Skeletal System Quiz
INSERT INTO question (question_value, question_type, question_content, assignment_id) VALUES
    (1, 1, 'Which bone is the longest in the human body?', (SELECT id FROM assignment WHERE title = 'Basic Skeletal System Quiz')),
    (1, 1, 'How many bones are in the adult human body?', (SELECT id FROM assignment WHERE title = 'Basic Skeletal System Quiz')),
    (1, 1, 'Which part of the skull protects the brain?', (SELECT id FROM assignment WHERE title = 'Basic Skeletal System Quiz')),
    (1, 1, 'What is the common name for the clavicle?', (SELECT id FROM assignment WHERE title = 'Basic Skeletal System Quiz')),
    (4, 2, 'Explain the difference between compact and spongy bone tissue:', (SELECT id FROM assignment WHERE title = 'Basic Skeletal System Quiz'));

-- -- Create answers for Skeletal System Quiz, Question 1
INSERT INTO answer (is_correct, answer_content, question_id) VALUES
      ( true, 'Femur', (SELECT id FROM question WHERE question_content = 'Which bone is the longest in the human body?' )),
      ( false, 'Tibia', (SELECT id FROM question WHERE question_content = 'Which bone is the longest in the human body?' )),
      ( false, 'Humerus', (SELECT id FROM question WHERE question_content = 'Which bone is the longest in the human body?' )),
      ( false, 'Fibula', (SELECT id FROM question WHERE question_content = 'Which bone is the longest in the human body?' ));

-- -- Create answers for Skeletal System Quiz, Question 2
INSERT INTO answer (is_correct, answer_content, question_id) VALUES
      ( true, '206', (SELECT id FROM question WHERE question_content = 'How many bones are in the adult human body?' )),
      ( false, '186', (SELECT id FROM question WHERE question_content = 'How many bones are in the adult human body?' )),
      ( false, '226', (SELECT id FROM question WHERE question_content = 'How many bones are in the adult human body?' )),
      ( false, '196', (SELECT id FROM question WHERE question_content = 'How many bones are in the adult human body?' ));

-- -- Create answers for Skeletal System Quiz, Question 3
INSERT INTO answer (is_correct, answer_content, question_id) VALUES
      ( true, 'Cranium', (SELECT id FROM question WHERE question_content = 'Which part of the skull protects the brain?' )),
      ( false, 'Mandible', (SELECT id FROM question WHERE question_content = 'Which part of the skull protects the brain?' )),
      ( false, 'Maxilla', (SELECT id FROM question WHERE question_content = 'Which part of the skull protects the brain?' )),
      ( false, 'Hyoid', (SELECT id FROM question WHERE question_content = 'Which part of the skull protects the brain?' ));

-- -- Create answers for Skeletal System Quiz, Question 4
INSERT INTO answer (is_correct, answer_content, question_id) VALUES
      ( true, 'Collarbone', (SELECT id FROM question WHERE question_content = 'What is the common name for the clavicle?' )),
      ( false, 'Wishbone', (SELECT id FROM question WHERE question_content = 'What is the common name for the clavicle?' )),
      ( false, 'Shoulderblade', (SELECT id FROM question WHERE question_content = 'What is the common name for the clavicle?' )),
      ( false, 'Neckbone', (SELECT id FROM question WHERE question_content = 'What is the common name for the clavicle?' ));



-- Create questions for Cardiovascular System Quiz
INSERT INTO question (question_value, question_type, question_content, assignment_id) VALUES
    (1, 1, 'Which chamber of the heart pumps blood to the body?', (SELECT id FROM assignment WHERE title = 'Cardiovascular System Basics')),
    (1, 1, 'What is the main function of red blood cells?', (SELECT id FROM assignment WHERE title = 'Cardiovascular System Basics')),
    (1, 1, 'Which blood vessel carries oxygenated blood?', (SELECT id FROM assignment WHERE title = 'Cardiovascular System Basics')),
    (1, 1, 'How many chambers are in the human heart?', (SELECT id FROM assignment WHERE title = 'Cardiovascular System Basics')),
    (4, 2, 'Describe the path of blood flow through the heart:', (SELECT id FROM assignment WHERE title = 'Cardiovascular System Basics'));

-- -- Create answers for Cardiovascular System Quiz, Question 1
INSERT INTO answer (is_correct, answer_content, question_id) VALUES
      ( true, 'Left ventricle', (SELECT id FROM question WHERE question_content = 'Which chamber of the heart pumps blood to the body?' )),
      ( false, 'Right ventricle', (SELECT id FROM question WHERE question_content = 'Which chamber of the heart pumps blood to the body?' )),
      ( false, 'Left atrium', (SELECT id FROM question WHERE question_content = 'Which chamber of the heart pumps blood to the body?' )),
      ( false, 'Right atrium', (SELECT id FROM question WHERE question_content = 'Which chamber of the heart pumps blood to the body?' ));

-- -- Create answers for Cardiovascular System Quiz, Question 2
INSERT INTO answer (is_correct, answer_content, question_id) VALUES
      ( true, 'Carry oxygen', (SELECT id FROM question WHERE question_content = 'What is the main function of red blood cells?' )),
      ( false, 'Fight infection', (SELECT id FROM question WHERE question_content = 'What is the main function of red blood cells?' )),
      ( false, 'Form blood clots', (SELECT id FROM question WHERE question_content = 'What is the main function of red blood cells?' )),
      ( false, 'Produce antibodies', (SELECT id FROM question WHERE question_content = 'What is the main function of red blood cells?' ));

-- -- Create answers for Cardiovascular System Quiz, Question 3
INSERT INTO answer (is_correct, answer_content, question_id) VALUES
      ( true, 'Arteries', (SELECT id FROM question WHERE question_content = 'Which blood vessel carries oxygenated blood?' )),
      ( false, 'Veins', (SELECT id FROM question WHERE question_content = 'Which blood vessel carries oxygenated blood?' )),
      ( false, 'Capillaries', (SELECT id FROM question WHERE question_content = 'Which blood vessel carries oxygenated blood?' )),
      ( false, 'Venules', (SELECT id FROM question WHERE question_content = 'Which blood vessel carries oxygenated blood?' ));

-- -- Create answers for Cardiovascular System Quiz, Question 4
INSERT INTO answer (is_correct, answer_content, question_id) VALUES
      ( true, '4', (SELECT id FROM question WHERE question_content = 'How many chambers are in the human heart?' )),
      ( false, '2', (SELECT id FROM question WHERE question_content = 'How many chambers are in the human heart?' )),
      ( false, '3', (SELECT id FROM question WHERE question_content = 'How many chambers are in the human heart?' )),
      ( false, '6', (SELECT id FROM question WHERE question_content = 'How many chambers are in the human heart?' ));





-- Create questions for Digestive System Quiz
INSERT INTO question (question_value, question_type, question_content, assignment_id) VALUES
    (1, 1, 'Where does chemical digestion begin?', (SELECT id FROM assignment WHERE title = 'Digestive System Overview')),
    (1, 1, 'Which organ produces bile?', (SELECT id FROM assignment WHERE title = 'Digestive System Overview')),
    (1, 1, 'What is the longest part of the digestive system?', (SELECT id FROM assignment WHERE title = 'Digestive System Overview')),
    (1, 1, 'Which enzyme breaks down proteins in the stomach?', (SELECT id FROM assignment WHERE title = 'Digestive System Overview')),
    (4, 2, 'Explain the role of villi in the small intestine:', (SELECT id FROM assignment WHERE title = 'Digestive System Overview'));

-- -- Create answers for Digestive System Quiz, Question 1
INSERT INTO answer (is_correct, answer_content, question_id) VALUES
      ( true, 'Mouth', (SELECT id FROM question WHERE question_content = 'Where does chemical digestion begin?' )),
      ( false, 'Stomach', (SELECT id FROM question WHERE question_content = 'Where does chemical digestion begin?' )),
      ( false, 'Small intestine', (SELECT id FROM question WHERE question_content = 'Where does chemical digestion begin?' )),
      ( false, 'Esophagus', (SELECT id FROM question WHERE question_content = 'Where does chemical digestion begin?' ));

-- -- Create answers for Digestive System Quiz, Question 2
INSERT INTO answer (is_correct, answer_content, question_id) VALUES
      ( true, 'Liver', (SELECT id FROM question WHERE question_content = 'Which organ produces bile?' )),
      ( false, 'Pancreas', (SELECT id FROM question WHERE question_content = 'Which organ produces bile?' )),
      ( false, 'Gallbladder', (SELECT id FROM question WHERE question_content = 'Which organ produces bile?' )),
      ( false, 'Stomach', (SELECT id FROM question WHERE question_content = 'Which organ produces bile?' ));

-- -- Create answers for Digestive System Quiz, Question 3
INSERT INTO answer (is_correct, answer_content, question_id) VALUES
      ( true, 'Small intestine', (SELECT id FROM question WHERE question_content = 'What is the longest part of the digestive system?' )),
      ( false, 'Large intestine', (SELECT id FROM question WHERE question_content = 'What is the longest part of the digestive system?' )),
      ( false, 'Esophagus', (SELECT id FROM question WHERE question_content = 'What is the longest part of the digestive system?' )),
      ( false, 'Stomach', (SELECT id FROM question WHERE question_content = 'What is the longest part of the digestive system?' ));

-- -- Create answers for Digestive System Quiz, Question 4
INSERT INTO answer (is_correct, answer_content, question_id) VALUES
      ( true, 'Pepsin', (SELECT id FROM question WHERE question_content = 'Which enzyme breaks down proteins in the stomach?' )),
      ( false, 'Amylase', (SELECT id FROM question WHERE question_content = 'Which enzyme breaks down proteins in the stomach?' )),
      ( false, 'Lipase', (SELECT id FROM question WHERE question_content = 'Which enzyme breaks down proteins in the stomach?' )),
      ( false, 'Trypsin', (SELECT id FROM question WHERE question_content = 'Which enzyme breaks down proteins in the stomach?' ));




-- -- Create questions for Skeletal System Quiz
-- INSERT INTO
--   question (assignment_id, question_value, question_content)
-- SELECT
--   (SELECT id FROM assignment WHERE title = 'Basic Skeletal System Quiz' ),
--   question_value,
--   question_content
-- FROM
--   (
--     VALUES
--       ( 1, 'Which bone is the longest in the human body?',
--         'Femur;;Tibia;;Humerus;;Fibula'
--       ),
--       (
--         'How many bones are in the adult human body?',
--         '206;;186;;226;;196'
--       ),
--       (
--         'Which part of the skull protects the brain?',
--         'Cranium;;Mandible;;Maxilla;;Hyoid'
--       ),
--       (
--         'What is the common name for the clavicle?',
--         'Collarbone;;Wishbone;;Shoulderblade;;Neckbone'
--       ),
--       (
--         'Explain the difference between compact and spongy bone tissue:',
--         NULL
--       )
--   ) AS q (title, choices);


-- Create questions for Cardiovascular Quiz
-- INSERT INTO
--   question (assignment_id, title, choices)
-- SELECT
--   (
--     SELECT
--       id
--     FROM
--       assignment
--     WHERE
--       title = 'Cardiovascular System Basics'
--   ),
--   title,
--   choices
-- FROM
--   (
--     VALUES
--       (
--         'Which chamber of the heart pumps blood to the body?',
--         'Left ventricle;;Right ventricle;;Left atrium;;Right atrium'
--       ),
--       (
--         'What is the main function of red blood cells?',
--         'Carry oxygen;;Fight infection;;Form blood clots;;Produce antibodies'
--       ),
--       (
--         'Which blood vessel carries oxygenated blood?',
--         'Arteries;;Veins;;Capillaries;;Venules'
--       ),
--       (
--         'How many chambers are in the human heart?',
--         '4;;2;;3;;6'
--       ),
--       (
--         'Describe the path of blood flow through the heart:',
--         NULL
--       )
--   ) AS q (title, choices);

-- -- Create questions for Digestive System Quiz
-- INSERT INTO
--   question (assignment_id, title, choices)
-- SELECT
--   (
--     SELECT
--       id
--     FROM
--       assignment
--     WHERE
--       title = 'Digestive System Overview'
--   ),
--   title,
--   choices
-- FROM
--   (
--     VALUES
--       (
--         'Where does chemical digestion begin?',
--         'Mouth;;Stomach;;Small intestine;;Esophagus'
--       ),
--       (
--         'Which organ produces bile?',
--         'Liver;;Pancreas;;Gallbladder;;Stomach'
--       ),
--       (
--         'What is the longest part of the digestive system?',
--         'Small intestine;;Large intestine;;Esophagus;;Stomach'
--       ),
--       (
--         'Which enzyme breaks down proteins in the stomach?',
--         'Pepsin;;Amylase;;Lipase;;Trypsin'
--       ),
--       (
--         'Explain the role of villi in the small intestine:',
--         NULL
--       )
--   ) AS q (title, choices);