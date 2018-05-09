declare var $: any;

import { IMobileNavDefaultSettings, IMobileNavOptions } from './bootstrap.mobile-nav.d';

class MobileNavDefaultSettings implements IMobileNavDefaultSettings {

    public settings: IMobileNavOptions;


    constructor() {

        this.settings = {
            collapse: '.navbar-collapse',
            backdropIn: 'shown',
            backdropOut: 'hidden',
            closeId: '#mn-close',
            closeBtn: 'a',
            minWidthHidden: 768,
            resizeDelay: 250,
            hideOnClick: false,
            onClickLink: '.mn-link'
        };
    }
}

class MobileNavPlugin {

    public static NAME: string = 'mobileNav';


    private rootElement: JQuery;

    private default: IMobileNavDefaultSettings = new MobileNavDefaultSettings();

    private options: IMobileNavOptions;

    private settings: IMobileNavOptions;


    constructor(rootElement: JQuery, options: IMobileNavOptions) {

        this.rootElement = rootElement;

        this.settings = $.extend(this.default.settings, options);


        // Handles mobile nav close
        $(this.settings.closeId).on('click', this.settings.closeBtn, (e) => {
            e.preventDefault();

            // Only triggers close if mobile nav is open
            if ($(this.settings.collapse).hasClass('in') || $(this.settings.collapse).hasClass('show')) {

                $(this.settings.collapse).collapse('hide');
            }
        });


        // Closes the nav when same-page bookmarks are clicked
        if (this.settings.hideOnClick) {

            $(this.settings.collapse).on('click', this.settings.onClickLink, () => {

                $(this.settings.closeId).find(this.settings.closeBtn).trigger('click');
            });
        }


        // Adds backdrop between menu and site content on backdropIn
        $(this.settings.collapse).on(this.settings.backdropIn + '.bs.collapse', function () {

            $('<div class="modal-backdrop"></div>').appendTo($('body'));
        });

        // Removes backdrop on backdropOut
        $(this.settings.collapse).on(this.settings.backdropOut + '.bs.collapse', function () {

            $('.modal-backdrop').remove();
        });


        // Optimizes performance on resize
        let resizeTimer = null;

        $(window).resize(() => {

            if (resizeTimer !== null) {

                clearTimeout(resizeTimer);
            }

            resizeTimer = setTimeout(() => {

                this.onResize();

            }, this.settings.resizeDelay);
        });
    }


    // Hides on resize when min-width is reached
    private onResize() {

        if (window.innerWidth >= this.settings.minWidthHidden) {

            $(this.settings.closeId).find(this.settings.closeBtn).trigger('click');
        }
    }
}

(function ($: JQueryStatic) {

    $.fn[MobileNavPlugin.NAME] = function (options: IMobileNavOptions) {

        this.each(() => {

            new MobileNavPlugin(this, options);
        });
    };

})(jQuery);
