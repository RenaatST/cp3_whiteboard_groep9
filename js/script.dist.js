(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){	
	var WhiteboardApplication = require("./classes/WhiteboardApplication");
	function init() {
		new WhiteboardApplication();
	}

	init();
})();
},{"./classes/WhiteboardApplication":4}],2:[function(require,module,exports){
module.exports = (function(){

	var Dragable = require("./Dragable.js");

	function DragAndDropHandler() {
		var elements = $(".drag-drop");
		for(var i = 0;i<elements.length; i++) {
			var element = elements[i];
			element = new Dragable(element);
		}
	}


	return DragAndDropHandler;
})();
},{"./Dragable.js":3}],3:[function(require,module,exports){
module.exports = (function(){

	function Dragable(element) {
		this.el = element;
		this.el.addEventListener("mousedown",this.mouseDownHandler.bind(this));
		
	}


	Dragable.prototype.mouseDownHandler = function(event) {
		

		this.offsetX = event.offsetX;
		this.offsetY = event.offsetY;

		
		this._mouseUpHandler = this.mouseUpHandler.bind(this);
		this._mouseMoveHandler = this.mouseMoveHandler.bind(this);

		window.addEventListener("mousemove" , this._mouseMoveHandler);
		window.addEventListener("mouseup" , this._mouseUpHandler);
	};

	Dragable.prototype.mouseMoveHandler = function(event) {
		this.el.style.left = (event.pageX - this.offsetX)+"px";
		this.el.style.top = ((event.pageY -50)- this.offsetY)+"px";	
	};

	Dragable.prototype.mouseUpHandler = function(event) {
		window.removeEventListener("mousemove", this._mouseMoveHandler);
		window.removeEventListener("mouseup", this._mouseUpHandler);
		$.post( "index.php?page=canvas&boardid="+this.el.dataset.set+"&action=update", { 
			id: this.el.dataset.id,
			whiteboardid: this.el.dataset.set,
			item: this.el.dataset.item,
			xpos: this.el.offsetLeft,
			ypos: this.el.offsetTop,
			text: this.el.childNodes[3].innerHTML
		})
	};


	return Dragable;
})();
},{}],4:[function(require,module,exports){
module.exports = (function(){

	var DragAndDropHandler = require("./DragAndDropHandler.js");
	var teller = 0;


	function WhiteboardApplication() {

		$("#addnote").on("click",this.addNote.bind(this));
		$("#videosubmit").on("submit",this.addvideo.bind(this));
		$("#imagesubmit").on("submit",this.addimage.bind(this));
		$("#addimg").on("click",this.addimage.bind(this));


		if(GetURLParameter("page") === "canvaspage") {
			this.getData();
		}




		$('#videomodal').on('show.bs.modal', function (event) {
  			var button = $(event.relatedTarget) // Button that triggered the modal
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
});
		$('#imagemodal').on('show.bs.modal', function (event) {
  			var button = $(event.relatedTarget) // Button that triggered the modal
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
})

	}


	function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    	for (var i = 0; i < sURLVariables.length; i++) {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == sParam) {
	            return sParameterName[1];
	        }
	    }
	}	

	WhiteboardApplication.prototype.updateNote = function() {
		console.log("updatenote");
		var boardid = GetURLParameter("boardid");
		$.post( "index.php?page=canvas&boardid="+boardid+"&action=updateNote", { 
			text: '',
			whiteboard_id: boardid,
			xpos: 300,
			ypos: 300,
		})
	  .done(this.getData());
	};	 

	WhiteboardApplication.prototype.addNote = function() {
		var boardid = GetURLParameter("boardid");
		$.post( "index.php?page=canvas&boardid="+boardid+"&action=addNote", { 
			text: '',
			whiteboard_id: boardid,
			xpos: 400,
			ypos: 300,
		})
	  .done(setTimeout(this.getData(),2000));
	};

	WhiteboardApplication.prototype.updateVideo = function() {
		var boardid = GetURLParameter("boardid");
		$.post( "index.php?page=canvas&boardid="+boardid+"&action=updateVideo", { 
			whiteboard_id: boardid,
			xpos: 300,
			ypos: 300,
		})
	  .done(this.getData());
	};	 

	WhiteboardApplication.prototype.addvideo = function(event) {
		event.preventDefault();
		var boardid = GetURLParameter("boardid");
		var data = new FormData($('#videosubmit')[0]);
		$.ajax({
			url: 'index.php?page=canvas&boardid='+boardid+'&action=addvideo',
			type: "POST",
			data: data,
			cache: false,
	        contentType: false,
	        processData: false
		}).done(setTimeout(this.getData(),2000))
	};

	WhiteboardApplication.prototype.addimage = function() {
		event.preventDefault();
		var boardid = GetURLParameter("boardid");
		var data = new FormData($('#imagesubmit')[0]);
		$.ajax({
			url: 'index.php?page=canvas&boardid='+boardid+'&action=addimage',
			type: "POST",
			data: data,
			cache: false,
	        contentType: false,
	        processData: false
		}).done(setTimeout(this.getData()),2000);
	};

	WhiteboardApplication.prototype.updateImage = function() {
		var boardid = GetURLParameter("boardid");
		$.post( "index.php?page=canvas&boardid="+boardid+"&action=updateImage", { 
			whiteboard_id: boardid,
			xpos: 300,
			ypos: 300,
		})
	  .done(this.getData());
	};	 

	WhiteboardApplication.prototype.getData = function() {
		console.log("getdata");
		$(".postits").empty();
		$(".videos").empty();
		$(".images").empty();
		var boardid = GetURLParameter("boardid");
		$.get("index.php?page=data",{"boardid":boardid})
  			.done(function(data) {
  				var postTemplateSrc = $('#postit-template').text();
				var postTemplate = Handlebars.compile( postTemplateSrc );

				var result = postTemplate(data);		
				$('.canvaszelf').append($(result));
				new DragAndDropHandler();

				var postTemplateSrc = $('#video-template').text();
				var postTemplate = Handlebars.compile( postTemplateSrc );

				var result = postTemplate(data);		
				$('.canvaszelf').append($(result));
				new DragAndDropHandler();

				var postTemplateSrc = $('#image-template').text();
				var postTemplate = Handlebars.compile( postTemplateSrc );

				var result = postTemplate(data);		
				$('.canvaszelf').append($(result));
				new DragAndDropHandler();

  			});
		
	};


	WhiteboardApplication.prototype.detleteitem = function(event) {
		console.log(this,event.currentTarget);
	};

	return WhiteboardApplication;
})();
},{"./DragAndDropHandler.js":2}]},{},[1]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmRpc3QuanMiLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuZGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24oKXtcdFxuXHR2YXIgV2hpdGVib2FyZEFwcGxpY2F0aW9uID0gcmVxdWlyZShcIi4vY2xhc3Nlcy9XaGl0ZWJvYXJkQXBwbGljYXRpb25cIik7XG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0bmV3IFdoaXRlYm9hcmRBcHBsaWNhdGlvbigpO1xuXHR9XG5cblx0aW5pdCgpO1xufSkoKTtcbn0se1wiLi9jbGFzc2VzL1doaXRlYm9hcmRBcHBsaWNhdGlvblwiOjR9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCl7XG5cblx0dmFyIERyYWdhYmxlID0gcmVxdWlyZShcIi4vRHJhZ2FibGUuanNcIik7XG5cblx0ZnVuY3Rpb24gRHJhZ0FuZERyb3BIYW5kbGVyKCkge1xuXHRcdHZhciBlbGVtZW50cyA9ICQoXCIuZHJhZy1kcm9wXCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7aTxlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcblx0XHRcdGVsZW1lbnQgPSBuZXcgRHJhZ2FibGUoZWxlbWVudCk7XG5cdFx0fVxuXHR9XG5cblxuXHRyZXR1cm4gRHJhZ0FuZERyb3BIYW5kbGVyO1xufSkoKTtcbn0se1wiLi9EcmFnYWJsZS5qc1wiOjN9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCl7XG5cblx0ZnVuY3Rpb24gRHJhZ2FibGUoZWxlbWVudCkge1xuXHRcdHRoaXMuZWwgPSBlbGVtZW50O1xuXHRcdHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcblx0XHRcblx0fVxuXG5cblx0RHJhZ2FibGUucHJvdG90eXBlLm1vdXNlRG93bkhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdFxuXG5cdFx0dGhpcy5vZmZzZXRYID0gZXZlbnQub2Zmc2V0WDtcblx0XHR0aGlzLm9mZnNldFkgPSBldmVudC5vZmZzZXRZO1xuXG5cdFx0XG5cdFx0dGhpcy5fbW91c2VVcEhhbmRsZXIgPSB0aGlzLm1vdXNlVXBIYW5kbGVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5fbW91c2VNb3ZlSGFuZGxlciA9IHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpO1xuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiAsIHRoaXMuX21vdXNlTW92ZUhhbmRsZXIpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiICwgdGhpcy5fbW91c2VVcEhhbmRsZXIpO1xuXHR9O1xuXG5cdERyYWdhYmxlLnByb3RvdHlwZS5tb3VzZU1vdmVIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHR0aGlzLmVsLnN0eWxlLmxlZnQgPSAoZXZlbnQucGFnZVggLSB0aGlzLm9mZnNldFgpK1wicHhcIjtcblx0XHR0aGlzLmVsLnN0eWxlLnRvcCA9ICgoZXZlbnQucGFnZVkgLTUwKS0gdGhpcy5vZmZzZXRZKStcInB4XCI7XHRcblx0fTtcblxuXHREcmFnYWJsZS5wcm90b3R5cGUubW91c2VVcEhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuX21vdXNlTW92ZUhhbmRsZXIpO1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9tb3VzZVVwSGFuZGxlcik7XG5cdFx0JC5wb3N0KCBcImluZGV4LnBocD9wYWdlPWNhbnZhcyZib2FyZGlkPVwiK3RoaXMuZWwuZGF0YXNldC5zZXQrXCImYWN0aW9uPXVwZGF0ZVwiLCB7IFxuXHRcdFx0aWQ6IHRoaXMuZWwuZGF0YXNldC5pZCxcblx0XHRcdHdoaXRlYm9hcmRpZDogdGhpcy5lbC5kYXRhc2V0LnNldCxcblx0XHRcdGl0ZW06IHRoaXMuZWwuZGF0YXNldC5pdGVtLFxuXHRcdFx0eHBvczogdGhpcy5lbC5vZmZzZXRMZWZ0LFxuXHRcdFx0eXBvczogdGhpcy5lbC5vZmZzZXRUb3AsXG5cdFx0XHR0ZXh0OiB0aGlzLmVsLmNoaWxkTm9kZXNbM10uaW5uZXJIVE1MXG5cdFx0fSlcblx0fTtcblxuXG5cdHJldHVybiBEcmFnYWJsZTtcbn0pKCk7XG59LHt9XSw0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCl7XG5cblx0dmFyIERyYWdBbmREcm9wSGFuZGxlciA9IHJlcXVpcmUoXCIuL0RyYWdBbmREcm9wSGFuZGxlci5qc1wiKTtcblx0dmFyIHRlbGxlciA9IDA7XG5cblxuXHRmdW5jdGlvbiBXaGl0ZWJvYXJkQXBwbGljYXRpb24oKSB7XG5cblx0XHQkKFwiI2FkZG5vdGVcIikub24oXCJjbGlja1wiLHRoaXMuYWRkTm90ZS5iaW5kKHRoaXMpKTtcblx0XHQkKFwiI3ZpZGVvc3VibWl0XCIpLm9uKFwic3VibWl0XCIsdGhpcy5hZGR2aWRlby5iaW5kKHRoaXMpKTtcblx0XHQkKFwiI2ltYWdlc3VibWl0XCIpLm9uKFwic3VibWl0XCIsdGhpcy5hZGRpbWFnZS5iaW5kKHRoaXMpKTtcblx0XHQkKFwiI2FkZGltZ1wiKS5vbihcImNsaWNrXCIsdGhpcy5hZGRpbWFnZS5iaW5kKHRoaXMpKTtcblxuXG5cdFx0aWYoR2V0VVJMUGFyYW1ldGVyKFwicGFnZVwiKSA9PT0gXCJjYW52YXNwYWdlXCIpIHtcblx0XHRcdHRoaXMuZ2V0RGF0YSgpO1xuXHRcdH1cblxuXG5cblxuXHRcdCQoJyN2aWRlb21vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgXHRcdFx0dmFyIGJ1dHRvbiA9ICQoZXZlbnQucmVsYXRlZFRhcmdldCkgLy8gQnV0dG9uIHRoYXQgdHJpZ2dlcmVkIHRoZSBtb2RhbFxuICAvLyBJZiBuZWNlc3NhcnksIHlvdSBjb3VsZCBpbml0aWF0ZSBhbiBBSkFYIHJlcXVlc3QgaGVyZSAoYW5kIHRoZW4gZG8gdGhlIHVwZGF0aW5nIGluIGEgY2FsbGJhY2spLlxuICAvLyBVcGRhdGUgdGhlIG1vZGFsJ3MgY29udGVudC4gV2UnbGwgdXNlIGpRdWVyeSBoZXJlLCBidXQgeW91IGNvdWxkIHVzZSBhIGRhdGEgYmluZGluZyBsaWJyYXJ5IG9yIG90aGVyIG1ldGhvZHMgaW5zdGVhZC5cbn0pO1xuXHRcdCQoJyNpbWFnZW1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgXHRcdFx0dmFyIGJ1dHRvbiA9ICQoZXZlbnQucmVsYXRlZFRhcmdldCkgLy8gQnV0dG9uIHRoYXQgdHJpZ2dlcmVkIHRoZSBtb2RhbFxuICAvLyBJZiBuZWNlc3NhcnksIHlvdSBjb3VsZCBpbml0aWF0ZSBhbiBBSkFYIHJlcXVlc3QgaGVyZSAoYW5kIHRoZW4gZG8gdGhlIHVwZGF0aW5nIGluIGEgY2FsbGJhY2spLlxuICAvLyBVcGRhdGUgdGhlIG1vZGFsJ3MgY29udGVudC4gV2UnbGwgdXNlIGpRdWVyeSBoZXJlLCBidXQgeW91IGNvdWxkIHVzZSBhIGRhdGEgYmluZGluZyBsaWJyYXJ5IG9yIG90aGVyIG1ldGhvZHMgaW5zdGVhZC5cbn0pXG5cblx0fVxuXG5cblx0ZnVuY3Rpb24gR2V0VVJMUGFyYW1ldGVyKHNQYXJhbSkge1xuICAgIHZhciBzUGFnZVVSTCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpO1xuICAgIHZhciBzVVJMVmFyaWFibGVzID0gc1BhZ2VVUkwuc3BsaXQoJyYnKTtcbiAgICBcdGZvciAodmFyIGkgPSAwOyBpIDwgc1VSTFZhcmlhYmxlcy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgIHZhciBzUGFyYW1ldGVyTmFtZSA9IHNVUkxWYXJpYWJsZXNbaV0uc3BsaXQoJz0nKTtcblx0ICAgICAgICBpZiAoc1BhcmFtZXRlck5hbWVbMF0gPT0gc1BhcmFtKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBzUGFyYW1ldGVyTmFtZVsxXTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cdFxuXG5cdFdoaXRlYm9hcmRBcHBsaWNhdGlvbi5wcm90b3R5cGUudXBkYXRlTm90ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKFwidXBkYXRlbm90ZVwiKTtcblx0XHR2YXIgYm9hcmRpZCA9IEdldFVSTFBhcmFtZXRlcihcImJvYXJkaWRcIik7XG5cdFx0JC5wb3N0KCBcImluZGV4LnBocD9wYWdlPWNhbnZhcyZib2FyZGlkPVwiK2JvYXJkaWQrXCImYWN0aW9uPXVwZGF0ZU5vdGVcIiwgeyBcblx0XHRcdHRleHQ6ICcnLFxuXHRcdFx0d2hpdGVib2FyZF9pZDogYm9hcmRpZCxcblx0XHRcdHhwb3M6IDMwMCxcblx0XHRcdHlwb3M6IDMwMCxcblx0XHR9KVxuXHQgIC5kb25lKHRoaXMuZ2V0RGF0YSgpKTtcblx0fTtcdCBcblxuXHRXaGl0ZWJvYXJkQXBwbGljYXRpb24ucHJvdG90eXBlLmFkZE5vdGUgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgYm9hcmRpZCA9IEdldFVSTFBhcmFtZXRlcihcImJvYXJkaWRcIik7XG5cdFx0JC5wb3N0KCBcImluZGV4LnBocD9wYWdlPWNhbnZhcyZib2FyZGlkPVwiK2JvYXJkaWQrXCImYWN0aW9uPWFkZE5vdGVcIiwgeyBcblx0XHRcdHRleHQ6ICcnLFxuXHRcdFx0d2hpdGVib2FyZF9pZDogYm9hcmRpZCxcblx0XHRcdHhwb3M6IDQwMCxcblx0XHRcdHlwb3M6IDMwMCxcblx0XHR9KVxuXHQgIC5kb25lKHNldFRpbWVvdXQodGhpcy5nZXREYXRhKCksMjAwMCkpO1xuXHR9O1xuXG5cdFdoaXRlYm9hcmRBcHBsaWNhdGlvbi5wcm90b3R5cGUudXBkYXRlVmlkZW8gPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgYm9hcmRpZCA9IEdldFVSTFBhcmFtZXRlcihcImJvYXJkaWRcIik7XG5cdFx0JC5wb3N0KCBcImluZGV4LnBocD9wYWdlPWNhbnZhcyZib2FyZGlkPVwiK2JvYXJkaWQrXCImYWN0aW9uPXVwZGF0ZVZpZGVvXCIsIHsgXG5cdFx0XHR3aGl0ZWJvYXJkX2lkOiBib2FyZGlkLFxuXHRcdFx0eHBvczogMzAwLFxuXHRcdFx0eXBvczogMzAwLFxuXHRcdH0pXG5cdCAgLmRvbmUodGhpcy5nZXREYXRhKCkpO1xuXHR9O1x0IFxuXG5cdFdoaXRlYm9hcmRBcHBsaWNhdGlvbi5wcm90b3R5cGUuYWRkdmlkZW8gPSBmdW5jdGlvbihldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyIGJvYXJkaWQgPSBHZXRVUkxQYXJhbWV0ZXIoXCJib2FyZGlkXCIpO1xuXHRcdHZhciBkYXRhID0gbmV3IEZvcm1EYXRhKCQoJyN2aWRlb3N1Ym1pdCcpWzBdKTtcblx0XHQkLmFqYXgoe1xuXHRcdFx0dXJsOiAnaW5kZXgucGhwP3BhZ2U9Y2FudmFzJmJvYXJkaWQ9Jytib2FyZGlkKycmYWN0aW9uPWFkZHZpZGVvJyxcblx0XHRcdHR5cGU6IFwiUE9TVFwiLFxuXHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdGNhY2hlOiBmYWxzZSxcblx0ICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG5cdCAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlXG5cdFx0fSkuZG9uZShzZXRUaW1lb3V0KHRoaXMuZ2V0RGF0YSgpLDIwMDApKVxuXHR9O1xuXG5cdFdoaXRlYm9hcmRBcHBsaWNhdGlvbi5wcm90b3R5cGUuYWRkaW1hZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciBib2FyZGlkID0gR2V0VVJMUGFyYW1ldGVyKFwiYm9hcmRpZFwiKTtcblx0XHR2YXIgZGF0YSA9IG5ldyBGb3JtRGF0YSgkKCcjaW1hZ2VzdWJtaXQnKVswXSk7XG5cdFx0JC5hamF4KHtcblx0XHRcdHVybDogJ2luZGV4LnBocD9wYWdlPWNhbnZhcyZib2FyZGlkPScrYm9hcmRpZCsnJmFjdGlvbj1hZGRpbWFnZScsXG5cdFx0XHR0eXBlOiBcIlBPU1RcIixcblx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRjYWNoZTogZmFsc2UsXG5cdCAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuXHQgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuXHRcdH0pLmRvbmUoc2V0VGltZW91dCh0aGlzLmdldERhdGEoKSksMjAwMCk7XG5cdH07XG5cblx0V2hpdGVib2FyZEFwcGxpY2F0aW9uLnByb3RvdHlwZS51cGRhdGVJbWFnZSA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBib2FyZGlkID0gR2V0VVJMUGFyYW1ldGVyKFwiYm9hcmRpZFwiKTtcblx0XHQkLnBvc3QoIFwiaW5kZXgucGhwP3BhZ2U9Y2FudmFzJmJvYXJkaWQ9XCIrYm9hcmRpZCtcIiZhY3Rpb249dXBkYXRlSW1hZ2VcIiwgeyBcblx0XHRcdHdoaXRlYm9hcmRfaWQ6IGJvYXJkaWQsXG5cdFx0XHR4cG9zOiAzMDAsXG5cdFx0XHR5cG9zOiAzMDAsXG5cdFx0fSlcblx0ICAuZG9uZSh0aGlzLmdldERhdGEoKSk7XG5cdH07XHQgXG5cblx0V2hpdGVib2FyZEFwcGxpY2F0aW9uLnByb3RvdHlwZS5nZXREYXRhID0gZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coXCJnZXRkYXRhXCIpO1xuXHRcdCQoXCIucG9zdGl0c1wiKS5lbXB0eSgpO1xuXHRcdCQoXCIudmlkZW9zXCIpLmVtcHR5KCk7XG5cdFx0JChcIi5pbWFnZXNcIikuZW1wdHkoKTtcblx0XHR2YXIgYm9hcmRpZCA9IEdldFVSTFBhcmFtZXRlcihcImJvYXJkaWRcIik7XG5cdFx0JC5nZXQoXCJpbmRleC5waHA/cGFnZT1kYXRhXCIse1wiYm9hcmRpZFwiOmJvYXJkaWR9KVxuICBcdFx0XHQuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gIFx0XHRcdFx0dmFyIHBvc3RUZW1wbGF0ZVNyYyA9ICQoJyNwb3N0aXQtdGVtcGxhdGUnKS50ZXh0KCk7XG5cdFx0XHRcdHZhciBwb3N0VGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUoIHBvc3RUZW1wbGF0ZVNyYyApO1xuXG5cdFx0XHRcdHZhciByZXN1bHQgPSBwb3N0VGVtcGxhdGUoZGF0YSk7XHRcdFxuXHRcdFx0XHQkKCcuY2FudmFzemVsZicpLmFwcGVuZCgkKHJlc3VsdCkpO1xuXHRcdFx0XHRuZXcgRHJhZ0FuZERyb3BIYW5kbGVyKCk7XG5cblx0XHRcdFx0dmFyIHBvc3RUZW1wbGF0ZVNyYyA9ICQoJyN2aWRlby10ZW1wbGF0ZScpLnRleHQoKTtcblx0XHRcdFx0dmFyIHBvc3RUZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZSggcG9zdFRlbXBsYXRlU3JjICk7XG5cblx0XHRcdFx0dmFyIHJlc3VsdCA9IHBvc3RUZW1wbGF0ZShkYXRhKTtcdFx0XG5cdFx0XHRcdCQoJy5jYW52YXN6ZWxmJykuYXBwZW5kKCQocmVzdWx0KSk7XG5cdFx0XHRcdG5ldyBEcmFnQW5kRHJvcEhhbmRsZXIoKTtcblxuXHRcdFx0XHR2YXIgcG9zdFRlbXBsYXRlU3JjID0gJCgnI2ltYWdlLXRlbXBsYXRlJykudGV4dCgpO1xuXHRcdFx0XHR2YXIgcG9zdFRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKCBwb3N0VGVtcGxhdGVTcmMgKTtcblxuXHRcdFx0XHR2YXIgcmVzdWx0ID0gcG9zdFRlbXBsYXRlKGRhdGEpO1x0XHRcblx0XHRcdFx0JCgnLmNhbnZhc3plbGYnKS5hcHBlbmQoJChyZXN1bHQpKTtcblx0XHRcdFx0bmV3IERyYWdBbmREcm9wSGFuZGxlcigpO1xuXG4gIFx0XHRcdH0pO1xuXHRcdFxuXHR9O1xuXG5cblx0V2hpdGVib2FyZEFwcGxpY2F0aW9uLnByb3RvdHlwZS5kZXRsZXRlaXRlbSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0Y29uc29sZS5sb2codGhpcyxldmVudC5jdXJyZW50VGFyZ2V0KTtcblx0fTtcblxuXHRyZXR1cm4gV2hpdGVib2FyZEFwcGxpY2F0aW9uO1xufSkoKTtcbn0se1wiLi9EcmFnQW5kRHJvcEhhbmRsZXIuanNcIjoyfV19LHt9LFsxXSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=