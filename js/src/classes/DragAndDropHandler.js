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