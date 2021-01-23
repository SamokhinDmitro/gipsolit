//Предзагрузка карты
$(document).ready(function(){
   let section = $('#tour');
   let sectionTop = section.offset().top;

   $(window).bind('scroll', function () {
      if(pageYOffset > sectionTop){

          $('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD_iXeN3kLnDFVtsSZ_WDovLQquXGBncMM&language=ru&callback=initMap"\n' +
              '        async defer></script>');
          $(window).unbind('scroll');
      }
   });
});
