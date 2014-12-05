module.exports = (function(){

	var teller = 0;
	var items;
	var el;

	function DragAndDropHandler() {

		this.items = document.querySelectorAll("div[class=images]");

        for(var i = 0; i < this.items.length; i++) {
          //this.addEventListener('mousedown', this.mouseDownHandler.bind(this));
          console.log(this.items[i]);
          this.items[i] = this.el;
          this.items[i].addEventListener('click', this.mouseDownHandler.bind(this));
        }
	}

	DragAndDropHandler.prototype.clikchandler = function(event){

		console.log(this);


	};


	DragAndDropHandler.prototype.mouseDownHandler = function(event){
		
		console.log(this.el);
		this.el.style.zIndex = ++teller;
		//this.el.style.zIndex = 10;
		this.offsetX = event.offsetX;
		this.offsetY = event.offsetY;
		this._mouseMoveHandler = this.mouseMoveHandler.bind(this);
		this._mouseUpHandler = this.mouseUpHandler.bind(this);
		window.addEventListener('mousemove', this._mouseMoveHandler);
		window.addEventListener('mouseup', this._mouseUpHandler);	
	};
	
	DragAndDropHandler.prototype.mouseUpHandler = function(event){
		console.log('mouseup');
		console.log(event);
		window.removeEventListener('mousemove', this._mouseMoveHandler);
		window.removeEventListener('mouseup', this._mouseUpHandler);
		this.el.style.zIndex = 0;
	};
	
	DragAndDropHandler.prototype.mouseMoveHandler = function(event){
		console.log(this);
		console.log(event);
		this.el.style.left = (event.x - (this.offsetX)) + "px";
		this.el.style.top = (event.y - (this.offsetY)) + "px";
	};
	

	return DragAndDropHandler;
})();