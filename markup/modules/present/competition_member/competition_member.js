$('.js-present-competition-work').click(function () {
    var current = $(this).attr('href');
    var photos = [];
    $(current).find('.js-present-competition-work-photo').each(function () {
        var photo = {};
        photo.href = $(this).attr('src');
        photo.title = $(this).attr('alt');
        photos.push(photo);
    });
    $.fancybox.open(photos, {
        prevEffect: 'none',
        nextEffect: 'none',
        helpers: {
            title: {
                type: 'inside'
            },
            thumbs: {
                width: 50,
                height: 50,
                position: 'top'
            }
        }
    });
});
$('.js-present-competition-vote').click(function () {
    var id = $(this).parent().attr('data-id');
    jQuery.ajax({
        url: $(this).attr('href'),
        type: 'get',
        dataType: 'json',
        data: {
            id: id
        },
        success: function (response) {
            if (response.count) {
                $('.js-present-competition-vote').hide();
                $('[data-id="' + id + '"]').find('.present_competition_member__score').html(response.count);
                $('.js-present-competition-score').show();
            }
        }
    });
    return false;
});

if ($('.js-present-competition-vote').parents('.voted')) {
    $('.js-present-competition-vote').hide();
    $('.js-present-competition-score').show();
}

