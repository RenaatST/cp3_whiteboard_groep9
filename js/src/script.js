(function(){
	
	var UserHandler = require("./classes/UserHandler");

	function init() {
		new UserHandler($("#whiteboardDetail"));
	}

	init();
})();