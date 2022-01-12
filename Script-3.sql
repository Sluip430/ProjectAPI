CREATE TYPE roles AS ENUM('admin',
'users');

CREATE TABLE users(
id SERIAL PRIMARY KEY NOT NULL,
password VARCHAR(140) NOT NULL,
login VARCHAR(20) NOT NULL UNIQUE,
first_name VARCHAR(20),
last_name VARCHAR(20),
user_role roles
);

CREATE TABLE movies(
id integer PRIMARY KEY,
adult bool,
backdrop_path VARCHAR(255),
budget integer,
homepage VARCHAR(255),
imdb_id VARCHAR(255),
original_language VARCHAR(255),
original_title VARCHAR(255),
overview text,
popularity float,
poster_path VARCHAR(255),
release_date VARCHAR(255),
status VARCHAR(255),
title VARCHAR(255) NOT NULL,
vote_average float,
vote_count integer,
runtime integer
);

create function checkRoles(user_id int)
returns int
as
$$
declare
	usr roles;
begin
	select role into usr from users where users.id = user_id;
	if usr = 'teacher' then
    	return (select 1);
	else 
    	return (select 0);
    end if;
end;
$$
language plpgsql;

CREATE TABLE genres(
    id integer PRIMARY KEY NOT NULL,
    name VARCHAR(100)
);

CREATE TABLE movies_genres(
movie_id INT NOT NULL,
genre_id INT NOT NULL,
FOREIGN KEY(movie_id) REFERENCES movies(id),
FOREIGN KEY(genre_id) REFERENCES genres(id)
);

CREATE TABLE languages(
id serial NOT NULL,
short_name text,
long_name text
);

SELECT * 
FROM movies 
WHERE release_date > '2003-05-30'
















