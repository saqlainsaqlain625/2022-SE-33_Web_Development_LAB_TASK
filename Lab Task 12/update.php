<?php
  include 'conn.php';

  $id=$_GET['id'];
  mysqli_query($conn,"UPDATE students SET fname='".$_POST['fname']."', lname='".$_POST['lname']."',dob='".$_POST['dob']."',adress='".$_POST['adress']."'WHERE id=$id");
  header("Location:index.php");

?>