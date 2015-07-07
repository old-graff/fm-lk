$('.js-album-slider').slick({
    arrows: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 3
});
$('.js-photo-view').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: '.js-photo-slider'
});
$('.js-photo-slider').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.js-photo-view',
    centerMode: true,
    adaptiveHeight: true,
    focusOnSelect: true,
    arrows: false
});
$('.js-photo-album').click(function () {
    var photo = $('.master_page_photo');
    var id = $(this).attr('data-id');
    //проверка есть ли в блоке уже фотки ??
    //если есть не нужно грузить их заново
    jQuery.ajax({
        url: photo.attr('data-url'),
        type: photo.attr('data-method'),
        dataType: 'html',
        data: {
            id: id
        },
        success: function (response) {
            $('#album' + id).find('.js-photo-view').slick('slickAdd', response).slick('slickRemove', 0);
            $('#album' + id).find('.js-photo-slider').slick('slickAdd', response);
        }
    });
    $(this).parents('.master_page_photo').find('.master_page_photo__album_content').hide();
    $(this).siblings().removeClass('active');
    $(this).toggleClass('active');

    if ($('.js-photo-album').hasClass('active')) {
        $('#album' + id).show();
        $('.js-photo-view').slick('setPosition');
        $('.js-photo-slider').slick('setPosition');
    }

});