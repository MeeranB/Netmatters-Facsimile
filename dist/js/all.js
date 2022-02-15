"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var getNewsPosts = function getNewsPosts() {
  return axios.get("newsposts.php").then(function (response) {
    console.log(response.data);
    return response.data;
  })["catch"](function (error) {
    return console.error(error.data);
  });
};

$(function () {
  var cookieConsent = localStorage.getItem("cookie-consent");
  var windowWidth = checkWidth();
  displayNewsPosts();

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
});
$("#contact-form").validate({
  errorElement: null,
  errorClass: "hasError",
  highlight: function highlight(element, errorClass) {
    $(element).addClass(errorClass);
  },
  rules: {
    name: "required",
    email: {
      required: true,
      validEmail: true
    },
    telNumber: {
      required: true,
      validPhone: true
    },
    subject: "required",
    message: "required"
  },
  submitHandler: postData,
  unhighlight: function unhighlight(element, errorClass) {
    $(element).removeClass(errorClass);
  }
});
jQuery.extend(jQuery.validator.messages, {
  required: "",
  email: ""
});
jQuery.validator.addMethod("validPhone", function (value, element) {
  // prettier-ignore
  var phoneRegex = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
  return this.optional(element) || phoneRegex.test(value);
}, "");
jQuery.validator.addMethod("validEmail", function (value, element) {
  // prettier-ignore
  var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return this.optional(element) || emailRegex.test(value);
}, "");

function postData() {
  var formString = $("#contact-form").serialize();
  var formUrlSearchParams = new URLSearchParams(formString);
  var submittedData = {};

  var _iterator = _createForOfIteratorHelper(formUrlSearchParams),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      submittedData[key] = value;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  axios.post("submit.php", submittedData).then(function (response) {
    console.log(response);

    if (response.data == "success") {
      $("#form-feedback").removeClass("d-none").removeClass("fail").addClass("success");
      $("#alert-text").text("Your message has been sent.").css("color", "white");
    } else {
      throw new Error(response.data);
    }
  })["catch"](function (error) {
    // console.log(error);
    $("#form-feedback").removeClass("d-none").removeClass("success").addClass("fail");
    $("#alert-text").text(error.message).css("color", "#a94442");
    $("#form-feedback button").css("background-color", "transparent");
  });
}

$("#form-feedback button").on("click", function () {
  $("#form-feedback").addClass("d-none");
});

function displayNewsPosts() {
  var newsPosts = getNewsPosts();
  newsPosts.then(function (results) {
    results.forEach(function (post) {
      var content = post["content"];
      var length = 100;
      var trimmedContent = content.length > length ? "".concat(content.substring(0, length - 3), "...") : string.substring(0, length);
      var date = new Date(post["date"]);
      var options = {
        month: "long"
      };
      $("#post".concat(post["ID"], "-thumbnail")).attr("src", post["image"]);
      $("#post".concat(post["ID"], "-tagstyle")).addClass("img-label-container--".concat(post["style"]));
      $("#post".concat(post["ID"], "-tag")).text(post["tag"]);
      $("#post".concat(post["ID"], "-title")).text(post["title"]);
      $("#post".concat(post["ID"], "-content")).text(trimmedContent);
      $("#post".concat(post["ID"], "-ownerimage")).attr("src", post["author_image"]);
      $("#post".concat(post["ID"], "-btn")).addClass("btn-".concat(post["style"]));
      $("#post".concat(post["ID"], "-owner")).text("Posted by ".concat(post["author"]));
      $("#post".concat(post["ID"], "-date")).text("".concat(date.getDate(), "th ").concat(new Intl.DateTimeFormat("en-US", options).format(date), " ").concat(date.getFullYear()));
    });
  });
} //TODO: handle case when main header intersects with scrolling header correctly
//refactor scrolling code
//# sourceMappingURL=all.js.map
