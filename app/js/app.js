//Force scroll to top on refresh
$(window).on("beforeunload", function () {
    $(window).scrollTop(0);
});

$.scrollDirection.init();

const checkWidth = () => $(window).width();

const useSidebar = sidebarType => {
    const bodyStyleMap = {
        desktop: "shift-left",
        mobile: "shift-left-mobile",
    };
    $(".hamburger").off("click");
    $(".hamburger").on("click", () => {
        $(".hamburger").toggleClass("is-active");
        $("body").addClass(bodyStyleMap[sidebarType]);
        $(".lightbox").show();
        $(".hidden-nav-container").css("right", "0");
    });
};

const addDesktopLightboxSidebarListener = () => {
    $(".lightbox").on("click", () => {
        $(".hamburger").removeClass("is-active");
        $("body").removeClass("shift-left shift-left-mobile");
        $(".hidden-nav-container").css("right", "-350px");
        $(".lightbox").hide();
    });
};

const addMobileLightboxSidebarListener = () => {
    $(".lightbox").on("click", () => {
        $(".hamburger").removeClass("is-active");
        $("body").removeClass("shift-left shift-left-mobile");
        $(".hidden-nav-container").css("right", "-275px");
        $(".lightbox").hide();
    });
};

$(() => {
    const cookieConsent = localStorage.getItem("cookie-consent");
    const windowWidth = checkWidth();
    if (!cookieConsent) {
        $(".lightbox").show().css("display", "flex");
        $(".cookie-modal").show();
        $("body").css("overflow", "hidden");
    } else if (cookieConsent) {
        $(".lightbox").hide();
        if (windowWidth < 992) {
            useSidebar("mobile");
            $(".lightbox").off("click");
            addMobileLightboxSidebarListener();
        } else if (windowWidth >= 992) {
            useSidebar("desktop");
            $(".lightbox").off("click");
            addDesktopLightboxSidebarListener();
        }
    }

    $(".slider").slick({
        autoplay: true,
        arrows: false,
        dots: true,
        appendDots: $(".slider"),
    });
});

$(".slider").on("init", function (event, slick) {
    $(".slick-track").css("height", "100%");
    $(".slick-list").css("height", "100%");
    $(".slick-dots").addClass("adjustdots");
});

$(".cookie-consent").on("click", () => {
    const windowWidth = checkWidth();

    $(".lightbox").hide();
    $(".cookie-modal").hide();
    $("body").css("overflow", "auto");
    localStorage.setItem("cookie-consent", true);

    if (windowWidth >= 992) {
        addDesktopLightboxSidebarListener();
    } else if (windowWidth < 992) {
        addMobileLightboxSidebarListener();
    }
});

$(window).on("resize", () => {
    const windowWidth = checkWidth();
    if (windowWidth < 992) {
        if ($("body").hasClass("shift-left")) {
            $("body").removeClass("shift-left");
            $("body").addClass("shift-left-mobile");
        }
        $(".lightbox").off("click");
        if ($(".hidden-nav-container").css("right") != "0px") {
            $(".hidden-nav-container").css("right", "-275px");
        }
        addMobileLightboxSidebarListener();
        useSidebar("mobile");
    } else if (windowWidth >= 992) {
        if ($("body").hasClass("shift-left-mobile")) {
            $("body").removeClass("shift-left-mobile");
            $("body").addClass("shift-left");
        }
        $(".lightbox").off("click");
        if ($(".hidden-nav-container").css("right") != "0px") {
            $(".hidden-nav-container").css("right", "-350px");
        }
        addDesktopLightboxSidebarListener();
        useSidebar("desktop");
    }
});

const header = $(".main-header");
const scrollingHeader = header
    .clone({ withDataAndEvents: true })
    .addClass("scrolling-header");
const hoverMenu = $("#hover-nav-container")[0];

const options = { threshold: 0 };

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            scrollHeaderHander();
            useSidebar("desktop");
        } else if (entry.isIntersecting) {
            $(window).off("scrollDirection");
            scrollingHeader.remove();
        }
    });
}, options);

$.scrollDirection.init({
    // options
});

