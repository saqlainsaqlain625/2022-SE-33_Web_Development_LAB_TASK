<?php
include 'conn.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $dob   = $_POST['dob'];
    $adress = $_POST['adress'];

    // Insert query
    $sql = "INSERT INTO students(fname, lname, dob, adress) 
            VALUES ('$fname', '$lname', '$dob', '$adress')";
    
    if (mysqli_query($conn, $sql)) {
        header("Location: index.php");
        exit();
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Students Form</title>
    <link rel="stylesheet" href="formCss.css">
</head>
<body>
    <form method="post">
        <label for="fname">First Name</label>
        <input type="text" name="fname" required>

        <label for="lname">Last Name</label>
        <input type="text" name="lname" required>

        <label for="dob">Date of Birth</label>
        <input type="date" name="dob" required>

        <label for="adress">Address</label>
        <input type="text" name="adress" required>

        <button type="submit">Submit</button>
    </form>
</body>
</html>
