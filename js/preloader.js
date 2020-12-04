$(document).ready(function() {
    $(window).load(function() {
        function Preloader() {
            var preloader = $('.loader');
            preloader.delay (2600) .slideUp(500);
        }
        if ( sessionStorage.getItem( 'doNotShow' ) ) {
            sessionStorage.setItem( 'doNotShow', true );
            Preloader();
        } else {
           $ ('.loader, .preloader').hide();
        }
    });
});