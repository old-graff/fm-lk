$('.js-filter-toggle-btn.active').click(function () {
    $(this).parent().find('.js-filter-toggle-section').slideToggle();
    $(this).find('.filter-section__arrow-icon').toggleClass('down');
    return false;
});
