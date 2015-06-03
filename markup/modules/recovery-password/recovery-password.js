$('#recovery-password-form').submit(function () {
    sendForm($(this).attr('action'), $(this).attr('method'), $(this).attr('id'),
        function (response) {
            $('#recovery-password-form').html('<p class="recovery-password-block__success-msg">Пароль выслан на указанный телефон и Email</p>');
        });
    return false;
});

$('.capcha__reload-link a').click(function () {
    jQuery.ajax({
        url: $(this).attr('href'),
        type: 'get',
        dataType: 'json',
        success: function (response) {
            if (response.url) {
                $('.capcha__code-img img').remove();
                $('.capcha__code-img').append('<img alt="capcha" src="' + response.url + '">');
            }
        }

    });
    return false;
});

