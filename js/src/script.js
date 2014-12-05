(function(){
	
	var UserHandler = require("./classes/UserHandler");
	var DragAndDropHandler = require("./classes/DragAndDropHandler");

	function init() {
		new UserHandler();
		new DragAndDropHandler();
	}

	init();
})();