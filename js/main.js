$(document).ready(function () {

    $("#select-option").change(function () {
        var v = $(this).val();
        $(".filter-content-options").hide();
        $(".filter-content-options_" + v).fadeIn(300);
    });

    $('input,textarea').focus(function () {
        $(this).data('placeholder', $(this).attr('placeholder'))
        $(this).attr('placeholder', '');
    });

    $('input,textarea').blur(function () {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });
    /*--select---*/
    $(".select").selectmenu();
    /*--select--*/
    /*--tab--*/
    (function ($) {
        jQuery.fn.lightTabs = function (options) {

            var createTabs = function () {
                tabs = this;
                i = 0;

                showPage = function (i) {
                    $(tabs).children("div").children("div").hide();
                    $(tabs).children("div").children("div").eq(i).show();
                    $(tabs).children("ul").children("li").removeClass("active");
                    $(tabs).children("ul").children("li").eq(i).addClass("active");
                }

                showPage(0);

                $(tabs).children("ul").children("li").each(function (index, element) {
                    $(element).attr("data-page", i);
                    i++;
                });

                $(tabs).children("ul").children("li").click(function () {
                    showPage(parseInt($(this).attr("data-page")));
                });
            };
            return this.each(createTabs);
        };
    })(jQuery);
    /*--/tab--*/

    /*--carousel1--*/
    $('.responsive').slick({
        dots: true,
        infinite: false,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    /*--/carousel1--*/

    /*--carousel2--*/
    $('.responsive2').slick({
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    /*--/carousel2--*/

    /*--carousel3--*/
    $('.responsive3').slick({
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.wrap-container .filter-wrap .container-filter').css({'height': '20px'});
    $('.filter-wrap .filter-down-btn').click(function () {
        var filterDownBtn = $('.filter-wrap .filter-down-btn span').text();
        if (filterDownBtn == "Расширенный поиск") {
            $('.wrap-container .filter-wrap .container-filter').css({'height': 'auto'}, 500);
            $('.wrap-container .filter-wrap .container-filter').css({'overflow': 'inherit'});
        }
        else {
            $('.wrap-container .filter-wrap .container-filter').css({'height': '20px'}, 500);
            $('.wrap-container .filter-wrap .container-filter').css({'overflow': 'hidden'});
        }
    });
    $('.btn-show i.show-number').click(function () {
        $(this).prev().click();
    });
    /*--/carousel3--*/
    $('.filter-wrap .filter-down-btn').click(function () {
        $(this).toggleClass('active');

        if ($(this).hasClass('active')) {
            $(this).children('span').text('Cвернуть');
            $('.filter-wrap .filter-search-btn').fadeOut(100);
        }
        else {
            $(this).children('span').text('Расширенный поиск');
            $('.filter-wrap .filter-search-btn').fadeIn(600);
        }
    });
    $(document).click(function () {
        $('#select-option-menu li').unbind("click").click(function () {
            var option = $(this).text();//find('option:selected').val();
            if (option == 'Квартира') {
                $('.filter-content-options').fadeOut(0);
                $('.filter-content-options_0').fadeIn(0);
                $('.number-of-rooms .number-text').css({'display': 'block'});
                $('.number-of-rooms .number-values').css({'display': 'none'});
                $('.number-of-rooms').css({'display': 'block'});
                $('.number-of-rooms .number-value1').html('0');
                $('.number-of-rooms .number-value2').html('0');
                $('.number-of-rooms .val').html('');
                $('.number-of-rooms .name-option').text('комнат');
                $('.number-of-rooms .number-text').text('Кол-во комнат');
                $('.filter-column-right label.radio').removeClass('active').children('input').removeAttr("checked");
            }
            if (option == 'Коммерческое') {
                $('.filter-content-options').fadeOut(0);
                $('.filter-content-options_1').fadeIn(0);
                $('.number-of-rooms .number-text').css({'display': 'block'});
                $('.number-of-rooms .number-values').css({'display': 'none'});
                $('.number-of-rooms').css({'display': 'block'});
                $('.number-of-rooms .number-value1').html('0');
                $('.number-of-rooms .number-value2').html('0');
                $('.number-of-rooms .val').html(' м<sup>2</sup>');
                $('.number-of-rooms .name-option').text('');
                $('.number-of-rooms .number-text').text('Площадь');
                $('.filter-column-right label.radio').removeClass('active').children('input').removeAttr("checked");
            }
            if (option == 'Дом') {
                $('.filter-content-options').fadeOut(0);
                $('.filter-content-options_2').fadeIn(0);
                $('.number-of-rooms .number-text').css({'display': 'block'});
                $('.number-of-rooms .number-values').css({'display': 'none'});
                $('.number-of-rooms').css({'display': 'block'});
                $('.number-of-rooms .number-value1').html('0');
                $('.number-of-rooms .number-value2').html('0');
                $('.number-of-rooms .val').html(' м<sup>2</sup>');
                $('.number-of-rooms .name-option').text('');
                $('.number-of-rooms .number-text').text('Площадь');
                $('.filter-column-right label.radio').removeClass('active').children('input').removeAttr("checked");
            }

            if (option == 'Участок') {
                $('.filter-content-options').fadeOut(0);
                $('.filter-content-options_11').fadeIn(0);
                $('.number-of-rooms .number-text').css({'display': 'block'});
                $('.number-of-rooms .number-values').css({'display': 'none'});
                $('.number-of-rooms').css({'display': 'block'});
                $('.number-of-rooms .number-value1').text('0');
                $('.number-of-rooms .number-value2').text('0');
                $('.number-of-rooms .val').html('');
                $('.number-of-rooms .name-option').text('coт');
                $('.number-of-rooms .number-text').text('Площадь');
                $('.filter-column-right label.radio').removeClass('active').children('input').removeAttr("checked");
            }

            if (option == 'Паркинг') {
                $('.filter-content-options').fadeOut(0);
                $('.filter-content-options_4').fadeIn(0);
                $('.number-of-rooms .number-text').css({'display': 'block'});
                $('.number-of-rooms .number-values').css({'display': 'none'});
                $('.number-of-rooms').css({'display': 'block'});
                $('.number-of-rooms .number-value1').html('0');
                $('.number-of-rooms .number-value2').html('0');
                $('.number-of-rooms .val').html(' м<sup>2</sup>');
                $('.number-of-rooms .name-option').text('');
                $('.number-of-rooms .number-text').text('Площадь');
                $('.filter-column-right label.radio').removeClass('active').children('input').removeAttr("checked");
            }

            if (option == 'Комната') {
                $('.filter-content-options').fadeOut(0);
                $('.filter-content-options_10').fadeIn(0);
                $('.number-of-rooms .number-text').css({'display': 'block'});
                $('.number-of-rooms .number-values').css({'display': 'none'});
                $('.number-of-rooms').css({'display': 'block'});
                $('.number-of-rooms .number-value1').text('0');
                $('.number-of-rooms .number-value2').text('0');
                $('.number-of-rooms .val').html(' м<sup>2</sup>');
                $('.number-of-rooms .name-option').text('');
                $('.number-of-rooms .number-text').text('Площадь');
                $('.filter-column-right label.radio').removeClass('active').children('input').removeAttr("checked");
            }

            if (option == 'Аренда гараж') {
                $('.filter-content-options').fadeOut(0);
                $('.filter-content-options_6').fadeIn(0);
                $('.number-of-rooms .number-text').css({'display': 'block'});
                $('.number-of-rooms .number-values').css({'display': 'none'});
                $('.number-of-rooms').css({'display': 'block'});
                $('.number-of-rooms .number-value1').html('0');
                $('.number-of-rooms .number-value2').html('0');
                $('.number-of-rooms .val').html(' м<sup>2</sup>');
                $('.number-of-rooms .name-option').text('');
                $('.number-of-rooms .number-text').text('Площадь');
                $('.filter-column-right label.radio').removeClass('active').children('input').removeAttr("checked");
            }

            if (option == 'Аренда ком') {
                $('.filter-content-options').fadeOut(0);
                $('.filter-content-options_7').fadeIn(0);
                $('.number-of-rooms .number-text').css({'display': 'block'});
                $('.number-of-rooms .number-values').css({'display': 'none'});
                $('.number-of-rooms').css({'display': 'block'});
                $('.number-of-rooms .number-value1').html('0');
                $('.number-of-rooms .number-value2').html('0');
                $('.number-of-rooms .val').html(' м<sup>2</sup>');
                $('.number-of-rooms .name-option').text('');
                $('.number-of-rooms .number-text').text('Площадь');
                $('.filter-column-right label.radio').removeClass('active').children('input').removeAttr("checked");
            }

            if (option == 'Аренда квартира') {
                $('.filter-content-options').fadeOut(0);
                $('.filter-content-options_8').fadeIn(0);
                $('.number-of-rooms .number-text').css({'display': 'block'});
                $('.number-of-rooms .number-values').css({'display': 'none'});
                $('.number-of-rooms').css({'display': 'block'});
                $('.number-of-rooms .number-value1').html('0');
                $('.number-of-rooms .number-value2').html('0');
                $('.number-of-rooms .val').html('');
                $('.number-of-rooms .name-option').text('комнат');
                $('.number-of-rooms .number-text').text('Кол-во комнат');
                $('.filter-column-right label.radio').removeClass('active').children('input').removeAttr("checked");
            }
            if (option == 'Аренда дом') {
                $('.filter-content-options').fadeOut(0);
                $('.filter-content-options_9').fadeIn(0);
                $('.number-of-rooms .number-text').css({'display': 'block'});
                $('.number-of-rooms .number-values').css({'display': 'none'});
                $('.number-of-rooms').css({'display': 'block'});
                $('.number-of-rooms .number-value1').html('0');
                $('.number-of-rooms .number-value2').html('0');
                $('.number-of-rooms .val').html(' м<sup>2</sup>');
                $('.number-of-rooms .name-option').text('');
                $('.filter-column-right label.radio').removeClass('active').children('input').removeAttr("checked");
            }
            if (option == 'Аренда комнаты') {
                $('.filter-content-options').fadeOut(0);
                $('.filter-content-options_10').fadeIn(0);
                $('.number-of-rooms .number-text').css({'display': 'block'});
                $('.number-of-rooms .number-values').css({'display': 'none'});
                $('.number-of-rooms').css({'display': 'block'});
                $('.number-of-rooms .number-value1').text('0');
                $('.number-of-rooms .number-value2').text('0');
                $('.number-of-rooms .val').html(' м<sup>2</sup>');
                $('.number-of-rooms .name-option').text('');
                $('.number-of-rooms .number-text').text('Площадь');
                $('.filter-column-right label.radio').removeClass('active').children('input').removeAttr("checked");
            }
            if (option == 'Аренда участка') {
                $('.filter-content-options').fadeOut(0);
                $('.filter-content-options_11').fadeIn(0);
                $('.number-of-rooms .number-text').css({'display': 'block'});
                $('.number-of-rooms .number-values').css({'display': 'none'});
                $('.number-of-rooms').css({'display': 'block'});
                $('.number-of-rooms .number-value1').text('0');
                $('.number-of-rooms .number-value2').text('0');
                $('.number-of-rooms .val').html('');
                $('.number-of-rooms .name-option').text('coт');
                $('.number-of-rooms .number-text').text('Площадь');
                $('.filter-column-right label.radio').removeClass('active').children('input').removeAttr("checked");
            }

        });
    });
    $(document).click(function () {
        $('#ui-id-3-menu li, #ui-id-5-menu li').unbind("click").click(function () {
            var option = $(this).text();//find('option:selected').val();
            if (option > 0) {
                $('.number-of-rooms .number-text').css({'display': 'none'});
                $('.number-of-rooms .number-values').css({'display': 'block'});
                $('.number-of-rooms .number-values .number-value1').text(option);
            }
            if (option == "5+") {
                $('.number-of-rooms .number-text').css({'display': 'none'});
                $('.number-of-rooms .number-values').css({'display': 'block'});
                $('.number-of-rooms .number-values .number-value1').text(option);
            }
        });

        $('#ui-id-2-menu li, #ui-id-4-menu li').unbind("click").click(function () {
            var option2 = $(this).text();//find('option:selected').val();
            if (option2 > 0) {
                $('.number-of-rooms .number-text').css({'display': 'none'});
                $('.number-of-rooms .number-values').css({'display': 'block'});
                $('.number-of-rooms .number-values .number-value2').text(option2);
                $('.number-sbOptions').slideUp();
            }
            if (option2 == "5+") {
                $('.number-of-rooms .number-text').css({'display': 'none'});
                $('.number-of-rooms .number-values').css({'display': 'block'});
                $('.number-of-rooms .number-values .number-value2').text(option2);
                $('.number-sbOptions').slideUp();
            }
        });
    });
    $(document).ready(function () {
        $(".value-price-wrap input.price-value1, .value-price-wrap input.price-value2").keydown(function (event) {

            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||

                (event.keyCode == 65 && event.ctrlKey === true) ||

                (event.keyCode >= 35 && event.keyCode <= 39)) {
                return;
            }
            else {
                if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault();
                }
            }
        });
    });
    function number_format(str) {
        return str.replace(/(\s)+/g, '').replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 ');
    }

    /*--autocomplit--*/
    (function ($) {
        $.widget("custom.combobox", {
            _create: function () {
                this.wrapper = $("<span>")
                    .addClass("custom-combobox")
                    .insertAfter(this.element);

                this.element.hide();
                this._createAutocomplete();
                this._createShowAllButton();
            },


            _createAutocomplete: function () {
                var selected = this.element.children(":selected"),
                    value = selected.val() ? selected.text() : "";

                this.input = $("<input>")
                    .appendTo(this.wrapper)
                    .val(value)
                    .attr("title", "")
                    .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
                    .autocomplete({
                        delay: 0,
                        minLength: 0,
                        source: $.proxy(this, "_source")
                    })
                    .tooltip({
                        tooltipClass: "ui-state-highlight"
                    });

                this._on(this.input, {
                    autocompleteselect: function (event, ui) {
                        ui.item.option.selected = true;
                        this._trigger("select", event, {
                            item: ui.item.option
                        });
                    },

                    autocompletechange: "_removeIfInvalid"
                });
            },

            _createShowAllButton: function () {
                var input = this.input,
                    wasOpen = false;

                $("<a>")
                    .attr("tabIndex", -1)
                    .attr("title", "Show All Items")
                    .tooltip()
                    .appendTo(this.wrapper)
                    .button({
                        icons: {
                            primary: "ui-icon-triangle-1-s"
                        },
                        text: false
                    })
                    .removeClass("ui-corner-all")
                    .addClass("custom-combobox-toggle ui-corner-right")
                    .mousedown(function () {
                        wasOpen = input.autocomplete("widget").is(":visible");
                    })
                    .click(function () {
                        input.focus();

                        // Close if already visible
                        if (wasOpen) {
                            return;
                        }

                        // Pass empty string as value to search for, displaying all results
                        input.autocomplete("search", "");
                    });
            },

            _source: function (request, response) {
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                response(this.element.children("option").map(function () {
                    var text = $(this).text();
                    if (this.value && ( !request.term || matcher.test(text) ))
                        return {
                            label: text,
                            value: text,
                            option: this
                        };
                }));
            },

            _removeIfInvalid: function (event, ui) {

                // Selected an item, nothing to do
                if (ui.item) {
                    return;
                }

                // Search for a match (case-insensitive)
                var value = this.input.val(),
                    valueLowerCase = value.toLowerCase(),
                    valid = false;
                this.element.children("option").each(function () {
                    if ($(this).text().toLowerCase() === valueLowerCase) {
                        this.selected = valid = true;
                        return false;
                    }
                });

                // Found a match, nothing to do
                if (valid) {
                    return;
                }

                // Remove invalid value
                this.input
                    .val("")
                    .attr("title", value + " didn't match any item")
                    .tooltip("open");
                this.element.val("");
                this._delay(function () {
                    this.input.tooltip("close").attr("title", "");
                }, 2500);
                this.input.autocomplete("instance").term = "";
            },

            _destroy: function () {
                this.wrapper.remove();
                this.element.show();
            }
        });
    })(jQuery);

    $(function () {
        $(".combobox").each(function () {
            var el = $(this);
            var list = el.parent().parent().find('.list');

            el.combobox();
            el.combobox({
                    select: function (event, ui) {
                        var el = $(event.target);
                        var list = el.parent().parent().find('.list');

                        var option = el.find('option:selected').val();


                        if (list.text().indexOf(option) == -1) {

                            var clone = '<li><span><i>' + option + '</i><a href="#" class="remove" onclick="var name =$(this).parent().parent().parent().parent().find(\'select\').attr(\'data-name\'); var v = $(\'input[name=\'+name+\']\').val(); v = v.replace($(this).parent().find(\'i\').text()+\';\',\'\');$(\'input[name=\'+name+\']\').val(v);$(this).parent().remove();"></a></span></li>';
                            list.append(clone);
                            var v = $('input[name=' + el.attr("data-name") + ']').val();
                            v += option + ';';
                            $('input[name=' + el.attr("data-name") + ']').val(v);


                        }

                        setTimeout(function () {
                            el.parent().find(".custom-combobox-input").val("");
                        }, 1);

                    }
                }
            );
            el.parent().find(".custom-combobox-input").val("");
            el.parent().find(".custom-combobox-input").attr("placeholder", el.attr("placeholder"));

        });


    });
    $("#toggle").click(function () {
        $("#combobox").toggle();
    });

    /*$('#combobox').each(function() {
     var option = $('#combobox').find('option:selected').val();
     $('.popup .list li span i').text(option);
     });*/

    /*$('.popup .list li .remove').on('click',function(){
     $(this).parent().remove();
     });*/


    /*--/autocomplit--*/
    $('.value-price-wrap input.price-value1, .value-price-wrap input.price-value2').keyup(function (event) {
        $(this).val(number_format($(this).val()));
    });
    $('.value-price-wrap input').focus(function () {
        $(this).next('ul.price-value-sbOptions').fadeIn();
    });
    $('.value-price-wrap input').blur(function () {
        $(this).next('ul.price-value-sbOptions').fadeOut();
    });
    $(document).click(function (event) {
        if ($(event.target).closest('.number-of-rooms,.number-sbOptions, #ui-id-4-menu li, #ui-id-5-menu li, #ui-id-2-menu li, #ui-id-3-menu li').length)
            return;
        $('.number-sbOptions').slideUp(170);
        event.stopPropagation();
    });
    $('.filter-column-right .span-type').click(function () {
        $(this).toggleClass('active');
    });

    /*--tabs--*/
    $(".tabs").lightTabs();
    /*--tabs--*/
    $(function () {
        $('.checkbox2').checkator();
    });

    /*--rooms--*/
    $('.number-of-rooms').each(function () {
        $(this).children('.number-values').css({display: 'none'});
    });

    $('.number-of-rooms i.sbToggle, .number-of-rooms .number-text').click(function () {
        $('.number-of-rooms').children('.number-sbOptions').slideToggle(170);
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {

        }
        else {
            $(this).parent().css({'border': '1px solid #C4E2EA'});
            $(this).parent().css({'borderTop': '1px solid #c5d2d6'});
        }
    });


    $('.select-area input').keyup(function () {
        $(this).next('.select-option').slideDown();
    });
    $('.select-area i.sbToggle').click(function () {
        $(this).parent().children('.select-option').slideToggle();
    });
    $(document).click(function (event) {
        if ($(event.target).closest('.select-area').length)
            return;
        $('.select-option').slideUp(170);
        event.stopPropagation();
    });
    /*--/rooms--*/
    /* $('.info-price-wrap .info-price-labe').click(function(){
     $(this).toggleClass('active');
     });*/
    $('.info-price-wrap .info-price-labe a').click(function (event) {
        event.preventDefault();
        //  $('.info-apartment-list').removeClass("active");
        // $(".ads-table-wrap .info-price-labe").removeClass("active");
        $(this).addClass("active");


        $('.info-apartment-list[data-id=' + $(this).parent().parent().parent().parent().parent().parent().index() + ']').find(".info-price-labe").addClass("active");
    });
    /*--price--*/
    $('.value-price-wrap .price-value i.sbToggle').click(function () {
        $(this).parent().children('.price-value-sbOptions').slideToggle(170);
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $(this).parent().css({'border': '1px solid #0b9dc6'});
        }
        else {
            $(this).parent().css({'border': '1px solid #C4E2EA'});
            $(this).parent().css({'borderTop': '1px solid #c5d2d6'});
        }
    });
    $('.value-price-wrap input').focus(function () {
        $(this).parent().css({'border': '1px solid #0b9dc6'});
    });
    $('.value-price-wrap input').blur(function () {
        $(this).parent().css({'border': '1px solid #C4E2EA'});
        $(this).parent().css({'borderTop': '1px solid #c5d2d6'});
    });
    $('.price-value .price-value-sbOptions li').click(function () {
        var $val = $(this).children('span').text();
        $(this).parent().parent().children('input').val($val);
        $(this).parent().slideUp(170);
        $('i.sbToggle').removeClass('active');
        $(this).parent().parent().css({'border': '1px solid #C4E2EA'});
        $(this).parent().parent().css({'borderTop': '1px solid #c5d2d6'});
    });
    $('.sort-list-apartment li span').click(function () {
        $(this).toggleClass('active');
    });
    $('.display-mode .display-mode-view').click(function () {
        $('.ads-table-wrap .map-address').css({'display': 'none'});
        $('.ads-table-wrap .ads-list').css({'display': 'block'});
        $('.ads-table-wrap .map-address').css({'display': 'none', 'opacity': '0', 'position': 'absolute'});
        if (!$(this).hasClass('active')) {
            $(this).toggleClass('active');
            $('.display-mode .display-mode-map').removeClass('active');
            if ($('.display-mode .display-mode-view').hasClass('active')) {
                $('.ads-table-wrap .ads-list').css({'zIndex': '7'});
                $('.banners').css({'zIndex': '8'});
                $('.banners, .pagination-wrap-table').css({'display': 'block'});
                $('.map-address').css({'zIndex': '3'});
            }
            else {
                $('.ads-table-wrap .ads-list').css({'zIndex': '3'});
                $('.banners').css({'zIndex': '4'});
            }
        }
        if (!$('.display-mode .display-mode-view').hasClass('active')) {
            $('.banners').css({'display': 'none'});
        }
    });
    $('.display-mode .display-mode-map').click(function () {
        $('.ads-table-wrap .map-address').css({'display': 'block', 'opacity': '1', 'position': 'relative'});
        $('.ads-table-wrap .ads-list').css({'display': 'none'});
        if (!$(this).hasClass('active')) {
            $(this).toggleClass('active');
            $('.display-mode .display-mode-view').removeClass('active');
            if($('.display-mode .display-mode-map').hasClass('active')){
                $('.map-address').css({'zIndex':'7'});
                $('.ads-table-wrap .ads-list').css({'zIndex':'3'});
                $('.banners, .pagination-wrap-table').css({'display':'none'});

            }
            else{
                $('.map-address').css({'zIndex':'3'});
                $('.banners, .pagination-wrap-table').css({'display':'block'});
            }
        }
        if (!$('.display-mode .display-mode-map').hasClass('active')) {
            $('.banners').css({'display': 'none'});
        }
    });

    $('.dop-office ul li').hover(function () {
        $('.dop-office ul li').removeClass('active');
        $(this).toggleClass('active');
    }, function () {
        $(this).removeClass('active');
    });
    /*--/price--*/


    //radio-2
    $(".filter-column-right-radio input[type=radio], .filter-content-options_0 input[type=radio], .filter-content-options_5 input[type=radio], .filter-content-options_8 input[type=radio], .filter-content-options_10 input[type=radio]").each(function () {
        var el = $(this), l = el.closest("label");
        if (el.attr("checked")) l.addClass("active");
        else l.removeClass("active");
    }).click(function () {
        var el = $(this), l = el.closest("label"), t = el.attr("type");
        if (t === "radio") {
            l.parent().find("label").removeClass("active");
            l.parent().find("input[type=radio]").removeAttr("checked");
        }
        if (el.attr("checked")) {
            el.removeAttr("checked");
            l.removeClass("active");
        } else {
            el.attr("checked", true);
            l.addClass("active");
        }

    });
    //radio
    $(".filter-column-right-no_radio  input[type=radio], .filter-content-options_3 input[type=radio], .filter-content-options_4 input[type=radio], .filter-content-options_6 input[type=radio], .filter-content-options_1 input[type=radio], .filter-content-options_7 input[type=radio], .filter-content-options_11 input[type=radio]").each(function () {
        var el = $(this), l = el.closest("label");
        if (el.attr("checked")) l.addClass("active");
        else l.removeClass("active");
    }).click(function () {
        var el = $(this), l = el.closest("label"), t = el.attr("type");
        if (el.attr("checked")) {
            el.removeAttr("checked");
            l.removeClass("active");
        } else {
            el.attr("checked", true);
            l.addClass("active");
        }

    });


    $('.filter-column-right label.radio').click(function (event) {
        if ($('.filter-column-right label.radio-all').hasClass('active')) {
            $(this).parent().children('label').not(this).removeClass('active');
            $(this).parent().children('label').not(this).children('input').removeAttr("checked");
        }
    });


    /*--map--*/
    var map;
    var map1;
    var map2;
    var image = new google.maps.MarkerImage('images/marker.png',
        new google.maps.Size(36, 45),
        new google.maps.Point(0, 0),
        new google.maps.Point(54.71948889999999, 20.484846500000003)
    );

    /*
     $(document).ready(function(){
     map = new GMaps({
     div: '#gomap2',
     scrollwheel: false,
     lat: 54.71948889999999,
     lng: 20.484846500000003
     });
     map.addMarker({
     lat: 54.71948889999999,
     lng: 20.484846500000003,
     icon: image,
     title: 'РОСТОВ-НА-ДОНУ',
     details: {
     database_id: 42,
     author: 'HPNeo'
     }
     });
     map.addMarker({
     lat: -12.042,
     lng: -77.028333,
     title: 'Marker with InfoWindow',
     infoWindow: {
     content: '<p>HTML Content</p>'
     }
     });


     map1 = new GMaps({
     div: '#gomap3',
     scrollwheel: false,
     zoom:12,
     lat: 54.7104264,
     lng: 20.4522144
     });
     map1.addMarker({
     lat: 54.7104264,
     lng: 20.4522144,
     icon: image,
     title: 'РОСТОВ-НА-ДОНУ',
     details: {
     database_id: 42,
     author: 'HPNeo'
     }
     });
     map1.addMarker({
     lat: -12.042,
     lng: -77.028333,
     title: 'Marker with InfoWindow',
     infoWindow: {
     content: '<p>HTML Content</p>'
     }
     });
     });
     */


    if ($('#gomap2').length) {

        var markers = [];

        function initialize4() {

            var myLatlng = new google.maps.LatLng(55.02480160288231, 82.92944544445794);
            var mapOptions = {
                zoom: 12,
                center: myLatlng,
                scrollwheel: false
            }
            
            var map = new google.maps.Map(document.getElementById("gomap2"), mapOptions);


            var locations = [
                ['<div class="dop-office-popup map-inform map-inform-num0"><p><span>Телефон</span> (4012) 77-70-05</p><p><span>Эл. почта</span> callcenter.invent@gmail.com</p><div class="time-job"><span>Режим работы</span><p>Офис открыт с&nbsp;9<sup>00</sup>&nbsp;до 19<sup>00</sup></p><p>с&nbsp;понедельника по&nbsp;пятницу,</p><p>c&nbsp;10<sup>00</sup>&nbsp;до&nbsp;16<sup>00</sup> в субботу.</p></div><img src="images/office-img1.jpg" class="img-office" alt=""></div>', 55.02480160288231, 82.92944544445794, 'images/marker.png'],
                ['<div class="dop-office-popup map-inform map-inform-num1"><p><span>Телефон</span> (4012) 77-70-05</p><p><span>Эл. почта</span> callcenter.invent@gmail.com</p><div class="time-job"><span>Режим работы</span><p>Офис открыт с&nbsp;9<sup>00</sup>&nbsp;до 19<sup>00</sup></p><p>с&nbsp;понедельника по&nbsp;пятницу,</p><p>c&nbsp;10<sup>00</sup>&nbsp;до&nbsp;16<sup>00</sup> в субботу.</p></div><img src="images/office-img1.jpg" class="img-office" alt=""></div>', 55.02480160288231, 82.82944544445794, 'images/marker.png'],
                ['<div class="dop-office-popup map-inform map-inform-num2"><p><span>Телефон</span> (4012) 77-70-05</p><p><span>Эл. почта</span> callcenter.invent@gmail.com</p><div class="time-job"><span>Режим работы</span><p>Офис открыт с&nbsp;9<sup>00</sup>&nbsp;до 19<sup>00</sup></p><p>с&nbsp;понедельника по&nbsp;пятницу,</p><p>c&nbsp;10<sup>00</sup>&nbsp;до&nbsp;16<sup>00</sup> в субботу.</p></div><img src="images/office-img1.jpg" class="img-office" alt=""></div>', 55.02780160288231, 82.97944544445794, 'images/marker.png'],
                ['<div class="dop-office-popup map-inform map-inform-num3"><p><span>Телефон</span> (4012) 77-70-05</p><p><span>Эл. почта</span> callcenter.invent@gmail.com</p><div class="time-job"><span>Режим работы</span><p>Офис открыт с&nbsp;9<sup>00</sup>&nbsp;до 19<sup>00</sup></p><p>с&nbsp;понедельника по&nbsp;пятницу,</p><p>c&nbsp;10<sup>00</sup>&nbsp;до&nbsp;16<sup>00</sup> в субботу.</p></div><img src="images/office-img1.jpg" class="img-office" alt=""></div>', 55.02080160288231, 82.99944544445794, 'images/marker.png'],
            ];


            var marker, i;


            var infowindow = new google.maps.InfoWindow();




            google.maps.event.addListener(map, 'click', function (event) {
                infowindow.close();
                for (var j = 0; j < markers.length; j++) {
                    markers[j].setIcon(images.oneOff);
                }
                $('.map-infowindow').remove();
            });

            for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map: map,
                    icon: locations[i][3],
                    num: i
                });
                var imagUrls = {
                    oneOn: 'images/marker2.png',
                    oneOff: 'images/marker.png'
                };

                var images = {
                    oneOn: new google.maps.MarkerImage(imagUrls.oneOn),
                    oneOff: new google.maps.MarkerImage(imagUrls.oneOff)
                };
                var time;
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {

                        infowindow.setContent(locations[i][0]);
                        infowindow.open(map, marker);
                        var iwOuter = $('#gomap2 .gm-style-iw');
                        var iwBackground = iwOuter.prev().remove();
                        iwOuter.parent().addClass('gm-info');
                        iwOuter.next().hide();
                        this.setIcon(images.oneOn);
                        for (var j = 0; j < markers.length; j++) {
                            if (i == j) continue;
                            if (markers[j].getAnimation()) markers[j].setAnimation(null);
                            markers[j].setIcon(images.oneOff);
                        }

                        clearTimeout(time);
                    }
                })(marker, i));

                google.maps.event.addListener(marker, 'click', (function (marker, i) {

                    return function () {
                        var infobox = new SmartInfoWindow({
                            position: marker.getPosition(),
                            map: map,
                            content: locations[i][0]
                        });
                    }
                })(marker, i));

                markers.push(marker);

                google.maps.event.addListener(marker, 'mouseover', function (event) {
                    this.setIcon(images.oneOn);
                    clearTimeout(time);

                   // this.setAnimation(google.maps.Animation.BOUNCE);
                });
                google.maps.event.addListener(marker, 'mouseout', function (event) {
                    this.setIcon(images.oneOff);
                    var el = this;
                    time = setTimeout(function () {
                        if (el.getAnimation() !== null) {
                            el.setAnimation(null);
                        }
                    }, 150);

                });



                google.maps.event.addListener(infowindow, 'closeclick', function (event) {
                    for (var j = 0; j < markers.length; j++) {
                        markers[j].setIcon(images.oneOff);
                    }
                });


            }


        }

        google.maps.event.addDomListener(window, 'load', initialize4);


        $(document).click(function (event) {
            if ($(event.target).closest('.map').length)
                return;
            $('#gomap2 .gm-style-iw').next().click();
            $('.map-infowindow').remove();
            event.stopPropagation();
        });

    }

    if ($('#gomap3').length) {

        var markers2 = [];

        function initialize2() {

            var myLatlng2 = new google.maps.LatLng(55.02480160288231, 82.92944544445794);
            var mapOptions2 = {
                zoom: 12,
                center: myLatlng2,
                scrollwheel: false
            }
            var map2 = new google.maps.Map(document.getElementById("gomap3"), mapOptions2);


            var locations2 = [
                ['<div class="dop-office-popup map-inform map-inform-2 map-inform-num0"><div class="image"><span>5 фото </span><img src="images/info-image.png" /></div><div class="info-apartment-list"><span class="name-company">Invent Realty</span><span class="info-apartment">2-комнатная 46 м<sup>2</sup>,<br>этаж 4 из 4</span><p>Колхозная улица, 33 ж/д ст. Кутузово-Новое, 0.70 км Кухня 11 м2, санузел раздельный, дом панельный, 2010г.</p><div class="info-price-wrap"><span class="info-price">2 900 000 Р</span><i class="info-price-labe" onclick="$(this).toggleClass(\'active\');  $(\'.info-apartment-list[data-id=0]\').find(\'.info-price-labe\').toggleClass(\'active\');"></i></div></div></div>', 55.02480160288231, 82.92944544445794, 'images/marker.png'],
                ['<div class="dop-office-popup map-inform map-inform-2 map-inform-num1"><div class="image"><span>5 фото </span><img src="images/info-image.png" /></div><div class="info-apartment-list"><span class="name-company">Invent Realty</span><span class="info-apartment">2-комнатная 46 м<sup>2</sup>,<br>этаж 4 из 4</span><p>Колхозная улица, 33 ж/д ст. Кутузово-Новое, 0.70 км Кухня 11 м2, санузел раздельный, дом панельный, 2010г.</p><div class="info-price-wrap"><span class="info-price">2 900 000 Р</span><i class="info-price-labe" onclick="$(this).toggleClass(\'active\');$(\'.info-apartment-list[data-id=1]\').find(\'.info-price-labe\').toggleClass(\'active\');"></i></div></div></div>', 55.02480160288231, 82.82944544445794, 'images/marker.png'],
                ['<div class="dop-office-popup map-inform map-inform-2 map-inform-num2"><div class="image"><span>5 фото </span><img src="images/info-image.png" /></div><div class="info-apartment-list"><span class="name-company">Invent Realty</span><span class="info-apartment">2-комнатная 46 м<sup>2</sup>,<br>этаж 4 из 4</span><p>Колхозная улица, 33 ж/д ст. Кутузово-Новое, 0.70 км Кухня 11 м2, санузел раздельный, дом панельный, 2010г.</p><div class="info-price-wrap"><span class="info-price">2 900 000 Р</span><i class="info-price-labe" onclick="$(this).toggleClass(\'active\'); $(\'.info-apartment-list[data-id=2]\').find(\'.info-price-labe\').toggleClass(\'active\');"></i></div></div></div>', 55.02780160288231, 82.97944544445794, 'images/marker.png'],
                ['<div class="dop-office-popup map-inform map-inform-2 map-inform-num3"><div class="image"><span>5 фото </span><img src="images/info-image.png" /></div><div class="info-apartment-list"><span class="name-company">Invent Realty</span><span class="info-apartment">2-комнатная 46 м<sup>2</sup>,<br>этаж 4 из 4</span><p>Колхозная улица, 33 ж/д ст. Кутузово-Новое, 0.70 км Кухня 11 м2, санузел раздельный, дом панельный, 2010г.</p><div class="info-price-wrap"><span class="info-price">2 900 000 Р</span><i class="info-price-labe" onclick="$(this).toggleClass(\'active\'); $(\'.info-apartment-list[data-id=3]\').find(\'.info-price-labe\').toggleClass(\'active\');"></i></div></div></div>', 55.02080160288231, 82.99944544445794, 'images/marker.png'],
            ];


            var marker2, i2;


            var infowindow2 = new google.maps.InfoWindow();


            google.maps.event.addListener(map2, 'click', function () {
                infowindow2.close();
                for (var j = 0; j < markers2.length; j++) {
                    markers2[j].setIcon(images.oneOff);
                }
            });
            var imagUrls = {
                oneOn: 'images/marker2.png',
                oneOff: 'images/marker.png'
            };
            var images = {
                oneOn: new google.maps.MarkerImage(imagUrls.oneOn),
                oneOff: new google.maps.MarkerImage(imagUrls.oneOff)
            };
            var time;
            for (i2 = 0; i2 < locations2.length; i2++) {
                marker2 = new google.maps.Marker({
                    position: new google.maps.LatLng(locations2[i2][1], locations2[i2][2]),
                    map: map2,
                    num: i2,
                    icon: locations2[i2][3]
                });

                google.maps.event.addListener(marker2, 'click', (function (marker2, i2) {
                    return function () {



                        infowindow2.setContent(locations2[i2][0]);
                        infowindow2.open(map2, marker2);
                        var iwOuter = $('#gomap3 .gm-style-iw');
                        var iwBackground = iwOuter.prev().remove();
                        iwOuter.parent().addClass('gm-info gm-info2');
                        iwOuter.next().remove();
                        for (var j = 0; j < markers2.length; j++) {
                            if (i2 == j) continue;
                            if (markers2[j].getAnimation() !== null) markers2[j].setAnimation(null);
                            markers2[j].setIcon(images.oneOff);

                        }
                        $('.info-apartment-list').removeClass("active");
                        //$(".ads-table-wrap .info-price-labe").removeClass("active");
                        $($('.ads-table-wrap .ads-list')[i2]).find(".info-price-labe").addClass("active");
                        $('.info-apartment-list[data-id=' + i2 + ']').addClass("active");
                        if ($('.info-apartment-list[data-id=' + i2 + ']').find('.info-price-labe').hasClass("active")) {
                            $(".map-inform .info-price-labe").addClass("active");
                        }
                        clearTimeout(time);
                        marker2.setIcon(images.oneOn);


                    }
                })(marker2, i2));

                markers2.push(marker2);

                function my_fn(i) {
                    $('.dealers-page .wrap-colum ul li a').each(function () {
                        if ($(this).attr('data-id') == i) {
                            $('.dealers-page .wrap-colum ul li.active').removeClass('active');
                            $(this).parent().addClass('active');
                            return false;
                        }
                    })
                }






                google.maps.event.addListener(marker2, 'mouseover', function (event) {
                    this.setIcon(images.oneOn);clearTimeout(time);

                   // this.setAnimation(google.maps.Animation.BOUNCE);
                });
                google.maps.event.addListener(marker2, 'mouseout', function (event) {

                    this.setIcon(images.oneOff);
                    var el = this;

                        time = setTimeout(function () {
                            if (el.getAnimation() !== null) {
                                el.setAnimation(null);
                            }
                        }, 150);

                });


            }
            $('.info-apartment-list').hover(function () {
                var id = $(this).attr('data-id');

                if (markers2[id].getAnimation() !== null) {
                    markers2[id].setAnimation(null);
                }
               /* if (markers2[id].icon.url == "images/marker2.png") {

                    markers2[id].setIcon(images.oneOff);
                };*/

                for (var j = 0; j < markers2.length; j++) {
                    markers2[j].setIcon(images.oneOff);
                    if (markers2[j].getAnimation() !== null) markers2[j].setAnimation(null);
                }
                markers2[id].setIcon(images.oneOn)
                markers2[id].setAnimation(google.maps.Animation.BOUNCE);
                infowindow2.setContent(locations2[id][0]);
                infowindow2.open(map2, markers2[id]);
                var iwOuter = $('#gomap3 .gm-style-iw');
                var iwBackground = iwOuter.prev().remove();
                iwOuter.parent().addClass('gm-info gm-info2');
                iwOuter.next().remove();
            }, function () {
                var id = $(this).attr('data-id');

                if (markers2[id].getAnimation() !== null) {
                    markers2[id].setAnimation(null);
                    markers2[id].setIcon(images.oneOn);
                }
            });
        }

        google.maps.event.addDomListener(window, 'load', initialize2);


    }
    $('.maps-list-wrap .info-apartment-list').click(function () {
        $('.maps-list-wrap .info-apartment-list').removeClass('active');
        $(this).toggleClass('active');
    });
    $('.info-price-labe').click(function () {
        $(this).toggleClass('active');
        if ($(this).parent().parent().hasClass("active"))
            $(".map-inform .info-price-labe").toggleClass('active');
        return false;
    });

    if ($('#gomap4').length) {

        var markers3 = [];

        function initialize3() {

            var myLatlng3 = new google.maps.LatLng(55.02480160288231, 82.92944544445794);
            var mapOptions3 = {
                zoom: 12,
                center: myLatlng3,
                scrollwheel: false,
            }
            var map3 = new google.maps.Map(document.getElementById("gomap4"), mapOptions3);


            var locations3 = [
                ['<div class="dop-office-popup map-inform map-inform-3 map-inform-num0"><div class="info-apartment-list info-company"><div class="image"><img src="images/bank-logo3.png" alt="" /></div><p><a href="#"><b>ВТБ 24</b></a></p><p><b>Телефон</b></p><p>+7 911 567 87 43</p><p><b>Адрес</b></p><p>ж/д ст. Кутузово-Новое</p></div></div>', 55.02480160288231, 82.92944544445794, 'images/marker.png'],
                ['<div class="dop-office-popup map-inform map-inform-3 map-inform-num1"><div class="info-apartment-list info-company"><div class="image"><img src="images/bank-logo3.png" alt="" /></div><p><a href="#"><b>ВТБ 24</b></a></p><p><b>Телефон</b></p><p>+7 911 567 87 43</p><p><b>Адрес</b></p><p>ж/д ст. Кутузово-Новое</p></div></div>', 55.02480160288231, 82.82944544445794, 'images/marker.png'],
                ['<div class="dop-office-popup map-inform map-inform-3 map-inform-num2"><div class="info-apartment-list info-company"><div class="image"><img src="images/bank-logo3.png" alt="" /></div><p><a href="#"><b>ВТБ 24</b></a></p><p><b>Телефон</b></p><p>+7 911 567 87 43</p><p><b>Адрес</b></p><p>ж/д ст. Кутузово-Новое</p></div></div>', 55.02780160288231, 82.97944544445794, 'images/marker.png'],
                ['<div class="dop-office-popup map-inform map-inform-3 map-inform-num4"><div class="info-apartment-list info-company"><div class="image"><img src="images/bank-logo3.png" alt="" /></div><p><a href="#"><b>ВТБ 24</b></a></p><p><b>Телефон</b></p><p>+7 911 567 87 43</p><p><b>Адрес</b></p><p>ж/д ст. Кутузово-Новое</p></div></div>', 55.02080160288231, 82.99944544445794, 'images/marker.png'],
            ];


            var marker3, i3;


            var infowindow3 = new google.maps.InfoWindow();


            google.maps.event.addListener(map3, 'click', function () {
                infowindow3.close();
                for (var j = 0; j < markers2.length; j++) {
                    markers3[j].setIcon(images.oneOff);
                }
            });


            for (i3 = 0; i3 < locations3.length; i3++) {
                marker3 = new google.maps.Marker({
                    position: new google.maps.LatLng(locations3[i3][1], locations3[i3][2]),
                    map: map3,
                    icon: locations3[i3][3],
                    num: i3
                });
                var time;
                google.maps.event.addListener(marker3, 'click', (function (marker3, i3) {
                    return function () {

                        infowindow3.setContent(locations3[i3][0]);
                        infowindow3.open(map3, marker3);
                        var iwOuter = $('#gomap4 .gm-style-iw');
                        var iwBackground = iwOuter.prev().remove();
                        iwOuter.parent().addClass('gm-info gm-info3');
                        iwOuter.next().hide();
                        for (var j = 0; j < markers3.length; j++) {
                            if (i3 == j) continue;
                            markers3[j].setIcon(images.oneOff);
                            if (markers3[j].getAnimation() !== null) markers3[j].setAnimation(null);
                        }

                    }
                })(marker3, i3));

                markers3.push(marker3);

                var imagUrls = {
                    oneOn: 'images/marker2.png',
                    oneOff: 'images/marker.png'
                };
                var images = {
                    oneOn: new google.maps.MarkerImage(imagUrls.oneOn),
                    oneOff: new google.maps.MarkerImage(imagUrls.oneOff)
                };



                google.maps.event.addListener(marker3, 'mouseover', function (event) {
                    this.setIcon(images.oneOn); clearTimeout(time);

                  //  this.setAnimation(google.maps.Animation.BOUNCE);
                });
                google.maps.event.addListener(marker3, 'mouseout', function (event) {
                    this.setIcon(images.oneOff);
                    var el = this;
                    time = setTimeout(function () {
                        if (el.getAnimation() !== null) {
                            el.setAnimation(null);
                        }
                    }, 150);

                });





            }
            $('.info-apartment-list').hover(function () {
                var id = $(this).attr('data-id');
                if (markers3[id].getAnimation() !== null) {
                    markers3[id].setAnimation(null);
                }

                /*if (markers3[id].icon.url == "images/marker2.png") {
                    markers3[id].setIcon(images.oneOff);
                };*/
                for (var j = 0; j < markers3.length; j++) {
                    markers3[j].setIcon(images.oneOff);
                    if (markers3[j].getAnimation() !== null) markers3[j].setAnimation(null);
                }
                markers3[id].setIcon(images.oneOn);
                markers3[id].setAnimation(google.maps.Animation.BOUNCE);
                infowindow3.setContent(locations3[id][0]);
                infowindow3.open(map3, markers3[id]);
                var iwOuter = $('#gomap4 .gm-style-iw');
                var iwBackground = iwOuter.prev().remove();
                iwOuter.parent().addClass('gm-info gm-info3');
                iwOuter.next().remove();
            }, function () {
                var id = $(this).attr('data-id');
                if (markers3[id].getAnimation() !== null) {
                    markers3[id].setAnimation(null);
                    markers3[id].setIcon(images.oneOn);
                }
            });
        }

        google.maps.event.addDomListener(window, 'load', initialize3);


        /*$('.info-apartment-list').click(function(){
         var id = $(this).attr('data-id');
         google.maps.event.trigger(markers3[id], 'click');
         }, function(){
         var id = $(this).attr('data-id');
         google.maps.event.trigger(markers3[id], 'click');
         })*/

    }

    if ($('#gmap-popup').length) {
        var mapr;
        var markers = [];

        function initializeG() {

            var myLatlng = new google.maps.LatLng(55.02480160288231, 82.92944544445794);
            var mapOptions = {
                zoom: 12,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                mapTypeControl: false,
                panControl: false,
                streetViewControl: false,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.LEFT_CENTER
                }
            }
            mapr = new google.maps.Map(document.getElementById("gmap-popup"), mapOptions);


        }

        google.maps.event.addDomListener(window, 'load', initializeG);

    }

    if ($('#gomap6').length) {

        var markers = [];

        function initialize() {

            var myLatlng = new google.maps.LatLng(55.02480160288231, 82.92944544445794);
            var mapOptions = {
                zoom: 12,
                center: myLatlng,
                scrollwheel: false,
            }
            var map = new google.maps.Map(document.getElementById("gomap6"), mapOptions);


            var locations = [
                ['<div class="dop-office-popup map-inform map-inform-num0"><p><span>Телефон</span> (4012) 77-70-05</p><p><span>Эл. почта</span> callcenter.invent@gmail.com</p><div class="time-job"><span>Режим работы</span><p>Офис открыт с&nbsp;9<sup>00</sup>&nbsp;до 19<sup>00</sup></p><p>с&nbsp;понедельника по&nbsp;пятницу,</p><p>c&nbsp;10<sup>00</sup>&nbsp;до&nbsp;16<sup>00</sup> в субботу.</p></div><img src="images/office-img1.jpg" class="img-office" alt=""></div>', 55.02480160288231, 82.92944544445794, 'images/marker.png'],
                // ['<div class="dop-office-popup map-inform map-inform-num1"><p><span>Телефон</span> (4012) 77-70-05</p><p><span>Эл. почта</span> callcenter.invent@gmail.com</p><div class="time-job"><span>Режим работы</span><p>Офис открыт с&nbsp;9<sup>00</sup>&nbsp;до 19<sup>00</sup></p><p>с&nbsp;понедельника по&nbsp;пятницу,</p><p>c&nbsp;10<sup>00</sup>&nbsp;до&nbsp;16<sup>00</sup> в субботу.</p></div><img src="images/office-img1.jpg" class="img-office" alt=""></div>', 55.02480160288231, 82.82944544445794, 'images/marker.png'],
                // ['<div class="dop-office-popup map-inform map-inform-num2"><p><span>Телефон</span> (4012) 77-70-05</p><p><span>Эл. почта</span> callcenter.invent@gmail.com</p><div class="time-job"><span>Режим работы</span><p>Офис открыт с&nbsp;9<sup>00</sup>&nbsp;до 19<sup>00</sup></p><p>с&nbsp;понедельника по&nbsp;пятницу,</p><p>c&nbsp;10<sup>00</sup>&nbsp;до&nbsp;16<sup>00</sup> в субботу.</p></div><img src="images/office-img1.jpg" class="img-office" alt=""></div>', 55.02780160288231, 82.97944544445794, 'images/marker.png'],
                // ['<div class="dop-office-popup map-inform map-inform-num3"><p><span>Телефон</span> (4012) 77-70-05</p><p><span>Эл. почта</span> callcenter.invent@gmail.com</p><div class="time-job"><span>Режим работы</span><p>Офис открыт с&nbsp;9<sup>00</sup>&nbsp;до 19<sup>00</sup></p><p>с&nbsp;понедельника по&nbsp;пятницу,</p><p>c&nbsp;10<sup>00</sup>&nbsp;до&nbsp;16<sup>00</sup> в субботу.</p></div><img src="images/office-img1.jpg" class="img-office" alt=""></div>', 55.02080160288231, 82.99944544445794, 'images/marker.png'],
            ];


            var marker, i;


            var infowindow = new google.maps.InfoWindow();


            var imagUrls = {
                oneOn: 'images/marker2.png',
                oneOff: 'images/marker.png'
            };

            var images = {
                oneOn: new google.maps.MarkerImage(imagUrls.oneOn),
                oneOff: new google.maps.MarkerImage(imagUrls.oneOff)
            };

            google.maps.event.addListener(map, 'click', function (event) {
                infowindow.close();
                for (var j = 0; j < markers.length; j++) {
                    markers[j].setIcon(images.oneOff);
                }
                $('.map-infowindow').remove();
            });

            for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map: map,
                    icon: locations[i][3],
                    num: i
                });
                var time;

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {

                        infowindow.setContent(locations[i][0]);
                        infowindow.open(map, marker);
                        var iwOuter = $('#gomap6 .gm-style-iw');
                        var iwBackground = iwOuter.prev().remove();
                        iwOuter.parent().addClass('gm-info');
                        iwOuter.next().hide();

                        for (var j = 0; j < markers.length; j++) {
                            if (i == j) continue;
                            if (markers[j].getAnimation() !== null) markers[j].setAnimation(null);
                            markers[j].setIcon(images.oneOff);

                        }
                        clearTimeout(time);
                         marker.setIcon(images.oneOn);
                    }
                })(marker, i));

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        var infobox = new SmartInfoWindow({
                            position: marker.getPosition(),
                            map: map,
                            content: locations[i][0]
                        });
                    }
                })(marker, i));

                markers.push(marker);







                google.maps.event.addListener(marker, 'mouseover', function (event) {

                    this.setIcon(images.oneOn);
                    clearTimeout(time);
                   // this.setAnimation(google.maps.Animation.BOUNCE);
                });
                google.maps.event.addListener(marker, 'mouseout', function (event) {
                    this.setIcon(images.oneOff);
                    var el = this;

                        time = setTimeout(function () {
                            if (el.getAnimation() !== null) {
                                el.setAnimation(null);
                            }
                        }, 150);


                });

                google.maps.event.addListener(infowindow, 'closeclick', function (event) {
                    for (var j = 0; j < markers.length; j++) {
                        markers[j].setIcon(images.oneOff);
                    }
                });


            }


        }

        google.maps.event.addDomListener(window, 'load', initialize);


        $(document).click(function (event) {
            if ($(event.target).closest('.map').length)
                return;
            $('#gomap2 .gm-style-iw').next().click();
            $('.map-infowindow').remove();
            event.stopPropagation();
        });

    }

    /*--/map--*/

    $(function () {
        $('.jScrol-wrap').jScrollPane();
    });

    /*--/show pages--*/
    $('.show-in-list i.sbToggle, .show-in-list .list-number').click(function () {
        $(this).parent().children('.list-number-sbOptions').slideToggle(170);
        $(this).toggleClass('active');
    });
    $('.show-in-list .list-number-sbOptions li').click(function () {
        $('.show-in-list .list-number').text($(this).children('span').text());
        $('.list-number-sbOptions').slideToggle(170);
    })
    $(document).click(function (event) {
        if ($(event.target).closest('.show-in-list .number').length)
            return;
        $('.list-number-sbOptions').slideUp(170);
        event.stopPropagation();
    });
    /*
     $(document).click(function(event){
     if($(event.target).closest('.sbHolder').length)
     return;
     $('.sbOptions').slideUp(170);
     $('.sbToggle').removeClass('sbToggleOpen');
     event.stopPropagation();
     });*/
    /*--/Popup--*/
    /*$('.searchd-destrict').tabs({active: 0});*/
    /*select*/
    /*---------------------------------------------------------
     $(document).click(function(event){
     if($(event.target).closest('.number-of-rooms, .number-sbOptions').length)
     return;
     $('.number-of-rooms .number-sbOptions').slideUp(170);
     $('.number-of-rooms i.sbToggle').removeClass('active');
     event.stopPropagation();
     });
     */
    $(document).click(function (event) {
        if ($(event.target).closest('.value-price-wrap .price-value').length)
            return;
        $('.price-value .price-value-sbOptions').slideUp(170);
        $('.sbToggle.active').removeClass('active');
        event.stopPropagation();
    });
    $(document).ready(function () {

        $('.select-style').each(function () {
            var pl = $(this).attr('placeholder');
            $(this).SumoSelect({
                placeholder: pl
            });
            /*$(this).parent().children('.optWrapper').jScrollPane();*/
        })

        $('.CaptionCont.SlectBox').click(function () {
            $(this).next().jScrollPane();
        })

    })

    $('.tabs-link li a').click(function () {
        google.maps.event.trigger(mapr, 'resize');
    })

    $('.input-drop-list input').focusin(function () {
        var parl = $(this).parent();
        parl.children('.drop-list-select').fadeIn();
        parl.children('.drop-list-select').jScrollPane();
    })
    $('.input-drop-list input').focusout(function () {
        $(this).next().fadeOut();
    })
    $('.drop-list-select li').click(function () {
        $(this).closest('ul').prev().val($(this).text());
    })

    if ($(".various").length) {
        $(".various").fancybox({
            autoSize: false,
            padding: 0,
            scrolling: 'no',
            autoHeight: true,
            autoWidth: true,
            afterShow: function () {
                $('#gmap-popup').css('height', $('.fancybox-inner').height() - $('#searchd-destrict-map .popup-head').height());
                google.maps.event.trigger(mapr, "resize");
            }
        });

        $(window).resize(function () {
            setTimeout(function () {
                $('#gmap-popup').css('height', $('.fancybox-inner').height() - $('#searchd-destrict-map .popup-head').height());
                google.maps.event.trigger(mapr, "resize");
            }, 100)
        })

    }

    $('.roll-up').click(function () {
        $(this).next().slideToggle();
        $(this).toggleClass('active');
        var text = $(this).text();
        $(this).text(
            text == "Cвернуть" ? "Развернуть" : "Cвернуть");
    })

    if ($('.fancybox-thumb').length) {
        $(".fancybox-thumb").fancybox({
            helpers: {
                title: {
                    type: 'outside'
                },
                thumbs: {
                    width: 145,
                    height: 110
                }
            },
            afterShow: function () {
                $('.fancybox-overlay').addClass('thumb-gallery');
            }
        });
    }

});
$(window).load(function () {
    $(".filter-wrap").css("visibility", "visible");
});
