DROP TABLE IF EXISTS student;

CREATE TABLE student (
    std_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    major VARCHAR(100)
);

INSERT INTO student (std_id, name, major) VALUES (1, 'pratik', 'ce');
INSERT INTO student (std_id, name, major) VALUES (2, 'abhi', 'it');
INSERT INTO student (std_id, name, major) VALUES (3, 'smit', 'it');


SELECT * FROM student;