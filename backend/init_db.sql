-- Create the database
CREATE DATABASE IF NOT EXISTS campus_ai;
USE campus_ai;

-- Clear any existing tables for a clean slate
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS courses;
SET FOREIGN_KEY_CHECKS = 1;

-- Correctly formatted students table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student',
    marks FLOAT DEFAULT 0.0,
    attendance FLOAT DEFAULT 0.0,
    INDEX email_idx (email)
);

-- Correctly formatted admins table
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    INDEX admin_email_idx (email)
);

-- Correctly formatted courses table
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    faculty VARCHAR(255),
    batch VARCHAR(255),
    students INT DEFAULT 0,
    schedule VARCHAR(255),
    assignments INT DEFAULT 0,
    tests INT DEFAULT 0,
    dept VARCHAR(255),
    credits INT DEFAULT 3,
    INDEX code_idx (code)
);

-- Seed some default courses
INSERT INTO courses (code, name, faculty, batch, students, schedule, assignments, tests, credits, dept) 
VALUES 
('CS301', 'Advanced Data Structures', 'Dr. Rajesh Kumar', 'CSE - 3rd Year', 64, 'Mon, Wed (9:00 AM)', 4, 1, 4, 'CSE'),
('CS402', 'Modern Web Development', 'Mrs. Soundarya M.', 'CSE - 4th Year', 56, 'Tue, Thu (11:00 AM)', 2, 2, 4, 'CSE'),
('MA201', 'Engineering Maths III', 'Dr. S. Sharma', 'All - 2nd Year', 120, 'Fri (2:00 PM)', 3, 1, 3, 'MATHS');

select * from students;

select * from admins;

select * from courses;