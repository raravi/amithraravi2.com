import $ from "./vendor/jquery-3.3.1.min.js";
import Barba from "./vendor/barba.min.js";
import "./vendor/AnimOnScroll.js";
import imagesLoaded from "./vendor/imagesloaded.pkgd.min.js";
import "./vendor/modernizr-custom-3.6.0.js";
import anime from "./vendor/anime.min.js";
//import './vendor/mo.min.js';

/**
 * Service Worker
 * Attempt Registration of the Service Worker on Page Load.
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(
      function (registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

/**
 * Barba.js Initialization
 * Added function to prevent reloading on clicking same URL.
 */
$(document).ready(function () {
  /**
   * Function to prevent reloading on clicking same URL.
   */
  var links = document.querySelectorAll("a[href]");
  var cbk = function (e) {
    if (e.currentTarget.href === window.location.href) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", cbk);
  }

  /**
   * Barba.js Initialization
   * Added Prefetch (on hover) for all URLs on page.
   */
  Barba.Pjax.init();
  Barba.Prefetch.init();
});

/**
 * Barba.js Page Transitions
 * Start Barba
 */
$(document).ready(function () {
  /*var HideShowTransition = Barba.BaseTransition.extend({
    start: function() {
      this.newContainerLoading.then(this.finish.bind(this));
    },

    finish: function() {
      document.body.scrollTop = 0;
      this.done();
    }
  });*/
  var FadeTransition = Barba.BaseTransition.extend({
    start: function () {
      /**
       * This function is automatically called as soon the Transition starts
       * this.newContainerLoading is a Promise for the loading of the new container
       * (Barba.js also comes with an handy Promise polyfill!)
       */

      // As soon the loading is finished and the old page is faded out, let's fade the new page
      Promise.all([this.newContainerLoading, this.fadeOut()]).then(
        this.fadeIn.bind(this)
      );
    },

    fadeOut: function () {
      /**
       * this.oldContainer is the HTMLElement of the old Container
       */

      return $(this.oldContainer).animate({ opacity: 0 }).promise();
    },

    fadeIn: function () {
      /**
       * this.newContainer is the HTMLElement of the new Container
       * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
       * Please note, newContainer is available just after newContainerLoading is resolved!
       */

      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      $el.css({
        visibility: "visible",
        opacity: 0,
      });

      window.scrollTo(0, 0);

      $el.animate({ opacity: 1 }, 400, function () {
        /**
         * Do not forget to call .done() as soon your transition is finished!
         * .done() will automatically remove from the DOM the old Container
         */

        _this.done();
      });
    },
  });

  Barba.Pjax.start();

  Barba.Pjax.getTransition = function () {
    return FadeTransition;
  };
});

/**
 * Barba.js - Update Meta Tags in Head
 * Head Tags aren't updated on PJAX navigation, this needs to be done manually.
 */
Barba.Dispatcher.on(
  "newPageReady",
  function (currentStatus, oldStatus, container, newPageRawHTML) {
    // html head parser borrowed from jquery pjax
    console.log(document.title + ": newPageReady: Updating Meta tags");
    var $newPageHead = $("<head />").html(
      $.parseHTML(
        newPageRawHTML.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0],
        document,
        true
      )
    );
    var headTags = [
      "meta[name='keywords']",
      "meta[name='description']",
      "meta[property^='og']",
      "meta[property^='article']",
      "meta[name^='twitter']",
      "link[rel='canonical']",
      "script[type='application/ld+json']",
      "link[href='https://www.gravatar.com']",
    ].join(",");
    $("head").find(headTags).remove(); // Remove current head tags
    $newPageHead.find(headTags).appendTo("head"); // Append new tags to the head
  }
);

/**
 * Load scripts upon Page Load (on Load) / PJAX Load (on newPageReady)
 * Upon each PJAX page load, Webpack bundles need to be loaded for
 * the functionailty to be triggered.
 */
/*$(window).on("load", function() {
  console.log(document.title + ": onLoad");
  var title = document.title;
  var element;
  if (title == 'Portfolio • Amith Raravi') {
   element = document.createElement("script");
   element.src = '/js/portfolio.js';
   document.body.appendChild(element);
   console.log("onLoad: appendChild");
  }
});
Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
  console.log(document.title + ": newPageReady");
  var title = document.title;
  var element;
  if (oldStatus.url && title == 'Portfolio • Amith Raravi') {
   element = document.createElement("script");
   element.src = '/js/portfolio.js';
   document.body.appendChild(element);
   console.log("newPageReady: appendChild");
  }
});*/

