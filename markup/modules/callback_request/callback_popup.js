$('#callback-request-popup-form').submit(function () {
    sendForm($(this), function () {
        $('#callback-request-popup-form').hide();
        $('.success_response').show();
        setTimeout(function () {
            $.fancybox.close();
        }, 1500);
    });
    return false;
});