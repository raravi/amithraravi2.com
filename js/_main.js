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
    $('#comment-form-submit').html('Loading...');

    $.ajax({
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      data: $(this).serialize(),
      contentType: 'application/x-www-form-urlencoded',
      success: function (data) {
        $('#comment-form-submit').html('Submitted');
        $('#comment-form .js-notice').removeClass('notice--danger').addClass('notice--success');
        showAlert('<strong>Thank you!</strong> Your comment will show up here once it has been approved by the moderator.');
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

// Staticman comment replies
// modified from Wordpress https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js
// Released under the GNU General Public License - https://wordpress.org/about/gpl/
var addComment = {
  moveForm: function(commId, parentId, respondId, postId) {
    var div,
      element,
      style,
      cssHidden,
      t = this,
      comm = t.I(commId),
      respond = t.I(respondId),
      cancel = t.I("cancel-comment-reply-link"),
      parent = t.I("comment-replying-to"),
      post = t.I("comment-post-slug"),
      commentForm = respond.getElementsByTagName("form")[0];

    if (!comm || !respond || !cancel || !parent || !commentForm) {
      return;
    }

    t.respondId = respondId;
    postId = postId || false;

    if (!t.I("sm-temp-form-div")) {
      div = document.createElement("div");
      div.id = "sm-temp-form-div";
      div.style.display = "none";
      respond.parentNode.insertBefore(div, respond);
    }

    comm.parentNode.insertBefore(respond, comm.nextSibling);
    if (post && postId) {
      post.value = postId;
    }
    parent.value = parentId;
    cancel.style.display = "";

    cancel.onclick = function() {
      var t = addComment,
        temp = t.I("sm-temp-form-div"),
        respond = t.I(t.respondId);

      if (!temp || !respond) {
        return;
      }

      t.I("comment-replying-to").value = "0";
      temp.parentNode.insertBefore(respond, temp);
      temp.parentNode.removeChild(temp);
      this.style.display = "none";
      this.onclick = null;
      return false;
    };

    /*
     * Set initial focus to the first form focusable element.
     */
    document.getElementById("comment-form-message").focus();

    /*
     * Return false so that the page is not redirected to HREF.
     */
    return false;
  },

  I: function(id) {
    return document.getElementById(id);
  }
};

// Table of Contents title. Change text to localize
$("#markdown-toc").prepend("<li><h6>{{ site.data.messages.locales[site.locale].overview }}</h6></li>");
