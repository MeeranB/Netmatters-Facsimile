<?php

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
                    <img src="dist/images/cambridge.jpeg" alt="cambridge office">
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
                    <img src="dist/images/wymondham.jpeg" alt="cambridge office">
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
                    <img src="dist/images/yarmouth.jpeg" alt="yarmouth office">
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
<div class="contact-section-container container d-flex">
    <div class="contact-prompt">
        <span>Email us on:</span>
        <p><a href="mailto:sales@netmatters.com">sales@netmatters.com</a></p>
        <span>Business hours:</span>
        <span>Monday - Friday 07:00 - 18:00</span>
        <a class="summary" id="summary" role="button">Out of Hours IT Support <i class="fas fa-chevron-down"></i></a>
        <div id="details" class="details">
            <p>Netmatters IT are offering an Out of Hours service for Emergency and Critical tasks.</p>
            <span>
                Monday - Friday 18:00 - 22:00<br>
                Saturday 08:00 - 16:00<br>
                Sunday 10:00 - 18:00
            </span>
            <p>To log a critical task, you will need to call our main line number and select Option 2 to leave an Out of Hours voicemail. A technician will contact you on the number provided within 45 minutes of your call.</p>
        </div>
    </div>
    <div class="contact-form-container">
        <div id="form-feedback" class="form-feedback d-none">
            <span id="alert-text" class="alert-text"></span>
            <button>x</button>
        </div>
        <form action="" method="POST" id="contact-form">
            <div class="form-row">
                <div class="form-group col-12 col-lg-6">
                    <label class="name" for="name">Your Name</label>
                    <input type="text" class="form-control" id="name" name="name" required>
                </div>
                <div class="form-group col-12 col-lg-6">
                    <label class="companyname" for="companyName">Company Name</label>
                    <input type="text" class="form-control" id="companyName" name="companyName">
                </div>
                <div class="form-group col-12 col-lg-6">
                    <label class="email" for="email">Your Email</label>
                    <input type="email" class="form-control" id="email" name="email" required>
                </div>
                <div class="form-group col-12 col-lg-6">
                    <label class="name" for="telNumber">Your Telephone Number</label>
                    <input type="tel" class="form-control" id="telNumber" name="telNumber" required>
                </div>
                <div class="form-group col-12">
                    <label class="name" for="subject">Subject</label>
                    <input type="text" class="form-control" id="subject" name="subject" required>
                </div>
                <div class="form-group col-12">
                    <label class="name" for="message">Message</label>
                    <textarea rows="3" type="text" class="form-control" id="message" name="message" required></textarea>
                </div>
                <div class="clickarea">
                    <input type="checkbox" id="marketing" name="marketing" hidden>
                    <label class="marketing-check" for="marketing">
                        <span class="checker"></span>
                        <span>Please tick this box if you wish to receive marketing information from us. Please see our <a href="#">Privacy Policy</a> for more information on how we use your data.</span>
                    </label>
                </div>
                <input type="submit" value="Send Enquiry" class="btn btn-culture">
            </div>
        </form>
    </div>
</div>

<?php
$currentPage = "contact";
include("app/include/newsletter.php");
include("app/include/footer.php");
?>