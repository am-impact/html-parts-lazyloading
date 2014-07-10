var FW = FW || {};

/**
 * Lazyloading
 *
 * Gebaseerd op: http://css-tricks.com/snippets/javascript/lazy-loading-images/
 * lazyload.js (c) Lorenzo Giuliani
 */
(function(window, $, undefined) {
    'use strict';

    var options;

    /**
     * Constructor
     */
    function LazyLoad() {
        options = {};
        options.images = null;
        options.query = null;

        initialize();
    }

    /* -----------------
     * Public functions
     ------------------- */
    /* Array opnieuw opbouwen, bijv na Ajax call */
    LazyLoad.prototype.rebuildLazyloadImages = function() {
        buildImagesArray();
        processScroll();
    }


    /* ------------------
     * Private functions
     -------------------- */
    function initialize() {
        buildImagesArray();

        processScroll();
        addEventListener('scroll',processScroll);
    }

    function loadImage (el, fn) {
        var img = new Image(),
            src = el.getAttribute('data-src');

        img.onload = function() {
            if (!! el.parent)
                el.parent.replaceChild(img, el)
            else
                el.src = src;

            fn ? fn() : null;
        }

        img.src = src;
    }

    function elementInViewport(el) {
        var rect = el.getBoundingClientRect()

        return (
            rect.top >= 0
            && rect.left >= 0
            && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        )
    }

    function buildImagesArray() {
        options.images = new Array();
        options.query = $('img.lazy');

        for (var i = 0; i < options.query.length; i++) {
            options.images.push(options.query[i]);
        };
    }

    function processScroll() {
        for (var i = 0; i < options.images.length; i++) {
            if (elementInViewport(options.images[i])) {
                loadImage(options.images[i], function () {
                    options.images.splice(i, i);
                });
            }
        };
    }

    /**
     * Add to global scope
     */
    FW.LazyLoad = LazyLoad;
})(window, jQuery);