/**
 * Init: FitVids, Lightbox, Table of Content, etc.
 */
$(document).ready(function () {
  /**
   * FitVids: Target your .container, .wrapper, .post, etc.
   */
  //$("#main").fitVids();

  /**
   * Add Lightbox class to all image links
   */
  $("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

  /**
   * Table of Contents title.
   * Change text to localize.
   */
  $("#markdown-toc").prepend(
    //"<li><h6>{{ site.data.messages.locales[site.locale].overview }}</h6></li>"
    "<li><h6>Table of Contents</h6></li>"
  );
});

/**
 * Off Canvas Sliding for Menu
 */
$(window).on("load", function () {
  // Menu button click
  $("#js-menu-trigger,#js-menu-screen,.js-menu-link").on("click", function (e) {
    $("#js-body").toggleClass("no-scroll");
    $("#js-menu, #js-menu-screen").toggleClass("is-visible");
    $("#js-menu-trigger").toggleClass("slide close");
    $("#masthead-floating, #page-wrapper").toggleClass("slide");
    e.preventDefault();
  });
});

/**
 * Sticky Heading Transformation
 * onScroll function is used
 */
$(window).on("load", function () {
  var scroll = $(window).scrollTop();

  var header = document.querySelector("#masthead-floating");
  var headerDiv1 = header.querySelector(".div-20-high");
  var headerDiv2 = header.querySelector(".line-red");
  var menuButton = document.querySelector(".sliding-menu-button");

  var windowWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  var menuButtonTop = 6;
  if (windowWidth < 450) {
    menuButtonTop = 11;
  }
  if (windowWidth < 350) {
    menuButtonTop = 13;
  }

  if (scroll >= 10) {
    header.style.paddingTop = "10px";
    header.style.paddingBottom = "10px";
    header.style.backgroundColor = "#F9D64C";
    header.style.boxShadow = "0 6px 20px 0 rgba(0, 0, 0, 0.19)";
    headerDiv1.style.display = "none";
    headerDiv2.style.display = "none";
    menuButton.style.top = menuButtonTop + "px";
  } else {
    header.style.paddingTop = "";
    header.style.paddingBottom = "";
    header.style.backgroundColor = "";
    header.style.boxShadow = "";
    headerDiv1.style.display = "";
    headerDiv2.style.display = "";
    menuButton.style.top = "";
  }
});
$(window).on("scroll", function () {
  var scroll = $(window).scrollTop();

  var header = document.querySelector("#masthead-floating");
  var headerDiv1 = header.querySelector(".div-20-high");
  var headerDiv2 = header.querySelector(".line-red");
  var menuButton = document.querySelector(".sliding-menu-button");

  var windowWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  var menuButtonTop = 6;
  if (windowWidth < 450) {
    menuButtonTop = 11;
  }
  if (windowWidth < 350) {
    menuButtonTop = 13;
  }

  if (scroll >= 10) {
    header.style.paddingTop = "10px";
    header.style.paddingBottom = "10px";
    header.style.backgroundColor = "#F9D64C";
    header.style.boxShadow = "0 6px 20px 0 rgba(0, 0, 0, 0.19)";
    headerDiv1.style.display = "none";
    headerDiv2.style.display = "none";
    menuButton.style.top = menuButtonTop + "px";
  } else {
    header.style.paddingTop = "";
    header.style.paddingBottom = "";
    header.style.backgroundColor = "";
    header.style.boxShadow = "";
    headerDiv1.style.display = "";
    headerDiv2.style.display = "";
    menuButton.style.top = "";
  }
});

/**
 * Defer Loading Images
 * For All pages except Articles/Portfolio.
 */
Barba.Dispatcher.on("transitionCompleted", function () //currentStatus,
//oldStatus,
//container
{
  if (
    document.getElementById("tiles-grid") == null &&
    document.getElementsByClassName("portfolio-tile").length == 0
  ) {
    var imgDefer = document.getElementsByTagName("img");
    for (var i = 0; i < imgDefer.length; i++) {
      if (imgDefer[i].getAttribute("data-src")) {
        imgDefer[i].setAttribute("src", imgDefer[i].getAttribute("data-src"));
        imgDefer[i].removeAttribute("data-src");
      }
      if (imgDefer[i].getAttribute("data-srcset")) {
        imgDefer[i].setAttribute(
          "srcset",
          imgDefer[i].getAttribute("data-srcset")
        );
        imgDefer[i].removeAttribute("data-srcset");
      }
    }
  }
});

/**
 * Function for handling Comment Form submission on Posts.
 * Fetch API call sends it to the server, where add-comment.php script will process it!
 */
Barba.Dispatcher.on("transitionCompleted", function () //currentStatus,
//oldStatus,
//container
{
  function showAlert(message) {
    $("#comment-form .js-notice").removeClass("hidden");
    $("#comment-form .js-notice-text").html(message);
  }

  $("#comment-form").submit(function () {
    event.preventDefault();
    var form = this;

    $(form).addClass("disabled");
    $("#comment-form-submit").html("Loading...");

    /* eslint-disable */
    grecaptcha.ready(function () {
      grecaptcha
        .execute("6Ld267wUAAAAAI_fRatpssUObDichF88iycOGqX9", {
          action: "addcomment",
        })
        .then(function (token) {
          $("#comment-token").attr("value", token);
          const method = $("#comment-form").attr("method"),
            url = $("#comment-form").attr("action"),
            data = $("#comment-form").serialize(),
            contentType = "application/x-www-form-urlencoded";

          fetch(url, {
            method: method,
            body: data,
            headers: {
              "Content-Type": contentType,
            },
          })
            .then(() => {
              $("#comment-form-submit").html("Submitted");
              $("#comment-form .js-notice")
                .removeClass("notice--danger")
                .addClass("notice--success");
              showAlert(
                "<strong>Thank you!</strong> Your comment will show up here once it has been approved by the moderator."
              );
            })
            .catch(() => {
              $("#comment-form-submit").html("Submit Comment");
              $("#comment-form .js-notice")
                .removeClass("notice--success")
                .addClass("notice--danger");
              showAlert(
                "<strong>Sorry, there was an error with your submission.</strong> Please make sure all required fields have been completed and try again."
              );
              $(form).removeClass("disabled");
            });
        });
    });
    /* eslint-enable */

    return false;
  });
});

/**
 * 'Comment Reply' to each comment.
 * This script moves the Add Comment section to the position below the appropriate comment.
 * Modified from Wordpress https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js
 * Released under the GNU General Public License - https://wordpress.org/about/gpl/
 */
var addComment = {
  moveForm: function (commId, parentId, respondId, postId) {
    var div,
      //element,
      //style,
      //cssHidden,
      t = this,
      comm = t.I(commId),
      respond = t.I(respondId),
      cancel = t.I("cancel-comment-reply-link"),
      parent = t.I("comment-replying-to"),
      post = t.I("comment-post-slug"),
      commentForm = respond.getElementsByTagName("form")[0];

    if (!comm || !respond || !cancel || !parent || !commentForm) {
      console.log("Moveform: Error 1 - return");
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

    cancel.onclick = function () {
      var t = addComment,
        temp = t.I("sm-temp-form-div"),
        respond = t.I(t.respondId);

      if (!temp || !respond) {
        console.log("Cancel: Error 2 - return");
        return;
      }

      t.I("comment-replying-to").value = "0";
      temp.parentNode.insertBefore(respond, temp);
      temp.parentNode.removeChild(temp);
      this.style.display = "none";
      this.onclick = null;
      console.log("Cancel: Success - return");
      return false;
    };

    /*
     * Set initial focus to the first form focusable element.
     */
    document.getElementById("comment-form-message").focus();

    /*
     * Return false so that the page is not redirected to HREF.
     */
    console.log("Moveform: Success - return");
    return false;
  },

  I: function (id) {
    return document.getElementById(id);
  },
};

Barba.Dispatcher.on("transitionCompleted", function () //currentStatus,
//oldStatus,
//container
{
  var comments = document.getElementsByClassName("comment__reply");
  Array.prototype.forEach.call(comments, function (comment) {
    $(comment).on("click", function () {
      var aTag = comment.getElementsByTagName("A")[0];
      addComment.moveForm(
        aTag.dataset.comment,
        aTag.dataset.index,
        aTag.dataset.respond,
        aTag.dataset.slug
      );
    });
  });
});

/**
 * Articles Page - Grid Selectors
 * Show/Hide grid items as required
 * Remove classes/style added by previous animation
 * Re-Init AnimeOnScroll.js to prevent errors in animation.
 */
Barba.Dispatcher.on("transitionCompleted", function () //currentStatus,
//oldStatus,
//container
{
  $(".button-all").on("click", function () {
    $(".button-all").addClass("is-checked");
    $(".button-tech").removeClass("is-checked");
    $(".button-personal").removeClass("is-checked");

    $(".article-tile").removeClass("shown animate");
    $(".articles-tiles-grid, .article-tile").removeAttr("style");

    $(".articles-tiles-grid").children(".article-tile").hide();
    $(".articles-tiles-grid").children(".article-tile").show();

    new window.AnimOnScroll(document.getElementById("tiles-grid"), {
      minDuration: 0.4,
      maxDuration: 0.7,
      viewportFactor: 0.1,
    });
  });

  $(".button-tech").on("click", function () {
    $(".button-all").removeClass("is-checked");
    $(".button-tech").addClass("is-checked");
    $(".button-personal").removeClass("is-checked");

    $(".article-tile").removeClass("shown animate");
    $(".articles-tiles-grid, .article-tile").removeAttr("style");

    $(".articles-tiles-grid").children(".article-tile").hide();
    $(".articles-tiles-grid").children(".article-tile").filter(".tech").show();
    new window.AnimOnScroll(document.getElementById("tiles-grid"), {
      minDuration: 0.4,
      maxDuration: 0.7,
      viewportFactor: 0.1,
    });
  });

  $(".button-personal").on("click", function () {
    $(".button-all").removeClass("is-checked");
    $(".button-tech").removeClass("is-checked");
    $(".button-personal").addClass("is-checked");

    $(".article-tile").removeClass("shown animate");
    $(".articles-tiles-grid, .article-tile").removeAttr("style");

    $(".articles-tiles-grid").children(".article-tile").hide();
    $(".articles-tiles-grid")
      .children(".article-tile")
      .filter(".personal")
      .show();

    new window.AnimOnScroll(document.getElementById("tiles-grid"), {
      minDuration: 0.4,
      maxDuration: 0.7,
      viewportFactor: 0.1,
    });
  });
});

/**
 * Articles Page - Loading Animation
 * Uses AnimeOnScroll.js
 */
Barba.Dispatcher.on("transitionCompleted", function () //currentStatus,
//oldStatus,
//container
{
  if (document.getElementById("tiles-grid") != null) {
    new window.AnimOnScroll(document.getElementById("tiles-grid"), {
      minDuration: 0.4,
      maxDuration: 0.7,
      viewportFactor: 0.1,
    });
  }
});

/**
 * Portfolio Page - Loading Animation
 * Uses anime.js
 * Based on 'Shu' animation from https://tympanus.net/Development/GridLoadingAnimations/
 */
Barba.Dispatcher.on("transitionCompleted", function () //currentStatus,
//oldStatus,
//container
{
  var portfolioLinks = document.getElementsByClassName("portfolio-link");
  if (document.getElementsByClassName("portfolio-tile").length > 0) {
    imagesLoaded(portfolioLinks, function () {
      if (window.Modernizr.cssanimations) {
        [].slice.call(portfolioLinks).forEach(function (item) {
          // Create SVG.
          var svg = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg"
            ),
            path = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path"
            ),
            itemW = item.offsetWidth,
            itemH = item.offsetHeight;

          svg.setAttribute("width", itemW + "px");
          svg.setAttribute("height", itemH + "px");
          svg.setAttribute("viewBox", "0 0 " + itemW + " " + itemH);
          svg.setAttribute("class", "grid__deco");
          path.setAttribute(
            "d",
            "M0,0 l" + itemW + ",0 0," + itemH + " -" + itemW + ",0 0,-" + itemH
          );
          path.setAttribute("stroke-dashoffset", anime.setDashoffset(path));
          svg.appendChild(path);
          item.parentNode.appendChild(svg);
        });

        var animeLineDrawingOpts = {
          duration: 800,
          delay: function (t, i) {
            return i * 150 + 50;
          },
          easing: "easeInOutSine",
          strokeDashoffset: [anime.setDashoffset, 0],
          opacity: [
            { value: [0, 1] },
            { value: [1, 0], duration: 200, easing: "linear", delay: 500 },
          ],
        };
        animeLineDrawingOpts.targets =
          document.querySelectorAll(".grid__deco > path");

        anime.remove(animeLineDrawingOpts.targets);
        anime(animeLineDrawingOpts);

        var animeOpts = {
          duration: 800,
          easing: [0.3, 1, 0.7, 1],
          delay: function (t, i) {
            return i * 150 + 1200;
          },
          opacity: {
            value: [0, 1],
            easing: "linear",
          },
          scale: [0.25, 1],
        };
        animeOpts.targets = document.querySelectorAll(".portfolio-link");

        anime.remove(animeOpts.targets);
        anime(animeOpts);
      } else {
        [].slice.call(portfolioLinks).forEach(function (item) {
          item.style.opacity = 1;
        });
      }
      var imgDefer = document.getElementsByTagName("img");
      for (var i = 0; i < imgDefer.length; i++) {
        if (imgDefer[i].getAttribute("data-src")) {
          imgDefer[i].setAttribute("src", imgDefer[i].getAttribute("data-src"));
          imgDefer[i].removeAttribute("data-src");
        }
      }
    });
  }
});

