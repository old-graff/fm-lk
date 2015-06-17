function servicesCut() {
    $('.js-services-cut').each(function () {
        while ($(this).height() > 170) {
            $(this).find('li').last().remove();
        }
    });
};
//@todo Доработать функцию обрезки услуг, для использования максимума свободного пространства
servicesCut();
$('.js-content-icon-switch.active')
    .parents('.master_presentation')
    .find('.master_have-content-widget_' + $('.js-content-icon-switch.active').attr('data-toggle'))
    .addClass('active');

$('.js-content-icon-switch.exist').mouseenter(function () {
    var current = $(this).attr('data-toggle');
    $(this).parents('.master_presentation').find('.active').removeClass('active')
        .end().find('.master_have-content-widget_' + current).addClass('active');
    $(this).addClass('active');
});