# https://krislovett.github.io/Portfolio/

A mobile-responsive, single-page portfolio of several of my different coding projects showcasing my web design skill. 

![image](https://user-images.githubusercontent.com/84836870/134961334-3c2a0ca6-1756-4c43-a543-45b1406f166f.png)

jQuery dropdown links for mobile:
```javascript
$(function(){
    $("#mobile-arrow").click(function(){
        // Prevents dropdown from bugging out if .sublist is moused over again before the current animation is complete
        if ($(':animated').length) {
            return false;
        }
        $("#links").slideDown(500);
        $("#navbar").css("height", "390px");
    });

    $("#mobile-arrow").click(function(){
        if ($(':animated').length) {
            return false;
        }
        $("#links").slideUp(0);
        $("#navbar").css("height", "90px");

    });
});

// make sure links are visible if screen size is increased above threshold to hide links
$(window).resize(function() {
    if (screen.width >= 900) {
        $("#links").slideDown(1);
    };
});
```



jQuery for filtering projects by language:
```javascript
$(function() {
  $('#reset-lang').click(function(){
    if ($('.lang-icon').hasClass('disabled')) {
      $('.lang-icon').removeClass('disabled').addClass('active');
    }
    $('.project').show();
  });
});

//C# filtering
$(function(){
  $('#csharp-icon').click(function(){
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').addClass('disabled');
      $('.project[data-lang="csharp"]').hide();
    } else if ($(this).hasClass('disabled')) {
      $(this).removeClass('disabled').addClass('active');
      $('.project[data-lang="csharp"]').show();
    }
  })
});
```

jQuery for lightbox modal:
```javascript
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
```