/**
 * About Page - Burst Animation for the owner email link.
 * Uses mo.js animation
 * Based on Icon Animations from https://tympanus.net/codrops/2016/02/23/icon-animations-powered-by-mo-js/
 */
/*Barba.Dispatcher.on("transitionCompleted", function(
  currentStatus,
  oldStatus,
  container
) {
  console.log(document.title + ": transitionCompleted: mo.js animation");
  if (document.querySelector(".owner-link") != null) {
    var molinkEl = document.querySelector(".owner-link"),
      moTimeline = new mojs.Timeline(),
      moburst1 = new mojs.Burst({
        parent: molinkEl,
        count: 12,
        left: "0%",
        top: "-50%",
        radius: { 0: 90 },
        children: {
          fill: [
            "#988ADE",
            "#DE8AA0",
            "#8AAEDE",
            "#8ADEAD",
            "#DEC58A",
            "#8AD1DE"
          ],
          duration: 1300,
          easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
        }
      }),
      moburst2 = new mojs.Burst({
        parent: molinkEl,
        left: "-60%",
        top: "140%",
        count: 14,
        radius: { 0: 120 },
        children: {
          fill: [
            "#988ADE",
            "#DE8AA0",
            "#8AAEDE",
            "#8ADEAD",
            "#DEC58A",
            "#8AD1DE"
          ],
          duration: 1600,
          delay: 100,
          easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
        }
      }),
      moburst3 = new mojs.Burst({
        parent: molinkEl,
        left: "130%",
        top: "-70%",
        count: 8,
        radius: { 0: 90 },
        children: {
          fill: [
            "#988ADE",
            "#DE8AA0",
            "#8AAEDE",
            "#8ADEAD",
            "#DEC58A",
            "#8AD1DE"
          ],
          duration: 1500,
          delay: 200,
          easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
        }
      }),
      moburst4 = new mojs.Burst({
        parent: molinkEl,
        left: "-20%",
        top: "-150%",
        count: 14,
        radius: { 0: 60 },
        children: {
          fill: [
            "#988ADE",
            "#DE8AA0",
            "#8AAEDE",
            "#8ADEAD",
            "#DEC58A",
            "#8AD1DE"
          ],
          duration: 2000,
          delay: 300,
          easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
        }
      }),
      moburst5 = new mojs.Burst({
        parent: molinkEl,
        count: 12,
        left: "30%",
        top: "-100%",
        radius: { 0: 60 },
        children: {
          fill: [
            "#988ADE",
            "#DE8AA0",
            "#8AAEDE",
            "#8ADEAD",
            "#DEC58A",
            "#8AD1DE"
          ],
          duration: 1400,
          delay: 400,
          easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
        }
      });

    moTimeline.add(moburst1, moburst2, moburst3, moburst4, moburst5);
    molinkEl.addEventListener("mouseenter", function() {
      moTimeline.replay();
    });
    console.log(document.title + ": mo.js event added");
  }
});*/
