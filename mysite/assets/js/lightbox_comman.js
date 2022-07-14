////
$(document).ready(function() {
    $('#flag').bxSlider({
        mode: 'slide',
        auto: 'true',
        controls: false,
        speed: 500,
        pause: 3500,
        width: 81,
        wrapper_class: 'flag_container'
    });
    $('#flag_name').bxSlider({
        mode: 'slide',
        auto: 'true',
        controls: false,
        speed: 500,
        pause: 3500,
        width: 85,
        wrapper_class: 'flag_name_container'
    });
    $('#pro').bxSlider({
        mode: 'slide',
        auto: 'true',
        controls: false,
        speed: 1000,
        pause: 3500,
        width: 202,
        wrapper_class: 'pro_container'
    });
    $("#gallery2 a").append("<span></span>");
    $("#gallery2 a").hover(function() {
        $(this).children("span").fadeIn(300);
    }, function() {
        $(this).children("span").fadeOut(300);
    });
    $("a.zoom2").fancybox({
        'zoomSpeedIn': 500,
        'zoomSpeedOut': 500
    });
});
////////////////////