var sliderPeriod = 5000;
var sliderSpeed  = 500;

$(document).ready(function() {

    $.validator.addMethod('maskPhone',
        function(value, element) {
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'Не соответствует формату'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('.menu-add-link').click(function(e) {
        var curPadding = $('.wrapper').width();
        $('.menu-add').toggleClass('open');
        $('html').toggleClass('open-menu-add');
        if ($('.menu-add').hasClass('open')) {
            curPadding = $('.wrapper').width() - curPadding;
            $('body').css({'padding-right': curPadding});
        } else {
            $('body').css({'padding-right': 0});
        }

        $('.menu-add').removeClass('open-sections');
        $('.menu-add-sections > ul > li.open').removeClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.menu-add').length == 0) {
            $('.menu-add').removeClass('open');
            $('html').removeClass('open-menu-add');
            $('.menu-add').removeClass('open-sections');
            $('.menu-add-sections > ul > li.open').removeClass('open');
            $('body').css({'padding-right': 0});
        }
    });

    $('.header-search-link').click(function(e) {
        $('.header-search').toggleClass('open');
        if ($('.header-search').hasClass('open')) {
            $('.header-search .form-input input').focus();
        }
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-search').length == 0) {
            $('.header-search').removeClass('open');
        }
    });

    $('.header-cart-window-hide').click(function(e) {
        $('.header-cart').removeClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-cart').length == 0) {
            $('.header-cart').removeClass('open');
        }
    });

    $('.header-cart-value').click(function(e) {
        if ($(window).width() < 1200) {
            $('.header-cart').toggleClass('open');
            e.preventDefault();
        }
    });

    $('.side-menu > ul > li').each(function() {
        var curLi = $(this);
        if (curLi.find('ul').length > 0) {
            curLi.find('> a').append('<span></span>');
        }
    });

    $('.side-menu > ul > li > a').click(function(e) {
        var curLi = $(this).parent();
        if (curLi.find('ul').length > 0) {
            curLi.toggleClass('active');
            e.preventDefault();
        }
    });

    $('.catalogue-sort-link').click(function(e) {
        $('.catalogue-sort').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.catalogue-sort').length == 0) {
            $('.catalogue-sort').removeClass('open');
        }
    });

    $('.catalogue-item-compare > a').click(function(e) {
        $(this).parents().filter('.catalogue-item').toggleClass('in-compare');
        e.preventDefault();
    });

    $('.catalogue-item-cart > a').click(function(e) {
        $(this).parents().filter('.catalogue-item').addClass('in-cart');
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('click', '.window-basket-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.catalogue-recommend').each(function() {
        var curBlock = $(this);
        var curHTML = '<ul>';
        curBlock.find('.recommend-tab').each(function() {
            if($(this).data('title') != undefined)
              curHTML += '<li><a href="#">' + $(this).data('title') + '</a></li>';
        });
        curHTML += '</ul>';
        if (curHTML != '<ul></ul>') {
            $('.catalogue-recommend').show();
            curBlock.find('.recommend-menu').prepend(curHTML);
            curBlock.find('.recommend-menu li:first').addClass('active');
            if (curBlock.find('.recommend-menu li').length > 0) {
                curBlock.find('.recommend-menu').show();
                switch (curBlock.find('.recommend-menu li').length) {
                    case 2:
                        curBlock.find('.recommend-menu').addClass('recommend-menu-2');
                        break;
                    case 3:
                        curBlock.find('.recommend-menu').addClass('recommend-menu-3');
                        break;
                    default:
                        break;
                }
            }
            curBlock.find('.recommend-tab:first').addClass('active');
        }
    });

    $('.catalogue-recommend').on('click', '.recommend-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.recommend-menu ul li').index(curLi);
            $('.recommend-menu ul li.active').removeClass('active');
            curLi.addClass('active');

            curLi.parent().parent().next().find('.recommend-tab.active').removeClass('active');
            curLi.parent().parent().next().find('.recommend-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.catalogue-text-more a').click(function(e) {
        $(this).parent().prev().toggleClass('open');
        e.preventDefault();
    });

    $('.product-photo-preview ul li a').click(function(e) {
        var curLink = $(this);
        var curLi = curLink.parent();
        if (!curLink.parent().hasClass('active')) {
            $('.product-photo-preview ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.product-photo-preview ul li').index(curLi);
            $('.product-photo-big a.active').removeClass('active');
            $('.product-photo-big a').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.product-order .btn-submit').click(function(e) {
        windowOpen($('.product-order form').attr('action'), $('.product-order form').serialize());
        e.preventDefault();
    });

    $('.product-order .btn-reset').click(function(e) {
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('.product-link-compare > a').click(function(e) {
        $(this).parent().toggleClass('active');
        e.preventDefault();
    });

    $('.product-link-delivery').click(function(e) {
        var curLink = $(this);
        $.ajax({
            url: curLink.attr('href'),
            dataType: 'html',
            cache: false
        }).done(function(html) {
            if ($('.product-links-window').length > 0) {
                $('.product-links-window').remove();
            }
            $('.product-links').append('<div class="product-links-window">' + html + '<a href="#" class="product-links-window-close"></a></div>');
            $('.product-links-window-scroll').jScrollPane({
                autoReinitialise: true
            });

            $('.product-links-window-close').click(function(e) {
                $('.product-links-window').remove();
                e.preventDefault();
            });

        });
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.product-links').length == 0) {
            $('.product-links-window').remove();
        }
    });

    $('.product-tabs-menu li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.product-tabs-menu li').index(curLi);
            $('.product-tabs-menu li.active').removeClass('active');
            curLi.addClass('active');
            $('.product-tab-content.active').removeClass('active');
            $('.product-tab-content').eq(curIndex).addClass('active');

            $('.product-tabs-menu').each(function() {
                var curMenu = $(this);
                var curLink = curMenu.find('li.active a');
                $('.product-tabs-menu-line').animate({'width': curLink.width(), 'left': curLink.offset().left - curMenu.offset().left});
            });
        }
        e.preventDefault();
    });

    $('body').on('click', '.product-photo-big-inner a', function(e) {
        var curArray = [];
        $('.product-photo-preview a').each(function() {
            curArray.push({src: $(this).attr('rel')});
        });
        var curIndex = $('.product-photo-preview li').index($('.product-photo-preview li.active'));
        $.fancybox.open(curArray, {
                baseTpl	: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                    '<div class="fancybox-bg"></div>' +
                    '<div class="fancybox-controls">' +
                        '<div class="fancybox-infobar">' +
                            '<button data-fancybox-previous class="fancybox-button fancybox-button--left" title="Предыдущая"></button>' +
                            '<div class="fancybox-infobar__body">' +
                                '<span class="js-fancybox-index"></span>&nbsp;/&nbsp;<span class="js-fancybox-count"></span>' +
                            '</div>' +
                            '<button data-fancybox-next class="fancybox-button fancybox-button--right" title="Следующая"></button>' +
                        '</div>' +
                        '<div class="fancybox-buttons">' +
                            '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="Закрыть (Esc)"></button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="fancybox-slider-wrap">' +
                        '<div class="fancybox-slider"></div>' +
                    '</div>' +
                    '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
                '</div>',
                slideShow : false,
                fullScreen : false,
                thumbs : false
            },
            curIndex
        );
        e.preventDefault();
    });

    $('.slider').each(function() {
        var curSlider = $(this);
        var curHTML = '';
        curSlider.find('.slider-item').each(function() {
            curHTML += '<a href="#"><span></span></a>';
        });
        $('.slider-ctrl').html(curHTML);
        $('.slider-ctrl a:first').addClass('active');
    });

    $('.slider-content').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        centerMode: true,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: sliderPeriod,
        dots: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        speed: sliderSpeed,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    variableWidth: false
                }
            }
        ]
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.slider-ctrl a span').stop(true, true).css({'width': 0});
        $('.slider-ctrl a.active').removeClass('active');
        $('.slider-ctrl a').eq(nextSlide).addClass('active');
        $('.slider-ctrl a.active span').animate({'width': '100%'}, sliderPeriod, 'linear');
    });
    $('.slider-ctrl a.active span').animate({'width': '100%'}, sliderPeriod, 'linear');

    $('body').on('click', '.slider-ctrl a', function(e) {
        var curIndex = $('.slider-ctrl a').index($(this));
        $('.slider-content').slick('slickGoTo', curIndex);
        e.preventDefault();
    });

    $('.brands-list-inner').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });

    $('.responses-item a').fancybox({
        baseTpl	: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
            '<div class="fancybox-bg"></div>' +
            '<div class="fancybox-controls">' +
                '<div class="fancybox-infobar">' +
                    '<button data-fancybox-previous class="fancybox-button fancybox-button--left" title="Предыдущая"></button>' +
                    '<div class="fancybox-infobar__body">' +
                        '<span class="js-fancybox-index"></span>&nbsp;/&nbsp;<span class="js-fancybox-count"></span>' +
                    '</div>' +
                    '<button data-fancybox-next class="fancybox-button fancybox-button--right" title="Следующая"></button>' +
                '</div>' +
                '<div class="fancybox-buttons">' +
                    '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="Закрыть (Esc)"></button>' +
                '</div>' +
            '</div>' +
            '<div class="fancybox-slider-wrap">' +
                '<div class="fancybox-slider"></div>' +
            '</div>' +
            '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
        '</div>',
        slideShow : false,
        fullScreen : false,
        thumbs : false
    });

    $('.responses-list').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('#changeDelivery').change(function(e) {
        var curValue = $(this).val();
        $('.order-delivery-item.active').removeClass('active');
        $('#delivery-' + curValue).addClass('active');
        recalcCart();
    });

    $('.order-comment-link a').click(function(e) {
        $('.order-comment-link').hide();
        $('.order-comment').css({'display': 'block'});
        e.preventDefault();
    });

    $('.basket-row-count input').on('spinstop', function(event, ui) {
        recalcCart();
    });

    /*
    $('.basket-delete a').click(function(e) {
        $(this).parents().filter('.basket-row').remove();
        recalcCart();
        e.preventDefault();
    });
    */

    $('.compare-list').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
        arrows: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    }).on('setPosition', function(slick) {
        $('.catalogue-list').each(function() {
            resizeCatalogue($(this));
        });
        $('.slick-dots').css({'top': $('.compare-list-wrap .catalogue-item-inner:first').outerHeight()});
    });

    $('.catalogue-filter-mobile-link').click(function(e) {
        $('html').toggleClass('filter-open');
        $(window).scrollTop(0);
        e.preventDefault();
    });

    $('.catalogue-header h1').click(function(e) {
        $('html').toggleClass('side-menu-open');
        $(window).scrollTop(0);
    });

    $('.side-menu-mobile-link').click(function(e) {
        $('html').removeClass('side-menu-open');
        e.preventDefault();
    });

    $('.faq-form-show a').click(function(e) {
        $('.faq-form-show').hide();
        $('.faq-form').show();
        e.preventDefault();
    });

    $('.faq-form-hide a').click(function(e) {
        $('.faq-form-show').show();
        $('.faq-form').hide();
        e.preventDefault();
    });

    $('.basket-order-link-mobile a').click(function(e) {
        $('.checkout').addClass('step-2');
        $('html, body').animate({scrollTop: $('.checkout').offset().top});
        e.preventDefault();
    });

    $('.checkout-step-1').click(function(e) {
        $('.checkout').removeClass('step-2');
        e.preventDefault();
    });

    $('.checkout-step-2').click(function(e) {
        $('.checkout').addClass('step-2');
        e.preventDefault();
    });

    $('.bx_filter_input_checkbox input').change(function() {
        var curField = $(this).parent();
        $('.bx_filter_input_checkbox.focus').removeClass('focus');
        curField.addClass('focus');
    });

    $('.menu-add-main li.menu-add-main-link a').click(function(e) {
        if ($(window).width() < 1200) {
            $('.menu-add').toggleClass('open-sections');
            $('.menu-add-sections > ul > li.open').removeClass('open');
            e.preventDefault();
        }
    });

    if ($(window).width() >= 1200) {
        var timerSections = null;

        $('.menu-add-main li.menu-add-main-link a').mouseover(function(e) {
            window.clearTimeout(timerSections);
            timerSections = null;
            $('.menu-add').addClass('open-sections');
        });

        $('.menu-add-main li.menu-add-main-link a').mouseout(function(e) {
            window.clearTimeout(timerSections);
            timerSections = null;
            timerSections = window.setTimeout(function() {
                $('.menu-add').removeClass('open-sections');
            }, 500);
        });

        $('.menu-add-sections').mouseover(function(e) {
            window.clearTimeout(timerSections);
            timerSections = null;
        });

        $('.menu-add-sections').mouseout(function(e) {
            window.clearTimeout(timerSections);
            timerSections = null;
            timerSections = window.setTimeout(function() {
                $('.menu-add').removeClass('open-sections');
            }, 500);
        });
    }

    $('.menu-add-sections > ul > li > a').click(function(e) {
        if ($(window).width() < 1200) {
            var curLi = $(this).parent();
            if (curLi.hasClass('open')) {
                curLi.removeClass('open');
            } else {
                $('.menu-add-sections > ul > li.open').removeClass('open');
                curLi.addClass('open');
            }
            e.preventDefault();
        }
    });

    if ($(window).width() >= 1200) {
        $('.menu-add-sections > ul > li').mouseover(function(e) {
            var curLi = $(this);
            $('.menu-add-sections > ul > li.open').removeClass('open');
            curLi.addClass('open');
        });

        $('.menu-add-sections > ul > li').mouseout(function(e) {
            var curLi = $(this);
            curLi.removeClass('open');
        });
    }

    $('.menu-add-section-close').click(function(e) {
        $('.menu-add-sections > ul > li.open').removeClass('open');
        e.preventDefault();
    });

    $('.menu-add-catalogue').jScrollPane({
        autoReinitialise: true
    });

    $('.menu-add-section-close-mobile').click(function(e) {
        $('.menu-add').removeClass('open-sections');
        e.preventDefault();
    });

});

