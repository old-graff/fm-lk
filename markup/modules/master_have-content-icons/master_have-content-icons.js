$(document).on('mouseenter', '.master_content-icon.exist', function (e) {
    var x = e.pageX + 20;
    var y = e.pageY - 10;
    var name = $(this).attr('data-nameLink');
    if ($('.tooltip').length == 0) {
        $('body').prepend('<span class=\"tooltip\" style=\"z-index:2;position:absolute;margin-left:' + x + 'px;margin-top:' + y + 'px\">' + name + '</span>');
    }
});
$(document).on('mouseleave', '.master_content-icon.exist', function (e) {
    $('.tooltip').remove();
});
