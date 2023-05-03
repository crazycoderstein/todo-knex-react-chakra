drop table if exists tasks;
create table tasks (
    id integer primary key autoincrement not null, 
    name text not null, 
    completed boolean not null default false,
    sort integer not null default 0
);
insert into tasks(name, sort) values('Submit expense report', 0);
insert into tasks(name, sort) values('Clean up disk space on Airflow server', 1);
insert into tasks(name, sort) values('Update API documentation', 2);
insert into tasks(name, sort) values('Review pull requests', 3);