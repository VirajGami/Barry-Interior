var tatra = window.tatra = window.tatra || {}

tatra.ScrollMotive = function(options) {

    this.$doc = $(document);
    this.$body = $('body');
    this.list = [];
    this.cache = [];
    this.options = $.extend({
        imgSlides: '#header .slide',
        textSlides: '#intro .slide',
        auto: true,
        timeout: 7000
    }, options);
    this.$images = $(this.options.imgSlides);
    this.$texts = $(this.options.textSlides);
    this.proxy = $.proxy;
    this.first = true;
    this.current = 0;
    this.old = 0;

};
tatra.ScrollMotive.prototype = {

    constructor: tatra.ScrollMotive,

    init: function() {
        if (this.$images.length < 2 || this.$texts.length !== this.$images.length) {
            return;
        }

        this.$images
            .each(this.proxy(function(index, that) {
                var src = $(that).css('background-image').replace(/.*[^\(]\((.*[^\)])\)/, '$1').replace(/"|'/g, '');
                if (index == this.current) {
                    this.cache.push(src);
                }
                this.list.push(src);
            }, this))
            .show()
            .not(':eq(' + this.current + ')')
            .css('opacity', '0');

        this.$texts
            .addClass('out')
            .eq(this.current)
            .removeClass('out')
            .end()
            .show();

        this.length = this.$texts.length;
        this.preparePager();
        this.controlMenu();
        this.prepareImage();
    },
    prepareImage: function() {
        for (var i = 0, l = this.length; i < l; i++) {

            if (i != this.current) {
                $('<img />')
                    .bind('load', this.proxy(function(e) {
                        this.cache.push($(e.target).attr('src'));
                        if (this.cache.length == this.length) {
                            this.ready();
                        }
                    }, this))
                    .attr('src', this.list[i]);
            }
        }
    },
    preparePager: function() {
        var str = ''
        for (var i = 0, l = this.length; i < l; i++) {
            str += '<a href="#">' + (i + 1) + '</a>'
        }
        this.$pager = $('<p class="pager">' + str + '</p>').css('opacity', 0);
        this.$texts.last().after(this.$pager);
    },
    ready: function() {

        this.$pager
            .delegate('a', 'mousedown', this.proxy(this.menu, this))
            .delegate('a', 'click', function() {
                return false
            })
            .animate({
                'opacity': 1
            });

        this.resetInterval();
    },
    interval: function() {
        this.next();
    },
    resetInterval: function() {
        if (this.options.auto) {
            clearTimeout(this.mainTimer);
            this.mainTimer = setTimeout(this.proxy(this.interval, this), this.options.timeout);
        }
    },
    change: function() {
        this.resetInterval();
        this.controlMenu();

        this.$images
            .eq(this.current)
            .stop()
            .appendTo(this.$images.parent())
            .css({
                'opacity': '0'
            })
            .animate({
                'opacity': '1'
            }, 500)

        this.$texts
            .not(':eq(' + this.current + ')')
            .addClass('out')
            .end()
            .eq(this.current)
            .removeClass('out');

        this.old = this.current;
    },
    next: function() {
        this.current = (this.current + 1) % this.length;
        this.change();
    },
    menu: function(e) {
        this.current = parseInt($(e.target).text()) - 1;
        this.change();
    },
    controlMenu: function(e) {
        this.$pager
            .find('a')
            .removeClass('active')
            .filter(':eq(' + this.current + ')')
            .addClass('active');
    }
}