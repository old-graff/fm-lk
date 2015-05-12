$('a.js-scrollto[href^=#]').each(function() {
    var $target = $(this.hash);

    $(this).on('click', function() {
        if($target.length > 0) {
            $('html, body').animate({ scrollTop: $target.offset().top }, 'slow');
        }
        return false;
    });
});