CREATE TABLE Reviews (
 id BIGSERIAL,
 product_id INTEGER,
 review_id INTEGER,
 rating INTEGER,
 summary VARCHAR(1000),
 recommend BOOLEAN,
 response VARCHAR(1000),
 body VARCHAR(1000),
 date DATE,
 reviewer_name VARCHAR(50),
 helpfulness INTEGER
 UNIQUE (product_id, review_id)
);


ALTER TABLE Reviews ADD CONSTRAINT Reviews_pkey PRIMARY KEY (id);

CREATE TABLE Reviews Meta Data (
 product_id INTEGER,
 ratings_id INTEGER,
 recommended_id INTEGER,
 characteristics_id INTEGER
 UNIQUE (product_id, ratings_id, recommended_id, characteristics_id)
);


ALTER TABLE Reviews Meta Data ADD CONSTRAINT Reviews Meta Data_pkey PRIMARY KEY (product_id);

CREATE TABLE photos (
 review_id INTEGER,
 photo_id INTEGER,
 url VARCHAR(100)
 UNIQUE(review_id, photo_id)
);


ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (review_id);

CREATE TABLE ratings (
 id BIGSERIAL,
 1 INTEGER,
 2 INTEGER,
 3 INTEGER,
 4 INTEGER,
 5 INTEGER
);


ALTER TABLE ratings ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);

CREATE TABLE Recommended (
 id BIGSERIAL,
 true INTEGER,
 false INTEGER
);


ALTER TABLE Recommended ADD CONSTRAINT Recommended_pkey PRIMARY KEY (id);

CREATE TABLE characteristics  (
 id BIGSERIAL,
 fit_id INTEGER,
 length_id INTEGER,
 comfort_id INTEGER,
 quality_id INTEGER
);


ALTER TABLE characteristics  ADD CONSTRAINT characteristics_pkey PRIMARY KEY (id);

CREATE TABLE fit (
 fit_id BIGSERIAL,
 value INTEGER
);


ALTER TABLE fit ADD CONSTRAINT fit_pkey PRIMARY KEY (fit_id);

CREATE TABLE length (
 length_id BIGSERIAL,
 value INTEGER
);


ALTER TABLE length ADD CONSTRAINT length_pkey PRIMARY KEY (length_id);

CREATE TABLE comfort (
 comfort_id BIGSERIAL,
 value INTEGER
);


ALTER TABLE comfort ADD CONSTRAINT comfort_pkey PRIMARY KEY (comfort_id);

CREATE TABLE quality (
 quality_id BIGSERIAL,
 value INTEGER
);


ALTER TABLE quality ADD CONSTRAINT quality_pkey PRIMARY KEY (quality_id);

ALTER TABLE Reviews ADD CONSTRAINT Reviews_review_id_fkey FOREIGN KEY (review_id) REFERENCES photos(review_id);
ALTER TABLE Reviews Meta Data ADD CONSTRAINT Reviews Meta Data_ratings_id_fkey FOREIGN KEY (ratings_id) REFERENCES ratings(id);
ALTER TABLE Reviews Meta Data ADD CONSTRAINT Reviews Meta Data_recommended_id_fkey FOREIGN KEY (recommended_id) REFERENCES Recommended(id);
ALTER TABLE Reviews Meta Data ADD CONSTRAINT Reviews Meta Data_characteristics_id_fkey FOREIGN KEY (characteristics_id) REFERENCES characteristics (id);
ALTER TABLE characteristics  ADD CONSTRAINT characteristics fit_id_fkey FOREIGN KEY (fit_fit_id) REFERENCES fit(fit_id);
ALTER TABLE characteristics  ADD CONSTRAINT characteristics length_id_fkey FOREIGN KEY (length_id) REFERENCES length(length_id);
ALTER TABLE characteristics  ADD CONSTRAINT characteristics comfort_id_fkey FOREIGN KEY (comfort_id) REFERENCES comfort(comfort_id);
ALTER TABLE characteristics  ADD CONSTRAINT characteristics quality_id_fkey FOREIGN KEY (quality_id) REFERENCES quality(quality_id);