const scrollHeaderHander = () => {
    let currentScrollDirection;
    $(window).on("scrollDirection", function () {
        if ($.scrollDirection.isScrollDown) {
            scrollingHeader.addClass("scrolling-header-removed");
            setTimeout(() => {
                scrollingHeader.remove();
                currentScrollDirection = "down";
            }, 800);
        } else if ($.scrollDirection.isScrollUp) {
            if (currentScrollDirection == "down") {
                setTimeout(() => {
                    scrollingHeader.removeClass("scrolling-header-removed");
                    scrollingHeader.addClass("scrolling-header-added");
                    const windowWidth = checkWidth();
                    $("body").prepend(scrollingHeader);
                    if (windowWidth < 992) {
                        useSidebar("mobile");
                    } else if (windowWidth >= 992) {
                        useSidebar("desktop");
                    }
                }, 250);
                currentScrollDirection = "up";
            }
        }
    });
};

observer.observe(hoverMenu);

const cambridgeLoc = [52.23535372699674, 0.15384150556855017];

const cambridgeMap = L.map("cambridgeMap", {
    center: cambridgeLoc,
    preferCanvas: true,
    zoom: 17,
    zoomControl: false,
    scrollWheelZoom: false,
});

L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVlcmFuYiIsImEiOiJja3pneW02cWsybGR0MnVvMTZ5ODloaWd2In0.lPFEc0YGCJnkWofXiqoniw",
    {
        attribution:
            "Keyboard shortcuts &nbsp;&nbsp;&nbsp; Map data &copy;2022 &nbsp;&nbsp;&nbsp; Terms of use",
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "your.mapbox.access.token",
    }
).addTo(cambridgeMap);

const cambridgeMarker = L.marker(cambridgeLoc).addTo(cambridgeMap);
const cambridgePopup = cambridgeMarker.bindPopup(`Unit 1.28, <br>
St John's Innovation Centre, <br>
Cowley Road, Milton, <br>
Cambridge,<br>
CB4 0WS`);

new L.Control.Zoom({ position: "bottomright" }).addTo(cambridgeMap);

const wymondhamLoc = [52.57604207982481, 1.136548940521879];

const wymondhamMap = L.map("wymondhamMap", {
    center: wymondhamLoc,
    preferCanvas: true,
    zoom: 17,
    zoomControl: false,
    scrollWheelZoom: false,
});

L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVlcmFuYiIsImEiOiJja3pneW02cWsybGR0MnVvMTZ5ODloaWd2In0.lPFEc0YGCJnkWofXiqoniw",
    {
        attribution:
            "Keyboard shortcuts &nbsp;&nbsp;&nbsp; Map data &copy;2022 &nbsp;&nbsp;&nbsp; Terms of use",
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "your.mapbox.access.token",
    }
).addTo(wymondhamMap);

const wymondhamMarker = L.marker(wymondhamLoc).addTo(wymondhamMap);
const wymondhamPopup = wymondhamMarker.bindPopup(`Unit 15, <br>
Penfold Drive, <br>
Gateway 11 Business Park, <br>
Wymondham, Norfolk,<br>
NR18 0WZ`);

new L.Control.Zoom({ position: "bottomright" }).addTo(wymondhamMap);

const yarmouthLoc = [52.5559156548259, 1.7132934550676306];

const yarmouthMap = L.map("yarmouthMap", {
    center: yarmouthLoc,
    preferCanvas: true,
    zoom: 17,
    zoomControl: false,
    scrollWheelZoom: false,
});

L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVlcmFuYiIsImEiOiJja3pneW02cWsybGR0MnVvMTZ5ODloaWd2In0.lPFEc0YGCJnkWofXiqoniw",
    {
        attribution:
            "Keyboard shortcuts &nbsp;&nbsp;&nbsp; Map data &copy;2022 &nbsp;&nbsp;&nbsp; Terms of use",
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "your.mapbox.access.token",
    }
).addTo(yarmouthMap);

const yarmouthMarker = L.marker(yarmouthLoc).addTo(yarmouthMap);
const yarmouthPopup = yarmouthMarker.bindPopup(`Suite F23, <br>
Beacon Innovation Centre, <br>
Beacon Park, Gorleston, <br>
Great Yarmouth, Norfolk,<br>
NR31 7RA`);

new L.Control.Zoom({ position: "bottomright" }).addTo(yarmouthMap);

//TODO: handle case when main header intersects with scrolling header correctly
//refactor scrolling code
