BEGIN;

TRUNCATE
  users,
  events,
  participants,
  followers,
  invites,
  bookmarks
  RESTART IDENTITY CASCADE;

INSERT INTO users (id, user_first_name, user_last_name, user_email, user_password, user_zipcode, user_employer, user_employer_address, user_no_of_followers, user_status, user_avatar, user_bio)
VALUES 
  (1, 'Peter', 'Correa', 'blah@me.com', '$2y$04$zSU5VoU8VRDKOkQhKb2b4O9O0.MZ7IJRePwLq3R.9J9F/q7cyRg3y', '33014', 'Magic Inc.', '123 Main St.', '22', 'admin', 'https://res.cloudinary.com/pmcorrea/image/upload/v1583012322/k2o16y7t0nob9dhovfsw.jpg', 'Some bio.'),
  (2, 'Pedro', 'Correa', 'blah2@me.com', '$2y$04$zSU5VoU8VRDKOkQhKb2b4O9O0.MZ7IJRePwLq3R.9J9F/q7cyRg3y', '33014', 'Magic Inc.', '123 Main St.', '22', 'admin', 'https://res.cloudinary.com/pmcorrea/image/upload/v1583012322/k2o16y7t0nob9dhovfsw.jpg', 'Some bio.');


INSERT INTO events (id ,event_name, event_description, event_location_name, event_address, event_date, event_time, event_host_id, event_no_of_participants, event_cover_img)
VALUES 
  (1, 'Peters Pool Party', 'Some description.', 'Grand Central', '123 Main St', '12/09/2020', '5:00pm', 1, '22', 'https://res.cloudinary.com/pmcorrea/image/upload/v1583012322/k2o16y7t0nob9dhovfsw.jpg');

INSERT INTO participants (id, user_id, event_id, participant_status)
VALUES 
  (1, 2, 1, 'invited');

INSERT INTO followers (id, user_id, following_id)
VALUES 
  (1, 2, 1);

INSERT INTO invites (id, event_id, user_id, sender_id)
VALUES 
  (1, 1, 1, 2);

INSERT INTO bookmarks (id, user_id, event_id)
VALUES 
  (1, 2, 1);

COMMIT;

 