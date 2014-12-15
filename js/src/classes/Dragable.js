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