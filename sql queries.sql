SELECT * FROM `job`.`client_data` where client_email_id ='c@gmail.com';

Select * FROM `job`.`candidate_data`;
Select * from job_data;
SELECT * FROM `job`.`client_data` order by SNO;
-- --=====================================   PASSWORD  KEYCHAIN    ============================================================== 

INSERT INTO password (name,email,password,role) VALUES ('Adarsh','bpadarsh8@gmail.com','0','U');
INSERT INTO password (name,email,password,role) VALUES ('admin','admin@gmail.com','1','A');
INSERT INTO password (name,email,password,role) VALUES ('a','a@gmail.com','0','U');
INSERT INTO password (name,email,password,role) VALUES ('b','b@gmail.com','0','U');
INSERT INTO password (name,email,password,role) VALUES ('c','c@gmail.com','0','U');
INSERT INTO password (name,email,password,role) VALUES ('d','d@gmail.com','0','U');
INSERT INTO password (name,email,password,role) VALUES ('e','e@gmail.com','0','U');
	
INSERT INTO password (name,email,password,role) VALUES ('c1','c1@gmail.com','0','C');
INSERT INTO password (name,email,password,role) VALUES ('c2','c2@gmail.com','0','C');
INSERT INTO password (name,email,password,role) VALUES ('c3','c3@gmail.com','0','C');

-- --======================================================================================================================

INSERT INTO candidate_data
(name,job_title,email_id,mobile,current_location,qualification,Experience,ctc,ectc,notice_period,date_of_sharing,notes)
VALUES
("Kulwinder Singh Dhingra","City Head","a@gmail.com","9987044277","Kolkata","PGDM from IMT, Nagpur","6 years","16.5L(15L fixed)","Open to discuss","60 days(nego to 30 days)","2020-03-02","");

 
SELECT * FROM password where email='a@gmail.com';



INSERT INTO candidate_data
(name,job_title,email_id,mobile,current_location,qualification,Experience,ctc,ectc,notice_period,date_of_sharing,notes)
VALUES
("Kulwinder Singh Dhingra","City Head","a@gmail.com","9987044277","Kolkata","PGDM from IMT, Nagpur","6 years","16.5L(15L fixed)","Open to discuss","60 days(nego to 30 days)","2020-03-02","");

-- user routes --
--  / Candidate data  
SELECT * FROM candidate_data;
Select * FROM  candidate_data where email_id='a@gmail.com';

-- to insert data 
INSERT INTO candidate_data
(name,job_title,email_id,mobile,current_location,qualification,Experience,ctc,ectc,notice_period,date_of_sharing,notes)
VALUES
("Kulwinder Singh Dhingra","City Head","a@gmail.com","9987044277","Kolkata","PGDM from IMT, Nagpur","6 years","16.5L(15L fixed)","Open to discuss","60 days(nego to 30 days)","2020-03-02","");

-- job data queries 
select * from job_data;
INSERT INTO `job`.`job_data`
(client_id,client_name,job_title,job_id_key,job_desc,date_of_posting,no_of_position,no_of_cadidates_offered,live_status)
VALUES("101","ANRO ENERGY","MANAGER SALES","NNN","desc","2020-02-28","3","0","yes");


-- joniee data 
INSERT INTO joinee_data
(client_name,name,job_titile,offered_ctc,joining_date,experience,email_id,phone_number,invoice_ref,invoice_date,invoice_value,invoice_realisation,receipt_date)
VALUES("Anro Energy","Nishanth S R","Energy Analyst","2.64LPA","2020-02-02","2.6 years",
"nishanthreddy994@gmail.com",'123456789'," ","2000-02-02 "," "," ","2020-02-02");
 
 

DELETE FROM candidate_data where 'SNO' = '2';

DELETE FROM `job`.`candidate_data`
WHERE <{where_expression}>;




  

