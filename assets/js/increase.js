/* increase.js | (c) @izenderi | https://github.com/izenderi/izenderi.github.io */
/**
 * Class Count in the main page increase animation
 * Jquery Enabled
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
 * <script src="assets/js/increase.js"></script>
 *
 */

var executed = false;

Number.prototype.format = function(n) {
    var r = new RegExp('\\d(?=(\\d{3})+' + (n > 0 ? '\\.' : '$') + ')', 'g');
    return this.toFixed(Math.max(0, Math.floor(n))).replace(r, '$&,');
};

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

/**
 * Viewable on screen checker
 */
$(window).on('resize scroll', function() {
    if ($('#second').isInViewport()) {
        increase();
    } else {
        // do something else
    }
});


/**
 * Increase count
 */
function increase(){
    if(!executed){
        $('.count').each(function () {
            $(this).prop('counter', 0).animate({counter: $(this).text()}, {
                duration: 10000,
                easing: 'easeOutExpo',
                step: function (step) {
                    $(this).text('' + step.format());
                }
            });
        });
        executed=true;
    }
    else{

    }

}

