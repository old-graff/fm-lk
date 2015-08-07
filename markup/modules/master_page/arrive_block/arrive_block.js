$(window).on('scroll', function () {
    if ($(window).scrollTop() > 145) {
        $('.js-arrive_block-fix').addClass('arrive_block_fix');
    } else {
        $('.js-arrive_block-fix').removeClass('arrive_block_fix');
    }
});