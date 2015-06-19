$('a.js-scrollto[href^=#]').each(function() {
    var $target = $(this.hash);

    $(this).on('click', function() {
        if($target.length > 0) {
            $('html, body').animate({ scrollTop: $target.offset().top }, 'slow');
        }
        return false;
    });
});

//// запрос на валидацию формы
//function sendForm(url, method, form_id, successHandler) {
//    jQuery.ajax({
//        url: url,
//        type: method,
//        dataType: 'json',
//        data: jQuery('#' + form_id).serialize(),
//        success: function (response) {
//            if (response.success) {
//                successHandler(response);
//            } else {
//                $('#' + form_id + ' .error-summary').remove();
//                $('#' + form_id).prepend('<div class="error-summary format">' + response.errorSummary + '</div>');
//                $('#' + form_id + ' .error').removeClass('.error');
//                for (var k in response.fields) {
//                    $('[name="' + response.object + '[' + k + ']"]').addClass('error');
//                }
//            }
//        },
//        error: function (response) {
//            $('#' + form_id + ' .error-summary').remove();
//            $('#' + form_id).prepend('<div class="error-summary format">Ошибка при отправке формы, попробуйте еще раз.</div>');
//        },
//        cache: false
//    });
//};
// запрос на валидацию формы
function sendForm(form_DOM, successHandler, errorHandler) {
    jQuery.ajax({
        url: form_DOM.attr('action'),
        type: form_DOM.attr('method'),
        dataType: 'json',
        data: form_DOM.serialize(),
        success: function (response) {
            if (response.success) {
                successHandler(response);
            } else {
                form_DOM.find('.error-summary').remove();
                form_DOM.prepend('<div class="error-summary format">' + response.errorSummary + '</div>');
                form_DOM.find('.error').removeClass('.error');
                for (var k in response.fields) {
                    form_DOM.find('[name="' + response.object + '[' + k + ']"]').addClass('error');
                }
                if(errorHandler){
                    errorHandler(response);
                }
            }
        },
        error: function (response) {
            form_DOM.find('.error-summary').remove();
            form_DOM.prepend('<div class="error-summary format">Ошибка при отправке формы, попробуйте еще раз.</div>');
        },
        cache: false
    });
};