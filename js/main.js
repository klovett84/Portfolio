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

// JQuery lightbox for project screenshots
$(function(){
    $('.preview').click(function(e) {
        e.preventDefault();
        var img_src = $(this).attr("src");

        if ($('#lightbox').length > 0) { // if #lightbox exists
            //insert img tag with clicked link's href as src value
            $('body').html('<img src="' + img_src + '" />');
            
            //show lightbox window
            $('#lightbox').show();
        }

        else { // if #lightbox does not exist
            //create HTML markup for lightbox window
            var lightbox =
            '<div id="lightbox">' +
                '<div id="lightbox-content">' +
                    '<img src="' + img_src + '" />' +
                    '<p>Click to close</p>' +
                '</div>' +
            '</div>';

            //insert lightbox HTML into page
            $('body').append(lightbox);
        }
    });
    // Click anywhere to close lightbox window
    $('body').on('click', '#lightbox', function() {
        $('#lightbox').remove();
    });
});

// JQuery for contact form popup
$(function(){
    $("#contact-btn").click(function(){
        if ($(':animated').length) {
            return false;
        }
        $("#contact-popup").slideDown(500);
    });

    $("#close").click(function(){
        if ($(':animated').length) {
            return false;
        }
        $("#contact-popup").slideUp(500);
    });
});