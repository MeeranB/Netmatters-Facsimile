<?php 
include("app/include/bootstrap.php");

$currentPage = "contact";

include("app/include/header.php");


?>

<div class="container d-flex">
    <nav class="compact-nav">
        <ul>
            <li>Home</li>
            <li>Our Offices</li>
            <li></li>
        </ul>
    </nav>
</div>
<?php
ini_set('display_errors', 'on');

$dsn = "mysql:host=localhost;dbname=meeran";
$username = $_ENV['USERNAME'];;
$password = "";

try {
    $db = new PDO($dsn, $username, $password);
    echo "You have connected!";
} catch(PDOException $e) {
    $error_message = $e->getMessage();
    echo $error_message;
    exit();
}
?>

<?php
include("app/include/newsletter.php");
include("app/include/footer.php");
?>