!function(n){"use strict";function o(){n(".project-wrap").length&&n(".project-wrap").each(function(){function e(e){e.isotope({filter:"*",itemSelector:".project-item",percentPosition:!0,animationOptions:{duration:750,easing:"liniar",queue:!1}})}var i=n(this),t=i.find(".project-filter").find("a");i.children().find(".isotope-container").imagesLoaded(function(){e(i.children().find(".isotope-container"))}),n(window).load(function(){e(i.children().find(".isotope-container"))}),t.click(function(){var e=n(this).attr("data-filter");return t.removeClass("active"),n(this).addClass("active"),i.find(".isotope-container").isotope({filter:e,animationOptions:{duration:750,easing:"liniar",queue:!1}}),!1})})}var s,r={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return r.Android()||r.BlackBerry()||r.iOS()||r.Opera()||r.Windows()}},l={iOS:function(){return navigator.userAgent.match(/iPad/i)},any:function(){return l.iOS()}};n(function(){function e(){n("#slideshow").imagesLoaded(function(){if(n(window).width()<=1024){var e=n(".slide-item:first-of-type").height();n(".sydney-hero-area, #slideshow").height(e)}else n(".sydney-hero-area").css("height","auto")})}var a,i;function t(){if(n(".sydney-video.vid-lightbox .video-overlay").hasClass("popup-show")){var e=n(".sydney-video.vid-lightbox .video-overlay.popup-show");if(e.find("iframe").hasClass("yt-video"))var i=e.find("iframe").attr("src").replace("&autoplay=1","");else i=e.find("iframe").attr("src").replace("?autoplay=1","");e.find("iframe").attr("src",i),e.removeClass("popup-show")}}n(".slides-container .slide-item").addClass("sliderFix"),setTimeout(function(){n(".slides-container .slide-item").removeClass("sliderFix")},200),n("#slideshow").length&&n("#slideshow").superslides({play:n("#slideshow").data("speed"),animation:"fade",pagination:!1}),"responsive"===n("#slideshow").data("mobileslider")&&(n(document).ready(e),n(window).resize(function(){setTimeout(function(){e()},50)})),n(function(){n('.mainnav a[href*="#"], a.roll-button[href*="#"], .smoothscroll[href*="#"], .smoothscroll a[href*="#"]').on("click",function(e){var i=this.hash,t=n(i);if(t.length)return e.preventDefault(),n("html, body").stop().animate({scrollTop:t.offset().top-70},900,"swing"),n("#mainnav-mobi").length&&n("#mainnav-mobi").hide(),!1})}),function(){if(n(".site-header").length){var i=n(".site-header").offset().top;n(window).on("load scroll",function(){var e=n(this).scrollTop();i<=e?(n(".site-header").addClass("fixed"),n("body").addClass("siteScrolled")):(n(".site-header").removeClass("fixed"),n("body").removeClass("siteScrolled")),107<=e?n(".site-header").addClass("float-header"):n(".site-header").removeClass("float-header")})}}(),n().owlCarousel&&n(".roll-testimonials").owlCarousel({navigation:!1,pagination:!0,responsive:!0,items:1,itemsDesktop:[3e3,1],itemsDesktopSmall:[1400,1],itemsTablet:[970,1],itemsTabletSmall:[600,1],itemsMobile:[360,1],touchDrag:!0,mouseDrag:!0,autoHeight:!0,autoPlay:n(".roll-testimonials").data("autoplay")}),n().owlCarousel&&n(".roll-team:not(.roll-team.no-carousel)").owlCarousel({navigation:!1,pagination:!0,responsive:!0,items:3,itemsDesktopSmall:[1400,3],itemsTablet:[970,2],itemsTabletSmall:[600,1],itemsMobile:[360,1],touchDrag:!0,mouseDrag:!0,autoHeight:!1,autoPlay:!1}),a="desktop",n(window).on("load resize",function(){var e="desktop";if(matchMedia("only screen and (max-width: 1024px)").matches&&(e="mobile"),e!==a)if("mobile"===(a=e)){var i=n("#mainnav").attr("id","mainnav-mobi").hide(),t=n("#mainnav-mobi").find("li:has(ul)");n("#header").find(".header-wrap").after(i),t.children("ul").hide();t.children("a").after('<span class="btn-submenu"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"/></svg></span>'),n(".btn-menu").removeClass("active")}else{var o=n("#mainnav-mobi").attr("id","mainnav").removeAttr("style");o.find(".submenu").removeAttr("style"),n("#header").find(".col-md-10").append(o),n(".btn-submenu").remove()}}),n(".btn-menu").on("click",function(){n("#mainnav-mobi").slideToggle(300),n(this).toggleClass("active")}),n(document).on("click","#mainnav-mobi li .btn-submenu",function(e){n(this).toggleClass("active").next("ul").slideToggle(300),e.stopImmediatePropagation()}),n(".toggle-popup").on("click",function(e){e.preventDefault(),n(this).siblings().addClass("popup-show");var i=n(this).siblings().find("iframe").attr("src");-1!==i.indexOf("youtube.com")?(n(this).siblings().find("iframe")[0].src+="&autoplay=1",n(this).siblings().find("iframe").addClass("yt-video")):-1!==i.indexOf("vimeo.com")&&(n(this).siblings().find("iframe")[0].src+="?autoplay=1",n(this).siblings().find("iframe").addClass("vimeo-video"))}),n(document).keyup(function(e){27==e.keyCode&&t()}),n(".sydney-video.vid-lightbox .video-overlay").on("click",function(){t()}),n(".sydney-video.vid-lightbox").parents(".panel-row-style").css({"z-index":"12",overflow:"visible"}),n("body").fitVids({ignore:".crellyslider-slider"}),null!=l.any()&&n(".slides-container .slide-item").css("background-attachment","scroll"),null==(s=r.any())&&n(".panel-row-style, .slide-item").parallax("50%",.3),n(".widget_fp_social a").attr("target","_blank"),n(window).scroll(function(){800<n(this).scrollTop()?n(".go-top").addClass("show"):n(".go-top").removeClass("show")}),n(".go-top").on("click",function(){return n("html, body").animate({scrollTop:0},1e3),!1}),o(),s=r.iOS(),n(window).on("load",function(){n("#wp-custom-header").fitVids(),n(".fluid-width-video-wrapper").siblings("#wp-custom-header-video-button").css("opacity","0"),null!=s&&(n("#wp-custom-header-video-button").css("opacity","0"),n("#wp-custom-header-video").prop("controls",!0))}),i=n(".site-header").outerHeight(),n(".header-clone").css("height",i),n(window).resize(function(){var e=n(".site-header").outerHeight();n(".header-clone").css("height",e)}),n(".preloader").css("opacity",0),setTimeout(function(){n(".preloader").hide()},600)})}(jQuery);