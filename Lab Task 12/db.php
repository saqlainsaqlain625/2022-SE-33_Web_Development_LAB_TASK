<?php
include 'conn.php';


// mysqli_query($conn,"CREATE DATABASE students");
mysqli_select_db($conn,'students'); 
mysqli_query($conn,"CREATE TABLE students (
id  INT(4)NOT NULL AUTO_INCREMENT PRIMARY KEY,
fname VARCHAR(100) NOT NULL,
lname VARCHAR(200) NOT NULL,
dob   DATE NOT NULL,
adress VARCHAR(200) NOT NULL 



)");







?>