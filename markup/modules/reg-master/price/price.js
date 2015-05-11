//$(document).ready(function(){
    //$('#tab').easyResponsiveTabs();
    $('#horizontalTab').easyResponsiveTabs({
        type: 'default', //Types: default, vertical, accordion
        width: 'auto', //auto or any width like 600px
        tabidentify: 'hor_1'// The tab groups identifier
        /*activate: function(event) { // Callback function if tab is switched
         var $tab = $(this);
         var $info = $('#nested-tabInfo');
         var $name = $('span', $info);
         $name.text($tab.text());
         $info.show();
         }*/
    });
//});