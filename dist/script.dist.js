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
		console.log(this.el.offsetLeft);
		$.post( "index.php?page=canvas&boardid="+this.el.dataset.set+"&action=update", { 
			id: this.el.dataset.id,
			whiteboardid: this.el.dataset.set,
			item: this.el.dataset.item,
			xpos: this.el.offsetLeft,
			ypos: this.el.offsetTop,
			text: this.el.childNodes[3].innerHTML
		})
	  .done(console.log("updated"));
	};


	return Dragable;
})();
},{}],4:[function(require,module,exports){
module.exports = (function(){

	var DragAndDropHandler = require("./DragAndDropHandler.js");
	var teller = 0;


	function WhiteboardApplication() {

		$("#addnote").on("click",this.addNote.bind(this));
		$("#addvideo").on("click",this.addvideo.bind(this));
		$("#addimg").on("click",this.addimage.bind(this));


		if(GetURLParameter("page") === "canvaspage") {
			this.getData();
		}




		$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
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
	  .done(this.getData());
	};

	WhiteboardApplication.prototype.addvideo = function() {
		var boardid = GetURLParameter("boardid");
		$.post( "index.php?page=addnote", { 
			text: 'tekst',
			whiteboard_id: boardid,
			xpos: 300,
			ypos: 300,
		})
	  .done(function( data ) {
	    console.log(data);
	  });
	};

	WhiteboardApplication.prototype.addimage = function() {
		var boardid = GetURLParameter("boardid");
		$.post( "index.php?page=addnote", { 
			text: 'tekst',
			whiteboard_id: boardid,
			xpos: 300,
			ypos: 300,
		})
	  .done(function( data ) {
	    console.log(data);
	  });
	};

	WhiteboardApplication.prototype.getData = function() {
		console.log("getdata");
		var boardid = GetURLParameter("boardid");
		$.get("index.php?page=data",{"boardid":boardid})
  			.done(function(data) {



  				var postTemplateSrc = $('#postit-template').text();
				var postTemplate = Handlebars.compile( postTemplateSrc );

				var result = postTemplate(data);		
				$('.canvaszelf').append($(result));
				new DragAndDropHandler();

  			});

	};

	return WhiteboardApplication;
})();
},{"./DragAndDropHandler.js":2}]},{},[1]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmRpc3QuanMiLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuZGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24oKXtcdFxuXHR2YXIgV2hpdGVib2FyZEFwcGxpY2F0aW9uID0gcmVxdWlyZShcIi4vY2xhc3Nlcy9XaGl0ZWJvYXJkQXBwbGljYXRpb25cIik7XG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0bmV3IFdoaXRlYm9hcmRBcHBsaWNhdGlvbigpO1xuXHR9XG5cblx0aW5pdCgpO1xufSkoKTtcbn0se1wiLi9jbGFzc2VzL1doaXRlYm9hcmRBcHBsaWNhdGlvblwiOjR9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCl7XG5cblx0dmFyIERyYWdhYmxlID0gcmVxdWlyZShcIi4vRHJhZ2FibGUuanNcIik7XG5cblx0ZnVuY3Rpb24gRHJhZ0FuZERyb3BIYW5kbGVyKCkge1xuXHRcdHZhciBlbGVtZW50cyA9ICQoXCIuZHJhZy1kcm9wXCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7aTxlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcblx0XHRcdGVsZW1lbnQgPSBuZXcgRHJhZ2FibGUoZWxlbWVudCk7XG5cdFx0fVxuXHR9XG5cblxuXHRyZXR1cm4gRHJhZ0FuZERyb3BIYW5kbGVyO1xufSkoKTtcbn0se1wiLi9EcmFnYWJsZS5qc1wiOjN9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCl7XG5cblx0ZnVuY3Rpb24gRHJhZ2FibGUoZWxlbWVudCkge1xuXHRcdHRoaXMuZWwgPSBlbGVtZW50O1xuXHRcdHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuXHR9XG5cblxuXHREcmFnYWJsZS5wcm90b3R5cGUubW91c2VEb3duSGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XG5cblx0XHR0aGlzLm9mZnNldFggPSBldmVudC5vZmZzZXRYO1xuXHRcdHRoaXMub2Zmc2V0WSA9IGV2ZW50Lm9mZnNldFk7XG5cblx0XHRcblx0XHR0aGlzLl9tb3VzZVVwSGFuZGxlciA9IHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLl9tb3VzZU1vdmVIYW5kbGVyID0gdGhpcy5tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcyk7XG5cblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiICwgdGhpcy5fbW91c2VNb3ZlSGFuZGxlcik7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIgLCB0aGlzLl9tb3VzZVVwSGFuZGxlcik7XG5cdH07XG5cblx0RHJhZ2FibGUucHJvdG90eXBlLm1vdXNlTW92ZUhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdHRoaXMuZWwuc3R5bGUubGVmdCA9IChldmVudC5wYWdlWCAtIHRoaXMub2Zmc2V0WCkrXCJweFwiO1xuXHRcdHRoaXMuZWwuc3R5bGUudG9wID0gKChldmVudC5wYWdlWSAtNTApLSB0aGlzLm9mZnNldFkpK1wicHhcIjtcdFxuXHR9O1xuXG5cdERyYWdhYmxlLnByb3RvdHlwZS5tb3VzZVVwSGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5fbW91c2VNb3ZlSGFuZGxlcik7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX21vdXNlVXBIYW5kbGVyKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLmVsLm9mZnNldExlZnQpO1xuXHRcdCQucG9zdCggXCJpbmRleC5waHA/cGFnZT1jYW52YXMmYm9hcmRpZD1cIit0aGlzLmVsLmRhdGFzZXQuc2V0K1wiJmFjdGlvbj11cGRhdGVcIiwgeyBcblx0XHRcdGlkOiB0aGlzLmVsLmRhdGFzZXQuaWQsXG5cdFx0XHR3aGl0ZWJvYXJkaWQ6IHRoaXMuZWwuZGF0YXNldC5zZXQsXG5cdFx0XHRpdGVtOiB0aGlzLmVsLmRhdGFzZXQuaXRlbSxcblx0XHRcdHhwb3M6IHRoaXMuZWwub2Zmc2V0TGVmdCxcblx0XHRcdHlwb3M6IHRoaXMuZWwub2Zmc2V0VG9wLFxuXHRcdFx0dGV4dDogdGhpcy5lbC5jaGlsZE5vZGVzWzNdLmlubmVySFRNTFxuXHRcdH0pXG5cdCAgLmRvbmUoY29uc29sZS5sb2coXCJ1cGRhdGVkXCIpKTtcblx0fTtcblxuXG5cdHJldHVybiBEcmFnYWJsZTtcbn0pKCk7XG59LHt9XSw0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCl7XG5cblx0dmFyIERyYWdBbmREcm9wSGFuZGxlciA9IHJlcXVpcmUoXCIuL0RyYWdBbmREcm9wSGFuZGxlci5qc1wiKTtcblx0dmFyIHRlbGxlciA9IDA7XG5cblxuXHRmdW5jdGlvbiBXaGl0ZWJvYXJkQXBwbGljYXRpb24oKSB7XG5cblx0XHQkKFwiI2FkZG5vdGVcIikub24oXCJjbGlja1wiLHRoaXMuYWRkTm90ZS5iaW5kKHRoaXMpKTtcblx0XHQkKFwiI2FkZHZpZGVvXCIpLm9uKFwiY2xpY2tcIix0aGlzLmFkZHZpZGVvLmJpbmQodGhpcykpO1xuXHRcdCQoXCIjYWRkaW1nXCIpLm9uKFwiY2xpY2tcIix0aGlzLmFkZGltYWdlLmJpbmQodGhpcykpO1xuXG5cblx0XHRpZihHZXRVUkxQYXJhbWV0ZXIoXCJwYWdlXCIpID09PSBcImNhbnZhc3BhZ2VcIikge1xuXHRcdFx0dGhpcy5nZXREYXRhKCk7XG5cdFx0fVxuXG5cblxuXG5cdFx0JCgnI2V4YW1wbGVNb2RhbCcpLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHZhciBidXR0b24gPSAkKGV2ZW50LnJlbGF0ZWRUYXJnZXQpIC8vIEJ1dHRvbiB0aGF0IHRyaWdnZXJlZCB0aGUgbW9kYWxcbiAgdmFyIHJlY2lwaWVudCA9IGJ1dHRvbi5kYXRhKCd3aGF0ZXZlcicpIC8vIEV4dHJhY3QgaW5mbyBmcm9tIGRhdGEtKiBhdHRyaWJ1dGVzXG4gIC8vIElmIG5lY2Vzc2FyeSwgeW91IGNvdWxkIGluaXRpYXRlIGFuIEFKQVggcmVxdWVzdCBoZXJlIChhbmQgdGhlbiBkbyB0aGUgdXBkYXRpbmcgaW4gYSBjYWxsYmFjaykuXG4gIC8vIFVwZGF0ZSB0aGUgbW9kYWwncyBjb250ZW50LiBXZSdsbCB1c2UgalF1ZXJ5IGhlcmUsIGJ1dCB5b3UgY291bGQgdXNlIGEgZGF0YSBiaW5kaW5nIGxpYnJhcnkgb3Igb3RoZXIgbWV0aG9kcyBpbnN0ZWFkLlxuICB2YXIgbW9kYWwgPSAkKHRoaXMpXG4gIG1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLnRleHQoJ05ldyBtZXNzYWdlIHRvICcgKyByZWNpcGllbnQpXG4gIG1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5IGlucHV0JykudmFsKHJlY2lwaWVudClcbn0pXG5cdFx0XG5cdFx0XG5cblx0fVxuXG5cblx0ZnVuY3Rpb24gR2V0VVJMUGFyYW1ldGVyKHNQYXJhbSkge1xuICAgIHZhciBzUGFnZVVSTCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpO1xuICAgIHZhciBzVVJMVmFyaWFibGVzID0gc1BhZ2VVUkwuc3BsaXQoJyYnKTtcbiAgICBcdGZvciAodmFyIGkgPSAwOyBpIDwgc1VSTFZhcmlhYmxlcy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgIHZhciBzUGFyYW1ldGVyTmFtZSA9IHNVUkxWYXJpYWJsZXNbaV0uc3BsaXQoJz0nKTtcblx0ICAgICAgICBpZiAoc1BhcmFtZXRlck5hbWVbMF0gPT0gc1BhcmFtKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBzUGFyYW1ldGVyTmFtZVsxXTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cdFxuXG5cdFdoaXRlYm9hcmRBcHBsaWNhdGlvbi5wcm90b3R5cGUudXBkYXRlTm90ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBib2FyZGlkID0gR2V0VVJMUGFyYW1ldGVyKFwiYm9hcmRpZFwiKTtcblx0XHQkLnBvc3QoIFwiaW5kZXgucGhwP3BhZ2U9Y2FudmFzJmJvYXJkaWQ9XCIrYm9hcmRpZCtcIiZhY3Rpb249dXBkYXRlTm90ZVwiLCB7IFxuXHRcdFx0dGV4dDogJycsXG5cdFx0XHR3aGl0ZWJvYXJkX2lkOiBib2FyZGlkLFxuXHRcdFx0eHBvczogMzAwLFxuXHRcdFx0eXBvczogMzAwLFxuXHRcdH0pXG5cdCAgLmRvbmUodGhpcy5nZXREYXRhKCkpO1xuXHR9O1x0IFxuXG5cdFdoaXRlYm9hcmRBcHBsaWNhdGlvbi5wcm90b3R5cGUuYWRkTm90ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBib2FyZGlkID0gR2V0VVJMUGFyYW1ldGVyKFwiYm9hcmRpZFwiKTtcblx0XHQkLnBvc3QoIFwiaW5kZXgucGhwP3BhZ2U9Y2FudmFzJmJvYXJkaWQ9XCIrYm9hcmRpZCtcIiZhY3Rpb249YWRkTm90ZVwiLCB7IFxuXHRcdFx0dGV4dDogJycsXG5cdFx0XHR3aGl0ZWJvYXJkX2lkOiBib2FyZGlkLFxuXHRcdFx0eHBvczogNDAwLFxuXHRcdFx0eXBvczogMzAwLFxuXHRcdH0pXG5cdCAgLmRvbmUodGhpcy5nZXREYXRhKCkpO1xuXHR9O1xuXG5cdFdoaXRlYm9hcmRBcHBsaWNhdGlvbi5wcm90b3R5cGUuYWRkdmlkZW8gPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgYm9hcmRpZCA9IEdldFVSTFBhcmFtZXRlcihcImJvYXJkaWRcIik7XG5cdFx0JC5wb3N0KCBcImluZGV4LnBocD9wYWdlPWFkZG5vdGVcIiwgeyBcblx0XHRcdHRleHQ6ICd0ZWtzdCcsXG5cdFx0XHR3aGl0ZWJvYXJkX2lkOiBib2FyZGlkLFxuXHRcdFx0eHBvczogMzAwLFxuXHRcdFx0eXBvczogMzAwLFxuXHRcdH0pXG5cdCAgLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG5cdCAgICBjb25zb2xlLmxvZyhkYXRhKTtcblx0ICB9KTtcblx0fTtcblxuXHRXaGl0ZWJvYXJkQXBwbGljYXRpb24ucHJvdG90eXBlLmFkZGltYWdlID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGJvYXJkaWQgPSBHZXRVUkxQYXJhbWV0ZXIoXCJib2FyZGlkXCIpO1xuXHRcdCQucG9zdCggXCJpbmRleC5waHA/cGFnZT1hZGRub3RlXCIsIHsgXG5cdFx0XHR0ZXh0OiAndGVrc3QnLFxuXHRcdFx0d2hpdGVib2FyZF9pZDogYm9hcmRpZCxcblx0XHRcdHhwb3M6IDMwMCxcblx0XHRcdHlwb3M6IDMwMCxcblx0XHR9KVxuXHQgIC5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuXHQgICAgY29uc29sZS5sb2coZGF0YSk7XG5cdCAgfSk7XG5cdH07XG5cblx0V2hpdGVib2FyZEFwcGxpY2F0aW9uLnByb3RvdHlwZS5nZXREYXRhID0gZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coXCJnZXRkYXRhXCIpO1xuXHRcdHZhciBib2FyZGlkID0gR2V0VVJMUGFyYW1ldGVyKFwiYm9hcmRpZFwiKTtcblx0XHQkLmdldChcImluZGV4LnBocD9wYWdlPWRhdGFcIix7XCJib2FyZGlkXCI6Ym9hcmRpZH0pXG4gIFx0XHRcdC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcblxuXG5cbiAgXHRcdFx0XHR2YXIgcG9zdFRlbXBsYXRlU3JjID0gJCgnI3Bvc3RpdC10ZW1wbGF0ZScpLnRleHQoKTtcblx0XHRcdFx0dmFyIHBvc3RUZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZSggcG9zdFRlbXBsYXRlU3JjICk7XG5cblx0XHRcdFx0dmFyIHJlc3VsdCA9IHBvc3RUZW1wbGF0ZShkYXRhKTtcdFx0XG5cdFx0XHRcdCQoJy5jYW52YXN6ZWxmJykuYXBwZW5kKCQocmVzdWx0KSk7XG5cdFx0XHRcdG5ldyBEcmFnQW5kRHJvcEhhbmRsZXIoKTtcblxuICBcdFx0XHR9KTtcblxuXHR9O1xuXG5cdHJldHVybiBXaGl0ZWJvYXJkQXBwbGljYXRpb247XG59KSgpO1xufSx7XCIuL0RyYWdBbmREcm9wSGFuZGxlci5qc1wiOjJ9XX0se30sWzFdKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==