var MobileNavDefaultSettings = (function () {
    function MobileNavDefaultSettings() {
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
    return MobileNavDefaultSettings;
}());
var MobileNavPlugin = (function () {
    function MobileNavPlugin(rootElement, options) {
        var _this = this;
        this.default = new MobileNavDefaultSettings();
        this.rootElement = rootElement;
        this.settings = $.extend(this.default.settings, options);
        $(this.settings.closeId).on('click', this.settings.closeBtn, function (e) {
            e.preventDefault();
            if ($(_this.settings.collapse).hasClass('in') || $(_this.settings.collapse).hasClass('show')) {
                $(_this.settings.collapse).collapse('hide');
            }
        });
        if (this.settings.hideOnClick) {
            $(this.settings.collapse).on('click', this.settings.onClickLink, function () {
                $(_this.settings.closeId).find(_this.settings.closeBtn).trigger('click');
            });
        }
        $(this.settings.collapse).on(this.settings.backdropIn + '.bs.collapse', function () {
            $('<div class="modal-backdrop"></div>').appendTo($('body'));
        });
        $(this.settings.collapse).on(this.settings.backdropOut + '.bs.collapse', function () {
            $('.modal-backdrop').remove();
        });
        var resizeTimer = null;
        $(window).resize(function () {
            if (resizeTimer !== null) {
                clearTimeout(resizeTimer);
            }
            resizeTimer = setTimeout(function () {
                _this.onResize();
            }, _this.settings.resizeDelay);
        });
    }
    MobileNavPlugin.prototype.onResize = function () {
        if (window.innerWidth >= this.settings.minWidthHidden) {
            $(this.settings.closeId).find(this.settings.closeBtn).trigger('click');
        }
    };
    return MobileNavPlugin;
}());
MobileNavPlugin.NAME = 'mobileNav';
(function ($) {
    $.fn[MobileNavPlugin.NAME] = function (options) {
        var _this = this;
        this.each(function () {
            new MobileNavPlugin(_this, options);
        });
    };
})(jQuery);
