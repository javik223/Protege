$(function(){var e,a,s,r,i,t;a=$(".slider"),e=$(".menu"),s=!1,r=$(".nav"),t=$(".quote-blocks"),a.cycle({speed:600,manualSpeed:300,delay:2,fx:"fade",swipe:!0,pager:".slider-pager"}),e.on("click",function(){s===!1?($(this).addClass("active"),i.play()):($(this).removeClass("active"),i.reverse()),s=!s});var n=function(){if("none"==r.css("display")){var e=new TimelineMax({paused:!0});return e.set(r,{className:"+=nav-active"}),e.fromTo(r,1,{y:"-200%",force3D:!0},{y:"0%",ease:Power4.easeOut}),e}return""};i=n(),t.packery({itemSelector:".item",gutter:0})});