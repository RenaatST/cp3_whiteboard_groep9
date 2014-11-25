if (window.File && window.FileReader && window.FileList && window.Blob) {

	
	var imageinput = document.querySelector("input[name=image]");
	var errorelement = imageinput.parentNode.querySelector("span");
	var canupload = false;
	imageinput.addEventListener("change", function(e){
		errorelement.style.display = "none";
		var img = imageinput.parentNode.querySelector("img");
		if (img) {
			imageinput.parentNode.removeChild(img);
		}

		if (imageinput.files.length > 0) {
			var file = imageinput.files[0];
			if(file.type.search("image") == 0) {
				var reader = new FileReader();
				reader.onload = function(e){
					var img = document.createElement("img");

					img.onload = function() {
						if(img.width != 612 || img.height != img.width) {
							errorelement.innerText = "the image needs to be square";
							errorelement.style.display = "block";
						}else {
							canupload = true;
							imageinput.parentNode.appendChild(img);
						}
					}
					img.setAttribute("src",reader.result);
				}				
			}
			reader.readAsDataURL(file);
		}
	});
}