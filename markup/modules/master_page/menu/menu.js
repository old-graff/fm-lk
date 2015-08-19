$(window).on('scroll', function () {
    if ($(window).scrollTop() > 460) {
        $('.js-menu-fix').addClass('master_page_menu_fix');
    } else {
        $('.js-menu-fix').removeClass('master_page_menu_fix');
    }
});
$('.master_page_menu__link').on('click', function () {
    $('.master_page_menu__link').removeClass('master_page_menu__link_active');
    $(this).addClass('master_page_menu__link_active');
});