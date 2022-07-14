var BASE_HREF = BASE_HREF || '/';
var tatra = window.tatra = window.tatra || {};

var langCode = $("html").attr("lang") || 'cs';
var lang = {
    'cs': {
        'Hledaný výraz': 'Hledaný výraz',
        'Zadejte vaši adresu': 'Zadejte vaši adresu',
        'Sem napište adresu': 'Sem napište adresu',
        'Pokračujte': 'Pokračujte'
    },
    'en': {
        'Hledaný výraz': 'Search expression',
        'Zadejte vaši adresu': 'Enter your address',
        'Sem napište adresu': 'Type address here',
        'Pokračujte': 'Continue'
    },
    'ru': {
        'Hledaný výraz': 'Выражение поиска',
        'Zadejte vaši adresu': 'Впишите ваш тип адрес',
        'Sem napište adresu': 'Напечатайте адрес на машинке здесь',
        'Pokračujte': 'продолжайтесь'
    }
};

(function($) {

    // fb get
    $.fn.fbGet = function(get, dimension, callback) {
        if (!this.length) {
            return this;
        }

        var result;
        var m = Math[get];
        this.each(function(index) {
            var newResult = $(this)[dimension]();
            result = index ? m(result, newResult) : newResult;
        });

        if (typeof callback == 'function') {
            callback.call(this, result);
            return this;
        }

        return result;
    };
    $.fn.inputDefaultText = function(options) {
        options = $.extend({
            text: lang[langCode]['Hledaný výraz']
        }, options);
        return this
            .val(options.text)
            .bind('focus', function() {
                if (this.value == options.text) this.value = '';
            })
            .bind('blur', function() {
                if (this.value == '') this.value = options.text;
            });
    };

    $(document).ready(function() {

        // lightbox
        $.fn.kfBox && $('.lightbox').kfBox();

        // specialni odkazy
        $('a.external').click(function() {
            return !window.open($(this).attr("href"))
        });
        $("a.print").bind("click", function() {
            window.print();
            return false;
        });

        // eq foot line
        $('.foot-line .spc')
            .fbGet('max', 'height', function(val) {
                this.height(val)
            });
        // Equal Heights
        function eq($element, item, count) {
            $element.each(function() {
                var $items = $(this).find(item);
                var end = $items.length;
                for (var i = 0; i < end; i = i + count) {
                    $items.slice(i, i + count).fbGet('max', 'height', function(val) {
                        this.height(val)
                    });
                };
            });
        };

        eq($('.col-content .box-crossroad'), '.text-box', 3);
        eq($('.col-full .configurator-list'), '.desc', 5);
        eq($('.col-full .boxed-list'), '.desc', 5);
        eq($('.catalog-list'), '.awrap', 4);
        eq($('.configurator-list'), '.desc2', 5);
        eq($('.car-gallery'), '.box', 500);

        // Placeholder
        $('#form-q').inputDefaultText({
            text: lang[langCode]['Hledaný výraz']
        });
        $('#form-side-partner').inputDefaultText({
            text: lang[langCode]['Zadejte vaši adresu']
        });

        // table
        $('table')
            .wrap('<div class="table-wrap"></div>')
            .after('<span class="cor cor-tl"></span><span class="cor cor-tr"></span><span class="cor cor-bl"></span><span class="cor cor-br"></span>')
            .find('tbody tr:odd')
            .addClass('even')
            .end()
            .find('tr td:first-child, tr th:first-child')
            .addClass('first')
            .end()
            .find('tr td:last-child, tr th:last-child')
            .addClass('last')
            .end();



        /* IE */
        $('.ie6ie7 a .img img')
            .click(function() {
                this.parentNode.click()
            });




        // line motive rotator/carousel
        if (tatra && tatra.Carousel) {
            var carousel = new tatra.Carousel($('.motive-box .pager'), {
                item: 'span'
            })
            carousel.init();

            $(document)
                .delegate('.motive-box .carousel-box', 'mouseenter', function() {
                    $('.motive-box .img-box').cycle('pause')
                })
                .delegate('.motive-box .carousel-box', 'mouseleave', function() {
                    $('.motive-box .img-box').cycle('resume')
                })


            var historymenu = new tatra.HistoryCarousel($('.history-menu ul'), {
                item: 'li',
                visible: 5
            })
            historymenu.init();
        }

        $('.history-menu').each(function(index) {
            var $links = $(this).find('a');
            var active = $links.index($(this));

            $(this).delegate('a', 'click', function(event) {
                var i = $links.index($(this));
                if (i != active) {
                    $links.removeClass('active');
                    $(this).addClass('active');

                    $('#history-list').append('<span class="loading"></span>')
                    $.ajax({
                        url: BASE_HREF + 'ajax-history/',
                        data: $(this).attr('href').split('?')[1],
                        success: function(response) {
                            $('#history-list').html(response);
                            // lightbox
                            $.fn.kfBox && $('#history-list .lightbox').kfBox();
                        }
                    });
                }

                return false;
            });
        });

        if ($.fn.cycle) {
            $('.side-vendors .list')
                .each(function(index) {
                    $(this)
                        .after('<p class="pager" id="side-vendors-pager' + index + '"></p>')
                        .cycle({
                            fx: 'fade',
                            speed: 500,
                            timeout: 7000,
                            pager: '#side-vendors-pager' + index
                        });
                });


            $('.motive-box .img-box')
                .cycle({
                    fx: 'scrollLeft',
                    speed: 500,
                    timeout: 6000,
                    before: function(currSlideElement, nextSlideElement, options, forwardFlag) {
                        if (carousel) {

                            var index = options.nextSlide;
                            if (!carousel.isVisible(index)) {

                                carousel.scrollTo(index)

                            };
                        }
                    },
                    pager: '.motive-box .pager',
                    pagerAnchorBuilder: function(idx, slide) {
                        return '.motive-box .pager a:eq(' + idx + ')';
                    }
                });

            $('.motives-list')
                .cycle({
                    fx: 'scrollHorz',
                    speed: 500,
                    timeout: 0,
                    pager: '.why-tatra-steps ul',
                    pagerAnchorBuilder: function(idx, slide) {
                        return '.why-tatra-steps ul li:eq(' + idx + ')';
                    },
                    activePagerClass: 'active'
                });




        }

        // ID tabs
        $.fn.idTabs && $('.tab-box .tab-list').idTabs();
        $.fn.idTabs && $('.table-tabs').idTabs();


        $('.flash-player').each(function() {
            $(this).flash({
                src: '/inc/player.swf',
                width: 611,
                height: 407,
                wmode: 'opaque',
                allowfullscreen: true,
                flashvars: {
                    file: $(this).find('a').attr('href'),
                    stretching: 'uniform',
                    dock: 'false',
                    repeat: 'always',
                    searchbar: 'false',
                    autostart: "true",
                    controlbar: 'bottom',
                    image: $(this).find('img').attr('src')
                }
            });
            // nebudeme zobrazovat alt
            $(this).find('.alt').css("display", "none");
        });


        // home motive rotator
        if (tatra && tatra.ScrollMotive) {
            var motive = new tatra.ScrollMotive({
                imgSlides: '#header .slide',
                textSlides: '#intro .slide'
            })
            motive.init();
        }

        // Google map
        if (tatra.GMap) {
            var dealerMap = new tatra.GMap('#dealers-gmap', {});
            var dealerMapAjax = null;

            // google maps event
            dealerMap.$element.bind('move.map', function(e, gmap) {
                var map = gmap.map;
                var bounds = map.getBounds();
                var SW = bounds.getSouthWest();
                var NE = bounds.getNorthEast();

                // change position ajax
                dealerMapAjax = $.ajax({
                    dataType: 'json',
                    data: {
                        coordTop: NE.lat(),
                        coordLeft: SW.lng(),
                        coordBottom: SW.lat(),
                        coordRight: NE.lng()
                    },
                    success: function(json) {
                        var markers = [];
                        for (var i = 0, l = json.results.length; i < l; i++) {
                            markers.push({
                                latitude: json.results[i].lat,
                                longitude: json.results[i].lng,
                                html: '<strong>' + json.results[i].title + '</strong>' +
                                    (json.results[i].ulice ? '<br/>' + json.results[i].ulice : '') +
                                    (json.results[i].mesto ? '<br/>' + json.results[i].mesto + (json.results[i].psc ? ' ' + json.results[i].psc : '') : (json.results[i].psc ? '<br/>' + json.results[i].psc : '')) +
                                    (json.results[i].telefon ? '<br/>tel. ' + json.results[i].telefon : '') +
                                    (json.results[i].www ? '<br/><a href="' + json.results[i].www + '">' + json.results[i].www + '</a>' : ''),
                                icon: {
                                    image: json.results[i].icon,
                                    iconsize: [36, 52],
                                    iconanchor: [18, 41],
                                    infowindowanchor: [18, 0]
                                }
                            })
                        };
                        gmap.setMarkers({
                            markers: markers
                        });
                    },
                    url: BASE_HREF + 'json-dealers/'
                });
            })

            $('#dealers-search-text').bind('keydown', function(e) {
                if (e.keyCode == 13) {
                    $('#dealers-search-submit').trigger('click');
                }
            });

            $('#dealers-search-submit').bind('click', function() {
                    var $form = $(this).closest('.body');
                    var isOpen = false;
                    var submit = $(this).find('.inline-btn');
                    $form.find('.map-positions').remove();
                    $.ajax({
                        dataType: 'json',
                        data: {
                            text: $('#dealers-search-text').val()
                        },
                        beforeSend: function() {
                            submit.after('<span id="map-ajax-loader"></span>');
                        },
                        success: function(json) {
                            var markers = [];
                            var position = [];

                            if (json.position && json.position.length > 1) {
                                for (var i = 0, l = json.position.length; i < l; i++) {
                                    if (json.position[i].adresa) {
                                        position.push('<a href="#">' + json.position[i].adresa + '</a>')
                                    }
                                }
                                $form.append('<p class="map-positions">' + $form.data('positionText') + ' ' + position.join('') + '</p>');
                            }

                            if (json.position && json.position.length) {
                                for (var i = 0, l = json.results.length; i < l; i++) {
                                    markers.push({
                                        latitude: json.results[i].lat,
                                        longitude: json.results[i].lng,
                                        html: '<strong>' + json.results[i].title + '</strong>' +
                                            (json.results[i].ulice ? '<br/>' + json.results[i].ulice : '') +
                                            (json.results[i].mesto ? '<br/>' + json.results[i].mesto + (json.results[i].psc ? ' ' + json.results[i].psc : '') : (json.results[i].psc ? '<br/>' + json.results[i].psc : '')) +
                                            (json.results[i].telefon ? '<br/>tel. ' + json.results[i].telefon : '') +
                                            (json.results[i].www ? '<br/><a href="' + json.results[i].www + '">' + json.results[i].www + '</a>' : ''),
                                        icon: {
                                            image: json.results[i].icon,
                                            iconsize: [36, 52],
                                            iconanchor: [18, 41],
                                            infowindowanchor: [18, 0]
                                        }
                                    })
                                };
                                if (!dealerMap.isInited) {
                                    $('#dealers-map2').show();
                                    $('html').animate({
                                        scrollTop: $('#dealers-map2').offset().top
                                    }, 500);
                                    dealerMap.$element.show().animate({
                                        height: 640
                                    }, 500, function() {
                                        dealerMap.init();
                                        dealerMap.setPosition({
                                            markers: markers,
                                            zoom: markers.length > 1 ? 'auto' : 10
                                        });
                                        dealerMap.setMarkers({
                                            markers: markers
                                        });

                                        $(this).animate({
                                            opacity: 1
                                        }, 500, function() {
                                            submit.next().remove();
                                        });
                                    });

                                } else {
                                    $('#dealers-map2').show();
                                    $('html').animate({
                                        scrollTop: $('#dealers-map2').offset().top
                                    }, 500);
                                    dealerMap.$element.show();
                                    dealerMap.setPosition({
                                        markers: markers,
                                        zoom: markers.length > 1 ? 'auto' : 10
                                    });
                                    dealerMap.setMarkers({
                                        markers: markers
                                    });
                                    submit.next().remove();
                                }
                            } else {
                                submit.next().remove();
                                dealerMap.$element.hide();
                            }
                        },
                        url: BASE_HREF + 'json-dealers/'
                        //url: 'dealers.json'
                    });

                    $.ajax({
                        dataType: 'html',
                        data: {
                            text: $('#dealers-search-text').val()
                        },
                        success: function(html) {
                            //$('.world-map').hide();
                            $('#dealers-table').show();
                            $('#dealers-table').html(html);
                            $.fn.idTabs && $('#dealers-table .tab-box .tab-list').idTabs();
                            $('#dealers-table table>tbody>tr:nth-child(odd)').addClass('even');
                        },
                        url: BASE_HREF + 'world-dealers/'
                        //url: 'ajax-world-dealers.html'
                    })

                    $(".tab-box a.more").live('click', function() {
                        $.ajax({
                            dataType: 'html',
                            data: {
                                text: $('#dealers-search-text').val(),
                                more: true
                            },
                            success: function(html) {
                                $('#dealers-table').show();
                                $('#dealers-table').html(html);
                                $.fn.idTabs && $('#dealers-table .tab-box .tab-list').idTabs();
                                $('#dealers-table table>tbody>tr:nth-child(odd)').addClass('even');
                            },
                            url: BASE_HREF + 'world-dealers/'
                            // url: 'ajax-world-dealers.html'
                        });
                    });

                    return false;
                })
                .delegate('.map-positions a', 'click', function(event) {
                    var $form = $('#google-map-search');
                    $form.find('input:text:first').val($(this).text());
                    $form.submit();
                    return false;
                });

            $('.country-list').delegate('a', 'click', function() {
                var searchTerm = $(this).text();
                $('#dealers-search-text').val(searchTerm);
                $('#dealers-search-submit').triggerHandler('click');
                return false;
            });

            $('#dealers-continent').bind('change', function() {
                $('.country-list').hide();
                $('#' + $(this).val() + '.country-list').show();
            });



            if ($('#dealers-search-text').val() != '') $('#dealers-search-submit').triggerHandler('click');
            else $('#dealers-search-text').inputDefaultText({
                text: lang[langCode]['Sem napište adresu']
            });

        }

        if (tatra.MapController) {
            $('.world-map').each(function() {
                var mapController = new tatra.MapController(this);
                mapController.init();
            });
        }
        $('#head-links .wrap').hover(
            function() {
                $('#head-links .wrap').removeClass('hover').find('.bd').hide();
                $(this)
                    .width(function(i, old) {
                        return old
                    })
                    .height(function(i, old) {
                        return old
                    })
                    .addClass('hover')
                    .find('.bd')
                    .show(!$.browser.msie || $.browser.version > 8 ? 'fast' : 0);
            },
            function() {
                $(this)
                    .css({
                        'width': '',
                        'height': ''
                    })
                    .removeClass('hover')
                    .find('.bd')
                    .stop(true, true)
                    .hide();
            }
        );

        /* Konfigurátor */
        $('.configurator-list>ul>li>label').bind('click', function(event) {
            var $inp = $('input#' + $(this).attr('for'));
            var chck = $inp.attr('checked');

            if ($inp.is(':radio')) {
                $('input#' + $(this).attr('for')).attr('checked', true).click();
            } else {
                $('input#' + $(this).attr('for')).attr('checked', !chck).click();
            }
            return false;
        });
        $('.configurator-list>ul>li>input').bind('click', function(event) {
            if ($(this).closest('li').hasClass('prives')) {

                $(this).closest('li').find('label').removeClass('selected');
                $('label[for=' + $(this).attr('id') + ']').addClass('selected');
            } else if ($(this).is(':radio')) {
                $('.configurator-list>ul>li.selected').removeClass('selected');
                $('.configurator-list>ul>li>input:checked').each(function() {
                    $(this).closest('li').addClass('selected');
                });
            } else {
                if ($(this).attr('checked')) {
                    $(this).closest('li').addClass('selected');
                } else {
                    $(this).closest('li').removeClass('selected');
                }
            }

            if ($('.configurator-list>ul>li>input:checked').length) $('.step-next2').attr('disabled', false).val(lang[langCode]['Pokračujte']);
            else $('.step-next2').attr('disabled', true);

            return false;
        }).css({
            position: 'absolute',
            top: '-50000px'
        });
        $('.configurator-list>ul>li>input:checked').each(function() {
            if ($(this).closest('li').hasClass('prives')) {
                $('label[for=' + $(this).attr('id') + ']').addClass('selected');
            } else {
                $(this).closest('li').addClass('selected');
            }
        });

        var clickHandler = function() {
            var relatedBoxes = $(this).attr('data-relatedboxes');
            if (relatedBoxes) {
                var $relatedBoxes = $(relatedBoxes);
                $('.configurator-list-terrain li').hide().find('input').attr('checked', false);
                $relatedBoxes.parents('li').show();
            } else $('.configurator-list-terrain li').show();
        };
        $('.configurator-list-nastavba').delegate('input', 'click', clickHandler);
        $('.configurator-list-nastavba input:checked').trigger('click');

        if ($('.configurator-list>ul>li>input:checked').length) $('.step-next2').attr('disabled', false).val(lang[langCode]['Pokračujte']);
        else $('.step-next2').attr('disabled', true);


        $('#config-dealer-box a.more-btn').bind('click', function() {
            $(this).closest('div').find('.hidden').show();
            $(this).closest('tr').remove();
            return false;
        });

        $('#configForm-address').bind('change', function() {
            $.ajax({
                url: BASE_HREF + 'ajax-dealers/',
                //url: BASE_HREF + '/tpl/ajax-dealers.html',
                data: {
                    address: $("#configForm-address").val(),
                    country: $('#country option:selected').val()
                },
                success: function(response) {
                    $('#config-dealer-box').html(response);
                    $('#config-dealer-box a').bind('click', function() {
                        $(this).closest('div').find('.hidden').show();
                        $(this).remove();
                        return false;
                    });
                }
            });
        });

        $('#country').bind('change', function() {
            $.ajax({
                url: BASE_HREF + 'ajax-dealers/',
                //url: BASE_HREF + '/tpl/ajax-dealers.html',
                data: {
                    address: $("#configForm-address").val(),
                    country: $('#country option:selected').val()
                },
                success: function(response) {
                    $('#config-dealer-box').html(response);
                    $('#config-dealer-box a').bind('click', function() {
                        $(this).closest('div').find('.hidden').show();
                        $(this).remove();
                        return false;
                    });
                }
            });
        });

        $("#contact_oddeleni").bind('change', function() {
            $("#contact_country").parent()[($("option:selected", this).val() == 'frank.farsky@tatra.cz') ? 'show' : 'hide']();
        }).trigger('change');


        /* Inicializace scrollovátka Car Gallery */
        $('.car-gallery .scroller').each(function() {
            var $prevnext2 = $('<div class="prevnext"><a href="#" class="prev">předchozí</a> <a href="#" class="next">další</a></div>');
            var itemsVisible = 3;
            var $imageCarousel = $(this);
            $imageCarousel.wrapInner('<div class="hscroll-box" style="width: 100%; overflow: hidden; position: relative;"/>');
            $imageCarousel.after($prevnext2);
            var imageScroller = new kff.widgets.Scroller($imageCarousel.find('.hscroll-box'), {
                carousel: '.carousel',
                items: '.box',
                scrollWidth: 1 * (242 + 2),
                carouselWidth: itemsVisible * (242 + 2) - 2,
                itemWidth: 242,
                gapWidth: 2,
                loadPosition: false,
                prev: $prevnext2.find('.prev'),
                next: $prevnext2.find('.next')
            });
            imageScroller.init();
        });

        /* Inicializace scrollovátka v Odvětvích */
        $('.theme-box .scroller').each(function() {
            var $prevnext2 = $('<div class="prevnext"><a href="#" class="prev">předchozí</a> <a href="#" class="next">další</a></div>');
            var itemsCount = $(this).find('li').size();
            var $imageCarousel = $(this);
            $(this).width(itemsCount * (54 + 10) - 10);
            $imageCarousel.wrapInner('<div class="hscroll-box" style="width: 100%; overflow: hidden; position: relative;"/>');
            $imageCarousel.after($prevnext2);
            var imageScroller = new kff.widgets.Scroller($imageCarousel.find('.hscroll-box'), {
                scrollWidth: 4 * (54 + 10),
                carouselWidth: 4 * (54 + 10) - 10,
                itemWidth: 54,
                gapWidth: 10,
                loadPosition: false,
                prev: $prevnext2.find('.prev'),
                next: $prevnext2.find('.next')
            });
            imageScroller.init();
        });

        if ($('.theme-scroller').length) {
            var themeScroller = new tatra.ThemeScroller();
            themeScroller.init();
        }

        /* Main menu hovers */
        $('#main-menu>ul>li').each(function() {
            var $submenus = $('#main-menu>ul>li');
            var menuTimer;
            $(this).bind('mouseenter', function(event) {
                var $submenu = $(event.currentTarget).find('.submenu');
                if ($submenu.length == 0) return;
                $submenus.not(event.currentTarget).triggerHandler('mouseleave');
                $submenu.stop().fadeTo(200, 1);
                $(this).addClass('hover');
                var $arrow = $('<span class="arrow" />').css({
                    left: $(this).position().left + $(this).width() / 2
                });
                $(this).append($arrow);
                clearTimeout(menuTimer);
            });
            $(this).bind('mouseleave', function(event) {
                var $submenu = $(event.currentTarget).find('.submenu');
                if ($submenu.length == 0) return;
                clearTimeout(menuTimer);
                menuTimer = setTimeout(function() {
                    $submenu.stop().fadeTo(100, 0, function() {
                        $submenu.css({
                            display: 'none'
                        })
                    }).closest('li').removeClass('hover').find('.arrow').remove();
                }, 200);
            });
        });

        $("#antispam").html("<input type='hidden' name='" + $("#antispam").data('name') + "' value='" + $("#antispam").data('value') + "' />");


        /* Dropdown menu - social links */
        $('a.send').each(function() {
            var $this = $(this);
            var $element = $('<div id="send-popup" class="popup-box"><div class="popup-box-inner-wrap"><div class="popup-box-inner">' + $('#send-popup-content').html() + '</div></div></div>');

            var shareDropDown = new tatra.ShareDialog({
                element: $element,
                axis: 'y'
            });
            shareDropDown.init();
            $(this).bind('mousedown', function(event) {

                $element.css({
                    top: parseInt($(this).offset().top + $(this).outerHeight()),
                    left: 'auto',
                    right: parseInt($('body').width() - $(this).offset().left - $(this).outerWidth())
                });
                shareDropDown.toggle();
                $this.toggleClass('open');
                return false;
            }).bind('click', function() {
                return false;
            });

            if ($('#send-popup-content').hasClass('open')) $this.triggerHandler('mousedown');

        });



    });

    window.onload = function() {
        if ($.fn.cycle) {
            $('.home-crossroad').each(function(index) {
                var $cross = $(this).find('.img-crossroad'),
                    $btn = $(this).find('.more2'),
                    $title = $(this).find('h2'),
                    current = 0,
                    length = $cross.find('>*').length;

                $cross.cycle({
                    fx: 'scrollUp',
                    speed: 250,
                    timeout: 0
                });

                $btn.bind('click', function(event) {
                    current = (current + 1) % length;
                    $cross.cycle('next');
                    $title.not(':eq(' + current + ')').hide().end().eq(current).show();
                    $btn.not(':eq(' + current + ')').hide().end().eq(current).show();
                    return false;
                });
            });
        }
    };




})(jQuery);

