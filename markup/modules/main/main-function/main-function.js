$('.js-find-master').click(function () {
    if ($(this).parent().find('.catalogs').is(':hidden')) {
        $(this).parent().find('.catalogs').show();
        return false;
    }
});