DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;
\c reviews;
DROP TABLE IF EXISTS reviews, photos, characteristics, characteristics_reviews;

CREATE TABLE reviews (
 id SERIAL,
 product_id INTEGER,
 rating INTEGER,
 date BIGINT,
 summary VARCHAR(1000),
 body VARCHAR(1000),
 recommend BOOLEAN,
 reported BOOLEAN,
 reviewer_name VARCHAR,
 reviewer_email VARCHAR(200),
 response VARCHAR,
 helpfulness INTEGER
);


ALTER TABLE reviews ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);

CREATE TABLE photos (
 id INTEGER,
 review_id INTEGER,
 url VARCHAR
);

ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);
ALTER TABLE photos ADD CONSTRAINT reviews_id_fkey FOREIGN KEY (review_id) REFERENCES reviews(id);

CREATE TABLE characteristics (
  id SERIAL,
  product_id INTEGER,
  name VARCHAR(50)
);

CREATE TABLE characteristics_reviews (
  id SERIAL,
  characteristic_id INTEGER,
  review_id INTEGER,
  value INTEGER
);

ALTER TABLE characteristics_reviews ADD CONSTRAINT characteristics_reviews_pkey PRIMARY KEY (id);
ALTER TABLE characteristics ADD CONSTRAINT characteristics_pkey PRIMARY KEY (id);

ALTER TABLE characteristics_reviews ADD CONSTRAINT characteristics_reviews_fkey FOREIGN KEY (characteristic_id) REFERENCES characteristics(id);
ALTER TABLE characteristics_reviews ADD CONSTRAINT characteristics_reviews_fkeyTwo FOREIGN KEY (review_id) REFERENCES reviews(id);

-- ALTER TABLE characteristics ADD CONSTRAINT characteristics_fkey FOREIGN KEY (product_id) REFERENCES
-- reviews(product_id);

-- CREATE TABLE metadata (
--  product_id INTEGER,
--  ratings_id INTEGER,
--  recommended_id INTEGER,
--  characteristics_id INTEGER
-- );


-- ALTER TABLE metadata ADD CONSTRAINT metadata_pkey PRIMARY KEY (product_id);

-- CREATE TABLE characteristics (
--   id SERIAL,
--   characteristic_id INTEGER,
--   review_id INTEGER,
--   value INTEGER
-- )

-- CREATE TABLE ratings (
--  id BIGSERIAL,
--  "1" INTEGER,
--  "2" INTEGER,
--  "3" INTEGER,
--  "4" INTEGER,
--  "5" INTEGER
-- );


-- ALTER TABLE ratings ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);

-- CREATE TABLE recommended (
--  id BIGSERIAL,
--  "true" INTEGER,
--  "false" INTEGER
-- );


-- ALTER TABLE recommended ADD CONSTRAINT recommended_pkey PRIMARY KEY (id);

-- CREATE TABLE characteristics (
--  id BIGSERIAL,
--  fit_id INTEGER,
--  length_id INTEGER,
--  comfort_id INTEGER,
--  quality_id INTEGER
-- );


-- ALTER TABLE characteristics ADD CONSTRAINT characteristics_pkey PRIMARY KEY (id);

-- CREATE TABLE fit (
--  fit_id BIGSERIAL,
--  value INTEGER
-- );


-- ALTER TABLE fit ADD CONSTRAINT fit_pkey PRIMARY KEY (fit_id);

-- CREATE TABLE length (
--  length_id BIGSERIAL,
--  value INTEGER
-- );


-- ALTER TABLE length ADD CONSTRAINT length_pkey PRIMARY KEY (length_id);

-- CREATE TABLE comfort (
--  comfort_id BIGSERIAL,
--  value INTEGER
-- );


-- ALTER TABLE comfort ADD CONSTRAINT comfort_pkey PRIMARY KEY (comfort_id);

-- CREATE TABLE quality (
--  quality_id BIGSERIAL,
--  value INTEGER
-- );


-- ALTER TABLE quality ADD CONSTRAINT quality_pkey PRIMARY KEY (quality_id);


-- ALTER TABLE metadata ADD CONSTRAINT metadata_ratings_id_fkey FOREIGN KEY (ratings_id) REFERENCES ratings(id);
-- ALTER TABLE metadata ADD CONSTRAINT metadata_recommended_id_fkey FOREIGN KEY (recommended_id) REFERENCES recommended(id);
-- ALTER TABLE metadata ADD CONSTRAINT metadata_characteristics_id_fkey FOREIGN KEY (characteristics_id) REFERENCES characteristics(id);
-- ALTER TABLE characteristics ADD CONSTRAINT characteristics_fit_id_fkey FOREIGN KEY (fit_id) REFERENCES fit(fit_id);
-- ALTER TABLE characteristics ADD CONSTRAINT characteristics_length_id_fkey FOREIGN KEY (length_id) REFERENCES length(length_id);
-- ALTER TABLE characteristics ADD CONSTRAINT characteristics_comfort_id_fkey FOREIGN KEY (comfort_id) REFERENCES comfort(comfort_id);
-- ALTER TABLE characteristics ADD CONSTRAINT characteristics_quality_id_fkey FOREIGN KEY (quality_id) REFERENCES quality(quality_id);