/* Intro box widget */
tatra.ThemeScroller = function() {
    this.active = -1;
    this.hoverSpeed = 100;
    this.scrollSpeed = 11000;
    return this;
};

tatra.ThemeScroller.prototype.init = function() {
    this.$intro = $('.theme-scroller');
    this.$frames = $('.theme-scroller .frame');

    this.$introMenu = $('.theme-scroller-tabs');
    this.$introMenuItems = this.$introMenu.find('li');

    this.$progressBar = $('.theme-scroller-progress .in');

    this.$frames.each($.proxy(function(i) {
        this.$introMenuItems = this.$introMenuItems.add('<a href="#">' + i + '</a>');
    }, this));


    this.$introMenuItems.bind('click', $.proxy(this.clickItem, this));

    this.$frames.bind('mouseenter', $.proxy(this.pause, this));
    this.$frames.bind('mouseleave', $.proxy(this.play, this));

    this.pausePosition = 0;

    this.autoScroll();

    return this;
};

tatra.ThemeScroller.prototype.clickItem = function(event) {
    this.setActiveFrame(this.$introMenuItems.index(event.currentTarget));
    return false;
};

tatra.ThemeScroller.prototype.setActiveFrame = function(index) {
    index = (index + this.$frames.length) % this.$frames.length;

    if (index != this.active) {
        this.pause();
        this.pausePosition = 0;
        this.$frames.eq(index).css({
            display: 'block'
        });

        this.$frames.filter('.active').find('h1, .theme-text').stop().fadeTo(200, 0);
        this.$frames.eq(index).find('h1, .theme-text').stop().css({
            opacity: 0
        }).fadeTo(1800, 1);

        this.$frames.filter('.active').find('.theme-img').stop().css({
            backgroundPosition: '0 0',
            zIndex: 2
        }).animate({
            backgroundPosition: '-980px 0'
        }, 1200);
        this.$frames.eq(index).find('.theme-img').stop().css({
            backgroundPosition: '980px 0',
            zIndex: 1
        }).animate({
            backgroundPosition: '0 0'
        }, 700);

        this.$frames.filter('.active').removeClass('active');
        this.$frames.eq(index).addClass('active');

        this.$introMenuItems.filter('.active').removeClass('active');
        this.$introMenuItems.eq(index).addClass('active');

        this.active = index;
        this.play();
    }
};