$(window).on('load resize', function() {
    $('.menu-add-sections').css({'margin-left': $('.menu-add').offset().left});
    $('.menu-add-section').each(function() {
        var curHeight = $(window).height() - ($(this).find('.main-sections-item').height() + 40);
        $(this).find('.menu-add-catalogue').css({'max-height': curHeight + 'px', 'top': $(this).find('.main-sections-item').height() + 25});
    });
});

function recalcCart() {
    var curSumm = 0;
    $('.checkout-cart .basket-row').each(function() {
        var curRow = $(this);
        curSumm += Number(curRow.find('.basket-row-count input').val()) * Number(curRow.find('.basket-row-price span').html().replace(' ', ''));
    });
    var curDeliveryPrice = 0;
    if ($('.order-delivery-item.active').length > 0) {
        if ($('.order-delivery-item.active .delivery-price').length > 0) {
            curDeliveryPrice = Number($('.order-delivery-item.active .delivery-price').html());
        }
        if ($('.order-delivery-item.active .delivery-free').length > 0) {
            var curDeliveryFree = Number($('.order-delivery-item.active .delivery-free').html());
            if (curSumm >= curDeliveryFree) {
                curDeliveryPrice = 0;
            }
        }
    }

    $('#basket-price').html(String(curSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    $('#basket-delivery').html(String(curDeliveryPrice).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    var allSumm = curSumm + curDeliveryPrice + Number($('#basket-discount').html().replace(' ', ''));
    if ($('#basket-coupon-value').length > 0) {
        $('#basket-coupon-summ').html(String(-Math.round(allSumm * (Number($('#basket-coupon-value').html() / 100)))).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        allSumm += Number($('#basket-coupon-summ').html().replace(' ', ''));
    }
    if (allSumm < 0) {
        allSumm = 0;
    }
    $('#basket-summ').html(String(allSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
}

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
});

$(window).on('load resize', function() {
    $('.catalogue-list').each(function() {
        resizeCatalogue($(this));
    });

    $('.catalogue-text-wrap').each(function() {
        var curBlock = $(this);
        curBlock.removeClass('hidden open');
        if (curBlock.height() < curBlock.find('.catalogue-text-inner').height()) {
            curBlock.addClass('hidden');
        }
    });

    $('.product-photo-big-inner').css({'line-height': $('.product-photo-big-inner a').height() + 'px'});

    $('.product-tabs-menu').each(function() {
        var curMenu = $(this);
        var curLink = curMenu.find('li.active a');
        $('.product-tabs-menu-line').animate({'width': curLink.width(), 'left': curLink.offset().left - curMenu.offset().left});
    });
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});

    curForm.find('input[type="number"]').each(function() {
        var curBlock = $(this).parent();
        var curHTML = curBlock.html();
        curBlock.html(curHTML.replace(/type=\"number\"/g, 'type="text"'));
        curBlock.find('input').spinner();
        curBlock.find('input').keypress(function(evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 43 || charCode > 57)) {
                return false;
            }
            return true;
        });
    });

    curForm.find('.form-file input').change(function() {
        var curInput = $(this);
        var curField = curInput.parent().parent().parent().parent();
        curField.find('.form-file-name').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curField.find('label.error').remove();
        curField.removeClass('error');
    });

    if (curForm.hasClass('window-form')) {
        curForm.validate({
            ignore: '',
            invalidHandler: function(form, validatorcalc) {
                validatorcalc.showErrors();
                checkErrors();
            },
            submitHandler: function(form) {
                windowOpen($(form).attr('action'), $(form).serialize());
            }
        });
    } else {
        curForm.validate({
            ignore: '',
            invalidHandler: function(form, validatorcalc) {
                validatorcalc.showErrors();
                checkErrors();
            }
        });
    }
}

function checkErrors() {
    $('.form-input').each(function() {
        var curField = $(this).parent().parent();
        if (curField.find('input.error').length > 0 || curField.find('textarea.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0 || curField.find('textarea.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });

    $('.form-checkbox, .form-file').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });

    $('.form-select').each(function() {
        var curField = $(this).parent().parent();
        if (curField.find('select.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('select.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });
}

function windowOpen(linkWindow, dataWindow) {
    var curPadding = $('.wrapper').width();
    $('html').addClass('window-open');
    curPadding = $('.wrapper').width() - curPadding;
    $('body').css({'margin-right': curPadding + 'px'});

    if ($('.window').length > 0) {
        $('.window').remove();
    }

    $('body').append('<div class="window"><div class="window-loading"></div></div>')

    $.ajax({
        type: 'POST',
        url: linkWindow,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window').length > 0) {
            $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

            if ($('.window-container img').length > 0) {
                $('.window-container img').each(function() {
                    $(this).attr('src', $(this).attr('src'));
                });
                $('.window-container').data('curImg', 0);
                $('.window-container img').load(function() {
                    var curImg = $('.window-container').data('curImg');
                    curImg++;
                    $('.window-container').data('curImg', curImg);
                    if ($('.window-container img').length == curImg) {
                        $('.window-container').removeClass('window-container-load');
                        windowPosition();
                    }
                });
            } else {
                $('.window-container').removeClass('window-container-load');
                windowPosition();
            }

            $(window).resize(function() {
                windowPosition();
            });

            $('.window-close').click(function(e) {
                windowClose();
                e.preventDefault();
            });

            $('body').on('keyup', function(e) {
                if (e.keyCode == 27) {
                    windowClose();
                }
            });

            $('.window form').each(function() {
                initForm($(this));
            });

            $(document).click(function(e) {
                if ($(e.target).hasClass('window')) {
                    windowClose();
                }
            });
        }
    });
}

function windowPosition() {
    if ($('.window').length > 0) {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});

        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2, 'padding-bottom': 0});
        if ($('.window-container').height() > $('.window').height() - 60) {
            $('.window-container').css({'top': '30px', 'margin-top': 0, 'padding-bottom': 30});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
    }
}

function resizeCatalogue(curList) {
    if (curList.parents().filter('.recommend-tab').length > 0) {
        if ($(window).width() < 1200) {
            if (!curList.hasClass('slick-slider')) {
                curList.slick({
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    adaptiveHeight: true,
                    arrows: false,
                    dots: true,
                    responsive: [
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                centerMode: false,
                                variableWidth: false
                            }
                        }
                    ]
                });
            }
        } else {
            if (curList.hasClass('slick-slider')) {
                curList.slick('unslick');
            }
        }
    }

    curList.find('.catalogue-item-photo').css({'min-height': '0px'});

    curList.find('.catalogue-item-photo').each(function() {
        var curBlock = $(this);
        var curHeight = curBlock.height();
        var curTop = curBlock.offset().top;

        curList.find('.catalogue-item-photo').each(function() {
            var otherBlock = $(this);
            if (otherBlock.offset().top == curTop) {
                var newHeight = otherBlock.height();
                if (newHeight > curHeight) {
                    curBlock.css({'min-height': newHeight + 'px', 'line-height': newHeight + 'px'});
                } else {
                    otherBlock.css({'min-height': curHeight + 'px', 'line-height': newHeight + 'px'});
                }
            }
        });
    });

    curList.find('.catalogue-item-name').css({'min-height': 0 + 'px'});

    curList.find('.catalogue-item-name').each(function() {
        var curBlock = $(this);
        var curHeight = curBlock.height();
        var curTop = curBlock.offset().top;

        curList.find('.catalogue-item-name').each(function() {
            var otherBlock = $(this);
            if (otherBlock.offset().top == curTop) {
                var newHeight = otherBlock.height();
                if (newHeight > curHeight) {
                    curBlock.css({'min-height': newHeight + 'px'});
                } else {
                    otherBlock.css({'min-height': curHeight + 'px'});
                }
            }
        });
    });

    curList.find('.catalogue-item-ctrl').css({'min-height': 0 + 'px'});

    curList.find('.catalogue-item-ctrl').each(function() {
        var curBlock = $(this);
        var curHeight = curBlock.height();
        var curTop = curBlock.offset().top;

        curList.find('.catalogue-item-ctrl').each(function() {
            var otherBlock = $(this);
            if (otherBlock.offset().top == curTop) {
                var newHeight = otherBlock.height();
                if (newHeight > curHeight) {
                    curBlock.css({'min-height': newHeight + 'px'});
                } else {
                    otherBlock.css({'min-height': curHeight + 'px'});
                }
            }
        });
    });

    $('.side+.content .catalogue-recommend').each(function() {
        var curBlock = $(this);
        curBlock.css({'padding-top': '0px'});
        var curPadding = curBlock.offset().top - ($('.side').offset().top + $('.side').outerHeight());
        if (curPadding < 0) {
            curBlock.css({'padding-top': -curPadding + 'px'});
        }
    });

    $('.compare-list-sep').css({'top': curList.find('.catalogue-item-inner:first').outerHeight()});
    $('.compare-list-wrap .slick-dots').css({'top': curList.find('.catalogue-item-inner:first').outerHeight()});

    curList.find('.compare-info-row').css({'min-height': 0 + 'px'});

    curList.find('.compare-info-row').each(function() {
        var curBlock = $(this);
        var curHeight = curBlock.height();
        var curTop = curBlock.offset().top;

        curList.find('.compare-info-row').each(function() {
            var otherBlock = $(this);
            if (otherBlock.offset().top == curTop) {
                var newHeight = otherBlock.height();
                if (newHeight > curHeight) {
                    curBlock.css({'min-height': newHeight + 'px'});
                } else {
                    otherBlock.css({'min-height': curHeight + 'px'});
                }
            }
        });
    });

}