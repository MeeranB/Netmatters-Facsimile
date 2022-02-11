<?php 
include("app/include/bootstrap.php");

$currentPage = "contact";

include("app/include/header.php");


?>

<div class="drop-shadow-nav d-none d-md-block">
    <div class="container d-flex">
        <nav class="compact-nav">
            <ul>
                <li><a href="index.php">Home</a></li>
                <li>Our Offices</li>
            </ul>
        </nav>
    </div>
</div>
<div class="block-heading d-block d-lg-none">
    <div class="container">
        <h1>Our Offices</h1>
    </div>
</div>
<div class="office-section-container">
    <div class="standard-heading d-none d-lg-block">
        <div class="container">
            <h1>Our Offices</h1>
        </div>
    </div>
    <div class="container offices-container">
        <div class="office">
            <div class="preview">
                <a href="#">
                    <img src="app/images/cambridge.jpeg" alt="cambridge office">
                </a>
            </div>
            <div class="address">
                <h3>Cambridge office</h3><br>
                <address>
                    Unit 1.28, <br>
                    St John's Innovation Centre, <br>
                    Cowley Road, Milton, <br>
                    Cambridge,<br>
                    CB4 0WS
                </address>
                <p><a href="tel:01223375772">01223 37 57 72</a></p>
                <a href="#" id="office-btn" class="btn btn-slider btn-slider-web"><span>View more &nbsp;</span></a>
            </div>
            <div class="map" id="cambridgeMap"></div>
        </div>
        <div class="office">
        <div class="preview">
                <a href="#">
                    <img src="app/images/wymondham.jpeg" alt="cambridge office">
                </a>
            </div>
            <div class="address">
                <h3>Wymondham office</h3><br>
                <address>
                    Unit 15, <br>
                    Penfold Drive, <br>
                    Gateway 11 Business Park, <br>
                    Wymondham, Norfolk,<br>
                    NR18 0WZ
                </address>
                <p><a href="tel:01603704020">01603 70 40 20</a></p>
                <a href="#" id="office-btn" class="btn btn-slider btn-slider-web"><span>View more &nbsp;</span></a>
            </div>
            <div class="map" id="wymondhamMap"></div>
        </div>
        <div class="office">
        <div class="preview">
                <a href="#">
                    <img src="app/images/yarmouth.jpeg" alt="yarmouth office">
                </a>
            </div>
            <div class="address">
                <h3>Great Yarmouth Office</h3><br>
                <address>
                    Suite F23, <br>
                    Beacon Innovation Centre, <br>
                    Beacon Park, Gorleston <br>
                    Great Yarmouth, Norfolk<br>
                    NR31 7RA
                </address>
                <p><a href="tel:01493603204">01493 60 32 04</a></p>
                <a href="#" id="office-btn" class="btn btn-slider btn-slider-web"><span>View more &nbsp;</span></a>
            </div>
            <div class="map" id="yarmouthMap"></div>
        </div>
    </div>
</div>
<?php
// ini_set('display_errors', 'on');

// $dsn = "mysql:host=localhost;dbname=meeran";
// $username = $_ENV['USERNAME'];;
// $password = "";

// try {
//     $db = new PDO($dsn, $username, $password);
//     echo "You have connected!";
// } catch(PDOException $e) {
//     $error_message = $e->getMessage();
//     echo $error_message;
//     exit();
// }
// ?>

<?php
include("app/include/newsletter.php");
include("app/include/footer.php");
?>