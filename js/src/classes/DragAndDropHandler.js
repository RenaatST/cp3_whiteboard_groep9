module.exports = (function(){

	var teller = 0;
	var items;
	var el;

	function DragAndDropHandler() {
		$(".note").on("mousedown",this.mouseDownHandler).bind(this);



        if (window.File && window.FileReader && window.FileList && window.Blob) {
			initImages();
		} else {

		}
	}

	function initImages(){
		var imageinputs = document.querySelectorAll('.image-input');
		
		//[].forEach.call( imageinputs, initimageinput());
		
		for(var i = 0; i < imageinputs.length; i++){
			//console.log(imageinputs[i]);
			
			initimageinput(imageinputs[i]);

		}
		
	}
	

	//NIET WEGDOEN
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

	DragAndDropHandler.prototype.mouseDownHandler = function(e) {
		this.el = this;
		//offsets opslaan
		console.log(this.el);
		this.offsetX = event.offsetX;
		this.offsetY = event.offsetY;

		this._mousemoveHandler = this.mousemoveHandler;
        this._mouseupHandler = this.mouseupHandler;

		$(window).on("mousemove", this._mousemoveHandler);
		$(window).on("mouseup", this.mouseupHandler);

	}


	DragAndDropHandler.prototype.mousemoveHandler = function(e) {
		/*this.el.style.left = (e.x - this.offsetX) +"px";
        this.el.style.top = (e.y - this.offsetY) +"px";*/
	}


	DragAndDropHandler.prototype.mouseupHandler = function(e) {
		console.log("this");
		/*$(window).on("mousemove",this._mousemoveHandler);
        $(window).on("mouseup",this._mouseupHandler);*/
	}


	return DragAndDropHandler;
})();