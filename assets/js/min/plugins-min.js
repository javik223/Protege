!function(){if(Event.prototype.preventDefault||(Event.prototype.preventDefault=function(){this.returnValue=!1}),Event.prototype.stopPropagation||(Event.prototype.stopPropagation=function(){this.cancelBubble=!0}),!Element.prototype.addEventListener){var e=[],t=function(t,n){var o=this,r=function(e){e.target=e.srcElement,e.currentTarget=o,n.handleEvent?n.handleEvent(e):n.call(o,e)};if("DOMContentLoaded"==t){var a=function(e){"complete"==document.readyState&&r(e)};if(document.attachEvent("onreadystatechange",a),e.push({object:this,type:t,listener:n,wrapper:a}),"complete"==document.readyState){var p=new Event;p.srcElement=window,a(p)}}else this.attachEvent("on"+t,r),e.push({object:this,type:t,listener:n,wrapper:r})},n=function(t,n){for(var o=0;o<e.length;){var r=e[o];if(r.object==this&&r.type==t&&r.listener==n){"DOMContentLoaded"==t?this.detachEvent("onreadystatechange",r.wrapper):this.detachEvent("on"+t,r.wrapper),e.splice(o,1);break}++o}};Element.prototype.addEventListener=t,Element.prototype.removeEventListener=n,HTMLDocument&&(HTMLDocument.prototype.addEventListener=t,HTMLDocument.prototype.removeEventListener=n),Window&&(Window.prototype.addEventListener=t,Window.prototype.removeEventListener=n)}}();