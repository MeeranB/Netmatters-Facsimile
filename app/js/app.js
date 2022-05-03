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

const getNewsPosts = () => {
    return axios
        .get("newsposts.php")
        .then(response => {
            return response.data;
        })
        .catch(error => console.error(error.data));
};

$(() => {
    const cookieConsent = localStorage.getItem("cookie-consent");
    const windowWidth = checkWidth();
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

$("#summary").on("click", () => {
    $("#details").slideToggle(400);
});

$("#contact-form").validate({
    errorElement: null,
    errorClass: "hasError",
    highlight: (element, errorClass) => {
        $(element).addClass(errorClass);
    },
    rules: {
        name: "required",
        email: {
            required: true,
            validEmail: true,
        },
        telNumber: {
            required: true,
            validPhone: true,
        },
        subject: "required",
        message: "required",
    },
    submitHandler: postData,
    unhighlight: (element, errorClass) => {
        $(element).removeClass(errorClass);
    },
});

jQuery.extend(jQuery.validator.messages, {
    required: "",
    email: "",
});

jQuery.validator.addMethod(
    "validPhone",
    function (value, element) {
        // prettier-ignore
        const phoneRegex = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
        return this.optional(element) || phoneRegex.test(value);
    },
    ""
);

jQuery.validator.addMethod(
    "validEmail",
    function (value, element) {
        // prettier-ignore
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return this.optional(element) || emailRegex.test(value);
    },
    ""
);

function postData() {
    const formString = $("#contact-form").serialize();
    const formUrlSearchParams = new URLSearchParams(formString);
    const submittedData = {};
    for (const [key, value] of formUrlSearchParams) {
        submittedData[key] = value;
    }
    axios
        .post("submit.php", submittedData)
        .then(response => {
            if (response.data == "success") {
                $("#form-feedback")
                    .removeClass("d-none")
                    .removeClass("fail")
                    .addClass("success");
                $("#alert-text")
                    .text("Your message has been sent.")
                    .css("color", "white");
            } else {
                throw new Error(response.data);
            }
        })
        .catch(error => {
            $("#form-feedback")
                .removeClass("d-none")
                .removeClass("success")
                .addClass("fail");
            $("#alert-text").text(error.message).css("color", "#a94442");
            $("#form-feedback button").css("background-color", "transparent");
        });
}

$("#form-feedback button").on("click", () => {
    $("#form-feedback").addClass("d-none");
});

function displayNewsPosts() {
    const newsPosts = getNewsPosts();
    newsPosts.then(results => {
        results.forEach(post => {
            const content = post["content"];
            const length = 100;
            const trimmedContent =
                content.length > length
                    ? `${content.substring(0, length - 3)}...`
                    : string.substring(0, length);
            const date = new Date(post["date"]);
            const options = { month: "long" };

            $(`#post${post["ID"]}-thumbnail`).attr("src", post["image"]);
            $(`#post${post["ID"]}-tagstyle`).addClass(
                `img-label-container--${post["style"]}`
            );
            $(`#post${post["ID"]}-tag`).text(post["tag"]);
            $(`#post${post["ID"]}-title`).text(post["title"]);
            $(`#post${post["ID"]}-content`).text(trimmedContent);
            $(`#post${post["ID"]}-ownerimage`).attr(
                "src",
                post["author_image"]
            );
            $(`#post${post["ID"]}-btn`).addClass(`btn-${post["style"]}`);
            $(`#post${post["ID"]}-owner`).text(`Posted by ${post["author"]}`);
            $(`#post${post["ID"]}-date`).text(
                `${date.getDate()}th ${new Intl.DateTimeFormat(
                    "en-US",
                    options
                ).format(date)} ${date.getFullYear()}`
            );
        });
    });
}

//TODO: handle case when main header intersects with scrolling header correctly
//refactor scrolling code
