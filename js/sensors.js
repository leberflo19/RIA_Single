jQuery(document).ready(function() {
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", function(event) {
                // alpha: rotation around z-axis
                var rotateDegrees = event.alpha;
                // gamma: left to right
                var leftToRight = event.gamma;
                // beta: front back motion
                var frontToBack = event.beta;
                $("#alpha").text(rotateDegrees);
                $("#beta").text(leftToRight);
                $("#gamma").text(frontToBack);
            }, true);

           
    }
});

function vibrate() {
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

    if (navigator.vibrate) {
        navigator.vibrate([500, 300, 100]);
    }
}