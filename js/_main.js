// Off Canvas Sliding
$(document).ready(function(){
  // Menu button click
  $('#js-menu-trigger,#js-menu-screen').on('click touchstart', function(e){
    // $('#js-body').toggleClass('no-scroll');
    $('#js-menu, #js-menu-screen').toggleClass('is-visible');
    $('#js-menu-trigger').toggleClass('slide close');
    // $('#masthead, #page-wrapper').toggleClass('slide');
    e.preventDefault();
  });
});

// FitVids
$(document).ready(function(){
	// Target your .container, .wrapper, .post, etc.
	$("#main").fitVids();
});

// add lightbox class to all image links
$("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

// Static comments
(function ($) {
  var $comments = $('.js-comments');

  $('#comment-form').submit(function () {
    var form = this;

    $(form).addClass('disabled');
    $('#comment-form-submit').html('<svg class="icon spin"><use xlink:href="#icon-loading"></use></svg> Loading...');

    $.ajax({
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      data: $(this).serialize(),
      contentType: 'application/x-www-form-urlencoded',
      success: function (data) {
        $('#comment-form-submit').html('Submitted');
        $('#comment-form .js-notice').removeClass('notice--danger').addClass('notice--success');
        showAlert('<strong>Thanks for your comment!</strong> It will show on the site once it has been approved.');
      },
      error: function (err) {
        console.log(err);
        $('#comment-form-submit').html('Submit Comment');
        $('#comment-form .js-notice').removeClass('notice--success').addClass('notice--danger');
        showAlert('<strong>Sorry, there was an error with your submission.</strong> Please make sure all required fields have been completed and try again.');
        $(form).removeClass('disabled');
      }
    });

    return false;
  });

  function showAlert(message) {
    $('#comment-form .js-notice').removeClass('hidden');
    $('#comment-form .js-notice-text').html(message);
  }
})(jQuery);

// Table of Contents title. Change text to localize
$("#markdown-toc").prepend("<li><h6>{{ site.data.messages.locales[site.locale].overview }}</h6></li>");
