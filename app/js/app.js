//Force scroll to top on refresh
$(window).on("beforeunload", function () {
    $(window).scrollTop(0);
});

const checkWidth = () => $(window).width();

const useMobileSidebar = () => {
    $(".hamburger").off("click");
    $(".hamburger").on("click", () => {
        $(".hamburger").toggleClass("is-active");
        $("body").addClass("shift-left-mobile");
        $(".lightbox").show();
        $(".hidden-nav-container").show();
    });
};

const useDesktopSidebar = () => {
    $(".hamburger").off("click");
    $(".hamburger").on("click", () => {
        $(".hamburger").toggleClass("is-active");
        $("body").addClass("shift-left");
        $(".lightbox").show();
        $(".hidden-nav-container").show();
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
    }

    if (windowWidth < 992) {
        useMobileSidebar();
    } else if (windowWidth >= 992) {
        useDesktopSidebar();
    }
});

$(".cookie-consent").on("click", () => {
    $(".lightbox").hide();
    $("body").css("overflow", "auto");
    localStorage.setItem("cookie-consent", true);
});

$(".lightbox").on("click", () => {
    $(".hamburger").toggleClass("is-active");
    $("body").removeClass("shift-left");
    $("body").removeClass("shift-left-mobile");
    $(".hidden-nav-container").hide();
    $(".lightbox").hide();
});

$(window).on("resize", () => {
    const windowWidth = checkWidth();
    if (windowWidth < 992) {
        if ($("body").hasClass("shift-left")) {
            $("body").removeClass("shift-left");
            $("body").addClass("shift-left-mobile");
        }
        useMobileSidebar();
    } else if (windowWidth >= 992) {
        if ($("body").hasClass("shift-left-mobile")) {
            $("body").removeClass("shift-left-mobile");
            $("body").addClass("shift-left");
        }
        useDesktopSidebar();
    }
});
