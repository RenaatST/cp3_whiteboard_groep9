!function o(e,n,t){function i(s,a){if(!n[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(r)return r(s,!0);var d=new Error("Cannot find module '"+s+"'");throw d.code="MODULE_NOT_FOUND",d}var f=n[s]={exports:{}};e[s][0].call(f.exports,function(o){var n=e[s][1][o];return i(n?n:o)},f,f.exports,o,e,n,t)}return n[s].exports}for(var r="function"==typeof require&&require,s=0;s<t.length;s++)i(t[s]);return i}({1:[function(o){!function(){function e(){new n}var n=o("./classes/WhiteboardApplication");e()}()},{"./classes/WhiteboardApplication":2}],2:[function(o,e){e.exports=function(){function e(){$("#addimg").on("click",this.addImage),$("#addvideo").on("click",this.addVideo),$("#addnote").on("click",this.addNote),$("#canvaspagina").on("mousedown",".note",this.mouseDownHandler).bind(this),$("#canvaspagina").on("mouseup",".note",this.mouseupHandler)}return o("./WhiteboardHandler"),e.prototype.addImage=function(o){o.preventDefault(),console.log("addimg")},e.prototype.addNote=function(o){o.preventDefault(),$("<div class='note' ></div>").appendTo(".canvaszelf")},e.prototype.addVideo=function(o){o.preventDefault(),console.log("addvideo")},e.prototype.mouseDownHandler=function(o){console.log(this.find()),this.offsetX=o.offsetX,this.offsetY=o.offsetY,$(window).on("mousemove",function(){this.el.style.left=o.x-this.offsetX+"px",this.el.style.top=o.y-this.offsetY+"px"}),$(window).on("mouseup",function(){$(window).unbind("mousemove",this.mousemoveHandler),$(window).untbind("mouseup")})},e.prototype.mousemoveHandler=function(){console.log(this)},e.prototype.mouseupHandler=function(o){console.log(o)},e}()},{"./WhiteboardHandler":3}],3:[function(o,e){e.exports=function(){function o(){$form=$("<form method='post' action='' style='left:200px;top:200px;></form>"),$form.append("<textarea rows='4' cols='50' maxlength='259'></textarea>"),$form.on("mousedown",mouseDownHandler).bind(this),$(".canvaszelf").append($form)}return o.prototype.mouseDownHandler=function(){},o.prototype.mouseMoveHandler=function(){},o.prototype.mouseUpHandler=function(){},o}()},{}]},{},[1]);