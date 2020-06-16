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
  (2, 'Tom', 'Richard', 'blah2@me.com', '$2y$04$zSU5VoU8VRDKOkQhKb2b4O9O0.MZ7IJRePwLq3R.9J9F/q7cyRg3y', '29123', 'Magic Inc.', '123 Main St.', '22', 'admin', 'https://res.cloudinary.com/pmcorrea/image/upload/v1583012170/yc23ciwgahwh4kc5jacz.jpg', 'Some bio.'),
  (3, 'Gerald', 'Ford', 'blah3@me.com', '$2y$04$zSU5VoU8VRDKOkQhKb2b4O9O0.MZ7IJRePwLq3R.9J9F/q7cyRg3y', '11232', 'Magic Inc.', '123 Main St.', '22', 'admin', 'https://res.cloudinary.com/pmcorrea/image/upload/v1583012253/d6etblztcnrmqi4ezzsy.jpg', 'Some bio.'),
  (4, 'Jane', 'Correa', 'blah4@me.com', '$2y$04$zSU5VoU8VRDKOkQhKb2b4O9O0.MZ7IJRePwLq3R.9J9F/q7cyRg3y', '33014', 'Magic Inc.', '123 Main St.', '22', 'admin', 'https://res.cloudinary.com/pmcorrea/image/upload/v1583012322/k2o16y7t0nob9dhovfsw.jpg', 'Some bio.'),
  (5, 'Joe', 'Richard', 'blah5@me.com', '$2y$04$zSU5VoU8VRDKOkQhKb2b4O9O0.MZ7IJRePwLq3R.9J9F/q7cyRg3y', '29123', 'Magic Inc.', '123 Main St.', '22', 'admin', 'https://res.cloudinary.com/pmcorrea/image/upload/v1583012170/yc23ciwgahwh4kc5jacz.jpg', 'Some bio.'),
  (6, 'Michael', 'Ford', 'blah6@me.com', '$2y$04$zSU5VoU8VRDKOkQhKb2b4O9O0.MZ7IJRePwLq3R.9J9F/q7cyRg3y', '11232', 'Magic Inc.', '123 Main St.', '22', 'admin', 'https://res.cloudinary.com/pmcorrea/image/upload/v1583012253/d6etblztcnrmqi4ezzsy.jpg', 'Some bio.');


INSERT INTO events (id, event_name, event_description, event_location_name, event_address, event_date, event_time, event_host_id, event_no_of_participants, event_cover_img)
VALUES 
  (1, 'Peters Pool Party', 'Some description.', 'Grand Central', '123 Main St', '12/09/2020', '5:00pm', 1, '22', 'https://res.cloudinary.com/pmcorrea/image/upload/v1587486065/leh7z0szsx69qiaqjla3.jpg'),
  (2, 'Alexs Pool Party', 'Some description.', 'Grand Central', '123 Main St', '12/09/2020', '5:00pm', 1, '22', 'https://res.cloudinary.com/pmcorrea/image/upload/v1588612024/sample.jpg'),
  (3, 'Nascar', 'Some description.', 'Grand Central', '123 Main St', '12/09/2020', '5:00pm', 1, '22', 'https://res.cloudinary.com/pmcorrea/image/upload/v1587486220/b8kvj5warrczvvwgtotf.jpg');

INSERT INTO participants (id, user_id, event_id, participant_status)
VALUES 
  (1, 1, 1, 'going'),
  (2, 1, 2, 'invited'),
  (3, 1, 3, 'invited'),
  (4, 2, 1, 'going'),
  (5, 2, 2, 'invited'),
  (6, 3, 3, 'invited'),
  (7, 4, 1, 'going'),
  (8, 4, 2, 'invited'),
  (9, 4, 3, 'going'),
  (10, 5, 1, 'invited'),
  (11, 5, 2, 'invited'),
  (12, 6, 3, 'going');



INSERT INTO followers (id, user_id, following_id)
VALUES 
  (1, 1, 2),
  (2, 1, 3),
  (3, 1, 4),
  (4, 1, 5),
  (5, 1, 6),
  (6, 2, 1),
  (7, 2, 3),
  (8, 3, 1);

INSERT INTO invites (id, event_id, user_id, sender_id)
VALUES 
  (1, 1, 1, 2),
  (2, 2, 1, 2);

INSERT INTO bookmarks (id, user_id, event_id)
VALUES 
  (1, 1, 1),
  (2, 1, 2),
  (3, 1, 3);

COMMIT;

 