$(function(){
	var $menu, $menuVisible, $nav, animateMenu, $quotes;

    $slider = $(".slider");
    $menu = $(".menu");
    $menuVisible = false;
    $nav = $(".nav");
    $quotes = $(".quote-blocks");

    $menu.on('click', function(){
    	if ($menuVisible === false) {
    		$(this).addClass('active');
    		animateMenu.play();
    	} else {
    		$(this).removeClass('active');
    		animateMenu.reverse();
    	}

    	$menuVisible = !$menuVisible;
    });

    var animateM = function(){
    	if ( $nav.css('display') == 'none') {
    		var  animateMenu = new TimelineMax({paused: true});
		    animateMenu.set($nav, {className: "+=nav-active"});
		    animateMenu.fromTo($nav, 1, {y: "-200%", force3D: true}, {y: "0%", ease: Power4.easeOut});

		    return animateMenu;
    	} else {
    		return "";
    	}
    };

     /** 
    * Make menu animatable on tablet and mobile screen
    * Display value from CSS styling
    **/

   animateMenu = animateM();

   $(window).on('resize', function(){
   		animateMenu = animateM();
   });
  
  $quotes.packery({
    itemSelector: '.item',
    gutter: 0
  });

});

$(window).load(function(){
    var slider;

    $slider = $('.slider');

    try {
        $slider.cycle({
            speed: 600,
            manualSpeed: 300,
            delay: 5,
            fx: 'fade',
            swipe: true,
            pager: '.slider-pager',
            autoHeight: "calc",
            pauseOnHover: true
        });
    } catch (e) {
        console.log(e);
    }

    $slider.animate({height: $slider.get(0).scrollHeight}, 1000);
});