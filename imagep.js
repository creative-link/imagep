/**
 * Javascript broken image placeholder library
 * @author Babykin Vadim <creativelink@ya.ru>
 */
var imagep = (function () {
    'use strict';
    var lib = {},
        minWidth = 70,
        minHeight = 40,
        style = {},
        complete = false,
        compiledStyle = '';

    /**
     * Fit text to block size
     * @param elem - block with text
     * @param width - element max width
     */
    var fitText = function (elem, width) {
        width = elem.width || width;
        var min = Math.min(width / 6, parseFloat(45));
        elem.style['font-size'] = Math.max(min, parseFloat(7)) + 'px';
    };

    /**
     * Placeholder Initialization
     * @param options
     */
    lib.initPlaceholder = function (options) {
        minWidth = options.minWidth || minWidth;
        minHeight = options.minHeight || minHeight;
        style = {};
        complete = false;
        compiledStyle = setStyle(options.style);
        // Processing all images on page
        var images = document.getElementsByTagName('img');
        for (var i=0;i<images.length;++i) {
            var plImage = new Image();
            plImage.onerror = imageError(images[i], plImage);
            plImage.src = images[i].src;
            complete = (i == images.length - 1);
        }
    };

    /**
     * Styling our placeholder
     * @param customStyle
     * @returns {string} - css style string
     */
    var setStyle = function (customStyle) {
        // For default style
        style['background-color'] = '#eee';
        style['text-align'] = 'center';
        style['vertical-align'] = 'middle';
        style.color = '#bbb';
        style.cursor = 'default';
        style.margin = '1px';
        // For custom style
        if (style !== undefined) {
            Object.keys(customStyle).forEach(function (key) {
                style[key] = customStyle[key];
            });
        }
        // Compiling style
        var styleString = '';
        Object.keys(style).forEach(function (key) {
            styleString += key + ':' + style[key] + ';';
        });
        return styleString;
    };

    /**
     * Processing broken image
     * @param image - image HTML-element
     * @param instance - js image object
     */
    var imageError = function (image, instance) {
        var wait = setInterval(function () {
            if (complete === true) {
                clearInterval(wait);

                image.width = image.width < minWidth ? minWidth : image.width;
                image.height = image.height < minHeight ? minHeight : image.height;

                var elem = createPlaceholder(image);
                image.parentNode.replaceChild(elem, image);
                instance = null;
            }
        }, 100);
    };

    /**
     * Creating and return HTML-placeholder
     * @param img - source image
     * @returns {HTMLElement}
     */
    var createPlaceholder = function (img) {
        var elem = document.createElement("div"),
            h = img.height,
            w = img.width;
        // Set div style
        elem.setAttribute("style", compiledStyle + "width:" + w + 'px;height:' + h + 'px;line-height:' + h + 'px;');
        // Set div text
        elem.innerHTML = w + " x " + h;
        fitText(elem, w);
        return elem;
    };

    return lib;
})();

