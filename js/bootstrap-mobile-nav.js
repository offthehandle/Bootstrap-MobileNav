
/*
 * Mobile Nav Plugin for Twitter Bootstrap 3
 * 
 * Copyright (c) 2015 Adam J De Lucia
 * Licensed under the MIT License.
 * http://opensource.org/licenses/MIT
 * 
 * Author: Adam J De Lucia
 * Version: 1.2.0
 * Date: November 8, 2015
 * 
 */

(function ($) {
    $.fn.mobileNav = function (options) {
        this.each(function () {
            var settings = $.extend({
                collapsingNavEl: '.navbar-collapse',
                mobileNavLink: '.nav-btn',
                hideMobileNavBtnParent: '#nav-btn-out',
                hideMobileNavBtn: 'a',
                navbarToggleHidden: 768,
                hideBackdropOn: 'hidden',
                showBackdropOn: 'shown',
                hideMobileNavOnNavBtnClick: false,
                hideMobileNavOnResizeDelay: 250
            }, options);

            // Handles hide mobile nav button click
            $(settings.hideMobileNavBtnParent).on('click', settings.hideMobileNavBtn, function (e) {
                e.preventDefault();

                // Protects hide event from firing on resize when nav is already collapsed
                // Bootstrap will trigger shown.bs.collapse event on hide when hide is called on a collapsed nav
                if ($(settings.collapsingNavEl).hasClass('in')) {
                    $(settings.collapsingNavEl).collapse('hide');
                }
            });

            // Dismisses mobile nav on nav button click
            // Handles same-page links in mobile nav
            if (settings.hideMobileNavOnNavBtnClick) {
                $(settings.collapsingNavEl).on('click', settings.mobileNavLink, function () {
                    $(settings.hideMobileNavBtnParent).find(settings.hideMobileNavBtn).trigger('click');
                });
            }

            // Appends backdrop on mobile nav show/shown event
            $(settings.collapsingNavEl).on(settings.showBackdropOn + '.bs.collapse', function () {
                $('<div class="modal-backdrop"></div>').appendTo($('body'));
            });

            // Removes backdrop on mobile nav hide/hidden event
            $(settings.collapsingNavEl).on(settings.hideBackdropOn + '.bs.collapse', function () {
                $('.modal-backdrop').remove();
            });

            // Optimizes resize event performance
            $(window).resize(function () {
                clearTimeout(resizeTimer);
                var resizeTimer = setTimeout(hideMobileNav, settings.hideMobileNavOnResizeDelay);
            });

            // Optimizes mobile nav performance
            // Used to automatically hide mobile nav when moving from mobile to desktop state
            function hideMobileNav() {
                if ($(window).width() >= settings.navbarToggleHidden) {
                    $(settings.hideMobileNavBtnParent).find(settings.hideMobileNavBtn).trigger('click');
                }
            }
        });
    };
}(jQuery));
