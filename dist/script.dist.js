!function e(n,t,r){function o(u,c){if(!t[u]){if(!n[u]){var s="function"==typeof require&&require;if(!c&&s)return s(u,!0);if(i)return i(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var l=t[u]={exports:{}};n[u][0].call(l.exports,function(e){var t=n[u][1][e];return o(t?t:e)},l,l.exports,e,n,t,r)}return t[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e){!function(){function n(){new t($("#whiteboardDetail"))}var t=e("./classes/UserHandler");n()}()},{"./classes/UserHandler":2}],2:[function(e,n){n.exports=function(){function e(e){this.el=e,$("#addUserbtn").on("click",function(e){e.preventDefault(),$("html").append("<div class='selectoverlay'></div>"),$(".selectoverlay").append("<button type='button' class='btn btn-xs btn-danger closebtn'>close</button>").on("click",function(){$(".selectoverlay").remove()})})}return e.prototype.submitHandler=function(){},e}()},{}]},{},[1]);