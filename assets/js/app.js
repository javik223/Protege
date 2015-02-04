$(function(){
	var $menu, $slider, $menuVisible, $nav, animateMenu ;

    $slider = $('.slider');
    $menu = $(".menu");
    $menuVisible = false;
    $nav = $(".nav");

    $slider.cycle({
    	speed: 600,
    	manualSpeed: 100,
    	delay: 2,
    	fx: 'fade',
    	swipe: true,
    	pager: '.slider-pager'
    });

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
  

});