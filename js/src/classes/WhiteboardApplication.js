module.exports = (function(){

	var WhiteboardHandler = require('./WhiteboardHandler');

	function WhiteboardApplication()	 {
		//clickevents maken voor de knoppen van adden dinges.
		$("#addimg").on("click", this.addImage);
		$("#addvideo").on("click", this.addVideo);
		$("#addnote").on("click", this.addNote);


		$("#canvaspagina").on("mousedown",'.note', this.mouseDownHandler).bind(this);
		$("#canvaspagina").on("mouseup",'.note',this.mouseupHandler);

		
	}


	WhiteboardApplication.prototype.addImage = function(e) {
		e.preventDefault();
		console.log("addimg");
	};

	WhiteboardApplication.prototype.addNote = function(e) {
		e.preventDefault();	
		$( "<div class='note' ></div>").appendTo( ".canvaszelf" );

		
		
	};

	WhiteboardApplication.prototype.addVideo = function(e) {
		e.preventDefault();
		console.log("addvideo");
	};


	WhiteboardApplication.prototype.mouseDownHandler = function(e) {
		console.log(this.find());
		
		this.offsetX = e.offsetX;
        this.offsetY = e.offsetY;
   
        $(window).on("mousemove",function() {
        	//TODO; alles werkt buiten de style van het element aanpassen
        	this.el.style.left = (e.x - this.offsetX) +"px";
        	this.el.style.top = (e.y - this.offsetY) +"px";        
        });
        $(window).on("mouseup" , function() {
        	$(window).unbind("mousemove",this.mousemoveHandler);
        	$(window).untbind("mouseup");
        })
        
      
	};

	 WhiteboardApplication.prototype.mousemoveHandler = function(e) {
	 	console.log(this);
    }
    
    WhiteboardApplication.prototype.mouseupHandler = function(e) {
    	console.log(e);
        
    }

	return WhiteboardApplication;
})();