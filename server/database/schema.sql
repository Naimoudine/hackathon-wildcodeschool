create table user (
  id int unsigned primary key auto_increment not null,
  firstname varchar(100) not null,
  lastname varchar(100) not null,
  handicap varchar(100),
  email varchar(255) not null unique,
  is_admin boolean
);

create table event (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  description varchar(255) not null,
  calendar timestamp,
  user_id int unsigned not null,
  foreign key(user_id) references user(id),
  is_validated boolean
);


create table item (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  user_id int unsigned not null,
  foreign key(user_id) references user(id)
);
