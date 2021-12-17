"use strict";

//Force scroll to top on refresh
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});

var checkMenuBtnState = function checkMenuBtnState() {
  return document.querySelector(".is-active") !== null ? true : false;
};

$(function () {
  var cookieConsent = localStorage.getItem("cookie-consent");

  if (!cookieConsent) {
    $(".lightbox").show().css("display", "flex");
    $(".cookie-modal").show();
    $("body").css("overflow", "hidden");
  } else if (cookieConsent) {
    $(".lightbox").hide();
  }
});
$(".cookie-consent").on("click", function () {
  $(".lightbox").hide();
  $("body").css("overflow", "auto");
  localStorage.setItem("cookie-consent", true);
});
$(".hamburger").on("click", function () {
  $(".hamburger").toggleClass("is-active");
  $("body").css("position", "relative");
  $("body").css("left", "-275px");
  $("body").css("overflow", "hidden");
  $(".lightbox").show();
  $(".hidden-nav-container").show();
});
//# sourceMappingURL=all.js.map
