$('#recovery_password-form').submit(function () {
    sendForm($(this).attr('action'), $(this).attr('method'), $(this).attr('id'),
        function (response) {
            $('#recovery_password-form').html('<p class="recovery_password-block__success-msg">Пароль выслан на указанный телефон и Email</p>');
        });
    return false;
});

$('.reload-link a').click(function(){
    jQuery.ajax({
        url: $(this).attr('href'),
        type: 'get',
        dataType: 'json'
    });
    return false;
});

