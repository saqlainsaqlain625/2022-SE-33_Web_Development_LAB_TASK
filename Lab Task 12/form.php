<?php
 include'conn.php';


 if(isset($_GET['id'])){
    $id=$_GET['id'];
   $result= mysqli_query($conn,"SELECT * FROM students WHERE id=$id");
   $row=mysqli_fetch_assoc($result);

 
 }


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>students Form</title>
    <link rel="stylesheet" href="formCss.css">
</head>
<body>
    <form action="<?php if(isset($_GET['id'])){echo" update.php?id=".$_GET['id'];}else{echo"add.php";} ?>" method="post">
        <label for="fname">First Name</label>
        <input type="text" name="fname" value="<?php if(isset($_GET['id'])){ echo $row['fname']; }?>">
        <label for="lname">Last Name</label>
        <input type="text"name="lname"value="<?php if(isset($_GET['id'])){ echo $row['lname'];} ?>">
        <label for="dob">Date of First</label>
        <input type="date" name="dob"value="<?php if(isset($_GET['id'])){ echo $row['dob'];} ?>">
        <label for="adress">Address</label>
        <input type="text" name="adress"value="<?php if(isset($_GET['id'])){ echo $row['adress'];} ?>">
        <button type="submit"><?php if(isset($_GET['id'])){ echo "Update";}else{echo "Submit";} ?></button>


    </form>
</body>
</html>