$('.form__form').submit(function () {
    var form = $(this);
    var urlLk = form.attr('data-url-lk');
    sendForm(form, function (response) {
        form.html('<p>Вы успешно зарегистрированны, сейчас вы будете перенаправлены в личный кабинет.</p><br>\n\
<p>Если этого не произошло, нажмите на <a href="' + urlLk + '">ссылку</a></p>');
        window.location.href = urlLk;
    });
    return false;
});
