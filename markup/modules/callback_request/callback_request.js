$('#callback-request-form').submit(function () {
    sendForm($(this), function () {
        $('#callback-request-form').hide();
        $('.success_response').show();
        setTimeout(function () {
            $('.success_response').hide();
            $('#callback-request-form').show();
        }, 2000);
    });
    return false;
});