!function n(e,r,t){function o(u,c){if(!r[u]){if(!e[u]){var f="function"==typeof require&&require;if(!c&&f)return f(u,!0);if(i)return i(u,!0);var s=new Error("Cannot find module '"+u+"'");throw s.code="MODULE_NOT_FOUND",s}var a=r[u]={exports:{}};e[u][0].call(a.exports,function(n){var r=e[u][1][n];return o(r?r:n)},a,a.exports,n,e,r,t)}return r[u].exports}for(var i="function"==typeof require&&require,u=0;u<t.length;u++)o(t[u]);return o}({1:[function(n){!function(){function e(){new r}var r=n("./classes/UserHandler");e()}()},{"./classes/UserHandler":2}],2:[function(n,e){e.exports=function(){function n(){$("#addUserbtn").on("click",function(){$(".selectoverlay").removeClass("hidden")}),$(".closebtn").on("click",function(){$(".selectoverlay").addClass("hidden")})}return n.prototype.submitHandler=function(){},n}()},{}]},{},[1]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvc2NyaXB0LmpzIiwianMvc3JjL2NsYXNzZXMvVXNlckhhbmRsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsUUFBQSxHQUFBLEVBQUEsRUFBQSxHQUFBLFFBQUEsR0FBQSxFQUFBLEdBQUEsSUFBQSxFQUFBLEdBQUEsQ0FBQSxJQUFBLEVBQUEsR0FBQSxDQUFBLEdBQUEsR0FBQSxrQkFBQSxVQUFBLE9BQUEsS0FBQSxHQUFBLEVBQUEsTUFBQSxHQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsTUFBQSxHQUFBLEdBQUEsRUFBQSxJQUFBLEdBQUEsR0FBQSxPQUFBLHVCQUFBLEVBQUEsSUFBQSxNQUFBLEdBQUEsS0FBQSxtQkFBQSxFQUFBLEdBQUEsR0FBQSxFQUFBLElBQUEsV0FBQSxHQUFBLEdBQUEsR0FBQSxLQUFBLEVBQUEsUUFBQSxTQUFBLEdBQUEsR0FBQSxHQUFBLEVBQUEsR0FBQSxHQUFBLEVBQUEsT0FBQSxHQUFBLEVBQUEsRUFBQSxJQUFBLEVBQUEsRUFBQSxRQUFBLEVBQUEsRUFBQSxFQUFBLEdBQUEsTUFBQSxHQUFBLEdBQUEsUUFBQSxJQUFBLEdBQUEsR0FBQSxrQkFBQSxVQUFBLFFBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxPQUFBLElBQUEsRUFBQSxFQUFBLEdBQUEsT0FBQSxLQUFBLEdBQUEsU0FBQSxJQ0FBLFdBSUEsUUFBQSxLQUNBLEdBQUEsR0FIQSxHQUFBLEdBQUEsRUFBQSx3QkFNQSx1RENSQSxFQUFBLFFBQUEsV0FDQSxRQUFBLEtBRUEsRUFBQSxlQUFBLEdBQUEsUUFBQSxXQUNBLEVBQUEsa0JBQUEsWUFBQSxZQUdBLEVBQUEsYUFBQSxHQUFBLFFBQUEsV0FDQSxFQUFBLGtCQUFBLFNBQUEsWUFTQSxNQUhBLEdBQUEsVUFBQSxjQUFBLGFBR0EiLCJmaWxlIjoic2NyaXB0LmRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpe1xuXHRcblx0dmFyIFVzZXJIYW5kbGVyID0gcmVxdWlyZShcIi4vY2xhc3Nlcy9Vc2VySGFuZGxlclwiKTtcblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdG5ldyBVc2VySGFuZGxlcigpO1xuXHR9XG5cblx0aW5pdCgpO1xufSkoKTsiLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpe1xuXHRmdW5jdGlvbiBVc2VySGFuZGxlcigpIHtcblxuXHRcdCQoXCIjYWRkVXNlcmJ0blwiKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdCQoXCIuc2VsZWN0b3ZlcmxheVwiKS5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcblx0XHR9KTtcblxuXHRcdCQoXCIuY2xvc2VidG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0JChcIi5zZWxlY3RvdmVybGF5XCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuXHRcdH0pO1xuXG5cblx0fVxuXG5cdFVzZXJIYW5kbGVyLnByb3RvdHlwZS5zdWJtaXRIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0fTtcblxuXHRyZXR1cm4gVXNlckhhbmRsZXI7XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==