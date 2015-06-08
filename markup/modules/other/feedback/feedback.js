$('#feedback-form').submit(function() {
    sendForm($(this), function(response) {
        $('#feedback-form').html('<p class="feedback-block__success-msg">Ваше сообщение отправленно</p>');
    });
    return false;
});