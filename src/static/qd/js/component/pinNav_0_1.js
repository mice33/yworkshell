/**
 * @fileOverview
 * @author yangye
 * Created: 16-04-13
 */
LBF.define('site.component.pinNav_0_1', function (require, exports, module) {
    var $ = require('lib.jQuery');

    var report = {};
    var envType = g_data.envType;
    var pageId = g_data.pageId;

    var pinTopNav = {
        init: function () {
            // 处理导航交互：固定、显示隐藏
            this.pinTopNav();
        },
        /**
         * 处理导航交互：固定、显示隐藏
         * @methed pinTopNav
         */
        pinTopNav: function () {
            var PinNav = $('#pin-nav');
            var PinSearch = $('#pin-search');
            var PinInput = $('#pin-input');

            //判断滚动条位置显示固定导航
            function showPinNav() {
                if ($(window).scrollTop() > 500) {
                    PinNav.addClass('show');
                } else {
                    PinNav.removeClass('show');
                }
            }

            //滚动事件显示固定导航
            $(window).scroll(function () {
                showPinNav();
            });

            //页面刷新后再次判断显示顶部导航
            showPinNav();

            //固定滚动条hover事件
            PinNav.on('mouseenter', '.site-nav li, li.sign-in', function () {
                $('#pin-nav').find('li').removeClass('act');
                $(this).addClass('act');
            });
            PinNav.on('mouseleave','li', function () {
                $(this).removeClass('act');
            });

            PinSearch.mouseenter(function () {
                if (PinInput.hasClass('hide')) {
                    PinInput.animate({width: '150px', opacity: '1'},'fast').removeClass('hide');
                }
            });
            PinSearch.click(function () {
                if (PinInput.val() == '') {
                    PinInput.val(PinInput.attr('placeholder'))
                }
                //判断域名是否是搜索页，是的话当前页面搜索，否则跳转带值跳搜索页
                if (g_data.domainSearch == location.hostname) {
                    location.href = '//' + g_data.domainSearch + '?kw=' + encodeURIComponent(PinInput.val());
                } else {
                    // 事件触发超链接的方案，window.open是千万不能用的！
                    var url = '//' + g_data.domainSearch + '?kw=' + encodeURIComponent(PinInput.val());
                    var el = document.createElement("a");
                    document.body.appendChild(el);
                    el.href = url;
                    el.target = '_blank';
                    el.click();
                    document.body.removeChild(el);
                }

                //$(this).attr('href', url);
                return true;
            });

            // 支持enter键搜索
            PinInput.on('keydown', function (evt) {
                if (evt.keyCode == 13) {
                    //判断值是否是空，是空去取placeholder值后带着值传给搜索页
                    if (PinInput.val() == '') {
                        PinInput.val(PinInput.attr('placeholder'))
                    }
                    //判断域名是否是搜索页，是的话当前页面搜索，否则跳转带值跳搜索页
                    if (g_data.domainSearch == location.hostname) {
                        location.href = '//' + g_data.domainSearch + '?kw=' + encodeURIComponent(PinInput.val());
                    } else {
                        // 事件触发超链接的方案，window.open是千万不能用的！
                        var url = '//' + g_data.domainSearch + '?kw=' + encodeURIComponent(PinInput.val());
                        var el = document.createElement("a");
                        document.body.appendChild(el);
                        el.href = url;
                        el.target = '_blank';
                        el.click();
                        document.body.removeChild(el);
                    }
                }
            });

            //简单搜索失去焦点时滑动隐藏
            $(document).on("click", function (e) {
                var target = $(e.target);
                if (target.closest('#pin-input, #pin-search').length == 0) {
                    PinInput.stop().animate({width: "40px", opacity: '0'},'fast').addClass('hide');
                }
            });
        }
    };
    pinTopNav.init();
});