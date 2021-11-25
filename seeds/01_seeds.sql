INSERT INTO users (name, email, password)
VALUES ('Eli Muffins', 'elimuffins@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Tonya Muffins', 'tonyamuffins@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Shorty Borty', 'shortybore@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Force Mation', 'suffocateme@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Lok Loba', 'lonleylok@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Leonard Dinner', 'leodin@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sword Art', 'swart@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Emma Smart', 'notdumb@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Flock Williams', 'birdpowers@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ginger Bread', 'house@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Snow mobile', 'vroomvroom@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('William Lane', 'superlame@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('George Henry', 'twofirstnames@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Michael Phelps', 'alwaysswimming@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Lake House', 'description', 'url', 'url', 300, 10, 5, 5, 'Canada', 'Street', 'City', 'BC', 'Post Code', TRUE),
(2, 'Penthouse', 'description', 'url', 'url', 500, 2, 3, 4, 'Canada', 'Street', 'City', 'BC', 'Post Code', TRUE),
(3, 'Apartment', 'description', 'url', 'url', 200, 1, 2, 2, 'Canada', 'Street', 'City', 'BC', 'Post Code', TRUE),
(2, 'Small House', 'description', 'url', 'url', 150, 2, 3, 3, 'Canada', 'Street', 'City', 'BC', 'Post Code', FALSE),
(4, 'Big House', 'description', 'url', 'url', 300, 5, 6, 6, 'Canada', 'Street', 'City', 'BC', 'Post Code', TRUE),
(2, 'Basement', 'description', 'url', 'url', 110, 1, 2, 2, 'Canada', 'Street', 'City', 'BC', 'Post Code', TRUE),
(8, 'Hill House', 'description', 'url', 'url', 250, 5, 2, 4, 'Canada', 'Street', 'City', 'BC', 'Post Code', TRUE),
(9, 'Bungalow', 'description', 'url', 'url', 120, 2, 0, 1, 'Canada', 'Street', 'City', 'BC', 'Post Code', TRUE),
(14, 'Pool', 'description', 'url', 'url', 600, 100, 10, 0, 'Canada', 'Street', 'City', 'BC', 'Post Code', TRUE);


INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(11, 3, '2021-10-01', '2021-10-14'),
(5, 3, '2020-10-29', '2020-11-14'),
(9, 7, '2021-9-01', '2021-10-22'),
(1, 2, '2021-10-02', '2021-10-06'),
(4, 9, '2018-09-11', '2019-02-01'),
(10, 3, '2015-09-13', '2015-09-30'),
(8, 2, '2016-07-17', '2016-08-01'),
(10, 6, '2022-10-04', '2022-10-23');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 5, 'messages'),
(2, 2, 2, 4, 'messages'),
(11, 3, 3, 5, 'messages'),
(5, 3, 4, 5, 'messages'),
(9, 7, 5, 3, 'messages'),
(1, 2, 6, 4, 'messages'),
(10, 6, 10, 5, 'messages'),
(10, 3, 8, 4, 'messages'),
(4, 9, 7, 5, 'messages');