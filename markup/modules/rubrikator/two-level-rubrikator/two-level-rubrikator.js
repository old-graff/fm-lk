$('.js-rubrika-list').click(function () {
    $(this).parent().find('.rubrika-list__list').toggle();
});
$('.js-rubrika-collapsed').click(function () {
    var cl = 'master-rubrikator-page';
    var cl_col = cl + '_collapsed';
    var el = $('.master-rubrikator-page');

    if (el.hasClass(cl_col)) {
        el.removeClass(cl_col);
        $('.rubrika-list__list').show();
        $(this).find('.rubrika-list__name').html('Свернуть все рубрики')
        .end().find('.rubrika-list__icon').addClass('rubrika-list__icon_rotate');
    } else {
        el.addClass(cl_col);
        $('.rubrika-list__list').hide();
        $(this).find('.rubrika-list__name').html('Развернуть все рубрики')
        .end().find('.rubrika-list__icon').removeClass('rubrika-list__icon_rotate');
    }
});