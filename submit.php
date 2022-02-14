<?php

include("app/include/bootstrap.php");

// ini_set('display_errors', 'on');

$name = $companyName = $email = $telNumber = $subject = $message = $marketing = "";

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

try {
    $dsn = "mysql:host=localhost;dbname=netmatters_contact";
    $username = $_ENV['USERNAME'];
    $password = "";
    $db = new PDO($dsn, $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    $error_message = $e->getMessage();
    echo $error_message;
    exit();
}


try {
    $_POST = json_decode(file_get_contents("php://input"),true);
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (empty($_POST['name'])) {
            throw new Exception("Name field cannot be empty");
        } else {
            $name = test_input($_POST['name']);
        }
        if (empty($_POST['email'])) {
            throw new Exception("Email field cannot be empty");
        } else if (preg_match("/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i", $_POST['email']) == 0) {
            throw new Exception("Email field must be valid");
        } else {
            $email = test_input($_POST['email']);
        }
        if (empty($_POST['telNumber'])) {
            throw new Exception("Phone field cannot be empty");
        } else {
            $telNumber = test_input(($_POST['telNumber']));
        }
        if (empty($_POST['subject'])) {
            throw new Exception("Subject field cannot be empty");
        } else {
            $subject = test_input($_POST['subject']);
        }
        if (empty($_POST['message'])) {
            throw new Exception("Message field cannot be empty");
        } else {
            $message = test_input($_POST['message']);
        }
        if (empty($_POST['marketing']) == false)  {
            $marketing = test_input($_POST['marketing']);
        }
        if (empty($_POST['companyName']) == false) {
            $companyName = test_input($_POST['companyName']);
        }

        $stmt = $db->prepare('INSERT INTO messages VALUES (id, :name, :companyName, :email, :phone, :subject, :message, :marketing);');
        $name = filter_var($name, FILTER_SANITIZE_STRING);
        if ($companyName != "") {
            $companyName = filter_var($companyName, FILTER_SANITIZE_STRING);
        } else {
            $companyName = null;
        }
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);
        $phone = filter_var($telNumber, FILTER_SANITIZE_SPECIAL_CHARS);
        $subject = filter_var($subject, FILTER_SANITIZE_SPECIAL_CHARS);
        $message = filter_var($message, FILTER_SANITIZE_SPECIAL_CHARS);
        if ($marketing != "") {
            $marketing = filter_var($marketing, FILTER_SANITIZE_STRING);
        } else {
            $marketing = null;
        }
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':companyName', $companyName, PDO::PARAM_STR); 
        $stmt->bindParam(':email', $email, PDO::PARAM_STR); 
        $stmt->bindParam(':phone', $phone, PDO::PARAM_STR); 
        $stmt->bindParam(':subject', $subject, PDO::PARAM_STR); 
        $stmt->bindParam(':message', $message, PDO::PARAM_STR); 
        $stmt->bindParam(':marketing', $marketing, PDO::PARAM_STR); 
        $stmt->execute();
    }

    echo 'success';
} catch(Exception $e) {
    $error_message = $e->getMessage();
    echo $error_message;
    exit();
}