tatra.ThemeScroller.prototype.next = function() {
    this.setActiveFrame(this.active + 1);
};

tatra.ThemeScroller.prototype.prev = function() {
    this.setActiveFrame(this.active - 1);
};

tatra.ThemeScroller.prototype.autoScroll = function() {
    this.pausePosition = 0;
    this.setActiveFrame((this.active + 1) % this.$introMenuItems.size());
    clearTimeout(this.timer);
    this.timer = setTimeout($.proxy(this.autoScroll, this), this.scrollSpeed);
};

tatra.ThemeScroller.prototype.pause = function() {
    clearTimeout(this.timer);
    this.$progressBar.stop();
    this.pausePosition = (this.$progressBar.width() % (980 / 4)) / (980 / 4);

};

tatra.ThemeScroller.prototype.play = function() {
    clearTimeout(this.timer);
    var pausePosition = this.pausePosition;
    this.pausePosition = 0;
    this.timer = setTimeout($.proxy(this.autoScroll, this), this.scrollSpeed * (1 - pausePosition));
    this.$progressBar.stop().css({
        width: ((this.active + pausePosition) * 100 / 4) + '%'
    }).animate({
        width: ((this.active + 1) * 100 / 4) + '%'
    }, this.scrollSpeed * (1 - pausePosition), 'linear');
};



