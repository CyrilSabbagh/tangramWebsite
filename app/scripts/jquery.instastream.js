/*
 * jQuery InstaStream - A jQuery plugin for the Instagram API
 * Version 0.1
 * http://www.exibit.be
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
var openInstaModal = function(data) {
  if(data.type === "image") {
    $(".instaModal .modal-body--insta").html("<img class='img-responsive' src='"+data.images.standard_resolution.url+"'/>");
  } else if(data.type === "video") {
    $(".instaModal .modal-body--insta").html("<video class='img-responsive' autoplay loop> <source src='"+data.videos.standard_resolution.url+"' type='video/mp4'></video>");
  }
  $(".instaModal .instaModal--caption").text(data.caption.text);
  $(".instaModal .instaModal--details").html("<em>"+data.likes.count+" <i class='icon-like white'>likes</i> "+data.comments.count+" <i class='icon-comment white'>commentaire</i> "+data.created_time.timeconverter()+"</em>");

  $(".instaModal").modal("show");
}
;(function ( $, window, undefined ) {

    // Create the defaults once
    var pluginName = 'instastream',
        document = window.document,
        defaults = {
            instaUser: '1011689',
            instaResults: 3,
            instaMenu: 'yes'
        };

    var $nbrResults;
    var $instaUrl;
    var $slideStatus =0;
    var $instaMenu = 'yes';

    // Constructor
    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Date converter
		String.prototype.timeconverter=function(){
		    var a = new Date(this*1000);
		    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		    var year = a.getFullYear();
			  var month = months[a.getMonth()];
			  var date = a.getDate();
			  var time = date+' '+month+' '+year ;
				return time;
		};

		// Stream function
    $.fn.createStream = function(slide, target){
      var j = slide;
    	$(target).addClass('slider-wrapper').append('<div class=\'loading\'></div>');
    	$('div').remove('.slider-content');
      $('div').remove('.slider-menu');

    	// stream constructor
		  $.ajax({
	    	type: 'GET',
	      dataType: 'jsonp',
	      cache: false,
	      url: $instaUrl,
	      success: function(resp) {
          return (function(data){
            if ($instaMenu == 'yes'){
  		        $(target).append('<div class=\'slider-menu\'><a href=\'#\' class=\'prev\'><i class=\'icon-prev\'></i></a><a href=\'#\' class=\'next\'><i class=\'icon-next\'></i></a></div>');
  	        }
  	         $(target).append('<div class=\'slider-content\'></div>');
             console.log(resp);

             // set modal header once

             if (resp.data[0]) {
              //  Title with profile pic
              //  $(".instaModal .modal-title").html("<img class='modal-title--avatar' src='"+resp.data[0].user.profile_picture+"'/>"+resp.data[0].user.full_name);
              // Title without profile pic
               $(".instaModal .modal-title").text(resp.data[0].user.full_name);
               $(".instaModal .modal-title--username").text("@"+resp.data[0].user.username);
             }

  		    	for (var i = 0; i < $nbrResults; i++) {
  		    	  if (j<20){

  		    	  	if(data[j].caption == null){
                  var myCaption = '';
                } else{
                  var myCaption = data[j].caption.text;
                  var myCaptionNoHashTags = myCaption.split(' ').filter(function(word, index, arr){
                    return !word.startsWith('#');
                  }).join(' ');
                }
  		    	  	if (data[j].comments.count < 2){var commentLabel = 'commentaire'} else {var commentLabel = 'commentaires'}
  		    	  	if (data[j].likes.count < 2){var likeLabel = 'like'} else {var likeLabel = 'likes'}

                // $('.slider-content').append('<div id=\'slider-item'+i+'\' class=\'slider-item col-xs-12 col-sm-'+12/$nbrResults+'\'><div class=\'frame\'><a href=\'' + data[j].link + '\'><img src=\'' + data.data[j].images.standard_resolution.url + '\' alt=\'' + myCaptionNoHashTags + '\'><span class=\'frame-title\' style=\'display: block; bottom: -50px;\'><em>' + data[j].likes.count + '<i class=\'icon-like white\'>' + likeLabel + '</i> ' + data[j].comments.count + '<i class=\'icon-comment white\'>' + commentLabel + '</i> ' + data[j].created_time.timeconverter() + '</em></span><span class=\'frame-more\' style=\'display: block; top: -38px;\'>+</span></a></div><header><h4>' + myCaptionNoHashTags + '</h4></header>');
                $('.slider-content').append('<div id=\'slider-item'+i+'\' class=\'slider-item col-xs-12 col-sm-'+12/$nbrResults+'\'><div class=\'frame\'><a href=\'#\'><img src=\'' + data[j].images.standard_resolution.url + '\' alt=\'' + myCaptionNoHashTags + '\'><span class=\'frame-title\' style=\'display: block; bottom: -50px;\'><em>' + data[j].likes.count + '<i class=\'icon-like white\'>' + likeLabel + '</i> ' + data[j].comments.count + '<i class=\'icon-comment white\'>' + commentLabel + '</i> ' + data[j].created_time.timeconverter() + '</em></span><span class=\'frame-more\' style=\'display: block; top: -38px;\'>+</span></a></div><header><h4>' + myCaptionNoHashTags + '</h4></header>');

                (function() {
                  var ind = j;
                  $('.slider-content #slider-item'+i+' .frame a').click(function(e){
                      e.preventDefault();
                      console.log(ind);
                      var item = data[ind];
                      openInstaModal(item);
                  });
                })()
  		    	  	j++;
  		    	  	$slideStatus = j;
  		        }
  		      };
  		      //prevLoad
  					$('.prev').on('click',function(e){
  				    e.preventDefault();
  					  var nextSlide = $slideStatus - ($nbrResults * 2);
  						$().createStream(nextSlide,target);
  					});

  					//nextLoad
  					$('.next').on('click',function(e){
  				    e.preventDefault();
  					  var nextSlide = $slideStatus;
  						$().createStream(nextSlide,target);
  					});
          })(resp.data)

	      }
			}).done(function() {
			  $('.slider-item').hide();
		  	$('.frame').find('span.frame-more').hide();
			  $('.frame').find('span.frame-title').hide();
			  $('.frame').hover(function(){
			      //$(this).find('span.blocWhite').hide().stop().fadeTo(200,1);
			      $(this).find('span.frame-more').show().animate({'top': -5},{queue:false,duration:200});
			      $(this).find('span.frame-title').show().animate({'bottom': 0},{queue:false,duration:200});
			  }, function(){
			      //$(this).find('span.blocWhite').stop().fadeOut();
			      $(this).find('span.frame-more').show().animate({'top': -38},{queue:false,duration:200});
			      $(this).find('span.frame-title').show().animate({'bottom': -50},{queue:false,duration:200});
			  });
			  var beginStatus = $slideStatus - $nbrResults;
			  if ($instaMenu == 'yes'){
				  if (beginStatus == 0){
						$('.prev').hide();
					} else {
						$('.prev').show();
					}
					if ($slideStatus > 19){
						$('.next').hide();
					} else {
						$('.next').show();
					}
			  }
			  // stream appearance
			  $('div').remove('.loading');
			  for (var l = 0; l < $nbrResults; l++) {
			    var k = l +1;
				  $('#slider-item'+ l).delay(200*k).fadeIn(800);
			  }
		  });

    }

    Plugin.prototype.init = function () {

    	// Initial variables
    	$slideStatus =0;
    	$nbrResults =this.options.instaResults;
    	$instaMenu = this.options.instaMenu;
    	$instaUrl = 'https://api.instagram.com/v1/users/' + this.options.instaUser + '/media/recent/?access_token=' + this.options.instaToken;

	    var $myContainer = this.element;

      $().createStream($slideStatus,$myContainer);

    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };

}(jQuery, window));
