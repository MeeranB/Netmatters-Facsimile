"use strict";

//Force scroll to top on refresh
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});
$.scrollDirection.init();

var checkWidth = function checkWidth() {
  return $(window).width();
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

var addLightboxSidebarListener = function addLightboxSidebarListener() {
  $(".lightbox").on("click", function () {
    $(".hamburger").removeClass("is-active");
    $("body").removeClass("shift-left shift-left-mobile");
    $(".hidden-nav-container").hide();
    $(".lightbox").hide();
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
    appendDots: $(".slider")
  });
});
$(".slider").on("init", function (event, slick) {
  $(".slick-track").css("height", "100%");
  $(".slick-list").css("height", "100%");
  $(".slick-dots").addClass("adjustdots");
});
$(".cookie-consent").on("click", function () {
  $(".lightbox").hide();
  addLightboxSidebarListener();
  $("body").css("overflow", "auto");
  localStorage.setItem("cookie-consent", true);
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
var header = $(".main-header");
var scrollingHeader = header.clone({
  withDataAndEvents: true
}).addClass("scrolling-header");
var hoverMenu = $("#hover-nav-container")[0];
var options = {
  threshold: 0
};
var observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      console.log("header has left the screen");
      scrollHeaderHander();
      useSidebar("desktop");
    } else if (entry.isIntersecting) {
      console.log("header has entered the screen");
      $(window).off("scrollDirection");
      scrollingHeader.remove();
    }
  });
}, options);
$.scrollDirection.init({// options
});

var scrollHeaderHander = function scrollHeaderHander() {
  var currentScrollDirection;
  $(window).on("scrollDirection", function () {
    if ($.scrollDirection.isScrollDown) {
      scrollingHeader.addClass("scrolling-header-removed");
      setTimeout(function () {
        scrollingHeader.remove();
        currentScrollDirection = "down";
      }, 800);
    } else if ($.scrollDirection.isScrollUp) {
      if (currentScrollDirection == "down") {
        setTimeout(function () {
          scrollingHeader.removeClass("scrolling-header-removed");
          scrollingHeader.addClass("scrolling-header-added");
          var windowWidth = checkWidth();
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

observer.observe(hoverMenu); //TODO: handle case when main header intersects with scrolling header correctly
//refactor scrolling code
//# sourceMappingURL=all.js.map
