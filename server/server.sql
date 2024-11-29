create table x (
    id serial primary key,
    description varchar(255) not null,
);


CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  title VARCHAR(25) NOT NULL,
  description VARCHAR(255) NOT NULL
);

INSERT INTO groups (title, description) VALUES ('Estetic scrummers', 'A group of people who are interested in scrum and aesthetics');
INSERT INTO groups (title, description) VALUES ('Agile developers', 'A group of people who are interested in agile development');
INSERT INTO groups (title, description) VALUES ('Java developers', 'A group of people who are interested in Java development');

create table account(
idaccount serial primary key,
username varchar(45) not null,
email varchar(255) not null,
password varchar(255) not null
);

insert into account (username,email,password) values(
'admin','admin@mail.com','admin'
);
select * from account

DROP TABLE IF EXISTS groups;
