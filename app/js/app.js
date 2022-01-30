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
        $(".hidden-nav-container").show();
    });
};

const addLightboxSidebarListener = () => {
    $(".lightbox").on("click", () => {
        $(".hamburger").removeClass("is-active");
        $("body").removeClass("shift-left shift-left-mobile");
        $(".hidden-nav-container").delay(500).fadeOut(0);
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
        addLightboxSidebarListener();
    }

    if (windowWidth < 992) {
        useSidebar("mobile");
    } else if (windowWidth >= 992) {
        useSidebar("desktop");
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
    $(".lightbox").hide();
    addLightboxSidebarListener();
    $("body").css("overflow", "auto");
    localStorage.setItem("cookie-consent", true);
});

$(window).on("resize", () => {
    const windowWidth = checkWidth();
    if (windowWidth < 992) {
        if ($("body").hasClass("shift-left")) {
            $("body").removeClass("shift-left");
            $("body").addClass("shift-left-mobile");
        }
        useSidebar("mobile");
    } else if (windowWidth >= 992) {
        if ($("body").hasClass("shift-left-mobile")) {
            $("body").removeClass("shift-left-mobile");
            $("body").addClass("shift-left");
        }
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

//TODO: handle case when main header intersects with scrolling header correctly
//refactor scrolling code
