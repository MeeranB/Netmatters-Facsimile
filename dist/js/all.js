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
    $(".hidden-nav-container").css("right", "0");
  });
};

var addDesktopLightboxSidebarListener = function addDesktopLightboxSidebarListener() {
  $(".lightbox").on("click", function () {
    $(".hamburger").removeClass("is-active");
    $("body").removeClass("shift-left shift-left-mobile");
    $(".hidden-nav-container").css("right", "-350px");
    $(".lightbox").hide();
  });
};

var addMobileLightboxSidebarListener = function addMobileLightboxSidebarListener() {
  $(".lightbox").on("click", function () {
    $(".hamburger").removeClass("is-active");
    $("body").removeClass("shift-left shift-left-mobile");
    $(".hidden-nav-container").css("right", "-275px");
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
    appendDots: $(".slider")
  });
});
$(".slider").on("init", function (event, slick) {
  $(".slick-track").css("height", "100%");
  $(".slick-list").css("height", "100%");
  $(".slick-dots").addClass("adjustdots");
});
$(".cookie-consent").on("click", function () {
  var windowWidth = checkWidth();
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
$(window).on("resize", function () {
  var windowWidth = checkWidth();

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
      scrollHeaderHander();
      useSidebar("desktop");
    } else if (entry.isIntersecting) {
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

observer.observe(hoverMenu);
var cambridgeLoc = [52.23535372699674, 0.15384150556855017];
var cambridgeMap = L.map("cambridgeMap", {
  center: cambridgeLoc,
  preferCanvas: true,
  zoom: 17,
  zoomControl: false,
  scrollWheelZoom: false
});
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVlcmFuYiIsImEiOiJja3pneW02cWsybGR0MnVvMTZ5ODloaWd2In0.lPFEc0YGCJnkWofXiqoniw", {
  attribution: "Keyboard shortcuts &nbsp;&nbsp;&nbsp; Map data &copy;2022 &nbsp;&nbsp;&nbsp; Terms of use",
  maxZoom: 18,
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
  accessToken: "your.mapbox.access.token"
}).addTo(cambridgeMap);
var cambridgeMarker = L.marker(cambridgeLoc).addTo(cambridgeMap);
var cambridgePopup = cambridgeMarker.bindPopup("Unit 1.28, <br>\nSt John's Innovation Centre, <br>\nCowley Road, Milton, <br>\nCambridge,<br>\nCB4 0WS");
new L.Control.Zoom({
  position: "bottomright"
}).addTo(cambridgeMap);
var wymondhamLoc = [52.57604207982481, 1.136548940521879];
var wymondhamMap = L.map("wymondhamMap", {
  center: wymondhamLoc,
  preferCanvas: true,
  zoom: 17,
  zoomControl: false,
  scrollWheelZoom: false
});
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVlcmFuYiIsImEiOiJja3pneW02cWsybGR0MnVvMTZ5ODloaWd2In0.lPFEc0YGCJnkWofXiqoniw", {
  attribution: "Keyboard shortcuts &nbsp;&nbsp;&nbsp; Map data &copy;2022 &nbsp;&nbsp;&nbsp; Terms of use",
  maxZoom: 18,
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
  accessToken: "your.mapbox.access.token"
}).addTo(wymondhamMap);
var wymondhamMarker = L.marker(wymondhamLoc).addTo(wymondhamMap);
var wymondhamPopup = wymondhamMarker.bindPopup("Unit 15, <br>\nPenfold Drive, <br>\nGateway 11 Business Park, <br>\nWymondham, Norfolk,<br>\nNR18 0WZ");
new L.Control.Zoom({
  position: "bottomright"
}).addTo(wymondhamMap);
var yarmouthLoc = [52.5559156548259, 1.7132934550676306];
var yarmouthMap = L.map("yarmouthMap", {
  center: yarmouthLoc,
  preferCanvas: true,
  zoom: 17,
  zoomControl: false,
  scrollWheelZoom: false
});
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVlcmFuYiIsImEiOiJja3pneW02cWsybGR0MnVvMTZ5ODloaWd2In0.lPFEc0YGCJnkWofXiqoniw", {
  attribution: "Keyboard shortcuts &nbsp;&nbsp;&nbsp; Map data &copy;2022 &nbsp;&nbsp;&nbsp; Terms of use",
  maxZoom: 18,
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
  accessToken: "your.mapbox.access.token"
}).addTo(yarmouthMap);
var yarmouthMarker = L.marker(yarmouthLoc).addTo(yarmouthMap);
var yarmouthPopup = yarmouthMarker.bindPopup("Suite F23, <br>\nBeacon Innovation Centre, <br>\nBeacon Park, Gorleston, <br>\nGreat Yarmouth, Norfolk,<br>\nNR31 7RA");
new L.Control.Zoom({
  position: "bottomright"
}).addTo(yarmouthMap);
$("#summary").on("click", function () {
  $("#details").slideToggle(400);
}); //TODO: handle case when main header intersects with scrolling header correctly
//refactor scrolling code
//# sourceMappingURL=all.js.map
