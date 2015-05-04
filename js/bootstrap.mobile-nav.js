
/*
 * Mobile Nav Plugin for Twitter Bootstrap 3
 * 
 * Copyright (c) 2015 Adam J De Lucia
 * Licensed under the MIT License.
 * http://opensource.org/licenses/MIT
 * 
 * Author: Adam J De Lucia
 * Version: 1.0.1
 * Date: May 5, 2015
 * 
 */

(function ($) {
    $.fn.mobileNav = function (options) {
        this.each(function () {
            var settings = $.extend({
                navCollapse: '.navbar-collapse',
                navCollapseMinBreakpoint: 768,
                closeMobileNavLI: '#nav-btn-out',
                closeMobileNavBtn: 'a'
            }, options);

            $(settings.navCollapse).on("shown.bs.collapse", function () {
                $('<div class="modal-backdrop"></div>').appendTo($('body'));
            });

            $(settings.navCollapse).on("hidden.bs.collapse", function () {
                $(".modal-backdrop").remove();
            });

            $(settings.closeMobileNavLI).on("click", settings.closeMobileNavBtn, function (e) {
                e.preventDefault();

                $(settings.navCollapse).collapse("hide");
            });

            $(window).resize(function () {
                clearTimeout(resizeTimer);
                var resizeTimer = setTimeout(hideMobileNav, 250);
            });

            function hideMobileNav() {
                if ($(window).width() >= settings.navCollapseMinBreakpoint) {
                    $(settings.closeMobileNavLI + ' ' + settings.closeMobileNavBtn).trigger('click');
                }
            }
        });
    };
}(jQuery));
