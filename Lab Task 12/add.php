<?php
   include'conn.php';
   $sql="INSERT INTO students(fname,lname,dob,adress) VALUES ('".$_POST['fname']."','".$_POST['lname']."','".$_POST['dob']."','".$_POST ['adress']."')";
   mysqli_query($conn,$sql);
   header("Location: index.php");

?>
