// JQuery to control dropdown list in the navbar
$(function(){
    $(".sublist").mouseenter(function(){
        // Prevents dropdown from bugging out if .sublist is moused over again before the current animation is complete
        if ($(':animated').length) {
            return false;
        }
        $(".sublist-content").slideDown(500);
    });

    $(".sublist").mouseleave(function(){
        if ($(':animated').length) {
            return false;
        }
        $(".sublist-content").slideUp(500);
    });
});