"use strict";

//Force scroll to top on refresh
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});

var checkWidth = function checkWidth() {
  return $(window).width();
};

var useMobileSidebar = function useMobileSidebar() {
  $(".hamburger").off("click");
  $(".hamburger").on("click", function () {
    $(".hamburger").toggleClass("is-active");
    $("body").addClass("shift-left-mobile");
    $(".lightbox").show();
    $(".hidden-nav-container").show();
  });
};

var useDesktopSidebar = function useDesktopSidebar() {
  $(".hamburger").off("click");
  $(".hamburger").on("click", function () {
    $(".hamburger").toggleClass("is-active");
    $("body").addClass("shift-left");
    $(".lightbox").show();
    $(".hidden-nav-container").show();
  });
};

var useSidebar = function useSidebar(sidebarType) {
  var bodyStyleMap = {
    desktop: "shift-left",
    mobile: "shift-left-mobile"
  };
  $(".hamburger").off("click");
  $(".hamburger").on("click", function () {
    $(".hamburger").toggleClass("is-active");
    $("body").addClass(bodyStyleMap[sidebarType]);
    $(".lightbox").show();
    $(".hidden-nav-container").show();
  });
};

$(function () {
  var cookieConsent = localStorage.getItem("cookie-consent");
  var windowWidth = checkWidth();

  if (!cookieConsent) {
    $(".lightbox").show().css("display", "flex");
    $(".cookie-modal").show();
    $("body").css("overflow", "hidden");
  } else if (cookieConsent) {
    $(".lightbox").hide();
  }

  if (windowWidth < 992) {
    useSidebar("mobile");
  } else if (windowWidth >= 992) {
    useSidebar("desktop");
  }
});
$(".cookie-consent").on("click", function () {
  $(".lightbox").hide();
  $("body").css("overflow", "auto");
  localStorage.setItem("cookie-consent", true);
});
$(".lightbox").on("click", function () {
  $(".hamburger").toggleClass("is-active");
  $("body").removeClass("shift-left");
  $("body").removeClass("shift-left-mobile");
  $(".hidden-nav-container").hide();
  $(".lightbox").hide();
});
$(window).on("resize", function () {
  var windowWidth = checkWidth();

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
//# sourceMappingURL=all.js.map
