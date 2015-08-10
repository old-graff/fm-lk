function servicesCut() {
    $('.js-services-cut').each(function () {
        while ($(this).height() > 170) {
            $(this).find('li').last().remove();
        }
    });
}
//@todo Доработать функцию обрезки услуг, для использования максимума свободного пространства

servicesCut();

function master_minicard_preload() {
    $('.js-content-icon-switch.active').each(function () {
        $(this).parents('.master_presentation')
            .find('.master_have-content-widget_' + $(this).attr('data-toggle'))
            .addClass('active');
    });
}

master_minicard_preload();

$(document).on('mouseenter', '.js-content-icon-switch.exist', function () {
    var current = $(this).attr('data-toggle');
    $(this).parents('.master_presentation').find('.active').removeClass('active')
        .end().find('.master_have-content-widget_' + current).addClass('active');
    $(this).addClass('active');
});

$(document).on('click', '.js-services-toggle', function () {
    $(this).hide();
    $(this).parents('.master_minicard').find('.master_services').slideDown();
    if ($(this).parent().find('.master_photo-and-contacts__to-page')) {
        $(this).parent().find('.master_photo-and-contacts__to-page').css('display', 'block');
    }
    return false;
});