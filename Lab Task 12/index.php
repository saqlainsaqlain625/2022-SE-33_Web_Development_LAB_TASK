<?php
include'conn.php';
$data = mysqli_query($conn, "SELECT * FROM students");

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STDUENTS INFO</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>STUDENTS INFORMATION</h1>
    <a href="form.php"><button>Add Students</button></a>
    <table>
        <thead>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Adress</th>
            <th>Action</th>
        </thead>
        <tbody>
            <!-- show -->
             <?php
             while($row=mysqli_fetch_assoc($data)){
                echo"<tr>";
                echo"<td>".$row['id']."</td>";
                echo"<td>".$row['fname']."</td>";
                echo"<td>".$row['lname']."</td>";
                echo"<td>".$row['dob']."</td>";
                echo"<td>".$row['adress']."</td>";
                echo"<td> <a href='form.php?id=".$row['id']."'>Edit</a> <a href='delete.php?id=".$row['id']."'>Delete</a>";





                echo"</tr>";


             }
             ?>
        </tbody>
    </table>
</body>
</html>