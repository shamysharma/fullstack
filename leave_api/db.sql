SET ROLE 'postgres';

-- CREATE table if not exists leaves (
--     id serial primary key, 
--     name varchar(200) NOT NULL, 
--     leave_type text NOT NULL,
--     from_date date NOT NULL,
--     to_date date NOT NULL,
--     team_name varchar(200) NOT NULL,
--     sick_leaves_file VARCHAR(200),
--     reporter text NOT NULL
-- );



create table if not exists leaves (
id serial primary key,
	name varchar(200),
	leave_type text,
	from_date date, 
	to_date date, 
	team_name text, 
	sick_leaves_file varchar(200), 
	reporter text, 
	status text default 'pending'
);

create table if not exists notifications (
    id int, 
	reporter text,
	status text default 'pending'
);


-- create or replace function update_notify()
-- 	returns TRIGGER AS $$
-- begin 
-- 		if TG_OP = 'insert' then 
-- 			insert into notifications (id, reporter)
-- 			values (new.id, new.reporter);
-- 		end if;
-- 		return new;
-- 	end;
-- $$ language plpgsql;


-- create trigger notify_trigger 
-- after insert or update on public.leaves
-- for each row 
-- execute function update_notify();

CREATE OR REPLACE FUNCTION update_notifications()
  RETURNS TRIGGER AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		INSERT INTO notifications (id, reporter)
		VALUES (NEW.id, NEW.reporter);
	ELSIF TG_OP = 'UPDATE' THEN
		UPDATE notifications
		SET reporter = NEW.reporter
		WHERE id = OLD.id;
	END IF;
  	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER formdata_notifications_trigger
AFTER INSERT OR UPDATE ON public.leaves
FOR EACH ROW
EXECUTE FUNCTION update_notifications();

create view last4of2022 as
select count(name) as count from leaves 
where from_date > '2022-07-31' and to_date < '2022-12-01' ;




create view permanager as 
select distinct reporter, count(distinct name) as count from leaves
where from_date > '2022-07-31' and to_date < '2022-12-01' group by reporter;


create view maxmonth2023 as 
select to_char(to_date(extract(month from from_date)::text, 'MM'),'Month') as month, 
sum(to_date - from_date + 1) as count from leaves
where from_date > '2022-12-31' and to_date < '2023-12-31' and leave_type = '''CasualLeave'''
group by month order by count DESC limit 1; 


create view ranking2023 as
select team_name, count(to_date - from_date + 1) as count from leaves 
where from_date > '2022-12-31' and to_date < '2023-12-31'
group by team_name order by count DESC;


create view month2023 as 
select to_char(to_date(extract(month from from_date)::text, 'MM'), 'Month') as month,
sum(to_date - from_date + 1) as count from leaves 
where from_date > '2022-12-31' and to_date < '2023-12-31' and leave_type = '''Sick Leave'''
group by month order by count DESC limit 1; 


create view top3emp as 
select name, sum(to_date - from_date + 1) as count from leaves 
where from_date  > '2021-12-31' and to_date < '2023-12-31' 
group by name order by count DESC limit 3;


