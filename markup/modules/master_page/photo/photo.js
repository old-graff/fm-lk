$('.photo_slider').fotorama({
    allowfullscreen: true,
    nav: 'thumbs',
    width: '100%',
    height: 500
});
$('.js-photo-album').click(function () {
    var photo = $('.master_page_photo');
    var id = $(this).attr('data-id');
    var container = $('#album' + id + ' .photo_slider');
    if ($.trim(container.html()) == '') {
        jQuery.ajax({
            url: photo.attr('data-url'),
            type: photo.attr('data-method'),
            dataType: 'html',
            data: {
                id: id
            },
            success: function (response) {
                container.html(response);
            }
        });
    }
    $(this).parents('.master_page_photo').find('.master_page_photo__album_content').hide();
    $(this).siblings().removeClass('active');
    $(this).toggleClass('active');

    if ($('.js-photo-album').hasClass('active')) {
        $('#album' + id).show();
    }

});