//Force scroll to top on refresh
$(window).on("beforeunload", function () {
    $(window).scrollTop(0);
});

const checkMenuBtnState = () =>
    document.querySelector(".is-active") !== null ? true : false;

$(() => {
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
        $(".lightbox").show().css("display", "flex");
        $(".cookie-modal").show();
        $("body").css("overflow", "hidden");
    } else if (cookieConsent) {
        $(".lightbox").hide();
    }
});

$(".cookie-consent").on("click", () => {
    $(".lightbox").hide();
    $("body").css("overflow", "auto");
    localStorage.setItem("cookie-consent", true);
});

$(".hamburger").on("click", () => {
    $(".hamburger").toggleClass("is-active");
    $("body").css("position", "relative");
    $("body").css("left", "-275px");
    $("body").css("overflow", "hidden");
    $(".lightbox").show();
    $(".hidden-nav-container").show();
});
