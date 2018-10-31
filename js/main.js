---
---
/*! amith-raravi - v2.0.0 - 2018-10-31 */
!function($){"use strict";$.fn.fitVids=function(options){var settings={customSelector:null,ignore:null};if(!document.getElementById("fit-vids-style")){var head=document.head||document.getElementsByTagName("head")[0],div=document.createElement("div");div.innerHTML='<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>',head.appendChild(div.childNodes[1])}return options&&$.extend(settings,options),this.each(function(){var selectors=["iframe[src*='player.vimeo.com']","iframe[src*='youtube.com']","iframe[src*='youtube-nocookie.com']","iframe[src*='kickstarter.com'][src*='video.html']","object","embed"];settings.customSelector&&selectors.push(settings.customSelector);var ignoreList=".fitvidsignore";settings.ignore&&(ignoreList=ignoreList+", "+settings.ignore);var $allVideos=$(this).find(selectors.join(","));($allVideos=($allVideos=$allVideos.not("object object")).not(ignoreList)).each(function(){var $this=$(this);if(!(0<$this.parents(ignoreList).length||"embed"===this.tagName.toLowerCase()&&$this.parent("object").length||$this.parent(".fluid-width-video-wrapper").length)){$this.css("height")||$this.css("width")||!isNaN($this.attr("height"))&&!isNaN($this.attr("width"))||($this.attr("height",9),$this.attr("width",16));var aspectRatio=("object"===this.tagName.toLowerCase()||$this.attr("height")&&!isNaN(parseInt($this.attr("height"),10))?parseInt($this.attr("height"),10):$this.height())/(isNaN(parseInt($this.attr("width"),10))?$this.width():parseInt($this.attr("width"),10));if(!$this.attr("id")){var videoID="fitvid"+Math.floor(999999*Math.random());$this.attr("id",videoID)}$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*aspectRatio+"%"),$this.removeAttr("height").removeAttr("width")}})})}}(window.jQuery||window.Zepto),function($){var $w=$(window);$.fn.visible=function(partial,hidden,direction){if(!(this.length<1)){var $t=1<this.length?this.eq(0):this,t=$t.get(0),vpWidth=$w.width(),vpHeight=$w.height(),clientSize=(direction=direction||"both",!0!==hidden||t.offsetWidth*t.offsetHeight);if("function"==typeof t.getBoundingClientRect){var rec=t.getBoundingClientRect(),tViz=0<=rec.top&&rec.top<vpHeight,bViz=0<rec.bottom&&rec.bottom<=vpHeight,lViz=0<=rec.left&&rec.left<vpWidth,rViz=0<rec.right&&rec.right<=vpWidth,vVisible=partial?tViz||bViz:tViz&&bViz,hVisible=partial?lViz||lViz:lViz&&rViz;if("both"===direction)return clientSize&&vVisible&&hVisible;if("vertical"===direction)return clientSize&&vVisible;if("horizontal"===direction)return clientSize&&hVisible}else{var viewTop=$w.scrollTop(),viewBottom=viewTop+vpHeight,viewLeft=$w.scrollLeft(),viewRight=viewLeft+vpWidth,offset=$t.offset(),_top=offset.top,_bottom=_top+$t.height(),_left=offset.left,_right=_left+$t.width(),compareTop=!0===partial?_bottom:_top,compareBottom=!0===partial?_top:_bottom,compareLeft=!0===partial?_right:_left,compareRight=!0===partial?_left:_right;if("both"===direction)return!!clientSize&&compareBottom<=viewBottom&&viewTop<=compareTop&&compareRight<=viewRight&&viewLeft<=compareLeft;if("vertical"===direction)return!!clientSize&&compareBottom<=viewBottom&&viewTop<=compareTop;if("horizontal"===direction)return!!clientSize&&compareRight<=viewRight&&viewLeft<=compareLeft}}}}(jQuery),$(document).ready(function(){$("#js-menu-trigger,#js-menu-screen").on("click touchstart",function(e){$("#js-menu, #js-menu-screen").toggleClass("is-visible"),$("#js-menu-trigger").toggleClass("slide close"),e.preventDefault()})}),$(document).ready(function(){$("#main").fitVids()}),$("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").addClass("image-popup"),function($){$(".js-comments");function showAlert(message){$("#comment-form .js-notice").removeClass("hidden"),$("#comment-form .js-notice-text").html(message)}$("#comment-form").submit(function(){var form=this;return $(form).addClass("disabled"),$("#comment-form-submit").html("Loading..."),$.ajax({type:$(this).attr("method"),url:$(this).attr("action"),data:$(this).serialize(),contentType:"application/x-www-form-urlencoded",success:function(data){$("#comment-form-submit").html("Submitted"),$("#comment-form .js-notice").removeClass("notice--danger").addClass("notice--success"),showAlert("<strong>Thank you!</strong> Your comment will show up here once it has been approved by the moderator.")},error:function(err){console.log(err),$("#comment-form-submit").html("Submit Comment"),$("#comment-form .js-notice").removeClass("notice--success").addClass("notice--danger"),showAlert("<strong>Sorry, there was an error with your submission.</strong> Please make sure all required fields have been completed and try again."),$(form).removeClass("disabled")}}),!1})}(jQuery),$("#markdown-toc").prepend("<li><h6>{{ site.data.messages.locales[site.locale].overview }}</h6></li>");