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
            $('.product-photo-big img').attr('src', curLink.attr('href'));
        }
        e.preventDefault();
    });

    $('.product-tabs-menu li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.product-tabs-menu li').index(curLi);
            $('.product-tabs-menu li.active').removeClass('active');
            curLi.addClass('active');
            $('.product-tab-content.active').removeClass('active');
            $('.product-tab-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.product-tabs-menu-prev').click(function(e) {
        var curIndex = $('.product-tabs-menu li').index($('.product-tabs-menu li.active'));
        curIndex--;
        if (curIndex < 0) {
            curIndex = $('.product-tabs-menu li').length - 1;
        }
        $('.product-tabs-menu li').eq(curIndex).find('a').click();
        e.preventDefault();
    });

    $('.product-tabs-menu-next').click(function(e) {
        var curIndex = $('.product-tabs-menu li').index($('.product-tabs-menu li.active'));
        curIndex++;
        if (curIndex > $('.product-tabs-menu li').length - 1) {
            curIndex = 0;
        }
        $('.product-tabs-menu li').eq(curIndex).find('a').click();
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
        arrows: false,
        centerMode: true,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: sliderPeriod,
        dots: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        speed: sliderSpeed
    }).on('afterChange', function(event, slick, currentSlide) {
        $('.slider-ctrl a span').stop(true, true).css({'width': 0});
        $('.slider-ctrl a.active').removeClass('active');
        $('.slider-ctrl a').eq(currentSlide).addClass('active');
        $('.slider-ctrl a.active span').animate({'width': '100%'}, sliderPeriod, 'linear');
    });
    $('.slider-ctrl a.active span').animate({'width': '100%'}, sliderPeriod, 'linear');

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
        arrows: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

});

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

    $('.product-photo-big-inner').css({'line-height': $('.product-photo-big-inner').height() + 'px'});
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
    $('html').addClass('window-open');

    if ($('.window').length > 0) {
        $('.window').remove();
    }

    $('.wrapper').append('<div class="window"><div class="window-loading"></div></div>')

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
    }
}

function resizeCatalogue(curList) {
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
}