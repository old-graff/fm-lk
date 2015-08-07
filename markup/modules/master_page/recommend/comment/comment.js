$('#comment_form').submit(function () {
        sendForm($(this),
            function () {
                $('.comment__fields').hide();
                $('.comment__success').show();
                setTimeout(function () {
                    $('.comment__success').hide();
                    $('.comment__fields').show();
                }, 3000);
            });
        return false;
    }
);

