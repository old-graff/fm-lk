$('.form__form').submit(function () {
    var form = $(this);
    sendForm(form, function (response) {
        form.html('<p>Вы успешно зарегистрированны, сейчас вы будете перенаправлены в личный кабинет.</p>');
    });
    return false;
});
