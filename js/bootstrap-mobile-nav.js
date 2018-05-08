
/*
 * Mobile Nav with support for Twitter Bootstrap 3 & 4
 * 
 * Description: Mobile Nav is a Bootstrap extension that provides a better, fat finger free UX in the mobile state.
 * 
 * Copyright (c) 2015 - 2018 Adam J. De Lucia
 * Licensed under the MIT License.
 * http://opensource.org/licenses/MIT
 * 
 * Author: Adam J. De Lucia
 * Version: 2.0.0-beta
 * Date: May 8, 2018
 */

(function ($) {
    $.fn.mobileNav = function (options) {

        this.each(function () {

            var settings = $.extend({
                collapse: '.navbar-collapse',
                backdropIn: 'shown',
                backdropOut: 'hidden',
                closeId: '#mn-close',
                closeBtn: 'a',
                minWidthHidden: 768,
                resizeDelay: 250,
                hideOnClick: false,
                onClickLink: '.mn-link'
            }, options);


            // Handles mobile nav close
            $(settings.closeId).on('click', settings.closeBtn, function (e) {
                e.preventDefault();

                // Only triggers close if mobile nav is open
                if ($(settings.collapse).hasClass('in') || $(settings.collapse).hasClass('show')) {

                    $(settings.collapse).collapse('hide');
                }
            });


            // Closes the nav when same-page bookmarks are clicked
            if (settings.hideOnClick) {

                $(settings.collapse).on('click', settings.onClickLink, function () {

                    $(settings.closeId).find(settings.closeBtn).trigger('click');
                });
            }


            // Adds backdrop between menu and site content on backdropIn
            $(settings.collapse).on(settings.backdropIn + '.bs.collapse', function () {

                $('<div class="modal-backdrop"></div>').appendTo($('body'));
            });

            // Removes backdrop on backdropOut
            $(settings.collapse).on(settings.backdropOut + '.bs.collapse', function () {

                $('.modal-backdrop').remove();
            });


            // Optimizes performance on resize
            var resizeTimer = null;

            $(window).resize(function () {

                if (resizeTimer !== null) {

                    clearTimeout(resizeTimer);
                }

                resizeTimer = setTimeout(onResize, settings.resizeDelay);
            });


            // Hides within given max-width on resize
            function onResize() {

                if (window.innerWidth >= settings.minWidthHidden) {

                    $(settings.closeId).find(settings.closeBtn).trigger('click');
                }
            }
        });
    };

}(jQuery));