/**
 *  tatra.ShareDialog
 *  Konstruktor pro slajdovací dialogová okna
 */

var tatra = window.tatra = window.tatra || {};

tatra.ShareDialog = function(options) {
    this.options = $.extend({
        alignTo: null,
        axis: 'y',
        speedDown: 200,
        speedUp: 200,
        easeDown: 'linear',
        easeUp: 'linear'
    }, options);

    this.animProperty = this.options.axis == 'y' ? 'height' : 'width';
};

tatra.ShareDialog.shown = null;

tatra.ShareDialog.prototype.init = function() {
    var that = this;
    this.$element = $(this.options.element).css({
        position: 'absolute',
        left: -9999,
        top: -9999
    }).appendTo('body');
    this.$innerWrap = this.$element.find('.popup-box-inner-wrap');
    this.dims = {
        height: this.$innerWrap.outerHeight(),
        width: this.$innerWrap.outerWidth()
    };
    this.$innerWrap.css({
        position: 'absolute',
        bottom: '0',
        left: '0'
    }).css(this.dims);
    this.$element.find('.popup-close').bind('click', function(event) {
        that.hide();
        return false;
    });
    if ($.browser.msie) {
        /*
        	this.$iframeMask = $('<iframe />');
        	this.$iframeMask.appendTo(this.$element).css({ 
        		position: 'absolute', 
        		bottom: 0,
        		left: 0,
        		background: '#fff',
        		border: '0',
        		filter: 'alpha(opacity=0)', 
        		opacity: 0
        	}).css(this.dims);
        */
    }

};

tatra.ShareDialog.prototype.resize = function() {
    this.$innerWrap.css({
        width: 'auto',
        height: 'auto'
    });
    this.dims = {
        height: this.$innerWrap.outerHeight(),
        width: this.$innerWrap.outerWidth()
    };
    this.$innerWrap.css(this.dims);
};

tatra.ShareDialog.prototype.show = function() {
    if (tatra.ShareDialog.shown != null && tatra.ShareDialog.shown != this) tatra.ShareDialog.shown.hide();
    this.$element.css(this.dims);
    var anim = {};
    anim[this.animProperty] = this.dims[this.animProperty];

    var css = {};
    css[this.animProperty] = 0;

    this.$element.css(css).animate(anim, this.options.speedDown, this.options.easeDown);
    tatra.ShareDialog.shown = this;
};

tatra.ShareDialog.prototype.hide = function() {
    var anim = {};
    anim[this.animProperty] = 0;

    this.$element.animate(anim, this.options.speedUp, this.options.easeUp);
    tatra.ShareDialog.shown = null;
};

tatra.ShareDialog.prototype.toggle = function() {
    if (tatra.ShareDialog.shown == this) this.hide();
    else this.show();
};