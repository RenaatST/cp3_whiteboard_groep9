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

        if (window.File && window.FileReader && window.FileList && window.Blob) {
			initImages();
		} else {
			
			
		}
	}

	function initImages(){
		var imageinputs = document.querySelectorAll('.image-input');
		
		//[].forEach.call( imageinputs, initimageinput());
		
		for(var i = 0; i < imageinputs.length; i++){
			console.log(imageinputs[i]);
			
			initimageinput(imageinputs[i]);

		}
		
	}
	
	function initimageinput(el){
		el.classList.add('image-input-js');
		
		var fileinput = el.querySelector('input[type=file]');
		
		var previewcontainer = document.createElement("div");
		previewcontainer.classList.add('image-input-preview');
		previewcontainer.setAttribute("id", "imagepreviewkader");
		el.insertBefore(previewcontainer,fileinput);
		
		fileinput.addEventListener('change', function(e){
			
			var files = e.target.files; // FileList object

			// Loop through the FileList and render image files as thumbnails.
			for (var i = 0, f; f = files[i]; i++) {

			  // Only process image files.
			  if (!f.type.match('image.*')) {
				continue;
			  }

			  var reader = new FileReader();

			  // Closure to capture the file information.
			  reader.onload = (function(theFile) {
				return function(e) {
				  // Render thumbnails
				  
				  var errors = [];
				  
					var img = new Image();
					img.src = reader.result;
					console.log(img.width);
					console.log(parseInt(el.getAttribute("data-width")));
					if(img.width > parseInt(el.getAttribute("data-width"))){
						
						errors.push("error");
						
					}
					
					if(img.height > parseInt(el.getAttribute("data-height"))){
						
						errors.push("error");
						
					}
										
					if(errors.length !== 0){
						
						
					}else if(errors.length === 0){
						
						previewcontainer.style.backgroundImage = 'url(' + e.target.result + ')';

					}
				};
			  })(f);

			  // Read in the image file as a data URL.
			  reader.readAsDataURL(f);
			}
			
			
			
		});

		

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