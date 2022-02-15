<?php

include("app/include/bootstrap.php");

ini_set('display_errors', 'on');

try {
    $dsn = "mysql:host=localhost:3306;dbname=meeranba_netmatters_contact";
    $username = $_ENV['USERNAME'];
    $password = $_ENV['PASSWORD'];
    $db = new PDO($dsn, $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $results = $db->query('SELECT * FROM news_posts ORDER BY date DESC LIMIT 3');
    $formattedResults = $results->fetchAll(PDO::FETCH_ASSOC);
    $JSONresults = json_encode($formattedResults);
    echo $JSONresults;
} catch (PDOException $e){
    $error_message = $e->getMessage();
    echo $error_message;
    exit();
}

