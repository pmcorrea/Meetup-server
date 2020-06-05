BEGIN;

TRUNCATE
  table1
  RESTART IDENTITY CASCADE;

INSERT INTO table1 (user_name, user_password, user_status, visibility, avatar)
VALUES 
  ('Peter', '$2y$04$zSU5VoU8VRDKOkQhKb2b4O9O0.MZ7IJRePwLq3R.9J9F/q7cyRg3y', 'admin', 'Public', 'https://res.cloudinary.com/pmcorrea/image/upload/v1583012322/k2o16y7t0nob9dhovfsw.jpg');

COMMIT;