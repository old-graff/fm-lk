if ($('.master_list').length > 0) {
    var busy = false;
    var page = 1;
    $(window).scroll(function () {
        var masterList = $('.master_list');

        if ((($(window).height() + $(window).scrollTop()) >= (masterList.offset().top + masterList.height())) && !busy) {
            busy = true;
            page++;
            jQuery.ajax({
                url: masterList.attr('data-url'),
                type: masterList.attr('data-method'),
                dataType: 'json',
                data: {
                    page: page
                },
                beforeSend: function () {
                    $('.master_list__preloader').show();
                },
                success: function (response) {
                    if (!response.content) {
                        $('.master_list__preloader').before(response.content);
                        $('.master_list__preloader').hide();
                        master_minicard_preload();
                        busy = false;
                    } else {
                        $('.master_list__preloader').hide();
                        busy = false;
                    }
                }
            });
        }
    });
}