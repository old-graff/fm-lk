$('#feedback-form').submit(function () {
    sendForm($(this).attr('action'), $(this).attr('method'), 'feedback-form',
        function (response) {
            $('#feedback-form').html('<p class="feedback-block__success-msg">Ваше сообщение отправленно</p>');
        });
    return false;
});