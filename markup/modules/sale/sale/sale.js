$('.js-open-sale').on('click', function () {
    $.fancybox.open($(this).attr('href'), {
        padding: 0,
        maxWidth: 400,
        helpers: {
            overlay: {
                locked: false
            }
        }
    });
    return false;
});