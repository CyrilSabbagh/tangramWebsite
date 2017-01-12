$(document).ready(function () {

  // $('#insta').pongstgrm({
  //   accessId:     '2047905305',
  //   accessToken:  '2047905305.3321054.a951e2338c63460c93590e625ed6b3cb',
  //   show: 'recent'
  // });


  //Function to the css rule
  function checkSize(){
      if ($('.navbar-toggle').css('display') != "none" ){
        console.log('small screen');
        $('#insta').instastream({
              instaToken: '2047905305.3321054.a951e2338c63460c93590e625ed6b3cb',
              instaUser: '2047905305',
              instaResults: 4
          });
      } else {
        $('#insta').instastream({
              instaToken: '2047905305.3321054.a951e2338c63460c93590e625ed6b3cb',
              instaUser: '2047905305',
              instaResults: 4
          });
      }
  };
  // run test on initial page load
  checkSize();

  // run test on resize of the window
  $(window).resize(checkSize);

  $('body').on('hidden.bs.modal', '.modal.instaModal', function () {
    $('.modal.instaModal .modal-body--insta video').trigger('pause');
  });

});

$('.hexagon-in2').each(function(ind,el){
  var img = $(el).attr('data-img');
  $(el).css('background-image', 'url(' + img + ')');
})
