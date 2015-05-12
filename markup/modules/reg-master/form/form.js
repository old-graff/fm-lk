$('.form__form').submit(function () {
    var el = $(this);
    jQuery.ajax({
            url: el.attr('action'),
            data: el.serialize(),
            type: 'post',
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    document.location.href = data.redirect;
                } else {
                    el.html(data.content);
                }
            },
            cache: false
        });
    return false;
});