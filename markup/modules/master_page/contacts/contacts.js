$('.js-contacts-show').click(function () {
    $(this).hide();
    $(this).parent().find('.js-contacts-content').show();
    yandexGoal_showPhone($(this).attr('data-id'));
});
$('.js-callback-popup').click(function () {
    var form = $('.callback_popup');
    if (form.length > 0) {
        $.fancybox.open(form, {
            padding: 0
        });
    }
});