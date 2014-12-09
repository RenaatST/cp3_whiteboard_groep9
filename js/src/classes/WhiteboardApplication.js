module.exports = (function(){

	var WhiteboardHandler = require('./WhiteboardHandler');
	var teller = 0;

	function WhiteboardApplication()	 {
		//clickevents maken voor de knoppen van adden dinges.
		$("#addimg").on("click", function(){
			var image = new AddImage(
				Math.random() * window.innerWidth,
				Math.random() * window.innerHeight
			);
			document.getElementById('cnvszelf').appendChild(image.el);
		});
		$("#addvideo").on("click", function(){
			var video = new AddVideo(
				Math.random() * window.innerWidth,
				Math.random() * window.innerHeight
			);
			document.getElementById('cnvszelf').appendChild(video.el);
		});
		//$("#addnote").on("click", this.addNote);
		$("#addnote").on("click", function(){
			var note = new AddNote(
				Math.random() * window.innerWidth,
				Math.random() * window.innerHeight
			);
			document.getElementById('cnvszelf').appendChild(note.el);
		});
		
	}

	function AddNote(x, y){ 
		console.log('created new block');
		this.el = document.createElement('div');
		this.el.classList.add('note');
		this.el.style.left = x+"px";
		this.el.style.top = y+"px";
		this.el.addEventListener('mousedown', this.mouseDownHandler.bind(this));
	}
	
	AddNote.prototype.mouseDownHandler = function(event){
		
		console.log(event);
		//this.el.style.zIndex = 10;
		this.offsetX = event.offsetX;
		this.offsetY = event.offsetY;
		this._mouseMoveHandler = this.mouseMoveHandler.bind(this);
		this._mouseUpHandler = this.mouseUpHandler.bind(this);
		window.addEventListener('mousemove', this._mouseMoveHandler);
		window.addEventListener('mouseup', this._mouseUpHandler);	
		this.el.style.zIndex = 100;	

	};
	
	AddNote.prototype.mouseUpHandler = function(event){
		console.log('mouseup');
		console.log(event);
		window.removeEventListener('mousemove', this._mouseMoveHandler);
		window.removeEventListener('mouseup', this._mouseUpHandler);
		this.el.style.zIndex = 0;
	};
	
	AddNote.prototype.mouseMoveHandler = function(event){
		console.log(this);
		console.log(event);
		this.el.style.left = (event.x - (this.offsetX)) + "px";
		this.el.style.top = (event.y - (this.offsetY)) + "px";
	};


	function AddImage(x, y){ 
		console.log('created new block');
		this.el = document.createElement('div');
		this.el.classList.add('image');
		this.el.style.left = x+"px";
		this.el.style.top = y+"px";
		this.el.addEventListener('mousedown', this.mouseDownHandler.bind(this));
	}
	
	AddImage.prototype.mouseDownHandler = function(event){
		
		console.log(event);
		//this.el.style.zIndex = 10;
		this.offsetX = event.offsetX;
		this.offsetY = event.offsetY;
		this._mouseMoveHandler = this.mouseMoveHandler.bind(this);
		this._mouseUpHandler = this.mouseUpHandler.bind(this);
		window.addEventListener('mousemove', this._mouseMoveHandler);
		window.addEventListener('mouseup', this._mouseUpHandler);
		this.el.style.zIndex = 100;	
	};
	
	AddImage.prototype.mouseUpHandler = function(event){
		console.log('mouseup');
		console.log(event);
		window.removeEventListener('mousemove', this._mouseMoveHandler);
		window.removeEventListener('mouseup', this._mouseUpHandler);
		this.el.style.zIndex = 0;
	};
	
	AddImage.prototype.mouseMoveHandler = function(event){
		console.log(this);
		console.log(event);
		this.el.style.left = (event.x - (this.offsetX)) + "px";
		this.el.style.top = (event.y - (this.offsetY)) + "px";
	};

	/*function AddImage(x, y){ 
		console.log('created new block');
		this.el = document.createElement('div');
		this.el.classList.add('image');
		this.el.style.left = x+"px";
		this.el.style.top = y+"px";
		this.el.addEventListener('mousedown', this.mouseDownHandler.bind(this));
	}
	
	AddImage.prototype.mouseDownHandler = function(event){
		
		console.log(event);
		//this.el.style.zIndex = 10;
		this.offsetX = event.offsetX;
		this.offsetY = event.offsetY;
		this._mouseMoveHandler = this.mouseMoveHandler.bind(this);
		this._mouseUpHandler = this.mouseUpHandler.bind(this);
		window.addEventListener('mousemove', this._mouseMoveHandler);
		window.addEventListener('mouseup', this._mouseUpHandler);
		this.el.style.zIndex = 100;	
	};
	
	AddImage.prototype.mouseUpHandler = function(event){
		console.log('mouseup');
		console.log(event);
		window.removeEventListener('mousemove', this._mouseMoveHandler);
		window.removeEventListener('mouseup', this._mouseUpHandler);
		this.el.style.zIndex = 0;
	};
	
	AddImage.prototype.mouseMoveHandler = function(event){
		console.log(this);
		console.log(event);
		this.el.style.left = (event.x - (this.offsetX)) + "px";
		this.el.style.top = (event.y - (this.offsetY)) + "px";
	};*/

	return WhiteboardApplication;
})();