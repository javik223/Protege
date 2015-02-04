  $(document).ready(function(){

    var s = new TimelineMax(),
        $menu = $(".menu"),
        $works_container = $(".works_collection"),
        $nav = $(".nav"),
        $navLinks = $nav.find('a'),
        menuOpen = false,
        $loadMore = $(".loadMore"),
        $loadMoreLink = $loadMore.parent(),
        $worksGroupNav = $(".works_group_nav"),
        $worksGroupNavItems = $worksGroupNav.find('li');

        resizeHeroFeature();

    function resizeHeroFeature() {
        var wH = $(window).height(), // Browser height
            wW =  $(window).width(), // Browser width
            heroContainer = $(".jshomeHero"), //Hero container
            featuredContainer = $(".jsFeatured"), //Featured container
            featuredHH = $(".jsFeaturedHeader").outerHeight(), //Get height of Featured Header        
            headerH = $(".jsHeader").outerHeight(); //Get height of Header

        //Set width of featured Container to the Window dimensions
        s.set(featuredContainer, {width: wW, height: wH});

        //Set dimensions of Hero element to dimensions of window, with the height less the height of Featured Header
        s.set(heroContainer, {width: wW, height: wH - featuredHH - headerH});
    }


    (function(){
        var listLength = 0,
            $listContainer = $worksGroupNav.find('ul');

            $worksGroupNavItems.each(function(){
                listLength += $(this).outerWidth();
            });

            if ($worksGroupNav.width() < listLength) {
                 $listContainer.css('width', listLength + 20);
            }
    }());


    //Load particleslider if the particle slider element exists
    if ($("#particle-slider-2").length > 0 ) {
         Modernizr.load({
            load: '/assets/js/particleslider.js',
            callback: function(){
                var ps = new ParticleSlider({
                sliderId: 'particle-slider-2', //id of HTML-Element
                slideDelay: 6.0, //delay between slides
                ptlSize: 2,
                velocityX: 200,
                velocityY: 200,
                ptlGap: 1,
            });

            ps.gravityX = ps.width - 1;
            }
        });

    }

     // Recalculate homepage hero images
     $(window).on('resize', resizeHeroFeature);

     if ($works_container.length > 0) {
        Modernizr.load([{
            load: '/assets/js/imagesloaded.pkgd.min.js'
        },
        {
                    load: '/assets/js/packery.pkgd.min.js',
                    callback: function() {
                        $works_container.packery({
                            itemSelector: '.item',
                            //gutter: 0,
                            "isOriginTop": true,
                            "rowHeight": 100,
                            isResizeBound: true,
                            isInitLayout: false,
                            transitionDuration: '0.4s'
                         });
        
                        $works_container.imagesLoaded(function(){
                            $works_container.packery();
                        });
                    }
                }]);
     }

    var t = new TimelineMax({smoothChildTiming: true, yoyo: true, paused: true});

    t.to($nav, 0.6, {className: "+=show", force3D: true, ease: Back.easeOut})
    .staggerFrom($navLinks, 0.5, {autoAlpha: 0, x: "20%"}, 0.1)
    .to($menu, 0.6, {className: "+=active", force3D: true}, -0.2);

     $menu.on('click', function() {        
        if (menuOpen === false) {
            t.timeScale(1);
            t.play();
        } else {
            t.timeScale(2);
            t.reverse();
        }



        menuOpen = !menuOpen;
     });

    $loadMoreLink.on("click", function(e) {
        // Next page navigation link
        $link = $(this).attr('href');
        console.log($link);
        e.preventDefault();

        // Get new items if next page link is not empty
        if($link !== '') {
            $.get($link,
                function(data) {
                    var div = $("<div>").html(data);
                    $nextLink = div.find(".loadMore").parent().attr('href');

                    data = div.find(".works_collection").html();
                    elem = jQuery.parseHTML(data);

                    $works_container.append(elem);

                    $works_container.imagesLoaded(function(){
                        $works_container.packery( 'appended', elem )
                        .packery('reloadItems');
                        if ($nextLink === "" || $nextLink === undefined) {
                            $loadMoreLink.html("That's all people").addClass('inactive');
                            $loadMoreLink.attr('href', '');
                        } else {
                            $loadMoreLink.attr('href', $nextLink);
                        }
                    });
                }
            );
        }

        console.log($link);
    });


});